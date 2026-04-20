/**
 * FrameLayer — Layer 3b of the Rosetta meaning pipeline.
 * Resolves concept graphs into semantic frames with role slots.
 */
import {
  createConjecture,
  createFrame,
  type ConceptPayload,
  type FramePayload,
  type FrameRole,
  type LatticeEdgePayload,
  type TileEnvelope,
} from "../../../rosetta-core/src/index.js";
import type { PipelineContext } from "./pipeline-context.js";

interface FrameCandidate {
  evidence: string[];
  frame: TileEnvelope<FramePayload>;
  score: number;
}

export interface FrameLayerResult {
  conjectures: TileEnvelope<unknown>[];
  ctx: PipelineContext;
  frames: TileEnvelope<unknown>[];
}

export function runFrameLayer(ctx: PipelineContext): FrameLayerResult {
  if (!ctx.L3) {
    throw new Error("L3 (concepts) not available — run concept layer first");
  }

  const concepts = ctx.L3.concepts as TileEnvelope<ConceptPayload>[];
  const edges = ctx.L3.latticeEdges as TileEnvelope<LatticeEdgePayload>[];
  const lowerText = observationText(ctx);
  const questionWord = extractQuestionWord(lowerText);
  const isQuestion = lowerText.includes("?") || questionWord !== null;

  const countryConcept = findFirstConcept(concepts, (concept) => conceptType(concept) === "country");
  const capitalConcept = findFirstConcept(concepts, (concept) => {
    const label = normalize(concept.payload.label);
    const relationType = normalize(concept.payload.properties?.relationType ?? "");
    return label === "capital" || relationType === "capital_of";
  });
  const greetingConcept = findFirstConcept(concepts, (concept) => normalize(concept.payload.label) === "greeting");
  const questionConcept = findFirstConcept(concepts, (concept) => normalize(concept.payload.label) === "question");
  const namedConcept = findFirstConcept(concepts, (concept) => {
    const type = conceptType(concept);
    return type === "named_entity" || type === "person" || type === "country" || type === "city";
  });

  const frames: FrameCandidate[] = [];

  if (greetingConcept) {
    frames.push({
      evidence: ["greeting-concept"],
      frame: createFrame(
        "GreetingFrame",
        [
          role("act", true, "discourse.greeting", [greetingConcept.cid]),
          role("reply", false, "dialog.reply", undefined, true),
        ],
        [greetingConcept.cid],
        {
          description: "Greeting detected in the utterance.",
          rid: "frame.greeting",
        }
      ),
      score: 0.97,
    });
  }

  if (countryConcept && capitalConcept) {
    const knownCapital = findCapitalCity(edges, concepts, countryConcept.cid);
    const capitalShouldBeVariable = isQuestion && ["what", "which", "where"].includes(questionWord ?? "what");
    const capitalRole = capitalShouldBeVariable
      ? role("capital", true, "geo.city", undefined, true)
      : role("capital", true, "geo.city", knownCapital ? [knownCapital.cid] : undefined, !knownCapital);
    const conceptCids = [countryConcept.cid, capitalConcept.cid, ...(knownCapital ? [knownCapital.cid] : [])];

    frames.push({
      evidence: [
        "country-concept",
        "capital-relation-concept",
        capitalShouldBeVariable ? "question-variable" : "declarative-binding",
      ],
      frame: createFrame(
        "CapitalRelationFrame",
        [
          role("country", true, "geo.country", [countryConcept.cid]),
          capitalRole,
          role("relation", false, "geo.relation", [capitalConcept.cid]),
        ],
        conceptCids,
        {
          description: "Country-to-capital relation.",
          rid: "frame.capital_relation",
        }
      ),
      score: capitalShouldBeVariable ? 0.98 : 0.94,
    });
  }

  if (isQuestion) {
    const focusConcept =
      findFirstConcept(concepts, (concept) => !["question", "greeting"].includes(normalize(concept.payload.label))) ??
      countryConcept ??
      namedConcept;

    frames.push({
      evidence: [
        questionConcept ? "question-concept" : "question-punctuation",
        focusConcept ? "focus-concept" : "focus-missing",
      ],
      frame: createFrame(
        "QuestionFrame",
        [
          role("prompt", false, "discourse.question", questionConcept ? [questionConcept.cid] : undefined),
          role("focus", false, focusExpectedType(focusConcept), focusConcept ? [focusConcept.cid] : undefined),
          role("answer", true, answerExpectedType(questionWord), undefined, true),
        ],
        [questionConcept?.cid, focusConcept?.cid].filter((value): value is string => Boolean(value)),
        {
          description: "Generic interrogative frame.",
          rid: "frame.question",
        }
      ),
      score: 0.72,
    });
  }

  if (isQuestion && namedConcept && !capitalConcept) {
    frames.push({
      evidence: ["question", "named-entity-focus"],
      frame: createFrame(
        "EntityLookupFrame",
        [
          role("entity", true, focusExpectedType(namedConcept), [namedConcept.cid]),
          role("answer", true, answerExpectedType(questionWord), undefined, true),
        ],
        [namedConcept.cid],
        {
          description: "Lookup question about a known entity.",
          rid: "frame.entity_lookup",
        }
      ),
      score: 0.76,
    });
  }

  const deduped = dedupeFrameCandidates(frames);
  const conjectures: TileEnvelope<unknown>[] = [];

  for (const candidate of deduped) {
    ctx.addToTrace(candidate.frame);
  }

  if (ctx.options.emitConjectures && deduped.length > 1) {
    const selected = deduped[0];
    const conjecture = createConjecture(
      ctx.observation.cid,
      "L3_concept_frame",
      deduped.map((candidate) => ({
        targetCid: candidate.frame.cid,
        weight: roundWeight(candidate.score),
        evidence: candidate.evidence.join(" | "),
      })),
      "frame_heuristics",
      false,
      selected.frame.cid,
      [selected.frame.cid]
    );
    conjectures.push(conjecture);
    ctx.addToTrace(conjecture);
  }

  ctx.L3 = {
    concepts: ctx.L3.concepts,
    conjectures: [...ctx.L3.conjectures, ...conjectures],
    frames: deduped.map((candidate) => candidate.frame),
    latticeEdges: ctx.L3.latticeEdges,
  };

  return {
    conjectures,
    ctx,
    frames: deduped.map((candidate) => candidate.frame),
  };
}

function dedupeFrameCandidates(candidates: FrameCandidate[]): FrameCandidate[] {
  const byType = new Map<string, FrameCandidate>();
  for (const candidate of candidates) {
    const key = candidate.frame.payload.frameType;
    const current = byType.get(key);
    if (!current || current.score < candidate.score) {
      byType.set(key, candidate);
    }
  }
  return Array.from(byType.values()).sort((left, right) => right.score - left.score);
}

function findCapitalCity(
  edges: TileEnvelope<LatticeEdgePayload>[],
  concepts: TileEnvelope<ConceptPayload>[],
  countryCid: string
): TileEnvelope<ConceptPayload> | undefined {
  const capitalEdge = edges.find((edge) => {
    const payload = edge.payload as LatticeEdgePayload;
    return payload.relation === "capital_of" && payload.targetCid === countryCid;
  });

  if (!capitalEdge) {
    return undefined;
  }

  const sourceCid = (capitalEdge.payload as LatticeEdgePayload).sourceCid;
  return concepts.find((concept) => concept.cid === sourceCid);
}

function findFirstConcept(
  concepts: TileEnvelope<ConceptPayload>[],
  predicate: (concept: TileEnvelope<ConceptPayload>) => boolean
): TileEnvelope<ConceptPayload> | undefined {
  return concepts.find(predicate);
}

function conceptType(concept: TileEnvelope<ConceptPayload>): string {
  return normalize(concept.payload.properties?.entityType ?? concept.payload.namespace);
}

function role(
  roleName: string,
  required: boolean,
  expectedType?: string,
  filledBy?: string[],
  variable?: boolean
): FrameRole {
  return {
    expectedType,
    filledBy,
    required,
    roleName,
    variable,
  };
}

function answerExpectedType(questionWord: string | null): string {
  switch (questionWord) {
    case "where":
      return "geo.place";
    case "when":
      return "time.datetime";
    case "who":
      return "entity.person";
    default:
      return "entity.answer";
  }
}

function focusExpectedType(concept?: TileEnvelope<ConceptPayload>): string | undefined {
  if (!concept) {
    return undefined;
  }
  const entityType = concept.payload.properties?.entityType;
  return entityType ? `entity.${entityType}` : concept.payload.namespace;
}

function extractQuestionWord(text: string): string | null {
  const match = text.match(/\b(what|which|who|where|when|why|how)\b/u);
  return match?.[1] ?? null;
}

function observationText(ctx: PipelineContext): string {
  const payload = ctx.observation.payload as { data?: string; signal?: string };
  return `${payload.signal ?? payload.data ?? ""}`.toLowerCase();
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function roundWeight(value: number): number {
  return Math.max(0.01, Math.min(0.99, Number(value.toFixed(3))));
}

/**
 * FrameLayer — Layer 3+ of the Rosetta meaning pipeline.
 * Assembles resolved concepts into typed rosetta.frame tiles.
 *
 * Frame types are looked up from a frame registry. Unknown combinations
 * result in an open frame with variable roles.
 *
 * Production TODO: wire to OMOC concept simplex routing for frame assembly.
 */
import {
  createConjecture,
  createFrame,
  type ConceptPayload,
  type FrameRole,
  type TileEnvelope,
} from "../../../rosetta-core/src/index.js";
import type { PipelineContext } from "./pipeline-context.js";
import type { Layer3Concepts } from "./pipeline-types.js";

export function runFrameLayer(ctx: PipelineContext): Layer3Concepts {
  const { L3, options } = ctx;
  if (!L3) throw new Error("L3 (concepts) not available — run concept layer first");

  const frames: TileEnvelope<unknown>[] = [];
  const concepts = L3.concepts as TileEnvelope<ConceptPayload>[];
  const lowerText = observationText(ctx);
  const questionWord = extractQuestionWord(lowerText);
  const isQuestion = lowerText.includes("?") || questionWord !== null;

  const countryConcept = concepts.find((concept) => conceptType(concept) === "country");
  const capitalConcept = concepts.find((concept) => {
    const label = normalize(concept.payload.label);
    const relationType = normalize(concept.payload.properties?.relationType ?? "");
    return label === "capital" || relationType === "capital_of";
  });
  const questionConcept = concepts.find((concept) => normalize(concept.payload.label) === "question");
  const focusConcept =
    countryConcept ?? concepts.find((concept) => !["question", "capital"].includes(normalize(concept.payload.label)));

  if (countryConcept && capitalConcept) {
    const conceptCids = [countryConcept.cid, capitalConcept.cid];
    const capitalShouldBeVariable = isQuestion && ["what", "which", "where"].includes(questionWord ?? "what");
    const frame = createFrame(
      "CapitalRelationFrame",
      [
        role("country", true, "geo.country", [countryConcept.cid]),
        role("capital", true, "geo.city", undefined, capitalShouldBeVariable),
        role("relation", false, "geo.relation", [capitalConcept.cid]),
      ],
      conceptCids,
      {
        description: "Country-to-capital relation.",
        parents: conceptCids,
        rid: "frame.capital_relation",
      }
    );

    frames.push(frame);
    ctx.addToTrace(frame);
  }

  if (isQuestion) {
    const conceptCids = [questionConcept?.cid, focusConcept?.cid].filter((value): value is string => Boolean(value));
    const frame = createFrame(
      "QuestionFrame",
      [
        role("prompt", false, "discourse.question", questionConcept ? [questionConcept.cid] : undefined),
        role("focus", false, focusExpectedType(focusConcept), focusConcept ? [focusConcept.cid] : undefined),
        role("answer", true, answerExpectedType(questionWord), undefined, true),
      ],
      conceptCids,
      {
        description: "Generic interrogative frame.",
        parents: conceptCids,
        rid: "frame.question",
      }
    );

    frames.push(frame);
    ctx.addToTrace(frame);
  }

  if (options.emitConjectures && frames.length > 1) {
    const selected = frames[0];
    const conj = createConjecture(
      ctx.observation.cid,
      "L3_concept_frame",
      frames.map((frame, index) => ({
        targetCid: frame.cid,
        weight: index === 0 ? 0.9 : 0.7,
        evidence: "heuristic_frame_assembly",
      })),
      "heuristic_frame_assembly",
      false,
      selected.cid,
      [selected.cid]
    );
    L3.conjectures.push(conj);
    ctx.addToTrace(conj);
  }

  // Merge into existing L3 result
  const result: Layer3Concepts = {
    ...L3,
    frames: [...L3.frames, ...frames],
  };
  ctx.L3 = result;
  return result;
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

function conceptType(concept: TileEnvelope<ConceptPayload>): string {
  return normalize(concept.payload.properties?.entityType ?? concept.payload.namespace);
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

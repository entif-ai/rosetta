/**
 * ConceptLayer — Layer 3a of the Rosetta meaning pipeline.
 * Maps lexemes to language-neutral concept tiles, emits ambiguity tracking,
 * and incrementally grows a lightweight concept graph with lattice edges.
 */
import {
  createConcept,
  createConjecture,
  createLatticeEdge,
  type ConceptPayload,
  type FormTokenPayload,
  type LatticeEdgeFamily,
  type LatticeEdgeRelation,
  type LexemePayload,
  type LexemeSense,
  type TileEnvelope,
} from "../../../rosetta-core/src/index.js";
import type { PipelineContext } from "./pipeline-context.js";

interface ConceptRelationSeed {
  family: LatticeEdgeFamily;
  relation: LatticeEdgeRelation;
  target: ConceptSeed;
  weight?: number;
}

interface ConceptSeed {
  aliases?: string[];
  description?: string;
  namespace: string;
  label: string;
  properties?: Record<string, string>;
  relations?: ConceptRelationSeed[];
  rid?: string;
  xid?: string;
  xidPack?: string;
}

interface CandidateState {
  existing?: TileEnvelope<ConceptPayload>;
  evidence: string[];
  score: number;
  seed: ConceptSeed;
}

interface SelectedConcept {
  aliases: string[];
  tile: TileEnvelope<ConceptPayload>;
}

export interface ConceptLayerResult {
  concepts: TileEnvelope<unknown>[];
  conjectures: TileEnvelope<unknown>[];
  edges: TileEnvelope<unknown>[];
  ctx: PipelineContext;
}

const DISCOURSE_QUESTION = conceptSeed("Question", "discourse.frame", {
  aliases: ["question", "what", "which", "who", "where", "when", "why", "how"],
  description: "Interrogative speech act seeking an answer.",
  properties: { entityType: "speech_act", intent: "question" },
  rid: "discourse.question",
  relations: [
    {
      family: "semantic",
      relation: "instance_of",
      target: conceptSeed("Speech Act", "discourse.taxonomy", {
        description: "A communicative act performed by an utterance.",
        properties: { entityType: "class" },
        rid: "discourse.speech_act",
      }),
      weight: 1,
    },
  ],
});

const DISCOURSE_GREETING = conceptSeed("Greeting", "discourse.frame", {
  aliases: ["hello", "hi", "hey", "greetings"],
  description: "Friendly salutation intended to open interaction.",
  properties: { entityType: "speech_act", intent: "greeting" },
  rid: "discourse.greeting",
  relations: [
    {
      family: "semantic",
      relation: "instance_of",
      target: conceptSeed("Speech Act", "discourse.taxonomy", {
        description: "A communicative act performed by an utterance.",
        properties: { entityType: "class" },
        rid: "discourse.speech_act",
      }),
      weight: 1,
    },
  ],
});

const LOCATION_RELATION = conceptSeed("Location Relation", "geo.relation", {
  description: "Relationship connecting a place to another place.",
  properties: { entityType: "relation" },
  rid: "geo.relation.location",
});

const COUNTRY_CLASS = conceptSeed("Country", "geo.taxonomy", {
  aliases: ["country", "nation"],
  description: "Sovereign geopolitical entity.",
  properties: { entityType: "class" },
  rid: "geo.class.country",
});

const CITY_CLASS = conceptSeed("City", "geo.taxonomy", {
  aliases: ["city"],
  description: "Urban settlement.",
  properties: { entityType: "class" },
  rid: "geo.class.city",
});

const PERSON_CLASS = conceptSeed("Person", "entity.taxonomy", {
  aliases: ["person", "human"],
  description: "Human individual.",
  properties: { entityType: "class" },
  rid: "entity.class.person",
});

const CAPITAL_RELATION = conceptSeed("Capital", "geo.relation", {
  aliases: ["capital"],
  description: "Capital-city relation binding a country to its seat of government.",
  properties: { entityType: "relation", relationType: "capital_of" },
  rid: "geo.relation.capital",
  relations: [
    {
      family: "semantic",
      relation: "specializes",
      target: LOCATION_RELATION,
      weight: 0.95,
    },
  ],
});

const FRANCE = conceptSeed("France", "geo.country", {
  aliases: ["france", "french republic"],
  description: "European sovereign state whose capital is Paris.",
  properties: { entityType: "country", capitalLabel: "Paris", iso2: "FR" },
  rid: "geo.country.france",
  xid: "Q142",
  xidPack: "wikidata",
  relations: [
    {
      family: "semantic",
      relation: "instance_of",
      target: COUNTRY_CLASS,
      weight: 1,
    },
  ],
});

const PARIS = conceptSeed("Paris", "geo.city", {
  aliases: ["paris"],
  description: "Capital city of France.",
  properties: { entityType: "city", countryLabel: "France" },
  rid: "geo.city.paris",
  xid: "Q90",
  xidPack: "wikidata",
  relations: [
    {
      family: "semantic",
      relation: "instance_of",
      target: CITY_CLASS,
      weight: 1,
    },
    {
      family: "semantic",
      relation: "capital_of",
      target: FRANCE,
      weight: 1,
    },
    {
      family: "semantic",
      relation: "located_in",
      target: FRANCE,
      weight: 0.98,
    },
  ],
});

const EMBEDDED_KB: ConceptSeed[] = [
  DISCOURSE_QUESTION,
  DISCOURSE_GREETING,
  LOCATION_RELATION,
  COUNTRY_CLASS,
  CITY_CLASS,
  PERSON_CLASS,
  CAPITAL_RELATION,
  FRANCE,
  PARIS,
];

const KB_ALIAS_INDEX = buildKbAliasIndex(EMBEDDED_KB);

const MONEY_TERMS = new Set(["bank", "cash", "finance", "loan", "money"]);
const RIVER_TERMS = new Set(["river", "shore", "stream", "water"]);
const LIGHT_TERMS = new Set(["bright", "lamp", "shine", "sun"]);
const WEIGHT_TERMS = new Set(["heavy", "mass", "weight"]);
const CAPITAL_TERMS = new Set(["capital", "city", "country", "nation", "of"]);

export function runConceptLayer(ctx: PipelineContext): ConceptLayerResult {
  const { L1, L2, options } = ctx;

  if (!L2) {
    throw new Error("L2 (lexemes) not available — run lexeme layer first");
  }

  const formByCid = new Map<string, TileEnvelope<FormTokenPayload>>();
  for (const tile of L1?.forms ?? []) {
    if (tile.kind === "rosetta.form.token") {
      formByCid.set(tile.cid, tile as TileEnvelope<FormTokenPayload>);
    }
  }

  const entityMentions = collectEntityMentions(L1?.forms ?? []);
  const conceptsByKey = new Map<string, TileEnvelope<ConceptPayload>>();
  const conceptAliases = new Map<string, TileEnvelope<ConceptPayload>>();
  const edges: TileEnvelope<unknown>[] = [];
  const conjectures: TileEnvelope<unknown>[] = [];
  const edgeIds = new Set<string>();
  const selectedConcepts = new Map<string, SelectedConcept>();
  const lexemes = L2.lexemes as TileEnvelope<LexemePayload>[];

  for (const [index, lexemeTile] of lexemes.entries()) {
    const lexeme = lexemeTile.payload as LexemePayload;
    const primaryForm = formByCid.get(lexeme.formCids[0]);
    const surface = primaryForm?.payload.surface ?? lexeme.lemma;
    const mention = entityMentions.get(primaryForm?.cid ?? "");
    const localContext = collectLocalContext(lexemes, index);
    const candidates = buildConceptCandidates({
      conceptAliases,
      lexeme,
      localContext,
      mention,
      optionsMax: options.maxLexemeCandidates,
      surface,
    });

    if (candidates.length === 0) {
      continue;
    }

    const resolvedOptions: Array<{ candidate: CandidateState; tile: TileEnvelope<ConceptPayload> }> = [];

    for (const candidate of candidates) {
      const tile =
        candidate.existing ??
        getOrCreateConceptTile(candidate.seed, conceptsByKey, (newTile) => {
          ctx.addToTrace(newTile);
        });

      resolvedOptions.push({ candidate, tile });
    }

    const selected = resolvedOptions[0];
    selectedConcepts.set(lexemeTile.cid, {
      aliases: gatherAliases(selected.candidate.seed, surface, mention),
      tile: selected.tile,
    });
    registerConceptAliases(conceptAliases, selected.tile, gatherAliases(selected.candidate.seed, surface, mention));

    if (options.emitConjectures && resolvedOptions.length > 1) {
      const conjecture = createConjecture(
        lexemeTile.cid,
        "L2_lexeme_concept",
        resolvedOptions.map(({ candidate, tile }) => ({
          targetCid: tile.cid,
          weight: roundWeight(candidate.score),
          evidence: candidate.evidence.join(" | "),
        })),
        "embedded_kb+cooccurrence",
        false,
        selected.tile.cid,
        [selected.tile.cid]
      );
      conjectures.push(conjecture);
      ctx.addToTrace(conjecture);
    }
  }

  for (const selected of selectedConcepts.values()) {
    createSeedRelations(selected.tile, conceptsByKey, edgeIds, edges, ctx);
  }

  const conceptList = Array.from(conceptsByKey.values());
  const result: ConceptLayerResult = { concepts: conceptList, conjectures, edges, ctx };
  ctx.L3 = {
    concepts: conceptList,
    conjectures,
    frames: ctx.L3?.frames ?? [],
    latticeEdges: edges,
  };
  return result;
}

function buildConceptCandidates(input: {
  conceptAliases: Map<string, TileEnvelope<ConceptPayload>>;
  lexeme: LexemePayload;
  localContext: Set<string>;
  mention?: string;
  optionsMax: number;
  surface: string;
}): CandidateState[] {
  const { conceptAliases, lexeme, localContext, mention, optionsMax, surface } = input;
  const candidates = new Map<string, CandidateState>();
  const normalizedLemma = normalize(lexeme.lemma);
  const normalizedSurface = normalize(surface);
  const normalizedMention = mention ? normalize(mention) : undefined;
  const aliasQueries = [...new Set([normalizedMention, normalizedSurface, normalizedLemma].filter(Boolean) as string[])];

  for (const alias of aliasQueries) {
    const graphHit = conceptAliases.get(alias);
    if (graphHit) {
      addCandidate(candidates, conceptSeedFromPayload(graphHit.payload), 0.99, [`concept-graph:${alias}`], graphHit);
    }

    for (const seed of KB_ALIAS_INDEX.get(alias) ?? []) {
      let score = 0.8;
      if (normalizedMention && alias === normalizedMention) {
        score += 0.08;
      }
      if (isTitleCase(surface) && isEntityLike(seed)) {
        score += 0.05;
      }
      score += cooccurrenceBoost(seed, localContext);
      addCandidate(candidates, seed, score, [`kb:${alias}`]);
    }
  }

  for (const sense of lexeme.senses) {
    const seed = conceptSeedFromSense(lexeme, sense);
    let score = 0.35 + Math.min(0.45, sense.weight);
    score += cooccurrenceBoost(seed, localContext);
    addCandidate(candidates, seed, score, [`sense:${sense.senseId}`]);
  }

  if (isTitleCase(surface) && candidates.size === 0) {
    addCandidate(
      candidates,
      conceptSeed(titleize(mention ?? surface), "entity.named", {
        description: "Named entity inferred from title-case surface form.",
        properties: { entityType: "named_entity", mention: mention ?? surface },
        relations: [
          {
            family: "semantic",
            relation: "instance_of",
            target: PERSON_CLASS,
            weight: 0.35,
          },
        ],
      }),
      0.72,
      ["pattern:title_case_entity"]
    );
  }

  if (candidates.size === 0) {
    addCandidate(candidates, genericConceptSeed(lexeme), 0.42, [`fallback:${lexeme.pos}`]);
  }

  return Array.from(candidates.values())
    .sort((left, right) => right.score - left.score)
    .slice(0, optionsMax)
    .map((candidate) => ({ ...candidate, score: roundWeight(candidate.score) }));
}

function addCandidate(
  candidates: Map<string, CandidateState>,
  seed: ConceptSeed,
  score: number,
  evidence: string[],
  existing?: TileEnvelope<ConceptPayload>
): void {
  const key = conceptSeedKey(seed);
  const current = candidates.get(key);
  if (!current || current.score < score) {
    candidates.set(key, {
      existing,
      evidence: [...new Set([...(current?.evidence ?? []), ...evidence])],
      score,
      seed,
    });
    return;
  }

  current.evidence = [...new Set([...current.evidence, ...evidence])];
}

function createSeedRelations(
  sourceTile: TileEnvelope<ConceptPayload>,
  conceptsByKey: Map<string, TileEnvelope<ConceptPayload>>,
  edgeIds: Set<string>,
  edges: TileEnvelope<unknown>[],
  ctx: PipelineContext
): void {
  const seed = findSeedForConcept(sourceTile.payload);
  for (const relation of seed?.relations ?? []) {
    const targetTile = getOrCreateConceptTile(relation.target, conceptsByKey, (newTile) => {
      ctx.addToTrace(newTile);
    });
    const edge = createLatticeEdge(sourceTile.cid, targetTile.cid, relation.relation, relation.family, {
      weight: relation.weight ?? 1,
    });
    if (edgeIds.has(edge.cid)) {
      continue;
    }
    edgeIds.add(edge.cid);
    edges.push(edge);
    ctx.addToTrace(edge);
  }
}

function getOrCreateConceptTile(
  seed: ConceptSeed,
  conceptsByKey: Map<string, TileEnvelope<ConceptPayload>>,
  onCreate: (tile: TileEnvelope<ConceptPayload>) => void
): TileEnvelope<ConceptPayload> {
  const key = conceptSeedKey(seed);
  const existing = conceptsByKey.get(key);
  if (existing) {
    return existing;
  }

  const created = createConcept(seed.label, seed.namespace, {
    description: seed.description,
    properties: seed.properties,
    rid: seed.rid,
    xid: seed.xid,
    xidPack: seed.xidPack,
  });
  conceptsByKey.set(key, created);
  onCreate(created);
  return created;
}

function collectEntityMentions(forms: TileEnvelope<unknown>[]): Map<string, string> {
  const mentions = new Map<string, string>();
  let span: TileEnvelope<FormTokenPayload>[] = [];

  const flush = () => {
    if (span.length === 0) {
      return;
    }
    const mention = span.map((tile) => tile.payload.surface).join(" ");
    for (const tile of span) {
      mentions.set(tile.cid, mention);
    }
    span = [];
  };

  for (const tile of forms) {
    if (tile.kind !== "rosetta.form.token") {
      flush();
      continue;
    }

    const payload = tile.payload as FormTokenPayload;
    if (payload.tokenType !== "word" || !isTitleCase(payload.surface)) {
      flush();
      continue;
    }

    span.push(tile as TileEnvelope<FormTokenPayload>);
  }

  flush();
  return mentions;
}

function collectLocalContext(lexemes: TileEnvelope<LexemePayload>[], index: number): Set<string> {
  const context = new Set<string>();
  for (let offset = -2; offset <= 2; offset += 1) {
    const neighbor = lexemes[index + offset];
    if (!neighbor) {
      continue;
    }
    context.add(normalize((neighbor.payload as LexemePayload).lemma));
  }
  return context;
}

function conceptSeedFromSense(lexeme: LexemePayload, sense: LexemeSense): ConceptSeed {
  const definition = sense.definition.toLowerCase();
  const lemma = normalize(lexeme.lemma);

  if (lemma === "bank" && /money|deposit|lent|institution/u.test(definition)) {
    return conceptSeed("Bank", "finance.institution", {
      description: sense.definition,
      properties: { entityType: "institution", senseId: sense.senseId },
    });
  }

  if (lemma === "bank" && /water|river|body of water/u.test(definition)) {
    return conceptSeed("River Bank", "geo.landform", {
      description: sense.definition,
      properties: { entityType: "landform", senseId: sense.senseId },
    });
  }

  if (lemma === "light" && /radiance|illumination/u.test(definition)) {
    return conceptSeed("Light", "physical.phenomenon", {
      description: sense.definition,
      properties: { entityType: "phenomenon", senseId: sense.senseId },
    });
  }

  if (lemma === "light" && /weight|little weight/u.test(definition)) {
    return conceptSeed("Lightweight", "quality.physical", {
      description: sense.definition,
      properties: { entityType: "quality", senseId: sense.senseId },
    });
  }

  return conceptSeed(titleize(lexeme.lemma), namespaceForPos(lexeme.pos), {
    description: sense.definition,
    properties: { entityType: namespaceForPos(lexeme.pos), senseId: sense.senseId },
  });
}

function genericConceptSeed(lexeme: LexemePayload): ConceptSeed {
  return conceptSeed(titleize(lexeme.lemma), namespaceForPos(lexeme.pos), {
    description: `Concept inferred from ${lexeme.language} ${lexeme.pos} lexeme.`,
    properties: { entityType: lexeme.pos, lemma: lexeme.lemma },
  });
}

function namespaceForPos(pos: LexemePayload["pos"]): string {
  switch (pos) {
    case "verb":
      return "event.generic";
    case "adj":
      return "quality.generic";
    case "adv":
      return "modifier.generic";
    case "pron":
      return "entity.reference";
    default:
      return "entity.generic";
  }
}

function cooccurrenceBoost(seed: ConceptSeed, context: Set<string>): number {
  let boost = 0;
  const namespace = normalize(seed.namespace);
  const entityType = normalize(seed.properties?.entityType ?? "");

  if ((namespace.includes("finance") || entityType === "institution") && intersects(context, MONEY_TERMS)) {
    boost += 0.18;
  }
  if ((namespace.includes("geo") || entityType === "landform") && intersects(context, RIVER_TERMS)) {
    boost += 0.18;
  }
  if (normalize(seed.label) === "capital" && intersects(context, CAPITAL_TERMS)) {
    boost += 0.14;
  }
  if (normalize(seed.label) === "question" && context.has("what")) {
    boost += 0.1;
  }
  if (normalize(seed.label) === "greeting" && intersects(context, new Set(["hello", "hi", "hey"]))) {
    boost += 0.12;
  }
  if (normalize(seed.label) === "light" && intersects(context, LIGHT_TERMS)) {
    boost += 0.12;
  }
  if (normalize(seed.label) === "lightweight" && intersects(context, WEIGHT_TERMS)) {
    boost += 0.12;
  }
  if (entityType === "country" && intersects(context, CAPITAL_TERMS)) {
    boost += 0.08;
  }
  if (entityType === "city" && intersects(context, CAPITAL_TERMS)) {
    boost += 0.08;
  }

  return boost;
}

function registerConceptAliases(
  conceptAliases: Map<string, TileEnvelope<ConceptPayload>>,
  tile: TileEnvelope<ConceptPayload>,
  aliases: string[]
): void {
  for (const alias of aliases) {
    conceptAliases.set(normalize(alias), tile);
  }
}

function gatherAliases(seed: ConceptSeed, surface: string, mention?: string): string[] {
  return [...new Set([seed.label, surface, mention, ...(seed.aliases ?? [])].filter(Boolean) as string[])];
}

function conceptSeed(label: string, namespace: string, options: Omit<ConceptSeed, "label" | "namespace"> = {}): ConceptSeed {
  return {
    ...options,
    label,
    namespace,
  };
}

function conceptSeedFromPayload(payload: ConceptPayload): ConceptSeed {
  return {
    description: payload.description,
    label: payload.label,
    namespace: payload.namespace,
    properties: payload.properties,
    rid: payload.rid,
    xid: payload.xid,
    xidPack: payload.xidPack,
  };
}

function conceptSeedKey(seed: ConceptSeed): string {
  return JSON.stringify([
    seed.label,
    seed.namespace,
    seed.rid ?? "",
    seed.xid ?? "",
    seed.xidPack ?? "",
    Object.entries(seed.properties ?? {}).sort(([left], [right]) => left.localeCompare(right)),
  ]);
}

function findSeedForConcept(payload: ConceptPayload): ConceptSeed | undefined {
  return EMBEDDED_KB.find((seed) => conceptSeedKey(seed) === conceptSeedKey(conceptSeedFromPayload(payload)));
}

function buildKbAliasIndex(kb: ConceptSeed[]): Map<string, ConceptSeed[]> {
  const index = new Map<string, ConceptSeed[]>();
  for (const seed of kb) {
    for (const alias of [seed.label, ...(seed.aliases ?? [])]) {
      const key = normalize(alias);
      const current = index.get(key) ?? [];
      current.push(seed);
      index.set(key, current);
    }
  }
  return index;
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function titleize(value: string): string {
  return value
    .split(/[\s_-]+/u)
    .filter(Boolean)
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function isTitleCase(value: string): boolean {
  return /^[A-Z][A-Za-z'-]*$/u.test(value);
}

function isEntityLike(seed: ConceptSeed): boolean {
  const entityType = normalize(seed.properties?.entityType ?? "");
  return ["city", "country", "named_entity", "person"].includes(entityType);
}

function intersects(left: Set<string>, right: Set<string>): boolean {
  for (const value of left) {
    if (right.has(value)) {
      return true;
    }
  }
  return false;
}

function roundWeight(value: number): number {
  return Math.max(0.01, Math.min(0.99, Number(value.toFixed(3))));
}

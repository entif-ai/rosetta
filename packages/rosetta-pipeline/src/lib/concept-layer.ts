/**
 * ConceptLayer — Layer 3 of the Rosetta meaning pipeline.
 * Resolves rosetta.lexeme tiles to rosetta.concept tiles (language-neutral nodes).
 *
 * This is a STUB: creates a concept node per lexeme with a namespace derived
 * from the lexeme's POS. In production, this would wire to:
 *   - ENGRAM memory: concept lookup via semantic slug
 *   - VocabPack: WordNet synset → Rosetta concept
 *   - OMOC: delegate routing for specialized concept resolution
 */
import { createConcept, createLatticeEdge, type TileEnvelope } from "../../../rosetta-core/src/index.js";
import type { PipelineContext } from "./pipeline-context.js";
import type { Layer3Concepts } from "./pipeline-types.js";

const POS_TO_NAMESPACE: Record<string, string> = {
  noun: "entity.generic",
  verb: "event.generic",
  adj: "quality.generic",
  adv: "modifier.generic",
};

export function runConceptLayer(ctx: PipelineContext): Layer3Concepts {
  const { L2 } = ctx;
  if (!L2) throw new Error("L2 (lexemes) not available — run lexeme layer first");

  const concepts: TileEnvelope<unknown>[] = [];
  const latticeEdges: TileEnvelope<unknown>[] = [];
  const conjectures: TileEnvelope<unknown>[] = [];

  for (const lexTile of L2.lexemes) {
    const pl = lexTile.payload as { lemma?: string; pos?: string; lexemeId?: string };
    const lemma = pl.lemma ?? "unknown";
    const pos = pl.pos ?? "noun";
    const seed = conceptSeedForLexeme(lemma, pos);

    const concept = createConcept(seed.label, seed.namespace, {
      description: seed.description ?? `auto-concept from lexeme ${pl.lexemeId}`,
      parents: [lexTile.cid],
      properties: seed.properties,
      rid: seed.rid,
      xid: seed.xid,
      xidPack: seed.xidPack,
    });

    concepts.push(concept);
    ctx.addToTrace(concept);

    // Lexeme → Concept edge (provenance)
    const edge = createLatticeEdge(
      lexTile.cid,
      concept.cid,
      "instance_of",
      "semantic",
      { parents: [lexTile.cid, concept.cid] }
    );
    latticeEdges.push(edge);
    ctx.addToTrace(edge);
  }

  // Conjectures from L2 carry forward
  if (L2.conjectures) conjectures.push(...L2.conjectures);

  const result: Layer3Concepts = { concepts, frames: [], latticeEdges, conjectures };
  ctx.L3 = result;
  return result;
}

function conceptSeedForLexeme(
  lemma: string,
  pos: string
): {
  description?: string;
  label: string;
  namespace: string;
  properties?: Record<string, string>;
  rid?: string;
  xid?: string;
  xidPack?: string;
} {
  switch (lemma.toLowerCase()) {
    case "what":
    case "which":
    case "who":
    case "where":
    case "when":
    case "why":
    case "how":
      return {
        description: "Interrogative speech act seeking an answer.",
        label: "Question",
        namespace: "discourse.frame",
        properties: { entityType: "speech_act", intent: "question" },
        rid: "discourse.question",
      };
    case "capital":
      return {
        description: "Capital-city relation binding a country to its seat of government.",
        label: "Capital",
        namespace: "geo.relation",
        properties: { entityType: "relation", relationType: "capital_of" },
        rid: "geo.relation.capital",
      };
    case "france":
      return {
        description: "European sovereign state whose capital is Paris.",
        label: "France",
        namespace: "geo.country",
        properties: { capitalLabel: "Paris", entityType: "country", iso2: "FR" },
        rid: "geo.country.france",
        xid: "Q142",
        xidPack: "wikidata",
      };
    default:
      return {
        description: `Concept inferred from English ${pos} lexeme.`,
        label: titleize(lemma),
        namespace: POS_TO_NAMESPACE[pos] ?? "entity.generic",
        properties: { entityType: pos, lemma },
      };
  }
}

function titleize(value: string): string {
  return value
    .split(/[\s_-]+/u)
    .filter(Boolean)
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

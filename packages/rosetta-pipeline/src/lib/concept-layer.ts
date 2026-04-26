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
import { createConcept, createLatticeEdge } from "@entif-ai/rosetta-core";
import type { TileEnvelope } from "@entif-ai/rosetta-core";
import type { PipelineContext } from "./pipeline-context.js";
import type { Layer3Concepts } from "./pipeline-types.js";

const POS_TO_NAMESPACE: Record<string, string> = {
  noun: "rosetta.concept.noun",
  verb: "rosetta.concept.verb",
  adj: "rosetta.concept.adj",
  adv: "rosetta.concept.adv",
};

export function runConceptLayer(ctx: PipelineContext): Layer3Concepts {
  const { L2 } = ctx;
  if (!L2) throw new Error("L2 (lexemes) not available — run lexeme layer first");

  const concepts: TileEnvelope<unknown>[] = [];
  const latticeEdges: TileEnvelope<unknown>[] = [];
  const conjectures: TileEnvelope<unknown>[] = [];
  const lexemeCids: string[] = [];

  for (const lexTile of L2.lexemes) {
    const pl = lexTile.payload as { lemma?: string; pos?: string; lexemeId?: string };
    const lemma = pl.lemma ?? "unknown";
    const pos = pl.pos ?? "noun";
    const namespace = POS_TO_NAMESPACE[pos] ?? "rosetta.concept";

    const concept = createConcept(lemma, namespace, {
      description: `auto-concept from lexeme ${pl.lexemeId}`,
      parents: [lexTile.cid],
    });

    concepts.push(concept);
    ctx.addToTrace(concept);
    lexemeCids.push(concept.cid);

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

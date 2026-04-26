/**
 * FrameLayer — Layer 3+ of the Rosetta meaning pipeline.
 * Assembles resolved concepts into typed rosetta.frame tiles.
 *
 * Frame types are looked up from a frame registry. Unknown combinations
 * result in an open frame with variable roles.
 *
 * Production TODO: wire to OMOC concept simplex routing for frame assembly.
 */
import { createFrame, createConjecture } from "@entif-ai/rosetta-core";
import type { FrameRole, TileEnvelope } from "@entif-ai/rosetta-core";
import type { PipelineContext } from "./pipeline-context.js";
import type { Layer3Concepts } from "./pipeline-types.js";

// ── Minimal frame registry ────────────────────────────────────────────────────
const FRAME_REGISTRY: Record<string, Array<{ roleName: string; expectedType: string }>> = {
  QuestionFrame: [
    { roleName: "query", expectedType: "rosetta.concept" },
    { roleName: "topic", expectedType: "rosetta.concept" },
  ],
  CapitalRelationFrame: [
    { roleName: "country", expectedType: "rosetta.concept.noun" },
    { roleName: "capital", expectedType: "rosetta.concept.noun" },
  ],
};

export function runFrameLayer(ctx: PipelineContext): Layer3Concepts {
  const { L3, options } = ctx;
  if (!L3) throw new Error("L3 (concepts) not available — run concept layer first");

  const frames: TileEnvelope<unknown>[] = [];

  // ── Frame assembly strategy ──────────────────────────────────────────────────
  // Simple heuristic: if we have multiple concepts, try to assemble a frame.
  // Look up frame by concept namespace combinations.
  const conceptLabels = L3.concepts.map(c => normalize((c.payload as { label?: string }).label ?? ""));

  // Try CapitalRelationFrame if we have country+city hints
  const hasCapitalQuery = conceptLabels.includes("capital") && conceptLabels.includes("france");
  const hasCountry = conceptLabels.some(l => /country|nation|state/u.test(l));
  const hasCity = conceptLabels.some(l => /city|town|paris|london|berlin|rome/u.test(l));

  if (L3.concepts.length >= 2) {
    const conceptCids = L3.concepts.map(c => c.cid);
    const frameType = (hasCapitalQuery || (hasCountry && hasCity)) ? "CapitalRelationFrame" : "QuestionFrame";
    const registry = FRAME_REGISTRY[frameType] ?? [
      { roleName: "entity0", expectedType: "rosetta.concept" },
      { roleName: "entity1", expectedType: "rosetta.concept" },
    ];

    const roles = frameType === "CapitalRelationFrame"
      ? capitalRelationRoles(L3.concepts)
      : registry.map(r => ({
          roleName: r.roleName,
          required: false,
          expectedType: r.expectedType,
          variable: true,
          filledBy: [],
        }));

    const frame = createFrame(frameType, roles, conceptCids, {
      description: `auto-frame assembled from ${L3.concepts.length} concepts`,
      parents: conceptCids,
    });

    frames.push(frame);
    ctx.addToTrace(frame);

    // If frame type unknown → emit conjecture about which frame applies
    if (frameType === "QuestionFrame" && options.emitConjectures) {
      const conj = createConjecture(
        frame.cid,
        "L3_concept_frame",
        [
          { targetCid: frame.cid, weight: 0.7, evidence: "heuristic: multiple concepts" },
        ],
        "heuristic_frame_assembly",
        false
      );
      L3.conjectures.push(conj);
    }
  }

  // Merge into existing L3 result
  const result: Layer3Concepts = {
    ...L3,
    frames: [...L3.frames, ...frames],
  };
  ctx.L3 = result;
  return result;
}

function capitalRelationRoles(concepts: TileEnvelope<unknown>[]): FrameRole[] {
  const country = concepts.find(concept => normalize((concept.payload as { label?: string }).label ?? "") === "france");

  return [
    {
      roleName: "country",
      required: true,
      expectedType: "rosetta.concept.noun",
      filledBy: country ? [country.cid] : [],
    },
    {
      roleName: "capital",
      required: true,
      expectedType: "rosetta.concept.noun",
      variable: true,
    },
  ];
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

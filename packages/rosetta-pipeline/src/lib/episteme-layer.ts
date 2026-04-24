/**
 * EpistemeLayer — Layer 4 of the Rosetta meaning pipeline.
 * Wraps the resolved interpretation in an epistemic belief state (rosetta.episteme)
 * and scores it with a rosetta.matrix (ELPQ axes: Ethos/Logos/Pathos/Quixote).
 */
import { createEpisteme, createMatrix } from "../../../rosetta-core/src/index.js";
import type { PipelineContext } from "./pipeline-context.js";
import type { Layer4Episteme } from "./pipeline-types.js";

export function runEpistemeLayer(ctx: PipelineContext): Layer4Episteme {
  const { L3, observation } = ctx;
  if (!L3) throw new Error("L3 (concepts/frames) not available");

  // ── Build the claim from what we resolved ───────────────────────────────────
  const obsPayload = observation.payload as { signal?: string };
  const claim = obsPayload.signal
    ? `Interpretation of: ${obsPayload.signal.slice(0, 100)}`
    : "Pipeline interpretation";

  // ── Evidence = all concept + frame CIDs ───────────────────────────────────
  const supportingCids = [
    ...L3.concepts.map(c => c.cid),
    ...L3.frames.map(f => f.cid),
    ...L3.latticeEdges.map(e => e.cid),
  ];

  // ── Confidence based on coverage ─────────────────────────────────────────
  // Higher if we have frames (structured interpretation) vs. bare concepts
  const hasFrames = L3.frames.length > 0;
  const hasConjectures = (L3.conjectures ?? []).length > 0;
  let confidence = 0.5;
  if (hasFrames) confidence += 0.2;
  if (L3.concepts.length > 1) confidence += 0.15;
  if (!hasConjectures) confidence += 0.1;
  confidence = Math.min(0.95, confidence);

  // ── Emit episteme ────────────────────────────────────────────────────────────
  const episteme = createEpisteme(
    claim,
    hasFrames ? "INFERENTIAL" : "EMPIRICAL",
    supportingCids,
    [],
    confidence,
    {
      contestability: hasConjectures ? "high" : "medium",
      confidenceBreakdown: {
        ethos: 0.7 + (hasFrames ? 0.1 : 0),
        logos: 0.6 + (L3.concepts.length > 1 ? 0.15 : 0),
        pathos: 0.5,
        quixote: 0.4,
      },
      parents: supportingCids,
    }
  );
  ctx.addToTrace(episteme);

  // ── Emit matrix ────────────────────────────────────────────────────────────
  const matrix = createMatrix(
    observation.cid,
    {
      ethos: 0.7 + (hasFrames ? 0.1 : 0),
      logos: 0.6 + (L3.concepts.length > 1 ? 0.15 : 0),
      pathos: 0.5,
      quixote: 0.4,
      overall: confidence,
    },
    "1.0.0",
    supportingCids
  );
  ctx.addToTrace(matrix);

  const result: Layer4Episteme = { episteme, matrix };
  ctx.L4 = result;
  return result;
}

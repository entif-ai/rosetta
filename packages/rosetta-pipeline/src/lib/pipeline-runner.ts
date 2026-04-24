/**
 * Rosetta Meaning Pipeline Runner
 * =================================
 * Orchestrates the full 4-layer pipeline:
 *   L0: Observation  (input)
 *   L1: Forms        (tokenization)
 *   L2: Lexemes      (word-sense disambiguation)
 *   L3: Concepts/Frames/Lattice (semantic graph)
 *   L4: Episteme     (belief state + evaluation)
 *
 * Each layer is independently replaceable. Pipeline is append-only:
 * every layer emits tiles that are added to the run trace.
 *
 * Usage:
 *   import { runPipeline } from "./pipeline-runner.js";
 *   const result = runPipeline(observationTile, options);
 */
import { PipelineContext } from "./pipeline-context.js";
import { runFormLayer } from "./form-layer.js";
import { runLexemeLayer } from "./lexeme-layer.js";
import { runConceptLayer } from "./concept-layer.js";
import { runFrameLayer } from "./frame-layer.js";
import { runEpistemeLayer } from "./episteme-layer.js";
import type { TileEnvelope } from "../../../rosetta-core/src/index.js";
import type { PipelineResult, PipelineOptions } from "./pipeline-types.js";

export { runFormLayer, runLexemeLayer, runConceptLayer, runFrameLayer, runEpistemeLayer };

/**
 * Main pipeline entry point.
 * Transforms a rosetta.observation tile through all layers.
 */
export function runPipeline(
  observation: TileEnvelope<unknown>,
  options: PipelineOptions = {}
): PipelineResult {
  const ctx = new PipelineContext(observation, options);

  try {
    // ── L1: Forms ──────────────────────────────────────────────────────────────
    runFormLayer(ctx);

    // ── L2: Lexemes ────────────────────────────────────────────────────────────
    runLexemeLayer(ctx);

    // ── L3: Concepts + Frames + Lattice ───────────────────────────────────────
    runConceptLayer(ctx);
    runFrameLayer(ctx);

    // ── L4: Episteme + Matrix ──────────────────────────────────────────────────
    runEpistemeLayer(ctx);

  } catch (err) {
    ctx.addError("pipeline", err instanceof Error ? err.message : String(err));
  }

  // ── Assemble result ─────────────────────────────────────────────────────────
  return {
    runId: ctx.runId,
    observationCid: observation.cid,
    layers: {
      L0: ctx.L0,
      L1: ctx.L1,
      L2: ctx.L2,
      L3: ctx.L3,
      L4: ctx.L4,
    },
    toolCallTiles: [],
    errors: ctx.errors,
  };
}

/**
 * rosetta-pipeline — Rosetta Meaning Pipeline
 * =============================================
 * The semantic interpretation engine that transforms raw observations
 * through the 4-layer meaning pipeline (Forms → Lexemes → Concepts/Frames → Episteme).
 *
 * Package exports:
 *   runPipeline    — main entry point
 *   PipelineContext — mutable pipeline working state
 *   All layer runners (runFormLayer, runLexemeLayer, etc.)
 *
 * Built by Emilie Eudico's 15-min builder cycle.
 */
export { runPipeline } from "./pipeline-runner.js";
export { PipelineContext } from "./pipeline-context.js";
export type { PipelineResult, PipelineOptions } from "./pipeline-types.js";
export type {
  Layer0Observation,
  Layer1Forms,
  Layer2Lexemes,
  Layer3Concepts,
  Layer4Episteme,
} from "./pipeline-types.js";

/**
 * PipelineContext — holds mutable state across all pipeline layers.
 * Enables mid-pipeline inspection and revision.
 */
import type { TileEnvelope } from "../../../rosetta-core/src/index.js";
import type {
  Layer0Observation,
  Layer1Forms,
  Layer2Lexemes,
  Layer3Concepts,
  Layer4Episteme,
  PipelineOptions,
} from "./pipeline-types.js";

export class PipelineContext {
  readonly runId: string;
  readonly observation: TileEnvelope<unknown>;
  readonly options: Required<PipelineOptions>;

  // Mutable layer outputs — filled as pipeline advances
  L0?: Layer0Observation;
  L1?: Layer1Forms;
  L2?: Layer2Lexemes;
  L3?: Layer3Concepts;
  L4?: Layer4Episteme;

  // Accumulated tiles for the final run trace
  readonly trace: TileEnvelope<unknown>[] = [];

  // Errors encountered at each layer
  readonly errors: string[] = [];

  constructor(observation: TileEnvelope<unknown>, options: PipelineOptions = {}) {
    this.runId = options.runId ?? `run.${Date.now()}`;
    this.observation = observation;
    this.options = {
      runId: this.runId,
      maxLexemeCandidates: options.maxLexemeCandidates ?? 5,
      maxFrameSlots: options.maxFrameSlots ?? 10,
      emitConjectures: options.emitConjectures ?? true,
      language: options.language ?? "en",
    };
    this.L0 = { tile: observation };
    this.trace.push(observation);
  }

  addToTrace(tile: TileEnvelope<unknown>): void {
    this.trace.push(tile);
  }

  addError(layer: string, msg: string): void {
    this.errors.push(`[${layer}] ${msg}`);
  }

  get hasErrors(): boolean {
    return this.errors.length > 0;
  }

  get layerCount(): number {
    return [this.L0, this.L1, this.L2, this.L3, this.L4].filter(Boolean).length;
  }
}

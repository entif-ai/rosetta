/**
 * rosetta-pipeline: shared types and interfaces
 * Built by Emilie's 15-min builder cycle
 */
import type { TileEnvelope } from "@entif-ai/rosetta-core";

export type {
  TileEnvelope,
  CoreKind,
  JsonValue,
} from "@entif-ai/rosetta-core";

// ── Pipeline stage output ────────────────────────────────────────────────────

export interface Layer0Observation {
  tile: TileEnvelope<unknown>;
}

export interface Layer1Forms {
  forms: TileEnvelope<unknown>[];   // rosetta.form.token, rosetta.form.datetime, etc.
  observationCid: string;
}

export interface Layer2Lexemes {
  lexemes: TileEnvelope<unknown>[];  // rosetta.lexeme tiles
  formCids: string[];
  conjectures: TileEnvelope<unknown>[];  // ambiguity tracking
}

export interface Layer3Concepts {
  concepts: TileEnvelope<unknown>[];  // rosetta.concept tiles
  frames: TileEnvelope<unknown>[];     // rosetta.frame tiles
  latticeEdges: TileEnvelope<unknown>[]; // rosetta.lattice_edge tiles
  conjectures: TileEnvelope<unknown>[];  // unresolved ambiguity
}

export interface Layer4Episteme {
  episteme: TileEnvelope<unknown> | null;  // belief state
  matrix: TileEnvelope<unknown> | null;     // ELPQ evaluation
  conjecture?: TileEnvelope<unknown>;        // post-evaluation uncertainty
}

export interface PipelineResult {
  runId: string;
  observationCid: string;
  layers: {
    L0?: Layer0Observation;
    L1?: Layer1Forms;
    L2?: Layer2Lexemes;
    L3?: Layer3Concepts;
    L4?: Layer4Episteme;
  };
  actionTile?: TileEnvelope<unknown>;
  toolCallTiles: TileEnvelope<unknown>[];
  responseTile?: TileEnvelope<unknown>;
  evaluationTile?: TileEnvelope<unknown>;
  errors: string[];
}

export interface PipelineOptions {
  runId?: string;
  maxLexemeCandidates?: number;   // max conjectures per form
  maxFrameSlots?: number;         // max unfilled roles to track
  emitConjectures?: boolean;      // preserve ambiguity at every layer
  language?: string;              // BCP-47, default "en"
}

import { canonicalizeJson, type JsonValue } from '@entif-ai/rosetta-canon';
import { makeContentId } from '@entif-ai/rosetta-cid';

export type CoreKind =
  | 'rosetta.run'
  | 'rosetta.action'
  | 'rosetta.toolcall'
  | 'rosetta.observation'
  | 'rosetta.evaluation'
  | 'rosetta.receipt'
  | 'rosetta.tapestry'
  | 'guard.decision_token'
  | 'source.system_profile'
  | 'source.record'
  | 'source.manifestation'
  | 'source.package'
  | 'source.registry_entry'
  | 'source.fetch_receipt'
  | 'source.normalization_receipt'
  | 'source.identity_resolution_receipt'
  | 'source.evaluation_receipt'
  | 'source.correction_event'
  | 'source.trust_matrix'
  | 'source.canonical_artifact'
  | 'source.ingress_job'
  | string;

export interface TileEnvelope<P = unknown> {
  cid: string;
  kind: CoreKind;
  pack: string;
  version: string;
  parents: string[];
  createdAt: string;
  canonical: string;
  payload: P;
}

export interface TileBuildOptions {
  createdAt?: string;
  pack?: string;
  parents?: string[];
  version?: string;
}

export interface TileIntegrityResult {
  errors: string[];
  expectedCanonical: string;
  expectedCid: string;
  ok: boolean;
}

export interface RunPayload {
  runId: string;
  summary: string;
  tags: string[];
}

export interface ActionPayload {
  actionId: string;
  intent: string;
  runCid: string;
}

export interface ToolCallPayload {
  args: Record<string, JsonValue>;
  tool: string;
  toolCallId: string;
}

export interface ObservationPayload {
  observationId: string;
  signal: string;
  source: string;
}

export interface EvaluationPayload {
  evaluationId: string;
  summary: string;
  verdict: 'deny' | 'fail' | 'partial' | 'pass' | 'unknown';
}

export interface TapestryPayload {
  dynamicTail: string[];
  requiredScope: string;
  stablePrefix: string[];
  tapestries: string[];
  tenant: string;
  totalTokens: number;
}

function deriveTileBody<P>(kind: CoreKind, payload: P, options: TileBuildOptions): Omit<TileEnvelope<P>, 'cid' | 'canonical' | 'createdAt'> {
  return {
    kind,
    pack: options.pack ?? 'rosetta.core',
    parents: [...(options.parents ?? [])].sort(),
    payload,
    version: options.version ?? '0.1.0'
  };
}

export function buildTile<P>(kind: CoreKind, payload: P, options: TileBuildOptions = {}): TileEnvelope<P> {
  const body = deriveTileBody(kind, payload, options);
  const canonical = canonicalizeJson(body as unknown as JsonValue);

  return {
    ...body,
    canonical,
    cid: makeContentId(canonical),
    createdAt: options.createdAt ?? new Date('2026-04-13T00:00:00.000Z').toISOString()
  };
}

export function verifyTileIntegrity<P>(tile: TileEnvelope<P>): TileIntegrityResult {
  const body = deriveTileBody(tile.kind, tile.payload, {
    pack: tile.pack,
    parents: tile.parents,
    version: tile.version
  });
  const expectedCanonical = canonicalizeJson(body as unknown as JsonValue);
  const expectedCid = makeContentId(expectedCanonical);
  const errors: string[] = [];

  if (tile.canonical !== expectedCanonical) {
    errors.push('Tile canonical representation drifted from payload.');
  }

  if (tile.cid !== expectedCid) {
    errors.push('Tile CID no longer matches canonical payload.');
  }

  return {
    errors,
    expectedCanonical,
    expectedCid,
    ok: errors.length === 0
  };
}

export function createRun(summary: string, tags: string[] = ['bootstrap']): TileEnvelope<RunPayload> {
  return buildTile('rosetta.run', {
    runId: `run.${makeContentId(summary).slice(-12)}`,
    summary,
    tags
  });
}

export function createAction(runCid: string, intent: string): TileEnvelope<ActionPayload> {
  return buildTile(
    'rosetta.action',
    {
      actionId: `action.${makeContentId(intent).slice(-12)}`,
      intent,
      runCid
    },
    { parents: [runCid] }
  );
}

export function createToolCall(tool: string, args: Record<string, JsonValue>, parents: string[] = []): TileEnvelope<ToolCallPayload> {
  return buildTile(
    'rosetta.toolcall',
    {
      args,
      tool,
      toolCallId: `tool.${makeContentId(`${tool}:${canonicalizeJson(args)}`).slice(-12)}`
    },
    { pack: 'rosetta.tools', parents }
  );
}

export function createObservation(source: string, signal: string, parents: string[] = []): TileEnvelope<ObservationPayload> {
  return buildTile(
    'rosetta.observation',
    {
      observationId: `observation.${makeContentId(`${source}:${signal}`).slice(-12)}`,
      signal,
      source
    },
    { parents }
  );
}

export function createEvaluation(summary: string, verdict: EvaluationPayload['verdict'], parents: string[] = []): TileEnvelope<EvaluationPayload> {
  return buildTile(
    'rosetta.evaluation',
    {
      evaluationId: `evaluation.${makeContentId(`${summary}:${verdict}`).slice(-12)}`,
      summary,
      verdict
    },
    { parents }
  );
}

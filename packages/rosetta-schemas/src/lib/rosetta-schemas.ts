import { makeContentId } from '@entif-ai/rosetta-cid';
import type { TileEnvelope } from '@entif-ai/rosetta-core';

export interface ValidationResult {
  errors: string[];
  ok: boolean;
}

export const INTAKE_SOURCE_TYPES = [
  'magazine',
  'newsletter',
  'rss',
  'discord',
  'email',
  'manual',
  'google-alert'
] as const;

export type IntakeSourceType = (typeof INTAKE_SOURCE_TYPES)[number];

export interface IntakeEnvelopeReceipts {
  cost_usd?: number;
  item_hash: string;
  request_id?: string;
  runtime_ms?: number;
  tokens_used?: number;
}

export interface IntakeEnvelope {
  author?: string;
  content_pointer: string;
  item_url: string;
  published_at?: string;
  raw_excerpt: string;
  receipts: IntakeEnvelopeReceipts;
  retrieved_at: string;
  source_name: string;
  source_type: IntakeSourceType;
  title: string;
}

export interface IntakeEnvelopeInput extends Omit<IntakeEnvelope, 'item_url' | 'receipts'> {
  item_url: string;
  receipts?: Omit<IntakeEnvelopeReceipts, 'item_hash'> & { item_hash?: string };
}

export const INTAKE_ENVELOPE_SCHEMA = {
  $id: 'entif.intake-envelope.v1',
  additionalProperties: false,
  properties: {
    author: { type: 'string' },
    content_pointer: { type: 'string' },
    item_url: { type: 'string' },
    published_at: { type: 'string' },
    raw_excerpt: { type: 'string' },
    receipts: {
      additionalProperties: false,
      properties: {
        cost_usd: { type: 'number' },
        item_hash: { type: 'string' },
        request_id: { type: 'string' },
        runtime_ms: { type: 'number' },
        tokens_used: { type: 'number' }
      },
      required: ['item_hash'],
      type: 'object'
    },
    retrieved_at: { type: 'string' },
    source_name: { type: 'string' },
    source_type: { enum: [...INTAKE_SOURCE_TYPES] },
    title: { type: 'string' }
  },
  required: ['content_pointer', 'item_url', 'raw_excerpt', 'receipts', 'retrieved_at', 'source_name', 'source_type', 'title'],
  type: 'object'
} as const;

export interface ConformanceEntry {
  cid: string;
  conforms: boolean;
  errors: string[];
  kind: string;
}

export interface ConformanceBundle {
  bundleId: string;
  entries: ConformanceEntry[];
  shapeGraphCid: string;
  shapesTurtle: string;
  summary: {
    conforms: number;
    violations: number;
  };
}

const REQUIRED_FIELDS: Record<string, string[]> = {
  'guard.decision_token': ['action', 'effect', 'expiresAt', 'policyIds', 'reason', 'resource', 'tokenId'],
  'rosetta.action': ['actionId', 'intent', 'runCid'],
  'rosetta.evaluation': ['evaluationId', 'summary', 'verdict'],
  'rosetta.observation': ['observationId', 'signal', 'source'],
  'rosetta.receipt': ['claims', 'digests', 'receiptType', 'subjects'],
  'rosetta.run': ['runId', 'summary', 'tags'],
  'rosetta.tapestry': ['dynamicTail', 'requiredScope', 'stablePrefix', 'tapestries', 'tenant', 'totalTokens'],
  'rosetta.toolcall': ['args', 'tool', 'toolCallId'],
  'source.canonical_artifact': [
    'artifactId',
    'byteHash',
    'dedupe',
    'normalizedText',
    'normalizedTextHash',
    'pidFamily',
    'provenanceRefs',
    'rightsScopes',
    'sourceManifestationCid',
    'sourceRecordCid'
  ],
  'source.correction_event': ['eventKind', 'recordedAt', 'subjectCid', 'summary'],
  'source.evaluation_receipt': ['evaluatedAt', 'policyRefs', 'subjectCid', 'trustMatrixCid'],
  'source.episode': ['chronology', 'classification', 'episodeId', 'family', 'locator', 'mode', 'rawEvidenceRefs', 'rightsScope'],
  'source.fetch_receipt': ['fetchedAt', 'method', 'requestedLocator', 'resolvedLocator', 'snapshotHash', 'sourceManifestationCid'],
  'source.identity_resolution_receipt': ['confidence', 'entityType', 'evidenceSources', 'subjectCid'],
  'source.ingress_job': ['jobId', 'mode', 'parserProfile', 'policyRefs', 'sourceManifestationCid', 'sourceRecordCid', 'status'],
  'source.manifestation': ['accessRequirements', 'byteHashes', 'manifestationId', 'manifestationKind', 'mediaType', 'sourceRecordCid', 'structureProfile'],
  'source.normalization_receipt': ['canonicalTextHash', 'normalizationProfile', 'parserProfile', 'sourceManifestationCid'],
  'source.package': ['members', 'packageId', 'packageKind', 'profileRefs', 'sourceRecordCid'],
  'source.record': ['metadataBlob', 'publicationStatus', 'recordLocalId', 'recordType', 'sourceSystemId', 'stableLocators'],
  'source.registry_entry': ['defaultTrustClass', 'entryId', 'priorityTier', 'sourceSystemId'],
  'source.system_profile': ['canonicalName', 'capabilityFacets', 'curationPosture', 'evidenceRefs', 'rightsPosture', 'sourceRoles', 'sourceSystemId'],
  'source.trust_matrix': ['axes', 'notes', 'subjectCid', 'trustClass']
};

const REQUIRED_INTAKE_FIELDS = [
  'content_pointer',
  'item_url',
  'raw_excerpt',
  'receipts',
  'retrieved_at',
  'source_name',
  'source_type',
  'title'
] as const;

const TRACKING_QUERY_PARAMS = new Set([
  'fbclid',
  'gclid',
  'mc_cid',
  'mc_eid',
  'ref',
  'source',
  'utm_campaign',
  'utm_content',
  'utm_id',
  'utm_medium',
  'utm_name',
  'utm_source',
  'utm_term'
]);

export function validatePayload(kind: string, payload: object): ValidationResult {
  const errors = (REQUIRED_FIELDS[kind] ?? [])
    .filter((field) => !(field in payload))
    .map((field) => `Missing required field: ${field}`);

  return {
    errors,
    ok: errors.length === 0
  };
}

export function canonicalizeIntakeUrl(input: string): string {
  try {
    const url = new URL(input);

    for (const key of [...url.searchParams.keys()]) {
      if (TRACKING_QUERY_PARAMS.has(key)) {
        url.searchParams.delete(key);
      }
    }

    url.hash = '';
    return url.toString();
  } catch {
    return input;
  }
}

export function computeIntakeItemHash(input: {
  author?: string;
  item_url: string;
  published_at?: string;
  source_name: string;
  title: string;
}): string {
  return makeContentId(
    JSON.stringify({
      author: input.author ?? null,
      item_url: canonicalizeIntakeUrl(input.item_url),
      published_at: input.published_at ?? null,
      source_name: input.source_name,
      title: input.title
    })
  );
}

export function normalizeIntakeEnvelope(input: IntakeEnvelopeInput): IntakeEnvelope {
  const item_url = canonicalizeIntakeUrl(input.item_url);

  return {
    ...input,
    item_url,
    receipts: {
      ...input.receipts,
      item_hash:
        input.receipts?.item_hash ??
        computeIntakeItemHash({
          author: input.author,
          item_url,
          published_at: input.published_at,
          source_name: input.source_name,
          title: input.title
        })
    }
  };
}

export function validateIntakeEnvelope(
  payload: Partial<Omit<IntakeEnvelope, 'receipts' | 'source_type'>> & {
    receipts?: Partial<IntakeEnvelopeReceipts>;
    source_type?: string;
  }
): ValidationResult {
  const errors = REQUIRED_INTAKE_FIELDS
    .filter((field) => payload[field] === undefined || payload[field] === null || payload[field] === '')
    .map((field) => `Missing required field: ${field}`);

  if (payload.source_type && !INTAKE_SOURCE_TYPES.includes(payload.source_type as IntakeSourceType)) {
    errors.push(`Unsupported source_type: ${payload.source_type}`);
  }

  if (payload.receipts && !payload.receipts.item_hash) {
    errors.push('Missing required field: receipts.item_hash');
  }

  return {
    errors,
    ok: errors.length === 0
  };
}

export function emitShaclShapes(kinds = Object.keys(REQUIRED_FIELDS)): string {
  const lines = ['@prefix sh: <http://www.w3.org/ns/shacl#> .', '@prefix entif: <https://entif.ai/ns#> .', ''];

  for (const kind of kinds) {
    const required = REQUIRED_FIELDS[kind] ?? [];
    const shapeId = kind.replace(/[^a-zA-Z0-9]+/gu, '_');

    lines.push(`entif:${shapeId}Shape a sh:NodeShape ;`);
    lines.push(`  sh:message "${kind} must contain its required fields." ;`);
    required.forEach((field, index) => {
      const suffix = index === required.length - 1 ? '.' : ';';
      lines.push(`  sh:property [ sh:path entif:${field} ; sh:minCount 1 ] ${suffix}`);
    });
    lines.push('');
  }

  return lines.join('\n');
}

export function emitConformanceBundle(
  tiles: Array<Pick<TileEnvelope<object>, 'cid' | 'kind' | 'payload'>>,
  bundleId = 'entif.bootstrap.bundle'
): ConformanceBundle {
  const entries = tiles.map((tile) => {
    const validation = validatePayload(tile.kind, tile.payload);
    return {
      cid: tile.cid,
      conforms: validation.ok,
      errors: validation.errors,
      kind: tile.kind
    };
  });
  const shapesTurtle = emitShaclShapes([...new Set(tiles.map((tile) => tile.kind))]);

  return {
    bundleId,
    entries,
    shapeGraphCid: makeContentId(shapesTurtle),
    shapesTurtle,
    summary: {
      conforms: entries.filter((entry) => entry.conforms).length,
      violations: entries.filter((entry) => !entry.conforms).length
    }
  };
}

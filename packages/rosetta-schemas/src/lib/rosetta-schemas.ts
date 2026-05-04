import { makeContentId } from '@entif-ai/rosetta-cid';
import type { TileEnvelope } from '@entif-ai/rosetta-core';

export interface ValidationResult {
  errors: string[];
  ok: boolean;
}

export interface CompoundCacheKeyInput {
  dataClassification?: string;
  policyVersion?: string;
  rightsDomain?: string;
  semanticIntent?: string;
  sourceBundleHash?: string;
}

export interface CompoundCacheKey {
  dataClassification: string;
  lookupKey: string;
  policyVersion: string;
  rightsDomain: string;
  semanticIntent: string;
  sourceBundleHash: string;
}

export type CompoundCacheKeyDimension = keyof Omit<CompoundCacheKey, 'lookupKey'>;

export interface CompositionProviderSource {
  challengePath: string[];
  freshnessVerifiedAt: string;
  normalizedUserMetadataCid: string;
  providerId: string;
  providerResponseCid: string;
  providerResponseTimestamp: string;
  providerResponseVersion: string;
  rightsDecisionCid: string;
  subQueryReceiptCid: string;
}

export interface CompositionSourceAttribution {
  answerFragmentId: string;
  providerId: string;
  providerResponseCid: string;
}

export interface CompositionProvenanceInput {
  answerCid: string;
  composedAt: string;
  compositionLogic: string;
  compositionReceiptCid: string;
  providers: CompositionProviderSource[];
  recordId: string;
  sourceAttributions: CompositionSourceAttribution[];
}

export interface CompositionProvenanceRecord extends CompositionProvenanceInput {
  recordCid: string;
}

export interface CompositionTrace {
  answerFragmentId: string;
  challengePath: string[];
  providerId: string;
  providerResponseCid: string;
  subQueryReceiptCid: string;
}

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
  'rosetta.composition_provenance': [
    'answerCid',
    'composedAt',
    'compositionLogic',
    'compositionReceiptCid',
    'providers',
    'recordCid',
    'recordId',
    'sourceAttributions'
  ],
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

const COMPOUND_CACHE_KEY_DIMENSIONS = [
  'semanticIntent',
  'rightsDomain',
  'dataClassification',
  'policyVersion',
  'sourceBundleHash'
] as const satisfies readonly CompoundCacheKeyDimension[];

const COMPOUND_CACHE_KEY_LOOKUP_ORDER = [
  'dataClassification',
  'policyVersion',
  'rightsDomain',
  'semanticIntent',
  'sourceBundleHash'
] as const satisfies readonly CompoundCacheKeyDimension[];

const COMPOUND_CACHE_KEY_LOOKUP_NAMES: Record<CompoundCacheKeyDimension, string> = {
  dataClassification: 'data_classification',
  policyVersion: 'policy_version',
  rightsDomain: 'rights_domain',
  semanticIntent: 'semantic_intent',
  sourceBundleHash: 'source_bundle_hash'
};

const COMPOSITION_PROVIDER_REQUIRED_FIELDS = [
  'freshnessVerifiedAt',
  'normalizedUserMetadataCid',
  'providerId',
  'providerResponseCid',
  'providerResponseTimestamp',
  'providerResponseVersion',
  'rightsDecisionCid',
  'subQueryReceiptCid'
] as const satisfies ReadonlyArray<keyof CompositionProviderSource>;

const COMPOSITION_INPUT_REQUIRED_FIELDS = [
  'answerCid',
  'composedAt',
  'compositionLogic',
  'compositionReceiptCid',
  'providers',
  'recordId',
  'sourceAttributions'
] as const satisfies ReadonlyArray<keyof CompositionProvenanceInput>;

function requiredString(value: string | undefined): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function validatePayload(kind: string, payload: object): ValidationResult {
  const errors = (REQUIRED_FIELDS[kind] ?? [])
    .filter((field) => !(field in payload))
    .map((field) => `Missing required field: ${field}`);

  return {
    errors,
    ok: errors.length === 0
  };
}

export function validateCompoundCacheKey(input: CompoundCacheKeyInput): ValidationResult {
  const errors = COMPOUND_CACHE_KEY_DIMENSIONS.filter((dimension) => !requiredString(input[dimension])).map(
    (dimension) => `Missing required cache key dimension: ${dimension}`
  );

  return {
    errors,
    ok: errors.length === 0
  };
}

export function buildCompoundCacheKey(input: CompoundCacheKeyInput): CompoundCacheKey {
  const validation = validateCompoundCacheKey(input);
  if (!validation.ok) {
    throw new Error(validation.errors.join('; '));
  }

  const key = input as Required<CompoundCacheKeyInput>;
  const lookupKey = COMPOUND_CACHE_KEY_LOOKUP_ORDER.map((dimension) => {
    return `${COMPOUND_CACHE_KEY_LOOKUP_NAMES[dimension]}=${encodeURIComponent(key[dimension])}`;
  }).join('|');

  return {
    dataClassification: key.dataClassification,
    lookupKey: `cache-key-v1:${lookupKey}`,
    policyVersion: key.policyVersion,
    rightsDomain: key.rightsDomain,
    semanticIntent: key.semanticIntent,
    sourceBundleHash: key.sourceBundleHash
  };
}

export function changedCompoundCacheKeyDimensions(
  before: Pick<CompoundCacheKey, CompoundCacheKeyDimension>,
  after: Pick<CompoundCacheKey, CompoundCacheKeyDimension>
): CompoundCacheKeyDimension[] {
  return COMPOUND_CACHE_KEY_DIMENSIONS.filter((dimension) => before[dimension] !== after[dimension]);
}

export function validateCompositionProvenanceRecord(input: CompositionProvenanceInput): ValidationResult {
  const errors = COMPOSITION_INPUT_REQUIRED_FIELDS.filter((field) => !(field in input)).map(
    (field) => `Missing required field: ${field}`
  );

  if (input.providers.length === 0) {
    errors.push('Composition provenance must include at least one provider source.');
  }

  for (const provider of input.providers) {
    for (const field of COMPOSITION_PROVIDER_REQUIRED_FIELDS) {
      if (!provider[field]) {
        errors.push(`Provider ${provider.providerId || '<unknown>'} missing required field: ${field}`);
      }
    }
    if (provider.challengePath.length === 0) {
      errors.push(`Provider ${provider.providerId || '<unknown>'} must include a challengeability path.`);
    }
  }

  for (const attribution of input.sourceAttributions) {
    const provider = input.providers.find((candidate) => candidate.providerId === attribution.providerId);
    if (!provider) {
      errors.push(`Attribution ${attribution.answerFragmentId} references unknown provider: ${attribution.providerId}`);
    } else if (provider.providerResponseCid !== attribution.providerResponseCid) {
      errors.push(`Attribution ${attribution.answerFragmentId} provider response does not match provider source.`);
    }
  }

  return {
    errors,
    ok: errors.length === 0
  };
}

export function buildCompositionProvenanceRecord(input: CompositionProvenanceInput): CompositionProvenanceRecord {
  const validation = validateCompositionProvenanceRecord(input);
  if (!validation.ok) {
    throw new Error(validation.errors.join('; '));
  }

  const recordWithoutCid = {
    answerCid: input.answerCid,
    composedAt: input.composedAt,
    compositionLogic: input.compositionLogic,
    compositionReceiptCid: input.compositionReceiptCid,
    providers: input.providers,
    recordId: input.recordId,
    sourceAttributions: input.sourceAttributions
  };

  return {
    ...recordWithoutCid,
    recordCid: makeContentId(JSON.stringify(recordWithoutCid))
  };
}

export function traceCompositionSource(
  record: CompositionProvenanceRecord,
  answerFragmentId: string
): CompositionTrace | undefined {
  const attribution = record.sourceAttributions.find((candidate) => candidate.answerFragmentId === answerFragmentId);
  if (!attribution) {
    return undefined;
  }

  const provider = record.providers.find((candidate) => candidate.providerId === attribution.providerId);
  if (!provider) {
    return undefined;
  }

  return {
    answerFragmentId,
    challengePath: [...provider.challengePath],
    providerId: provider.providerId,
    providerResponseCid: provider.providerResponseCid,
    subQueryReceiptCid: provider.subQueryReceiptCid
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

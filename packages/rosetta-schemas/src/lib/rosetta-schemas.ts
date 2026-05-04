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

export interface TranslationEvidenceInput {
  evidenceRefs: string[];
  lineageRefs: string[];
  normalizationProfile: string;
  receiptBundleCid: string;
  sourceConceptRefs: string[];
  supersedesRefs: string[];
  targetConceptRefs: string[];
  tolerance: number;
  transport: number[][];
  validationProfile: string;
}

export interface TranslationEvidenceArtifact extends TranslationEvidenceInput {
  ambiguity: {
    entropy: number;
  };
  artifactCid: string;
}

export type PostmortemOutcomeClass = 'FAIL' | 'PARTIAL' | 'PASS';

export interface PostmortemRubricChange {
  dimension: string;
  proposedNewThreshold: number;
  scorecard: string;
}

export interface PostmortemEvolution {
  change: string;
  target: string;
  type: 'skill' | 'workflow';
}

export interface PostmortemArtifactInput {
  attachments?: string[];
  envelopeId: string;
  outcomeClass: PostmortemOutcomeClass;
  proposedEvolution?: PostmortemEvolution[];
  receiptChain: string[];
  reproductionSteps: string[];
  rootCause: string;
  stepId: string;
  suggestedRubricChanges?: PostmortemRubricChange[];
  timestamp: string;
  workflowId: string;
}

export interface PostmortemArtifact extends PostmortemArtifactInput {
  artifactCid: string;
  retention: {
    archive: 'cold';
    warmDays: 90;
  };
  review: {
    generatedBy: 'orchestrator';
    humanReviewRequired: boolean;
  };
}

export interface TranslationEvidenceValidation {
  composition: ValidationResult;
  numerical: ValidationResult;
  structural: ValidationResult;
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
  'entif.postmortem_artifact': [
    'artifactCid',
    'envelopeId',
    'outcomeClass',
    'receiptChain',
    'reproductionSteps',
    'retention',
    'review',
    'rootCause',
    'stepId',
    'timestamp',
    'workflowId'
  ],
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
  'rosetta.translation_evidence': [
    'ambiguity',
    'artifactCid',
    'evidenceRefs',
    'lineageRefs',
    'normalizationProfile',
    'receiptBundleCid',
    'sourceConceptRefs',
    'supersedesRefs',
    'targetConceptRefs',
    'tolerance',
    'transport',
    'validationProfile'
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

const TRANSLATION_EVIDENCE_REQUIRED_FIELDS = [
  'evidenceRefs',
  'lineageRefs',
  'normalizationProfile',
  'receiptBundleCid',
  'sourceConceptRefs',
  'supersedesRefs',
  'targetConceptRefs',
  'tolerance',
  'transport',
  'validationProfile'
] as const satisfies ReadonlyArray<keyof TranslationEvidenceInput>;

const POSTMORTEM_REQUIRED_FIELDS = [
  'envelopeId',
  'outcomeClass',
  'receiptChain',
  'reproductionSteps',
  'rootCause',
  'stepId',
  'timestamp',
  'workflowId'
] as const satisfies ReadonlyArray<keyof PostmortemArtifactInput>;

function requiredString(value: string | undefined): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isIsoTimestamp(value: string): boolean {
  return !Number.isNaN(Date.parse(value)) && value.includes('T');
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

export function validatePostmortemArtifact(input: PostmortemArtifactInput): ValidationResult {
  const errors = POSTMORTEM_REQUIRED_FIELDS.filter((field) => !(field in input)).map(
    (field) => `Missing required field: ${field}`
  );

  if (input.outcomeClass !== 'FAIL' && input.outcomeClass !== 'PARTIAL' && input.outcomeClass !== 'PASS') {
    errors.push('Postmortem outcomeClass must be PASS, FAIL, or PARTIAL.');
  }
  if (!requiredString(input.rootCause)) {
    errors.push('Postmortem rootCause is required.');
  }
  if (!Array.isArray(input.reproductionSteps) || input.reproductionSteps.length === 0) {
    errors.push('Postmortem reproductionSteps must include at least one step.');
  }
  if (!Array.isArray(input.receiptChain) || input.receiptChain.length === 0) {
    errors.push('Postmortem receiptChain must include at least one receipt id.');
  }
  if (!requiredString(input.timestamp) || !isIsoTimestamp(input.timestamp)) {
    errors.push('Postmortem timestamp must be an ISO-8601 timestamp.');
  }

  return {
    errors,
    ok: errors.length === 0
  };
}

export function shouldGeneratePostmortem(outcomeClass: PostmortemOutcomeClass): boolean {
  return outcomeClass === 'FAIL' || outcomeClass === 'PARTIAL';
}

export function buildPostmortemArtifact(input: PostmortemArtifactInput): PostmortemArtifact {
  const validation = validatePostmortemArtifact(input);
  if (!validation.ok) {
    throw new Error(validation.errors.join('; '));
  }

  const artifactWithoutCid = {
    attachments: input.attachments ?? [],
    envelopeId: input.envelopeId,
    outcomeClass: input.outcomeClass,
    proposedEvolution: input.proposedEvolution ?? [],
    receiptChain: input.receiptChain,
    reproductionSteps: input.reproductionSteps,
    retention: {
      archive: 'cold' as const,
      warmDays: 90 as const
    },
    review: {
      generatedBy: 'orchestrator' as const,
      humanReviewRequired: input.outcomeClass === 'FAIL'
    },
    rootCause: input.rootCause,
    stepId: input.stepId,
    suggestedRubricChanges: input.suggestedRubricChanges ?? [],
    timestamp: input.timestamp,
    workflowId: input.workflowId
  };

  return {
    ...artifactWithoutCid,
    artifactCid: makeContentId(JSON.stringify(artifactWithoutCid))
  };
}

function sum(values: number[]): number {
  return values.reduce((total, value) => total + value, 0);
}

function differsFromOne(value: number, tolerance: number): boolean {
  return Math.abs(value - 1) > tolerance;
}

function computeTransportEntropy(transport: number[][]): number {
  const masses = transport.flat().filter((entry) => entry > 0);
  return -masses.reduce((entropy, mass) => entropy + mass * Math.log2(mass), 0);
}

export function validateTranslationEvidence(input: TranslationEvidenceInput): TranslationEvidenceValidation {
  const structuralErrors = TRANSLATION_EVIDENCE_REQUIRED_FIELDS.filter((field) => !(field in input)).map(
    (field) => `Missing required field: ${field}`
  );
  if (input.transport.length !== input.sourceConceptRefs.length) {
    structuralErrors.push('Transport row count must match source concept refs.');
  }
  if (input.transport.some((row) => row.length !== input.targetConceptRefs.length)) {
    structuralErrors.push('Each transport row must match target concept refs.');
  }

  const numericalErrors: string[] = [];
  input.transport.forEach((row, rowIndex) => {
    row.forEach((entry, columnIndex) => {
      if (entry < 0) {
        numericalErrors.push(`Transport entry [${rowIndex},${columnIndex}] must be nonnegative.`);
      }
    });
    const rowMass = sum(row);
    if (differsFromOne(rowMass, input.tolerance)) {
      numericalErrors.push(`Row ${rowIndex} mass ${rowMass} differs from 1 by more than tolerance ${input.tolerance}.`);
    }
  });

  for (let columnIndex = 0; columnIndex < input.targetConceptRefs.length; columnIndex += 1) {
    const columnMass = sum(input.transport.map((row) => row[columnIndex] ?? 0));
    if (differsFromOne(columnMass, input.tolerance)) {
      numericalErrors.push(`Column ${columnIndex} mass ${columnMass} differs from 1 by more than tolerance ${input.tolerance}.`);
    }
  }

  const numerical = {
    errors: numericalErrors,
    ok: numericalErrors.length === 0
  };

  return {
    composition: numerical,
    numerical,
    structural: {
      errors: structuralErrors,
      ok: structuralErrors.length === 0
    }
  };
}

export function buildTranslationEvidence(input: TranslationEvidenceInput): TranslationEvidenceArtifact {
  const validation = validateTranslationEvidence(input);
  const errors = [...validation.structural.errors, ...validation.numerical.errors];
  if (errors.length > 0) {
    throw new Error(errors.join('; '));
  }

  const artifactWithoutCid = {
    ...input,
    ambiguity: {
      entropy: computeTransportEntropy(input.transport)
    }
  };

  return {
    ...artifactWithoutCid,
    artifactCid: makeContentId(JSON.stringify(artifactWithoutCid))
  };
}

export function composeTranslationEvidence(
  first: TranslationEvidenceArtifact,
  second: TranslationEvidenceArtifact
): TranslationEvidenceArtifact {
  if (first.targetConceptRefs.join('\0') !== second.sourceConceptRefs.join('\0')) {
    throw new Error('TranslationEvidence composition requires first targets to match second sources.');
  }

  const transport = first.transport.map((firstRow) =>
    second.targetConceptRefs.map((_, targetColumnIndex) =>
      sum(firstRow.map((firstMass, midIndex) => firstMass * second.transport[midIndex][targetColumnIndex]))
    )
  );

  return buildTranslationEvidence({
    evidenceRefs: [...new Set([...first.evidenceRefs, ...second.evidenceRefs])],
    lineageRefs: [first.artifactCid, second.artifactCid],
    normalizationProfile: first.normalizationProfile,
    receiptBundleCid: first.receiptBundleCid,
    sourceConceptRefs: [...first.sourceConceptRefs],
    supersedesRefs: [],
    targetConceptRefs: [...second.targetConceptRefs],
    tolerance: Math.max(first.tolerance, second.tolerance),
    transport,
    validationProfile: first.validationProfile
  });
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

import { makeContentId } from '@entif-ai/rosetta-cid';
import { splitSentences } from '@entif-ai/rosetta-canon';
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

export type IntakeSourceType = 'discord' | 'email' | 'google-alert' | 'magazine' | 'manual' | 'newsletter' | 'rss';

export type DomainClassification = 'public' | 'internal' | 'confidential' | 'restricted';

export interface DomainLabel {
  key: string;
  value: string;
}

export interface DomainRefInput {
  abacLabels?: DomainLabel[] | Record<string, string>;
  classification: string;
  tenantId: string;
  vendorRoute?: string;
}

export interface DomainRef {
  abacLabels: DomainLabel[];
  classification: DomainClassification;
  tenantId: string;
  vendorRoute?: string;
}

export type DomainCompareReason =
  | 'CLASSIFICATION_WIDENING'
  | 'CROSS_DOMAIN_BRIDGE_AUTHORIZED'
  | 'CROSS_DOMAIN_REUSE_DENIED'
  | 'TENANT_MISMATCH'
  | 'VENDOR_ROUTE_MISMATCH'
  | `ABAC_LABEL_MISSING:${string}`;

export interface DomainCompareOptions {
  bridgePolicyRef?: string;
}

export interface DomainCompareResult {
  ok: boolean;
  reasons: DomainCompareReason[];
}

export interface IntakeEnvelopeReceipts {
  costUsd?: number;
  itemHash?: string;
  requestId?: string;
  runtimeMs?: number;
  tokensUsed?: number;
}

export interface IntakeEnvelopeInput {
  author?: string;
  contentPointer: string;
  itemUrl: string;
  publishedAt?: string;
  rawExcerpt: string;
  receipts?: IntakeEnvelopeReceipts;
  retrievedAt: string;
  sourceName: string;
  sourceType: IntakeSourceType;
  title: string;
}

export interface IntakeEnvelope extends IntakeEnvelopeInput {
  itemUrl: string;
  normalized: {
    highSignalImperatives: string[];
  };
  receipts: IntakeEnvelopeReceipts & {
    itemHash: string;
  };
}

export interface DailyTopShelfActionItem {
  action: string;
  source: string;
  title: string;
  why: string;
}

export interface DailyTopShelfStoreItem {
  source: string;
  title: string;
  why: string;
}

export interface DailyTopShelfDecisionChange {
  decision: string;
  source: string;
  title: string;
  why: string;
}

export interface DailyTopShelfRisk {
  source: string;
  title: string;
  watch: string;
  why: string;
}

export interface DailyTopShelfSlots {
  actThisWeek: DailyTopShelfActionItem[];
  designDecisionChange: DailyTopShelfDecisionChange;
  riskToTrack: DailyTopShelfRisk;
  storeForLater: DailyTopShelfStoreItem[];
}

export interface DailyTopShelfDigestInput {
  date: string;
  deliveredTo?: string;
  escalated?: DailyTopShelfActionItem[];
  generatedAt: string;
  slots: DailyTopShelfSlots;
}

export interface DailyTopShelfDigest extends DailyTopShelfDigestInput {
  artifactCid: string;
  artifactName: string;
  escalated: DailyTopShelfActionItem[];
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
  'entif.intake_envelope': [
    'contentPointer',
    'itemUrl',
    'normalized',
    'rawExcerpt',
    'receipts',
    'retrievedAt',
    'sourceName',
    'sourceType',
    'title'
  ],
  'entif.daily_top_shelf_digest': ['artifactCid', 'artifactName', 'date', 'escalated', 'generatedAt', 'slots'],
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
  'rosetta.receipt': ['claims', 'digests', 'policyRefs', 'receiptType', 'subjects'],
  'rosetta.run': ['runId', 'summary', 'tags'],
  'rosetta.tapestry': ['dynamicTail', 'requiredScope', 'stablePrefix', 'tapestries', 'tenant', 'totalTokens'],
  'rosetta.toolcall': ['args', 'tool', 'toolCallId'],
  'source.canonical_artifact': [
    'artifactId',
    'byteHash',
    'contentFingerprint',
    'dedupe',
    'normalizedText',
    'normalizedTextHash',
    'pidFamily',
    'provenanceRefs',
    'revisionFingerprint',
    'rightsScopes',
    'sourceManifestationCid',
    'sourceRecordCid'
  ],
  'source.correction_event': ['eventKind', 'recordedAt', 'subjectCid', 'summary'],
  'source.derived_artifact': ['artifactId', 'derivationKind', 'payloadText', 'sourceObservationCid', 'sourceSpans'],
  'source.evaluation_receipt': ['evaluatedAt', 'policyRefs', 'subjectCid', 'trustMatrixCid'],
  'source.episode': ['chronology', 'classification', 'episodeId', 'family', 'locator', 'mode', 'rawEvidenceRefs', 'rightsScope'],
  'source.fetch_receipt': ['fetchedAt', 'method', 'requestedLocator', 'resolvedLocator', 'snapshotHash', 'sourceManifestationCid'],
  'source.identity_resolution_receipt': ['confidence', 'entityType', 'evidenceSources', 'subjectCid'],
  'source.ingress_job': ['jobId', 'mode', 'parserProfile', 'policyRefs', 'sourceManifestationCid', 'sourceRecordCid', 'status'],
  'source.manifestation': ['accessRequirements', 'byteHashes', 'manifestationId', 'manifestationKind', 'mediaType', 'sourceRecordCid', 'structureProfile'],
  'source.normalization_receipt': [
    'canonicalTextHash',
    'contentFingerprint',
    'normalizationProfile',
    'parserProfile',
    'revisionFingerprint',
    'sourceManifestationCid'
  ],
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

const DOMAIN_CLASSIFICATION_RANK: Record<DomainClassification, number> = {
  public: 0,
  internal: 1,
  confidential: 2,
  restricted: 3
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

const INTAKE_ENVELOPE_REQUIRED_FIELDS = [
  'contentPointer',
  'itemUrl',
  'rawExcerpt',
  'retrievedAt',
  'sourceName',
  'sourceType',
  'title'
] as const satisfies ReadonlyArray<keyof IntakeEnvelopeInput>;

const DAILY_TOP_SHELF_REQUIRED_FIELDS = ['date', 'generatedAt', 'slots'] as const satisfies ReadonlyArray<keyof DailyTopShelfDigestInput>;

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

function normalizeToken(value: string): string {
  return value.trim().toLowerCase();
}

function isDomainClassification(value: string): value is DomainClassification {
  return value in DOMAIN_CLASSIFICATION_RANK;
}

function normalizeLabels(labels: DomainRefInput['abacLabels']): DomainLabel[] {
  const entries = Array.isArray(labels) ? labels : Object.entries(labels ?? {}).map(([key, value]) => ({ key, value }));
  const normalized = entries.map((label) => ({
    key: normalizeToken(label.key),
    value: normalizeToken(label.value)
  }));
  const deduped = new Map(normalized.map((label) => [`${label.key}=${label.value}`, label]));

  return [...deduped.values()].sort((left, right) => {
    const leftKey = `${left.key}=${left.value}`;
    const rightKey = `${right.key}=${right.value}`;
    return leftKey.localeCompare(rightKey);
  });
}

function isIsoTimestamp(value: string): boolean {
  return !Number.isNaN(Date.parse(value)) && value.includes('T');
}

function isUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function canonicalizeItemUrl(itemUrl: string): string {
  const url = new URL(itemUrl);
  const trackingParams = ['fbclid', 'gclid', 'mc_cid', 'mc_eid'];

  for (const key of [...url.searchParams.keys()]) {
    if (key.startsWith('utm_') || trackingParams.includes(key)) {
      url.searchParams.delete(key);
    }
  }

  url.hash = '';
  return url.toString();
}

function extractHighSignalImperatives(text: string): string[] {
  const imperativeStarters = new Set(['add', 'build', 'check', 'consider', 'create', 'do', 'implement', 'make', 'read', 'run', 'use']);

  return text
    .split(/\n+/u)
    .flatMap((line) => splitSentences(line))
    .map((sentence) => sentence.trim())
    .filter((sentence) => {
      const firstWord = sentence.match(/^[A-Za-z]+/u)?.[0].toLowerCase();
      return firstWord ? imperativeStarters.has(firstWord) : false;
    });
}

function validateReceiptPayload(payload: object, errors: string[]): void {
  const receipt = payload as Record<string, unknown>;
  const claims = Array.isArray(receipt.claims) ? receipt.claims : [];
  const digests = Array.isArray(receipt.digests) ? receipt.digests : [];

  claims.forEach((claim, claimIndex) => {
    if (!isRecord(claim)) {
      errors.push(`Receipt claim ${claimIndex} must be an object.`);
      return;
    }

    const evidence = Array.isArray(claim.evidence) ? claim.evidence : [];
    evidence.forEach((entry, evidenceIndex) => {
      if (!isRecord(entry) || !requiredString(entry.cid as string | undefined)) {
        errors.push(`Receipt claim ${claimIndex} evidence ${evidenceIndex} missing required field: cid`);
      }
    });
  });

  digests.forEach((digest, digestIndex) => {
    if (!isRecord(digest)) {
      errors.push(`Receipt digest ${digestIndex} must be an object.`);
      return;
    }

    for (const field of ['alg', 'digest', 'of']) {
      if (!requiredString(digest[field] as string | undefined)) {
        errors.push(`Receipt digest ${digestIndex} missing required field: ${field}`);
      }
    }
  });
}

function validateCanonicalArtifactPayload(payload: object, errors: string[]): void {
  const artifact = payload as Record<string, unknown>;
  const rightsScopes = artifact.rightsScopes;
  const provenanceRefs = artifact.provenanceRefs;

  if (!Array.isArray(rightsScopes) || rightsScopes.length === 0) {
    errors.push('source.canonical_artifact rightsScopes must include at least one scope.');
  }

  if (!isRecord(provenanceRefs)) {
    errors.push('source.canonical_artifact provenanceRefs must be an object.');
    return;
  }

  for (const field of ['evaluationReceiptCid', 'fetchReceiptCid', 'normalizationReceiptCid']) {
    if (!requiredString(provenanceRefs[field] as string | undefined)) {
      errors.push(`source.canonical_artifact provenanceRefs missing required field: ${field}`);
    }
  }
}

function validateSourceSpanRefs(kind: string, sourceSpans: unknown, errors: string[]): void {
  if (!Array.isArray(sourceSpans) || sourceSpans.length === 0) {
    errors.push(`${kind} sourceSpans must include at least one span.`);
    return;
  }

  sourceSpans.forEach((span, index) => {
    if (!isRecord(span)) {
      errors.push(`${kind} sourceSpans ${index} must be an object.`);
      return;
    }

    for (const field of ['endOffset', 'sourceManifestationCid', 'sourceRecordCid', 'startOffset', 'textHash']) {
      if (!(field in span)) {
        errors.push(`${kind} sourceSpans ${index} missing required field: ${field}`);
      }
    }
  });
}

function validateDerivedArtifactPayload(payload: object, errors: string[]): void {
  const artifact = payload as Record<string, unknown>;
  if (artifact.derivationKind !== 'summary' && artifact.derivationKind !== 'extract') {
    errors.push('source.derived_artifact derivationKind must be summary or extract.');
  }

  validateSourceSpanRefs('source.derived_artifact', artifact.sourceSpans, errors);
}

export function validatePayload(kind: string, payload: object): ValidationResult {
  const errors = (REQUIRED_FIELDS[kind] ?? [])
    .filter((field) => !(field in payload))
    .map((field) => `Missing required field: ${field}`);

  if (kind === 'rosetta.receipt') {
    validateReceiptPayload(payload, errors);
  } else if (kind === 'source.canonical_artifact') {
    validateCanonicalArtifactPayload(payload, errors);
  } else if (kind === 'source.derived_artifact') {
    validateDerivedArtifactPayload(payload, errors);
  }

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

export function normalizeDomainRef(input: DomainRefInput): DomainRef {
  const classification = normalizeToken(input.classification);
  if (!isDomainClassification(classification)) {
    throw new Error(`Unsupported domain_ref classification: ${input.classification}`);
  }

  return {
    abacLabels: normalizeLabels(input.abacLabels),
    classification,
    tenantId: normalizeToken(input.tenantId),
    ...(input.vendorRoute === undefined ? {} : { vendorRoute: normalizeToken(input.vendorRoute) })
  };
}

export function validateDomainRef(input: DomainRefInput | DomainRef): ValidationResult {
  const errors: string[] = [];
  const tenantId = input.tenantId;
  const classification = normalizeToken(input.classification);

  if (!requiredString(tenantId)) {
    errors.push('domain_ref.tenantId is required.');
  }
  if (!isDomainClassification(classification)) {
    errors.push(`domain_ref.classification must be one of: ${Object.keys(DOMAIN_CLASSIFICATION_RANK).join(', ')}.`);
  }

  for (const label of normalizeLabels(input.abacLabels)) {
    if (!requiredString(label.key) || !requiredString(label.value)) {
      errors.push('domain_ref.abacLabels entries must include key and value.');
      break;
    }
  }

  return {
    errors,
    ok: errors.length === 0
  };
}

export function compareDomainRefs(
  authorization: DomainRefInput | DomainRef,
  request: DomainRefInput | DomainRef,
  options: DomainCompareOptions = {}
): DomainCompareResult {
  const authorized = normalizeDomainRef(authorization);
  const requested = normalizeDomainRef(request);
  const reasons: DomainCompareReason[] = [];

  if (authorized.tenantId !== requested.tenantId) {
    reasons.push('TENANT_MISMATCH');
  }
  if (DOMAIN_CLASSIFICATION_RANK[authorized.classification] < DOMAIN_CLASSIFICATION_RANK[requested.classification]) {
    reasons.push('CLASSIFICATION_WIDENING');
  }

  const authorizedLabels = new Set(authorized.abacLabels.map((label) => `${label.key}=${label.value}`));
  for (const label of requested.abacLabels) {
    const labelKey = `${label.key}=${label.value}`;
    if (!authorizedLabels.has(labelKey)) {
      reasons.push(`ABAC_LABEL_MISSING:${labelKey}`);
    }
  }

  if ((authorized.vendorRoute ?? requested.vendorRoute) !== undefined && authorized.vendorRoute !== requested.vendorRoute) {
    reasons.push('VENDOR_ROUTE_MISMATCH');
  }

  if (reasons.length > 0 && options.bridgePolicyRef) {
    return {
      ok: true,
      reasons: ['CROSS_DOMAIN_BRIDGE_AUTHORIZED']
    };
  }
  if (reasons.length > 0) {
    reasons.push('CROSS_DOMAIN_REUSE_DENIED');
  }

  return {
    ok: reasons.length === 0,
    reasons
  };
}

export function validateIntakeEnvelope(input: IntakeEnvelopeInput): ValidationResult {
  const errors = INTAKE_ENVELOPE_REQUIRED_FIELDS.filter((field) => !(field in input)).map(
    (field) => `Missing required field: ${field}`
  );

  if (!requiredString(input.contentPointer)) {
    errors.push('IntakeEnvelope contentPointer is required even when full-text fetch fails.');
  }
  if (!input.receipts?.itemHash) {
    errors.push('IntakeEnvelope receipts.itemHash is required.');
  }
  if (!requiredString(input.itemUrl) || !isUrl(input.itemUrl)) {
    errors.push('IntakeEnvelope itemUrl must be a URL.');
  }
  if (!requiredString(input.retrievedAt) || !isIsoTimestamp(input.retrievedAt)) {
    errors.push('IntakeEnvelope retrievedAt must be an ISO-8601 timestamp.');
  }
  if (input.publishedAt && !isIsoTimestamp(input.publishedAt)) {
    errors.push('IntakeEnvelope publishedAt must be an ISO-8601 timestamp.');
  }

  return {
    errors,
    ok: errors.length === 0
  };
}

export function buildIntakeEnvelope(input: IntakeEnvelopeInput): IntakeEnvelope {
  const itemUrl = canonicalizeItemUrl(input.itemUrl);
  const itemHash =
    input.receipts?.itemHash ??
    makeContentId(
      JSON.stringify({
        author: input.author ?? '',
        itemUrl,
        publishedAt: input.publishedAt ?? '',
        sourceName: input.sourceName,
        title: input.title
      })
    );
  const envelope = {
    ...input,
    itemUrl,
    normalized: {
      highSignalImperatives: extractHighSignalImperatives(input.rawExcerpt)
    },
    receipts: {
      ...input.receipts,
      itemHash
    }
  };
  const validation = validateIntakeEnvelope(envelope);
  if (!validation.ok) {
    throw new Error(validation.errors.join('; '));
  }

  return envelope;
}

function hasText(value: string): boolean {
  return value.trim().length > 0;
}

function validateActionItem(item: DailyTopShelfActionItem, label: string, errors: string[]): void {
  if (!hasText(item.why) || !hasText(item.action)) {
    errors.push(`${label} must include why and action.`);
  }
  if (!hasText(item.title) || !hasText(item.source)) {
    errors.push(`${label} must include title and source.`);
  }
}

function validateStoreItem(item: DailyTopShelfStoreItem, label: string, errors: string[]): void {
  if (!hasText(item.title) || !hasText(item.source) || !hasText(item.why)) {
    errors.push(`${label} must include title, source, and why.`);
  }
}

export function validateDailyTopShelfDigest(
  input: DailyTopShelfDigestInput & Partial<Pick<DailyTopShelfDigest, 'artifactCid' | 'artifactName'>>
): ValidationResult {
  const errors = DAILY_TOP_SHELF_REQUIRED_FIELDS.filter((field) => !(field in input)).map(
    (field) => `Missing required field: ${field}`
  );

  if (!/^\d{4}-\d{2}-\d{2}$/u.test(input.date)) {
    errors.push('DailyTopShelfDigest date must use YYYY-MM-DD.');
  }
  if (!requiredString(input.generatedAt) || !isIsoTimestamp(input.generatedAt)) {
    errors.push('DailyTopShelfDigest generatedAt must be an ISO-8601 timestamp.');
  }
  if (input.slots.actThisWeek.length !== 3) {
    errors.push('DailyTopShelfDigest must include exactly 3 actThisWeek items.');
  }
  if (input.slots.storeForLater.length !== 2) {
    errors.push('DailyTopShelfDigest must include exactly 2 storeForLater items.');
  }

  input.slots.actThisWeek.forEach((item, index) => validateActionItem(item, `Act item ${index}`, errors));
  input.slots.storeForLater.forEach((item, index) => validateStoreItem(item, `Store item ${index}`, errors));
  (input.escalated ?? []).forEach((item, index) => validateActionItem(item, `Escalated item ${index}`, errors));

  if (!hasText(input.slots.designDecisionChange.decision)) {
    errors.push('Design decision change must name the changed decision.');
  }
  validateStoreItem(input.slots.designDecisionChange, 'Design decision change', errors);

  if (!hasText(input.slots.riskToTrack.watch)) {
    errors.push('Risk to track must identify what is being watched.');
  }
  validateStoreItem(input.slots.riskToTrack, 'Risk to track', errors);

  return {
    errors,
    ok: errors.length === 0
  };
}

export function buildDailyTopShelfDigest(input: DailyTopShelfDigestInput): DailyTopShelfDigest {
  const validation = validateDailyTopShelfDigest(input);
  if (!validation.ok) {
    throw new Error(validation.errors.join('; '));
  }

  const artifactName = `daily-top-shelf-${input.date}`;
  const digestWithoutCid = {
    ...input,
    artifactName,
    escalated: input.escalated ?? []
  };

  return {
    ...digestWithoutCid,
    artifactCid: makeContentId(JSON.stringify(digestWithoutCid))
  };
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

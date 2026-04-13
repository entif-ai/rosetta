import { normalizePlainText } from '@entif-ai/rosetta-canon';
import { sha256Hex } from '@entif-ai/rosetta-cid';
import { buildTile, createAction, createEvaluation, createObservation, createRun, createToolCall, type TileEnvelope } from '@entif-ai/rosetta-core';
import { buildReceiptBundle, createReceipt, createSigningKeyPair, digestTile, signReceiptEd25519, type ReceiptPayload } from '@entif-ai/rosetta-receipts';
import { emitConformanceBundle } from '@entif-ai/rosetta-schemas';
import { compileReceiptBundleTapestry } from '@entif-ai/rosetta-tapestry';
import {
  createSourceRecordTile,
  createSourceManifestationTile,
  createSourceSystemProfileTile,
  createTrustMatrixTile,
  type SourceManifestation,
  type SourceRecord,
  type TrustMatrix
} from '@entif-ai/source-substrate';
import { bootstrapSourceProfiles } from '@entif-ai/source-registry';

export interface IngressJob {
  jobId: string;
  sourceRecordCid: string;
  sourceManifestationCid: string;
  parserProfile: string;
  policyRefs: string[];
  mode: 'parse-only';
  status: 'evaluated' | 'normalized' | 'parsed';
}

export interface FetchReceiptPayload {
  requestedLocator: string;
  resolvedLocator: string;
  fetchedAt: string;
  method: string;
  snapshotHash: string;
  sourceManifestationCid: string;
}

export interface NormalizationReceiptPayload {
  sourceManifestationCid: string;
  parserProfile: string;
  normalizationProfile: string;
  canonicalTextHash: string;
}

export interface EvaluationReceiptPayload {
  subjectCid: string;
  trustMatrixCid: string;
  evaluatedAt: string;
  policyRefs: string[];
}

export interface CanonicalArtifact {
  artifactId: string;
  sourceRecordCid: string;
  sourceManifestationCid: string;
  byteHash: string;
  normalizedText: string;
  normalizedTextHash: string;
  pidFamily: string[];
  rightsScopes: string[];
  provenanceRefs: {
    evaluationReceiptCid: string;
    fetchReceiptCid: string;
    normalizationReceiptCid: string;
  };
  dedupe: {
    byteIdentityKey: string;
    conceptualClusterKey: string;
    manifestationKey: string;
    recordFamilyKey: string;
  };
  revisionParentCid?: string;
}

export interface BootstrapDemoSnapshot {
  action: TileEnvelope;
  canonicalArtifact: TileEnvelope<CanonicalArtifact>;
  conformanceBundle: ReturnType<typeof emitConformanceBundle>;
  evaluation: TileEnvelope;
  evaluationReceipt: TileEnvelope<EvaluationReceiptPayload>;
  fetchReceipt: TileEnvelope<FetchReceiptPayload>;
  manifestation: TileEnvelope<SourceManifestation>;
  normalizationReceipt: TileEnvelope<NormalizationReceiptPayload>;
  observation: TileEnvelope;
  policyTile: TileEnvelope;
  receipt: TileEnvelope<ReceiptPayload>;
  receiptBundle: ReturnType<typeof buildReceiptBundle>;
  record: TileEnvelope<SourceRecord>;
  run: TileEnvelope;
  signedReceipt: ReturnType<typeof signReceiptEd25519>;
  sourceSystem: TileEnvelope;
  tapestry: TileEnvelope;
  toolCall: TileEnvelope;
  trustMatrix: TileEnvelope<TrustMatrix>;
}

function defaultTrustAxes() {
  return {
    affiliation: 0.8,
    artifactIntegrity: 0.9,
    authorship: 0.7,
    correctionResponsiveness: 0.7,
    corroborationDensity: 0.6,
    invalidationSensitivity: 0.5,
    licenseClarity: 0.8,
    manipulationRisk: 0.2,
    metadataRichness: 0.9,
    novelty: 0.4,
    rarity: 0.3,
    recordIdentity: 0.85,
    reviewRigor: 0.6,
    stewardship: 0.85
  };
}

export function createIngressJob(sourceRecordCid: string, sourceManifestationCid: string): TileEnvelope<IngressJob> {
  return buildTile(
    'source.ingress_job',
    {
      jobId: `job.${sourceRecordCid.slice(-8)}.${sourceManifestationCid.slice(-8)}`,
      mode: 'parse-only',
      parserProfile: 'text/plain@v1',
      policyRefs: ['policy.parse-only.default'],
      sourceManifestationCid,
      sourceRecordCid,
      status: 'parsed'
    },
    { pack: 'ingress-refinery' }
  );
}

export function refineTextArtifact(
  record: TileEnvelope<SourceRecord>,
  manifestation: TileEnvelope<SourceManifestation>,
  rawText: string,
  policyRefs: string[] = ['policy.parse-only.default']
): {
  canonicalArtifact: TileEnvelope<CanonicalArtifact>;
  evaluationReceipt: TileEnvelope<EvaluationReceiptPayload>;
  fetchReceipt: TileEnvelope<FetchReceiptPayload>;
  normalizationReceipt: TileEnvelope<NormalizationReceiptPayload>;
  trustMatrix: TileEnvelope<TrustMatrix>;
} {
  const normalizedText = normalizePlainText(rawText);
  const byteHash = sha256Hex(rawText);
  const normalizedTextHash = sha256Hex(normalizedText);
  const fetchReceipt = buildTile(
    'source.fetch_receipt',
    {
      fetchedAt: new Date('2026-04-13T00:15:00.000Z').toISOString(),
      method: 'bootstrap-import',
      requestedLocator: manifestation.payload.fetchableUrl ?? record.payload.stableLocators[0] ?? 'local://unknown',
      resolvedLocator: manifestation.payload.fetchableUrl ?? record.payload.stableLocators[0] ?? 'local://unknown',
      snapshotHash: byteHash,
      sourceManifestationCid: manifestation.cid
    },
    { pack: 'ingress-refinery', parents: [manifestation.cid] }
  );
  const normalizationReceipt = buildTile(
    'source.normalization_receipt',
    {
      canonicalTextHash: normalizedTextHash,
      normalizationProfile: 'plain-text-collapse-v1',
      parserProfile: 'text/plain@v1',
      sourceManifestationCid: manifestation.cid
    },
    { pack: 'ingress-refinery', parents: [fetchReceipt.cid] }
  );
  const trustMatrix = createTrustMatrixTile(
    {
      axes: defaultTrustAxes(),
      notes: ['Trust remains multi-axis; repository confidence is not authorship proof.'],
      subjectCid: manifestation.cid,
      trustClass: 'repository'
    },
    [record.cid, manifestation.cid]
  );
  const evaluationReceipt = buildTile(
    'source.evaluation_receipt',
    {
      evaluatedAt: new Date('2026-04-13T00:20:00.000Z').toISOString(),
      policyRefs,
      subjectCid: manifestation.cid,
      trustMatrixCid: trustMatrix.cid
    },
    { pack: 'ingress-refinery', parents: [trustMatrix.cid] }
  );
  const identifiers = Object.values(record.payload.metadataBlob)
    .flatMap((value) => (Array.isArray(value) ? value : [value]))
    .filter((value): value is string => typeof value === 'string' && /^(10\.|orcid:|ror:|swh:)/u.test(value));

  const canonicalArtifact = buildTile(
    'source.canonical_artifact',
    {
      artifactId: `artifact.${manifestation.payload.manifestationId}`,
      byteHash,
      dedupe: {
        byteIdentityKey: byteHash,
        conceptualClusterKey: normalizePlainText(String(record.payload.metadataBlob.title ?? record.payload.recordLocalId)).toLowerCase(),
        manifestationKey: sha256Hex(`${record.cid}:${manifestation.payload.manifestationKind}:${manifestation.payload.mediaType}`),
        recordFamilyKey: sha256Hex(`${record.payload.sourceSystemId}:${record.payload.recordLocalId}`)
      },
      normalizedText,
      normalizedTextHash,
      pidFamily: identifiers,
      provenanceRefs: {
        evaluationReceiptCid: evaluationReceipt.cid,
        fetchReceiptCid: fetchReceipt.cid,
        normalizationReceiptCid: normalizationReceipt.cid
      },
      rightsScopes: manifestation.payload.accessRequirements,
      sourceManifestationCid: manifestation.cid,
      sourceRecordCid: record.cid
    },
    { pack: 'ingress-refinery', parents: [fetchReceipt.cid, normalizationReceipt.cid, evaluationReceipt.cid] }
  );

  return {
    canonicalArtifact,
    evaluationReceipt,
    fetchReceipt,
    normalizationReceipt,
    trustMatrix
  };
}

export function buildBootstrapDemoSnapshot(): BootstrapDemoSnapshot {
  const sourceProfile = bootstrapSourceProfiles.find((profile) => profile.sourceSystemId === 'datacite') ?? bootstrapSourceProfiles[0];
  const sourceSystem = createSourceSystemProfileTile(sourceProfile);
  const run = createRun('Bootstrap a Rosetta source-aware provenance loop.', ['bootstrap', 'source-substrate']);
  const action = createAction(run.cid, 'Normalize and evaluate a source-aware text artifact.');
  const policyTile = buildTile(
    'rosetta.observation',
    {
      observationId: 'policy.parse-only.default',
      signal: 'Parse-only ingress is the only authorized bootstrap action.',
      source: 'policy'
    },
    { pack: 'policy.parse-only.default', parents: [action.cid] }
  );
  const toolCall = createToolCall('source-registry.lookup', { sourceSystemId: sourceSystem.payload.sourceSystemId }, [action.cid]);
  const observation = createObservation('datacite', 'Metadata registry lookup completed.', [toolCall.cid]);
  const record = createSourceRecordTile(
    {
      metadataBlob: {
        doi: '10.5281/zenodo.7189481',
        orcid: 'orcid:0000-0000-0000-0000',
        ror: 'ror:03yrm5c26',
        swhid: 'swh:1:dir:bootstrap-demo',
        title: 'Generalist repository comparison chart'
      },
      publicationStatus: 'published',
      recordLocalId: '10.5281/zenodo.7189481',
      recordType: 'dataset',
      sourceSystemId: sourceSystem.payload.sourceSystemId,
      stableLocators: ['https://doi.org/10.5281/zenodo.7189481']
    },
    [sourceSystem.cid, observation.cid]
  );
  const manifestation = createSourceManifestationTile(
    {
      accessRequirements: ['public'],
      byteHashes: { sha256: sha256Hex('bootstrap-demo-source') },
      contentLanguage: 'en',
      fetchableUrl: 'https://doi.org/10.5281/zenodo.7189481',
      manifestationId: 'doi-landing-page',
      manifestationKind: 'landing-page',
      mediaType: 'text/plain',
      sourceRecordCid: record.cid,
      structureProfile: 'plain-text'
    },
    [record.cid]
  );
  const { canonicalArtifact, evaluationReceipt, fetchReceipt, normalizationReceipt, trustMatrix } = refineTextArtifact(
    record,
    manifestation,
    'Repository profiles should be modeled separately from the records they host.',
    [policyTile.cid]
  );
  const evaluation = createEvaluation('Source-aware bootstrap slice passed parse-only refinement.', 'pass', [canonicalArtifact.cid]);
  const receipt = createReceipt({
    claims: [
      {
        claimType: 'rrp:claim.refined',
        confidence: 0.92,
        evidence: [{ cid: fetchReceipt.cid }, { cid: normalizationReceipt.cid }, { cid: evaluationReceipt.cid }],
        statement: 'Artifact refined through source-aware parse-only ingress.',
        verdict: 'pass'
      }
    ],
    digests: [digestTile(canonicalArtifact, 'canonical-artifact')],
    policyRefs: [policyTile.cid],
    receiptType: 'rrp:refinery.refinement',
    subjects: [{ cid: canonicalArtifact.cid, role: 'rrp:subject.canonical-artifact' }]
  });
  const keys = createSigningKeyPair();
  const signedReceipt = signReceiptEd25519(receipt, keys.privateKey, keys.publicKeyPem);
  const receiptBundle = buildReceiptBundle(receipt);
  const tapestry = compileReceiptBundleTapestry(receipt.cid, receiptBundle.subjectCids, receiptBundle.evidenceCids, receiptBundle.policyCids);
  const conformanceBundle = emitConformanceBundle([
    sourceSystem,
    record,
    manifestation,
    fetchReceipt,
    normalizationReceipt,
    evaluationReceipt,
    trustMatrix,
    canonicalArtifact,
    policyTile,
    receipt
  ]);

  return {
    action,
    canonicalArtifact,
    conformanceBundle,
    evaluation,
    evaluationReceipt,
    fetchReceipt,
    manifestation,
    normalizationReceipt,
    observation,
    policyTile,
    receipt,
    receiptBundle,
    record,
    run,
    signedReceipt,
    sourceSystem,
    tapestry,
    toolCall,
    trustMatrix
  };
}

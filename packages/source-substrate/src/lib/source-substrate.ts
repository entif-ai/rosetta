import { buildTile, type TileEnvelope } from '@entif-ai/rosetta-core';

export interface SourceSystemProfile {
  sourceSystemId: string;
  canonicalName: string;
  sourceRoles: string[];
  capabilityFacets: string[];
  curationPosture: string;
  reviewPosture: string;
  preservationPosture: string;
  rightsPosture: string;
  evidenceRefs: string[];
  operatorOrgs?: string[];
  pidSupport?: Record<string, boolean>;
}

export interface SourceRecord {
  sourceSystemId: string;
  recordLocalId: string;
  stableLocators: string[];
  recordType: string;
  publicationStatus: string;
  claimedVersion?: string;
  metadataBlob: Record<string, unknown>;
  collectionRefs?: string[];
  lineageRefs?: string[];
}

export interface SourceManifestation {
  sourceRecordCid: string;
  manifestationId: string;
  manifestationKind: string;
  mediaType: string;
  byteHashes: Record<string, string>;
  accessRequirements: string[];
  structureProfile: string;
  contentLanguage?: string;
  fetchableUrl?: string;
}

export interface SourcePackage {
  sourceRecordCid: string;
  packageId: string;
  packageKind: string;
  members: string[];
  profileRefs: string[];
}

export interface TrustMatrixAxes {
  artifactIntegrity: number;
  recordIdentity: number;
  authorship: number;
  affiliation: number;
  stewardship: number;
  reviewRigor: number;
  metadataRichness: number;
  correctionResponsiveness: number;
  licenseClarity: number;
  manipulationRisk: number;
  novelty: number;
  rarity: number;
  corroborationDensity: number;
  invalidationSensitivity: number;
}

export interface TrustMatrix {
  subjectCid: string;
  axes: TrustMatrixAxes;
  trustClass: 'infrastructure' | 'normative' | 'repository' | 'volatile';
  notes: string[];
}

export interface CorrectionEvent {
  subjectCid: string;
  eventKind: 'correction' | 'retraction' | 'supersession' | 'rights-change';
  recordedAt: string;
  summary: string;
}

export function createSourceSystemProfileTile(profile: SourceSystemProfile): TileEnvelope<SourceSystemProfile> {
  return buildTile('source.system_profile', profile, { pack: 'source-substrate' });
}

export function createSourceRecordTile(record: SourceRecord, parents: string[] = []): TileEnvelope<SourceRecord> {
  return buildTile('source.record', record, { pack: 'source-substrate', parents });
}

export function createSourceManifestationTile(
  manifestation: SourceManifestation,
  parents: string[] = []
): TileEnvelope<SourceManifestation> {
  return buildTile('source.manifestation', manifestation, { pack: 'source-substrate', parents });
}

export function createSourcePackageTile(sourcePackage: SourcePackage, parents: string[] = []): TileEnvelope<SourcePackage> {
  return buildTile('source.package', sourcePackage, { pack: 'source-substrate', parents });
}

export function createTrustMatrixTile(matrix: TrustMatrix, parents: string[] = []): TileEnvelope<TrustMatrix> {
  return buildTile('source.trust_matrix', matrix, { pack: 'source-substrate', parents });
}

export function createCorrectionEventTile(event: CorrectionEvent, parents: string[] = []): TileEnvelope<CorrectionEvent> {
  return buildTile('source.correction_event', event, { pack: 'source-substrate', parents });
}

import type { TileEnvelope } from '@entif-ai/rosetta-core';
import type { ReceiptBundle } from '@entif-ai/rosetta-receipts';
import type { CanonicalArtifact, IngressJob } from '@entif-ai/ingress-refinery';
import type { TrustMatrix } from '@entif-ai/source-substrate';

export interface Ob1SidecarProjection {
  artifactCid: string;
  mutable: false;
  receiptBundleId: string;
  rightsScopes: string[];
  target: 'ob1';
  viewMode: 'read-only-donor-sidecar';
}

export interface PrismShadowProjection {
  artifactCid: string;
  mutable: false;
  receiptBundleId: string;
  target: 'prism';
  trustClass: TrustMatrix['trustClass'];
  viewMode: 'shadow-memory';
}

export interface MissionControlProjection {
  artifactCid: string;
  jobId: string;
  mutable: false;
  receiptBundleId: string;
  target: 'mission-control';
  viewMode: 'operator-shell';
}

export function projectToOb1Sidecar(
  artifact: TileEnvelope<CanonicalArtifact>,
  receiptBundle: ReceiptBundle
): Ob1SidecarProjection {
  return {
    artifactCid: artifact.cid,
    mutable: false,
    receiptBundleId: receiptBundle.bundleId,
    rightsScopes: artifact.payload.rightsScopes,
    target: 'ob1',
    viewMode: 'read-only-donor-sidecar'
  };
}

export function projectToPrismShadow(
  artifact: TileEnvelope<CanonicalArtifact>,
  trustMatrix: TileEnvelope<TrustMatrix>,
  receiptBundle: ReceiptBundle
): PrismShadowProjection {
  return {
    artifactCid: artifact.cid,
    mutable: false,
    receiptBundleId: receiptBundle.bundleId,
    target: 'prism',
    trustClass: trustMatrix.payload.trustClass,
    viewMode: 'shadow-memory'
  };
}

export function projectToMissionControl(
  artifact: TileEnvelope<CanonicalArtifact>,
  job: TileEnvelope<IngressJob>,
  receiptBundle: ReceiptBundle
): MissionControlProjection {
  return {
    artifactCid: artifact.cid,
    jobId: job.payload.jobId,
    mutable: false,
    receiptBundleId: receiptBundle.bundleId,
    target: 'mission-control',
    viewMode: 'operator-shell'
  };
}

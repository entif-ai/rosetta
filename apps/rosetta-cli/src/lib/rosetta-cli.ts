import { buildBootstrapDemoSnapshot, buildBootstrapGateSnapshot, createIngressJob } from '@entif-ai/ingress-refinery';
import { projectToMissionControl, projectToOb1Sidecar, projectToPrismShadow } from '@entif-ai/projection-adapters';
import { verifyReceiptBundle, verifySignedReceipt } from '@entif-ai/rosetta-receipts';
import { InMemoryTileStore } from '@entif-ai/rosetta-store';

export function buildRosettaCliOutput() {
  const snapshot = buildBootstrapDemoSnapshot();
  const ingressJob = createIngressJob(snapshot.record.cid, snapshot.manifestation.cid);
  const store = new InMemoryTileStore();

  [
    snapshot.sourceSystem,
    snapshot.record,
    snapshot.manifestation,
    snapshot.fetchReceipt,
    snapshot.normalizationReceipt,
    snapshot.evaluationReceipt,
    snapshot.trustMatrix,
    snapshot.canonicalArtifact,
    snapshot.policyTile,
    snapshot.receipt,
    snapshot.tapestry
  ].forEach((tile) => store.put(tile));

  return {
    action: snapshot.action,
    canonicalArtifact: snapshot.canonicalArtifact,
    conformanceBundle: snapshot.conformanceBundle,
    bootstrapGate: buildBootstrapGateSnapshot(),
    ingressJob,
    missionControl: projectToMissionControl(snapshot.canonicalArtifact, ingressJob, snapshot.receiptBundle),
    ob1: projectToOb1Sidecar(snapshot.canonicalArtifact, snapshot.receiptBundle),
    prism: projectToPrismShadow(snapshot.canonicalArtifact, snapshot.trustMatrix, snapshot.receiptBundle),
    receiptBundleVerification: verifyReceiptBundle(snapshot.receiptBundle, store),
    signedReceiptVerification: verifySignedReceipt(snapshot.signedReceipt),
    sourceSystem: snapshot.sourceSystem
  };
}

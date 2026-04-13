import { describe, expect, it } from 'vitest';

import { verifyReceiptBundle } from '@entif-ai/rosetta-receipts';
import { InMemoryTileStore } from '@entif-ai/rosetta-store';

import { buildBootstrapDemoSnapshot, createIngressJob, refineTextArtifact } from './ingress-refinery.js';

describe('ingress-refinery', () => {
  it('closes the bootstrap receipt bundle when the policy artifact is present', () => {
    const snapshot = buildBootstrapDemoSnapshot();
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
      snapshot.receipt
    ].forEach((tile) => store.put(tile));

    expect(verifyReceiptBundle(snapshot.receiptBundle, store).ok).toBe(true);
  });

  it('keeps open metadata discoverable while file access remains explicit', () => {
    const snapshot = buildBootstrapDemoSnapshot();
    expect(snapshot.manifestation.payload.accessRequirements).toContain('public');
    expect(snapshot.canonicalArtifact.payload.rightsScopes).toContain('public');
  });

  it('builds parse-only ingress jobs', () => {
    const snapshot = buildBootstrapDemoSnapshot();
    const job = createIngressJob(snapshot.record.cid, snapshot.manifestation.cid);
    expect(job.payload.mode).toBe('parse-only');
  });

  it('preserves record versus manifestation versus artifact distinctions', () => {
    const snapshot = buildBootstrapDemoSnapshot();
    const refined = refineTextArtifact(snapshot.record, snapshot.manifestation, 'alpha beta');

    expect(snapshot.record.cid).not.toBe(snapshot.manifestation.cid);
    expect(snapshot.manifestation.cid).not.toBe(refined.canonicalArtifact.cid);
  });

  it('retains all bootstrap pid lanes and yields a fully conformant bundle', () => {
    const snapshot = buildBootstrapDemoSnapshot();

    expect(snapshot.canonicalArtifact.payload.pidFamily).toEqual([
      '10.5281/zenodo.7189481',
      'orcid:0000-0000-0000-0000',
      'ror:03yrm5c26',
      'swh:1:dir:bootstrap-demo'
    ]);
    expect(snapshot.conformanceBundle.summary.violations).toBe(0);
  });
});

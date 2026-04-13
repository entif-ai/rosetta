import { describe, expect, it } from 'vitest';

import { buildBootstrapDemoSnapshot, refineTextArtifact } from '@entif-ai/ingress-refinery';
import { createCorrectionEventTile } from '@entif-ai/source-substrate';

import { CanonicalCorpusCache } from './canonical-cache.js';

describe('canonical-cache', () => {
  it('clusters artifacts without auto-merging conceptual or record-family matches', () => {
    const cache = new CanonicalCorpusCache();
    const snapshot = buildBootstrapDemoSnapshot();
    const proposals = cache.ingest(snapshot.canonicalArtifact);

    expect(proposals.find((proposal) => proposal.layer === 'record-family')?.mergeEligible).toBe(false);
    expect(proposals.find((proposal) => proposal.layer === 'conceptual')?.mergeEligible).toBe(false);
  });

  it('retains correction events without data amnesia', () => {
    const cache = new CanonicalCorpusCache();
    const snapshot = buildBootstrapDemoSnapshot();
    cache.ingest(snapshot.canonicalArtifact);

    const correction = createCorrectionEventTile({
      eventKind: 'correction',
      recordedAt: new Date('2026-04-13T02:00:00.000Z').toISOString(),
      subjectCid: snapshot.canonicalArtifact.cid,
      summary: 'Metadata corrected upstream.'
    });
    cache.applyCorrectionEvent(correction);

    expect(cache.getLifecycleEvents(snapshot.canonicalArtifact.cid)).toHaveLength(1);
  });

  it('flags identical bytes and manifestations as merge-eligible while keeping broader clusters gated', () => {
    const cache = new CanonicalCorpusCache();
    const snapshot = buildBootstrapDemoSnapshot();
    cache.ingest(snapshot.canonicalArtifact);

    const refined = refineTextArtifact(
      snapshot.record,
      snapshot.manifestation,
      'Repository profiles should be modeled separately from the records they host.',
      ['policy.parse-only.recheck']
    );
    const proposals = cache.ingest(refined.canonicalArtifact);

    expect(proposals.find((proposal) => proposal.layer === 'byte')?.mergeEligible).toBe(true);
    expect(proposals.find((proposal) => proposal.layer === 'manifestation')?.mergeEligible).toBe(true);
    expect(proposals.find((proposal) => proposal.layer === 'record-family')?.mergeEligible).toBe(false);
  });
});

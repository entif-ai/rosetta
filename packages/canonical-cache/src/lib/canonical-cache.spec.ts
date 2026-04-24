import { describe, expect, it } from 'vitest';

import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

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

  it('dedupes repeated normalized content while preserving each raw evidence artifact', () => {
    const cache = new CanonicalCorpusCache();
    const snapshot = buildBootstrapDemoSnapshot();
    const base = refineTextArtifact(snapshot.record, snapshot.manifestation, 'Rosetta keeps source evidence.');
    const formatted = refineTextArtifact(snapshot.record, snapshot.manifestation, '  Rosetta   keeps source evidence.  \n');

    cache.ingest(base.canonicalArtifact);
    cache.ingest(formatted.canonicalArtifact);

    expect(formatted.canonicalArtifact.payload.contentFingerprint).toBe(base.canonicalArtifact.payload.contentFingerprint);
    expect(cache.getCanonicalCidForContentFingerprint(base.canonicalArtifact.payload.contentFingerprint)).toBe(base.canonicalArtifact.cid);
    expect(cache.getCanonicalArtifactCids()).toEqual([base.canonicalArtifact.cid]);
    expect(cache.getRawEvidenceCids(base.canonicalArtifact.cid)).toEqual([
      base.canonicalArtifact.cid,
      formatted.canonicalArtifact.cid
    ]);
  });

  it('links materially revised content as a revision instead of a duplicate canonical entry', () => {
    const cache = new CanonicalCorpusCache();
    const snapshot = buildBootstrapDemoSnapshot();
    const base = refineTextArtifact(snapshot.record, snapshot.manifestation, 'Rosetta keeps source evidence.');
    const revised = refineTextArtifact(snapshot.record, snapshot.manifestation, 'Rosetta keeps source evidence and revision traces.');

    cache.ingest(base.canonicalArtifact);
    cache.ingest(revised.canonicalArtifact);

    expect(revised.canonicalArtifact.payload.revisionFingerprint).not.toBe(base.canonicalArtifact.payload.revisionFingerprint);
    expect(cache.getRevisionChain(base.canonicalArtifact.payload.dedupe.recordFamilyKey)).toEqual([
      {
        artifactCid: base.canonicalArtifact.cid,
        revisionFingerprint: base.canonicalArtifact.payload.revisionFingerprint
      },
      {
        artifactCid: revised.canonicalArtifact.cid,
        parentArtifactCid: base.canonicalArtifact.cid,
        revisionFingerprint: revised.canonicalArtifact.payload.revisionFingerprint
      }
    ]);
  });

  it('reloads canonical entries, revision links, and raw evidence from local persistence', () => {
    const tmp = mkdtempSync(join(tmpdir(), 'rosetta-cache-'));
    const cachePath = join(tmp, 'cache.json');
    try {
      const snapshot = buildBootstrapDemoSnapshot();
      const base = refineTextArtifact(snapshot.record, snapshot.manifestation, 'Rosetta keeps source evidence.');
      const formatted = refineTextArtifact(snapshot.record, snapshot.manifestation, 'Rosetta keeps   source evidence.');
      const revised = refineTextArtifact(snapshot.record, snapshot.manifestation, 'Rosetta keeps source evidence and revision traces.');
      const cache = new CanonicalCorpusCache({ persistencePath: cachePath });

      cache.ingest(base.canonicalArtifact);
      cache.ingest(formatted.canonicalArtifact);
      cache.ingest(revised.canonicalArtifact);
      cache.save();

      const reloaded = CanonicalCorpusCache.load({ persistencePath: cachePath });

      expect(reloaded.getCanonicalArtifactCids()).toEqual([base.canonicalArtifact.cid, revised.canonicalArtifact.cid]);
      expect(reloaded.getRawEvidenceCids(base.canonicalArtifact.cid)).toEqual([
        base.canonicalArtifact.cid,
        formatted.canonicalArtifact.cid
      ]);
      expect(reloaded.getRevisionChain(base.canonicalArtifact.payload.dedupe.recordFamilyKey).at(-1)?.artifactCid).toBe(
        revised.canonicalArtifact.cid
      );
    } finally {
      rmSync(tmp, { force: true, recursive: true });
    }
  });
});

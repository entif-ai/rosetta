import { describe, expect, it } from 'vitest';

import { verifyReceiptBundle } from '@entif-ai/rosetta-receipts';
import { InMemoryTileStore } from '@entif-ai/rosetta-store';

import { buildBootstrapDemoSnapshot, createIngressJob, createParseOnlySourceEpisode, refineTextArtifact } from './ingress-refinery.js';

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

  it('stores distinct content and revision fingerprints on canonical artifacts', () => {
    const snapshot = buildBootstrapDemoSnapshot();
    const formatted = refineTextArtifact(snapshot.record, snapshot.manifestation, 'alpha   beta\r\n\r\n gamma');
    const equivalent = refineTextArtifact(snapshot.record, snapshot.manifestation, 'alpha beta\n\ngamma');
    const revised = refineTextArtifact(snapshot.record, snapshot.manifestation, 'alpha beta\n\ndelta');

    expect(formatted.canonicalArtifact.payload.contentFingerprint).toBe(equivalent.canonicalArtifact.payload.contentFingerprint);
    expect(formatted.canonicalArtifact.payload.revisionFingerprint).toBe(equivalent.canonicalArtifact.payload.revisionFingerprint);
    expect(formatted.canonicalArtifact.payload.revisionFingerprint).not.toBe(revised.canonicalArtifact.payload.revisionFingerprint);
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

  it('classifies unknown source families as unresolved instead of dropping them', () => {
    const snapshot = buildBootstrapDemoSnapshot();
    const episode = createParseOnlySourceEpisode(snapshot.record, snapshot.manifestation, {
      chronology: {
        primary: {
          date: '2026-04-24',
          kind: 'declaredAt',
          source: 'top-matter'
        }
      },
      locator: 'local://mystery-source',
      rawEvidenceRefs: [{ evidenceId: 'raw.mystery', evidenceKind: 'local-file', locator: 'local://mystery-source' }],
      rightsScope: ['local-private']
    });

    expect(episode.payload.family).toBe('unresolved');
    expect(episode.payload.classification.confidence).toBeLessThan(0.5);
    expect(episode.payload.classification.reasons).toContain('No supported source-family classifier matched.');
  });

  it('rejects side-effect ingest modes before source episode creation', () => {
    const snapshot = buildBootstrapDemoSnapshot();

    expect(() =>
      createParseOnlySourceEpisode(snapshot.record, snapshot.manifestation, {
        chronology: {
          primary: {
            date: '2026-04-24',
            kind: 'declaredAt',
            source: 'top-matter'
          }
        },
        locator: 'local://mystery-source',
        rawEvidenceRefs: [{ evidenceId: 'raw.mystery', evidenceKind: 'local-file', locator: 'local://mystery-source' }],
        requestedMode: 'side-effect',
        rightsScope: ['local-private']
      })
    ).toThrow(/parse-only/iu);
  });
});

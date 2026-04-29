import { describe, expect, it } from 'vitest';

import { createPolicy, type TileEnvelope } from '@entif-ai/rosetta-core';
import { verifyReceiptBundle } from '@entif-ai/rosetta-receipts';
import { InMemoryTileStore } from '@entif-ai/rosetta-store';

import {
  buildBootstrapDemoSnapshot,
  buildBootstrapGateSnapshot,
  createIngressJob,
  createParseOnlySourceEpisode,
  refineTextArtifact,
  refineTextToObservationArtifacts
} from './ingress-refinery.js';

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

  it('emits source-span observations separately from source and derived artifacts', () => {
    const snapshot = buildBootstrapDemoSnapshot();
    const refined = refineTextToObservationArtifacts(snapshot.record, snapshot.manifestation, 'Alpha beta. Gamma delta.');

    expect(refined.observation.kind).toBe('rosetta.observation');
    expect(refined.observation.cid).not.toBe(snapshot.record.cid);
    expect(refined.observation.cid).not.toBe(snapshot.manifestation.cid);
    expect(refined.observation.cid).not.toBe(refined.canonicalArtifact.cid);
    expect(refined.observation.parents).toContain(snapshot.manifestation.cid);

    expect(refined.observation.payload.sourceSpans).toEqual([
      {
        endOffset: 24,
        sourceManifestationCid: snapshot.manifestation.cid,
        sourceRecordCid: snapshot.record.cid,
        startOffset: 0,
        textHash: refined.canonicalArtifact.payload.byteHash
      }
    ]);

    expect(refined.derivedArtifacts.map((artifact) => artifact.payload.derivationKind)).toEqual(['summary', 'extract']);
    expect(refined.derivedArtifacts.every((artifact) => artifact.kind === 'source.derived_artifact')).toBe(true);
    expect(refined.derivedArtifacts.every((artifact) => artifact.cid !== refined.observation.cid)).toBe(true);
    expect(refined.derivedArtifacts.every((artifact) => artifact.payload.sourceObservationCid === refined.observation.cid)).toBe(true);
  });

  it('emits a verifiable transform receipt for source-to-observation tiling', () => {
    const snapshot = buildBootstrapDemoSnapshot();
    const refined = refineTextToObservationArtifacts(snapshot.record, snapshot.manifestation, 'Alpha beta. Gamma delta.');
    const store = new InMemoryTileStore();

    const closureTiles: TileEnvelope[] = [
      snapshot.record,
      snapshot.manifestation,
      refined.canonicalArtifact,
      refined.observation,
      refined.transformReceipt
    ];
    closureTiles.forEach((tile) => store.put(tile));

    expect(refined.transformReceipt.payload.receiptType).toBe('rrp:transform.source-observation');
    expect(refined.transformReceipt.payload.subjects).toEqual([
      { cid: refined.observation.cid, role: 'rrp:subject.observation' }
    ]);
    expect(refined.transformReceipt.payload.claims[0].evidence).toEqual([
      { cid: snapshot.manifestation.cid, span: 'bytes:0-24' },
      { cid: refined.canonicalArtifact.cid }
    ]);
    expect(verifyReceiptBundle(refined.transformReceiptBundle, store).ok).toBe(true);
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

  it('passes Bootstrap Green only with the ordered guarded builtin.echo proof path', () => {
    const result = buildBootstrapGateSnapshot();
    const repeated = buildBootstrapGateSnapshot();

    expect(result.status).toBe('pass');
    expect(result.verdict).toBe('pass');
    expect(result.steps.map((step) => step.id)).toEqual([
      'canonicalize-input',
      'compute-cid',
      'guard-decision',
      'execute-builtin-echo',
      'mint-observation',
      'emit-receipt',
      'compile-closure',
      'verify-chain'
    ]);
    expect(result.steps.every((step) => step.status === 'pass')).toBe(true);
    expect(result.steps.every((step) => typeof step.artifactCid === 'string' && step.artifactCid.length > 0)).toBe(true);
    expect(result.guard.effect).toBe('allow');
    expect(result.echoOutput).toBe(result.canonicalInput);
    expect(result.receiptBundleVerification.ok).toBe(true);
    expect(result.closureArtifact.exists).toBe(true);
    expect(result.tapestry).toBeDefined();
    expect(result.closureArtifact.cid).toBe(result.tapestry?.cid);
    expect(result.steps.map((step) => step.artifactCid)).toEqual(repeated.steps.map((step) => step.artifactCid));
    expect(result.receiptBundle.closureCids).toEqual(repeated.receiptBundle.closureCids);
  });

  it('denies Bootstrap Green when the builtin.echo guard denies execution', () => {
    const result = buildBootstrapGateSnapshot({
      guardRules: [
        {
          actionPattern: 'builtin.echo',
          effect: 'deny',
          id: 'policy.bootstrap.echo.denied',
          mode: 'parse-only',
          resourcePattern: 'builtin://echo'
        }
      ]
    });

    expect(result.status).toBe('deny');
    expect(result.verdict).toBe('deny');
    expect(result.guard.effect).toBe('deny');
    expect(result.steps.find((step) => step.id === 'guard-decision')?.status).toBe('deny');
    expect(result.steps.find((step) => step.id === 'execute-builtin-echo')?.status).toBe('block');
    expect(result.receiptBundleVerification.ok).toBe(false);
  });

  it('blocks Bootstrap Green when receipt-bundle closure verification is missing a member', () => {
    const missingPolicy = createPolicy('bootstrap echo missing external policy', 'allow', [], ['builtin.echo']);
    const result = buildBootstrapGateSnapshot({ additionalPolicyCids: [missingPolicy.cid] });

    expect(result.status).toBe('block');
    expect(result.verdict).toBe('block');
    expect(result.receiptBundle.closureCids).toContain(missingPolicy.cid);
    expect(result.receiptBundleVerification.ok).toBe(false);
    expect(result.receiptBundleVerification.errors).toContain(`Missing closure member: ${missingPolicy.cid}`);
    expect(result.steps.find((step) => step.id === 'verify-chain')?.status).toBe('block');
  });

  it('blocks Bootstrap Green when the guard allow decision falls back to an unmatched default policy', () => {
    const result = buildBootstrapGateSnapshot({ guardRules: [] });

    expect(result.guard.effect).toBe('allow');
    expect(result.status).toBe('block');
    expect(result.verdict).toBe('block');
    expect(result.errors).toContain('Guard allow decision is not backed by the bootstrap policy artifact.');
    expect(result.steps.find((step) => step.id === 'guard-decision')?.status).toBe('block');
    expect(result.steps.find((step) => step.id === 'execute-builtin-echo')?.status).toBe('block');
  });

  it('blocks Bootstrap Green when the guard allow decision references an unverified policy id', () => {
    const result = buildBootstrapGateSnapshot({
      guardRules: [
        {
          actionPattern: 'builtin.echo',
          effect: 'allow',
          id: 'policy.fake.allow',
          mode: 'parse-only',
          resourcePattern: 'builtin://echo'
        }
      ]
    });

    expect(result.guard.effect).toBe('allow');
    expect(result.guard.policyIds).toEqual(['policy.fake.allow']);
    expect(result.status).toBe('block');
    expect(result.verdict).toBe('block');
    expect(result.errors).toContain('Guard allow decision is not backed by the bootstrap policy artifact.');
    expect(result.steps.find((step) => step.id === 'guard-decision')?.status).toBe('block');
  });
});

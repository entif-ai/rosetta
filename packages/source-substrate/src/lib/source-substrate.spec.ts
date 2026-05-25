import { describe, expect, it } from 'vitest';

import {
  createBoundedListingSnapshotPackageTile,
  createSourceEpisodeTile,
  createSourceManifestationTile,
  createSourcePackageTile,
  createSourceRecordTile,
  createSourceSystemProfileTile,
  createTrustMatrixTile
} from './source-substrate.js';

describe('source-substrate', () => {
  it('keeps source system, record, manifestation, and trust matrix separate', () => {
    const system = createSourceSystemProfileTile({
      canonicalName: 'Zenodo',
      capabilityFacets: ['api', 'doi', 'version-family'],
      curationPosture: 'generalist-repository',
      evidenceRefs: ['re3data', 'docs'],
      preservationPosture: 'bit-level',
      reviewPosture: 'deposit-screening',
      rightsPosture: 'open-metadata-restricted-files-supported',
      sourceRoles: ['generalist-repository'],
      sourceSystemId: 'zenodo'
    });
    const record = createSourceRecordTile(
      {
        metadataBlob: { doi: '10.5281/zenodo.1234' },
        publicationStatus: 'published',
        recordLocalId: '1234',
        recordType: 'dataset',
        sourceSystemId: 'zenodo',
        stableLocators: ['https://zenodo.org/records/1234']
      },
      [system.cid]
    );
    const manifestation = createSourceManifestationTile(
      {
        accessRequirements: ['public-metadata', 'restricted-files'],
        byteHashes: { sha256: 'abc123' },
        manifestationId: 'manifestation-1',
        manifestationKind: 'landing-page',
        mediaType: 'text/html',
        sourceRecordCid: record.cid,
        structureProfile: 'html+metadata'
      },
      [record.cid]
    );
    const matrix = createTrustMatrixTile(
      {
        axes: {
          affiliation: 0.7,
          artifactIntegrity: 0.8,
          authorship: 0.6,
          correctionResponsiveness: 0.7,
          corroborationDensity: 0.4,
          invalidationSensitivity: 0.5,
          licenseClarity: 0.8,
          manipulationRisk: 0.2,
          metadataRichness: 0.9,
          novelty: 0.5,
          rarity: 0.4,
          recordIdentity: 0.8,
          reviewRigor: 0.5,
          stewardship: 0.8
        },
        notes: ['Repository polish is not the same as peer review.'],
        subjectCid: manifestation.cid,
        trustClass: 'repository'
      },
      [manifestation.cid]
    );

    expect(new Set([system.kind, record.kind, manifestation.kind, matrix.kind]).size).toBe(4);
  });

  it('models a parse-only source episode with chronology, rights, locator, family, and raw evidence', () => {
    const episode = createSourceEpisodeTile({
      chronology: {
        primary: {
          date: '2026-04-23',
          kind: 'updatedAt',
          localDateTime: '2026-04-23T13:09:43',
          source: 'top-matter'
        }
      },
      classification: {
        confidence: 0.95,
        reasons: ['top-matter contains chat export metadata']
      },
      episodeId: 'episode.chat.20260423',
      family: 'chat-transcript',
      locator: 'docs/chats/20260423 - Chat GPT - Agentic Orchestration Failures.md',
      mode: 'parse-only',
      rawEvidenceRefs: [
        {
          evidenceId: 'raw.chat.20260423',
          evidenceKind: 'local-file',
          locator: 'docs/chats/20260423 - Chat GPT - Agentic Orchestration Failures.md',
          sha256: 'abc123'
        }
      ],
      rightsScope: ['local-private', 'no-external-publish']
    });

    expect(episode.kind).toBe('source.episode');
    expect(episode.payload.family).toBe('chat-transcript');
    expect(episode.payload.mode).toBe('parse-only');
    expect(episode.payload.rawEvidenceRefs[0].locator).toContain('20260423');
    expect(episode.payload.rightsScope).toContain('local-private');
    expect(episode.payload.chronology.primary.kind).toBe('updatedAt');
  });

  it('models bounded acquisition listing snapshots separately from discovered records and manifestations', () => {
    const listing = createBoundedListingSnapshotPackageTile({
      boundedness: {
        incompleteSearch: false,
        isComplete: true,
        itemCount: 2,
        maxItems: 10,
        pagination: { mode: 'single-page' },
        signals: ['github.tree.truncated=false'],
        truncated: false
      },
      discoveredRecordCids: ['cidv1-record-readme', 'cidv1-record-rfc'],
      members: ['cidv1-record-readme', 'cidv1-record-rfc'],
      packageId: 'github.tree.entif-ai.rosetta.main.docs',
      profileRefs: ['source-profile.github'],
      scope: {
        authorityRef: 'refs/heads/main',
        capturedAt: '2026-05-25T10:00:00.000Z',
        locator: 'https://github.com/entif-ai/rosetta/tree/main/docs',
        scope: {
          owner: 'entif-ai',
          path: 'docs',
          ref: 'main',
          repo: 'rosetta',
          treeSha: 'tree-sha-demo'
        },
        sourceKind: 'github-tree',
        sourceSystemId: 'github'
      }
    });

    expect(listing.kind).toBe('source.package');
    expect(listing.payload.packageKind).toBe('bounded-listing-snapshot');
    expect(listing.payload.lineageRole).toBe('bounded-acquisition-snapshot');
    expect(listing.payload.sourceRecordCid).toBeUndefined();
    expect(listing.payload.scope?.sourceKind).toBe('github-tree');
    expect(listing.payload.boundedness?.truncated).toBe(false);
    expect(listing.payload.discoveredRecordCids).toEqual(['cidv1-record-readme', 'cidv1-record-rfc']);
  });

  it('still supports record-scoped source packages for existing bootstrap callers', () => {
    const sourcePackage = createSourcePackageTile({
      members: ['cidv1-manifestation-a'],
      packageId: 'record-scoped-package',
      packageKind: 'source-record-manifestations',
      profileRefs: ['source-profile.zenodo'],
      sourceRecordCid: 'cidv1-record-a'
    });

    expect(sourcePackage.payload.sourceRecordCid).toBe('cidv1-record-a');
  });
});

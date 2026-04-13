import { describe, expect, it } from 'vitest';

import { createSourceManifestationTile, createSourceRecordTile, createSourceSystemProfileTile, createTrustMatrixTile } from './source-substrate.js';

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
});

import { describe, expect, it } from 'vitest';

import { bootstrapRegistryEntries, bootstrapSourceProfiles, createSourceRegistryEntryTile, loadBootstrapSourceRegistry } from './source-registry.js';

describe('source-registry', () => {
  it('contains the mandated Tier 0 and Tier 1 bootstrap source systems', () => {
    expect(new Set(bootstrapSourceProfiles.map((profile) => profile.sourceSystemId))).toEqual(
      new Set([
        'datacite',
        'crossref',
        'orcid',
        'ror',
        're3data',
        'openaire',
        'openalex',
        'software-heritage',
        'zenodo',
        'figshare',
        'harvard-dataverse',
        'swissubase',
        'dasch'
      ])
    );
  });

  it('round-trips bootstrap registry entries', () => {
    const registry = loadBootstrapSourceRegistry();
    expect(registry.entries).toHaveLength(bootstrapRegistryEntries.length);
    expect(registry.profiles).toHaveLength(bootstrapSourceProfiles.length);
  });

  it('captures multi-authority PID support without collapse', () => {
    const zenodo = bootstrapSourceProfiles.find((profile) => profile.sourceSystemId === 'zenodo');
    expect(zenodo?.pidSupport).toMatchObject({
      DOI: true,
      ORCID: true,
      ROR: true,
      SWHID: true
    });
  });

  it('creates registry entry tiles as versioned artifacts', () => {
    const tile = createSourceRegistryEntryTile(bootstrapRegistryEntries[0]);
    expect(tile.kind).toBe('source.registry_entry');
  });
});

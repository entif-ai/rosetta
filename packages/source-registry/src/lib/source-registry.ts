import { buildTile, type TileEnvelope } from '@entif-ai/rosetta-core';
import type { SourceSystemProfile } from '@entif-ai/source-substrate';

export interface SourceRegistryEntry {
  entryId: string;
  sourceSystemId: string;
  priorityTier: 'P0' | 'P1' | 'P2' | 'P3';
  defaultTrustClass: 'infrastructure' | 'normative' | 'repository' | 'volatile';
  notes?: string[];
}

export const bootstrapSourceProfiles: SourceSystemProfile[] = [
  {
    canonicalName: 'DataCite',
    capabilityFacets: ['doi', 'metadata-authority', 'api', 'pid-spine'],
    curationPosture: 'pid-authority',
    evidenceRefs: ['datacite-schema', 'source-substrate-addendum'],
    operatorOrgs: ['DataCite'],
    pidSupport: { DOI: true, ORCID: true, ROR: true, SWHID: true },
    preservationPosture: 'registry',
    reviewPosture: 'member-deposited-metadata',
    rightsPosture: 'open-metadata',
    sourceRoles: ['pid-authority', 'metadata-registry'],
    sourceSystemId: 'datacite'
  },
  {
    canonicalName: 'Crossref',
    capabilityFacets: ['metadata-authority', 'relationship-graph', 'api'],
    curationPosture: 'member-deposited-metadata',
    evidenceRefs: ['crossref-rest', 'source-substrate-addendum'],
    operatorOrgs: ['Crossref'],
    pidSupport: { DOI: true, ORCID: true, ROR: true, SWHID: false },
    preservationPosture: 'registry',
    reviewPosture: 'member-deposited-metadata',
    rightsPosture: 'open-metadata',
    sourceRoles: ['metadata-registry', 'relationship-infrastructure'],
    sourceSystemId: 'crossref'
  },
  {
    canonicalName: 'ORCID',
    capabilityFacets: ['person-identity', 'api', 'pid-spine'],
    curationPosture: 'identity-registry',
    evidenceRefs: ['orcid', 'source-substrate-addendum'],
    operatorOrgs: ['ORCID'],
    pidSupport: { DOI: false, ORCID: true, ROR: false, SWHID: false },
    preservationPosture: 'registry',
    reviewPosture: 'user-asserted-plus-linked',
    rightsPosture: 'open-profile-data',
    sourceRoles: ['person-identity-authority'],
    sourceSystemId: 'orcid'
  },
  {
    canonicalName: 'ROR',
    capabilityFacets: ['organization-identity', 'api', 'pid-spine'],
    curationPosture: 'identity-registry',
    evidenceRefs: ['ror', 'source-substrate-addendum'],
    operatorOrgs: ['ROR'],
    pidSupport: { DOI: false, ORCID: false, ROR: true, SWHID: false },
    preservationPosture: 'registry',
    reviewPosture: 'curated-registry',
    rightsPosture: 'open-metadata',
    sourceRoles: ['organization-identity-authority'],
    sourceSystemId: 'ror'
  },
  {
    canonicalName: 're3data',
    capabilityFacets: ['repository-registry', 'api', 'source-intelligence'],
    curationPosture: 'registry',
    evidenceRefs: ['re3data', 'source-registry-annex'],
    operatorOrgs: ['re3data'],
    preservationPosture: 'registry',
    reviewPosture: 'curated-registry',
    rightsPosture: 'open-metadata',
    sourceRoles: ['repository-registry'],
    sourceSystemId: 're3data'
  },
  {
    canonicalName: 'OpenAIRE Graph',
    capabilityFacets: ['graph-aggregator', 'scholarly-enrichment', 'api'],
    curationPosture: 'graph-enrichment',
    evidenceRefs: ['openaire', 'source-substrate-addendum'],
    operatorOrgs: ['OpenAIRE'],
    preservationPosture: 'graph-service',
    reviewPosture: 'aggregated-plus-enriched',
    rightsPosture: 'open-metadata',
    sourceRoles: ['scholarly-graph'],
    sourceSystemId: 'openaire'
  },
  {
    canonicalName: 'OpenAlex',
    capabilityFacets: ['graph-aggregator', 'scholarly-enrichment', 'api'],
    curationPosture: 'graph-enrichment',
    evidenceRefs: ['openalex', 'source-substrate-addendum'],
    operatorOrgs: ['OpenAlex'],
    preservationPosture: 'graph-service',
    reviewPosture: 'aggregated-plus-enriched',
    rightsPosture: 'open-metadata',
    sourceRoles: ['scholarly-graph'],
    sourceSystemId: 'openalex'
  },
  {
    canonicalName: 'Software Heritage',
    capabilityFacets: ['intrinsic-software-identity', 'api', 'archive'],
    curationPosture: 'archive',
    evidenceRefs: ['swhid', 'source-substrate-addendum'],
    operatorOrgs: ['Software Heritage'],
    pidSupport: { DOI: false, ORCID: false, ROR: false, SWHID: true },
    preservationPosture: 'long-term-archive',
    reviewPosture: 'archival-ingest',
    rightsPosture: 'open-metadata',
    sourceRoles: ['software-archive', 'intrinsic-identity'],
    sourceSystemId: 'software-heritage'
  },
  {
    canonicalName: 'Zenodo',
    capabilityFacets: ['doi', 'api', 'version-family', 'generalist-repository'],
    curationPosture: 'generalist-repository',
    evidenceRefs: ['zenodo', 'source-registry-annex'],
    operatorOrgs: ['CERN'],
    pidSupport: { DOI: true, ORCID: true, ROR: true, SWHID: true },
    preservationPosture: 'bit-level-preservation',
    reviewPosture: 'deposit-screening',
    rightsPosture: 'open-metadata-restricted-files-supported',
    sourceRoles: ['generalist-repository'],
    sourceSystemId: 'zenodo'
  },
  {
    canonicalName: 'Figshare',
    capabilityFacets: ['doi', 'api', 'version-family', 'generalist-repository'],
    curationPosture: 'generalist-repository',
    evidenceRefs: ['figshare', 'source-registry-annex'],
    operatorOrgs: ['Figshare'],
    pidSupport: { DOI: true, ORCID: true, ROR: false, SWHID: false },
    preservationPosture: 'platform',
    reviewPosture: 'platform-screening',
    rightsPosture: 'public-dissemination',
    sourceRoles: ['generalist-repository'],
    sourceSystemId: 'figshare'
  },
  {
    canonicalName: 'Harvard Dataverse',
    capabilityFacets: ['doi', 'api', 'open-metadata-restricted-files', 'version-family'],
    curationPosture: 'curated-repository',
    evidenceRefs: ['dataverse', 'source-registry-annex'],
    operatorOrgs: ['Harvard Library'],
    pidSupport: { DOI: true, ORCID: true, ROR: true, SWHID: false },
    preservationPosture: 'repository',
    reviewPosture: 'instance-specific',
    rightsPosture: 'open-metadata-restricted-files-supported',
    sourceRoles: ['repository-instance'],
    sourceSystemId: 'harvard-dataverse'
  },
  {
    canonicalName: 'SWISSUbase',
    capabilityFacets: ['national-platform', 'curated-metadata', 'contracts-aware'],
    curationPosture: 'national-infrastructure',
    evidenceRefs: ['swissubase', 'source-registry-annex'],
    operatorOrgs: ['SWISSUbase'],
    preservationPosture: 'platform',
    reviewPosture: 'expert-curation',
    rightsPosture: 'mediated-access',
    sourceRoles: ['national-research-platform'],
    sourceSystemId: 'swissubase'
  },
  {
    canonicalName: 'DaSCH',
    capabilityFacets: ['fair-humanities-platform', 'api', 'archive', 'ingest-tooling'],
    curationPosture: 'curated-domain-platform',
    evidenceRefs: ['dasch', 'source-registry-annex'],
    operatorOrgs: ['DaSCH'],
    preservationPosture: 'long-term-archive',
    reviewPosture: 'expert-curation',
    rightsPosture: 'mixed-access',
    sourceRoles: ['domain-service-platform'],
    sourceSystemId: 'dasch'
  }
];

export const bootstrapRegistryEntries: SourceRegistryEntry[] = bootstrapSourceProfiles.map((profile) => ({
  defaultTrustClass:
    profile.sourceSystemId === 'zenodo' ||
    profile.sourceSystemId === 'figshare' ||
    profile.sourceSystemId === 'harvard-dataverse' ||
    profile.sourceSystemId === 'swissubase' ||
    profile.sourceSystemId === 'dasch'
      ? 'repository'
      : 'infrastructure',
  entryId: `registry.${profile.sourceSystemId}`,
  priorityTier:
    profile.sourceSystemId === 'zenodo' ||
    profile.sourceSystemId === 'figshare' ||
    profile.sourceSystemId === 'harvard-dataverse' ||
    profile.sourceSystemId === 'swissubase' ||
    profile.sourceSystemId === 'dasch'
      ? 'P1'
      : 'P0',
  sourceSystemId: profile.sourceSystemId
}));

export function createSourceRegistryEntryTile(entry: SourceRegistryEntry): TileEnvelope<SourceRegistryEntry> {
  return buildTile('source.registry_entry', entry, { pack: 'source-registry' });
}

export function loadBootstrapSourceRegistry(): { entries: SourceRegistryEntry[]; profiles: SourceSystemProfile[] } {
  return {
    entries: structuredClone(bootstrapRegistryEntries),
    profiles: structuredClone(bootstrapSourceProfiles)
  };
}

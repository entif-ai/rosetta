import { describe, expect, it } from 'vitest';

import {
  buildCompoundCacheKey,
  changedCompoundCacheKeyDimensions,
  emitConformanceBundle,
  validateCompoundCacheKey,
  validatePayload
} from './rosetta-schemas.js';

describe('rosetta-schemas', () => {
  it('rejects incomplete source profiles', () => {
    const result = validatePayload('source.system_profile', {
      sourceSystemId: 'datacite'
    });

    expect(result.ok).toBe(false);
  });

  it('builds a conformance bundle summary', () => {
    const bundle = emitConformanceBundle([
      {
        cid: 'cidv1-sha256-demo',
        kind: 'source.registry_entry',
        payload: {
          defaultTrustClass: 'infrastructure',
          entryId: 'registry.datacite',
          priorityTier: 'P0',
          sourceSystemId: 'datacite'
        }
      }
    ]);

    expect(bundle.summary.conforms).toBe(1);
  });

  it('requires source episode fields for Text-Core ingest', () => {
    const result = validatePayload('source.episode', {
      episodeId: 'episode.chat.20260423',
      family: 'chat-transcript',
      mode: 'parse-only'
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContain('Missing required field: rawEvidenceRefs');
    expect(result.errors).toContain('Missing required field: chronology');
    expect(result.errors).toContain('Missing required field: rightsScope');
  });

  it('builds stable compound cache lookup keys across all authorization dimensions', () => {
    const key = buildCompoundCacheKey({
      dataClassification: 'phi-restricted',
      policyVersion: 'policy-tile-v3.2',
      rightsDomain: 'medical-plan-b-entitled',
      semanticIntent: 'health-benefits-query',
      sourceBundleHash: 'sha256:abc123'
    });

    expect(key.lookupKey).toBe(
      'cache-key-v1:data_classification=phi-restricted|policy_version=policy-tile-v3.2|rights_domain=medical-plan-b-entitled|semantic_intent=health-benefits-query|source_bundle_hash=sha256%3Aabc123'
    );
  });

  it('rejects incomplete intent-only cache keys', () => {
    const result = validateCompoundCacheKey({
      semanticIntent: 'health-benefits-query'
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContain('Missing required cache key dimension: rightsDomain');
    expect(result.errors).toContain('Missing required cache key dimension: dataClassification');
    expect(result.errors).toContain('Missing required cache key dimension: policyVersion');
    expect(result.errors).toContain('Missing required cache key dimension: sourceBundleHash');
  });

  it('flags cache invalidation when any compound dimension changes', () => {
    const before = buildCompoundCacheKey({
      dataClassification: 'phi-restricted',
      policyVersion: 'policy-tile-v3.2',
      rightsDomain: 'medical-plan-b-entitled',
      semanticIntent: 'health-benefits-query',
      sourceBundleHash: 'sha256:abc123'
    });
    const after = buildCompoundCacheKey({
      dataClassification: 'public',
      policyVersion: 'policy-tile-v3.3',
      rightsDomain: 'medical-plan-a-entitled',
      semanticIntent: 'leave-policy-query',
      sourceBundleHash: 'sha256:def456'
    });

    expect(changedCompoundCacheKeyDimensions(before, after)).toEqual([
      'semanticIntent',
      'rightsDomain',
      'dataClassification',
      'policyVersion',
      'sourceBundleHash'
    ]);
  });
});

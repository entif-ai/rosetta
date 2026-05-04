import { describe, expect, it } from 'vitest';

import {
  buildCompositionProvenanceRecord,
  buildCompoundCacheKey,
  changedCompoundCacheKeyDimensions,
  emitConformanceBundle,
  traceCompositionSource,
  validateCompositionProvenanceRecord,
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

  it('models multi-provider composition provenance as a first-class payload', () => {
    const record = buildCompositionProvenanceRecord({
      answerCid: 'cidv1-answer-benefits',
      composedAt: '2026-05-04T03:00:00.000Z',
      compositionLogic: 'Merge provider-scoped benefit facts without exposing raw employee metadata.',
      compositionReceiptCid: 'cidv1-receipt-composition',
      providers: [
        {
          challengePath: ['cidv1-answer-benefits#medical-summary', 'cidv1-medical-response'],
          freshnessVerifiedAt: '2026-05-03T12:00:00.000Z',
          normalizedUserMetadataCid: 'cidv1-medical-metadata',
          providerId: 'medical',
          providerResponseCid: 'cidv1-medical-response',
          providerResponseTimestamp: '2026-05-03T12:01:00.000Z',
          providerResponseVersion: 'medical-v3',
          rightsDecisionCid: 'cidv1-medical-rights',
          subQueryReceiptCid: 'cidv1-medical-query-receipt'
        }
      ],
      recordId: 'composition.benefits.20260504',
      sourceAttributions: [
        {
          answerFragmentId: 'medical-summary',
          providerId: 'medical',
          providerResponseCid: 'cidv1-medical-response'
        }
      ]
    });

    expect(validatePayload('rosetta.composition_provenance', record).ok).toBe(true);
    expect(record.recordCid).toMatch(/^cidv1-sha256-/u);
  });

  it('rejects provider composition records without challengeability paths', () => {
    const result = validateCompositionProvenanceRecord({
      answerCid: 'cidv1-answer-benefits',
      composedAt: '2026-05-04T03:00:00.000Z',
      compositionLogic: 'Merge provider facts.',
      compositionReceiptCid: 'cidv1-receipt-composition',
      providers: [
        {
          challengePath: [],
          freshnessVerifiedAt: '2026-05-03T12:00:00.000Z',
          normalizedUserMetadataCid: 'cidv1-medical-metadata',
          providerId: 'medical',
          providerResponseCid: 'cidv1-medical-response',
          providerResponseTimestamp: '2026-05-03T12:01:00.000Z',
          providerResponseVersion: 'medical-v3',
          rightsDecisionCid: 'cidv1-medical-rights',
          subQueryReceiptCid: 'cidv1-medical-query-receipt'
        }
      ],
      recordId: 'composition.benefits.20260504',
      sourceAttributions: []
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContain('Provider medical must include a challengeability path.');
  });

  it('traces composed answer fragments back to their provider response', () => {
    const record = buildCompositionProvenanceRecord({
      answerCid: 'cidv1-answer-benefits',
      composedAt: '2026-05-04T03:00:00.000Z',
      compositionLogic: 'Merge provider facts.',
      compositionReceiptCid: 'cidv1-receipt-composition',
      providers: [
        {
          challengePath: ['cidv1-answer-benefits#dental-summary', 'cidv1-dental-response'],
          freshnessVerifiedAt: '2026-05-03T12:00:00.000Z',
          normalizedUserMetadataCid: 'cidv1-dental-metadata',
          providerId: 'dental',
          providerResponseCid: 'cidv1-dental-response',
          providerResponseTimestamp: '2026-05-03T12:01:00.000Z',
          providerResponseVersion: 'dental-v2',
          rightsDecisionCid: 'cidv1-dental-rights',
          subQueryReceiptCid: 'cidv1-dental-query-receipt'
        }
      ],
      recordId: 'composition.benefits.20260504',
      sourceAttributions: [
        {
          answerFragmentId: 'dental-summary',
          providerId: 'dental',
          providerResponseCid: 'cidv1-dental-response'
        }
      ]
    });

    expect(traceCompositionSource(record, 'dental-summary')).toEqual({
      answerFragmentId: 'dental-summary',
      challengePath: ['cidv1-answer-benefits#dental-summary', 'cidv1-dental-response'],
      providerId: 'dental',
      providerResponseCid: 'cidv1-dental-response',
      subQueryReceiptCid: 'cidv1-dental-query-receipt'
    });
  });
});

import { describe, expect, it } from 'vitest';

import {
  AGENTIC_MAILROOM_VALIDATION_CHECKLIST,
  AGENTIC_MESSAGE_TYPE_PROFILES,
  buildCompositionProvenanceRecord,
  buildCompoundCacheKey,
  buildDailyTopShelfDigest,
  buildIntakeEnvelope,
  buildPostmortemArtifact,
  buildTranslationEvidence,
  changedCompoundCacheKeyDimensions,
  compareDomainRefs,
  composeTranslationEvidence,
  emitConformanceBundle,
  emitShaclShapes,
  getAgenticMessageSchemaProfile,
  normalizeDomainRef,
  shouldGeneratePostmortem,
  traceCompositionSource,
  validateAgenticMessageEnvelope,
  validateAgenticMessagePayload,
  validateCompositionProvenanceRecord,
  validateCompoundCacheKey,
  validateDailyTopShelfDigest,
  validateDomainRef,
  validateIntakeEnvelope,
  validatePayload,
  validatePostmortemArtifact,
  validateTranslationEvidence
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

  it('aligns receipt validation and SHACL coverage with policyRefs and nested evidence/digests', () => {
    const validReceipt = {
      claims: [
        {
          claimType: 'rrp:claim.verified',
          evidence: [{ cid: 'cidv1-evidence', span: 'bytes:0-12' }],
          statement: 'Source artifact validated.',
          verdict: 'pass'
        }
      ],
      digests: [{ alg: 'sha256', digest: 'abc123', of: 'payload' }],
      policyRefs: ['policy.parse-only.default'],
      receiptType: 'rrp:validation',
      subjects: [{ cid: 'cidv1-subject', role: 'rrp:subject.artifact' }]
    };

    expect(validatePayload('rosetta.receipt', validReceipt).ok).toBe(true);
    expect(emitShaclShapes(['rosetta.receipt'])).toContain('entif:policyRefs');

    const invalidReceipt = {
      claims: [{ claimType: 'rrp:claim.verified', evidence: [{}], statement: 'Missing evidence cid.', verdict: 'fail' }],
      digests: [{ alg: 'sha256', of: 'payload' }],
      receiptType: 'rrp:validation',
      subjects: [{ cid: 'cidv1-subject' }]
    };

    expect(validatePayload('rosetta.receipt', invalidReceipt).errors).toEqual([
      'Missing required field: policyRefs',
      'Receipt claim 0 evidence 0 missing required field: cid',
      'Receipt digest 0 missing required field: digest'
    ]);
  });

  it('validates live source artifacts including derived artifacts, provenance refs, and rights scopes', () => {
    expect(
      validatePayload('source.derived_artifact', {
        artifactId: 'derived.summary.1',
        derivationKind: 'summary',
        payloadText: 'Alpha beta.',
        sourceObservationCid: 'cidv1-observation',
        sourceSpans: [
          {
            endOffset: 11,
            sourceManifestationCid: 'cidv1-manifestation',
            sourceRecordCid: 'cidv1-record',
            startOffset: 0,
            textHash: 'sha256:abc'
          }
        ]
      }).ok
    ).toBe(true);

    expect(
      validatePayload('source.canonical_artifact', {
        artifactId: 'canonical.1',
        byteHash: 'sha256:abc',
        contentFingerprint: 'cidv1-content',
        dedupe: {},
        normalizedText: 'Alpha beta.',
        normalizedTextHash: 'sha256:def',
        pidFamily: [],
        provenanceRefs: {
          fetchReceiptCid: 'cidv1-fetch',
          normalizationReceiptCid: 'cidv1-normalization'
        },
        revisionFingerprint: 'cidv1-revision',
        rightsScopes: [],
        sourceManifestationCid: 'cidv1-manifestation',
        sourceRecordCid: 'cidv1-record'
      }).errors
    ).toEqual([
      'source.canonical_artifact rightsScopes must include at least one scope.',
      'source.canonical_artifact provenanceRefs missing required field: evaluationReceiptCid'
    ]);

    expect(
      validatePayload('source.derived_artifact', {
        artifactId: 'derived.extract.1',
        derivationKind: 'extract',
        payloadText: 'Alpha beta.',
        sourceSpans: []
      }).errors
    ).toEqual([
      'Missing required field: sourceObservationCid',
      'source.derived_artifact sourceSpans must include at least one span.'
    ]);
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

  it('normalizes domain_ref labels without losing the structured boundary tuple', () => {
    const domain = normalizeDomainRef({
      abacLabels: {
        project: 'Rosetta',
        role: 'Researcher'
      },
      classification: 'Confidential',
      tenantId: ' Entif-AI ',
      vendorRoute: ' OpenAI '
    });

    expect(validateDomainRef(domain).ok).toBe(true);
    expect(domain).toEqual({
      abacLabels: [
        { key: 'project', value: 'rosetta' },
        { key: 'role', value: 'researcher' }
      ],
      classification: 'confidential',
      tenantId: 'entif-ai',
      vendorRoute: 'openai'
    });
  });

  it('compares domain_ref authorization with exact tenant, no-widening classification, subset labels, and exact vendor route', () => {
    const authorization = normalizeDomainRef({
      abacLabels: [
        { key: 'project', value: 'rosetta' },
        { key: 'role', value: 'researcher' }
      ],
      classification: 'restricted',
      tenantId: 'entif-ai',
      vendorRoute: 'openai'
    });
    const request = normalizeDomainRef({
      abacLabels: { project: 'rosetta' },
      classification: 'confidential',
      tenantId: 'entif-ai',
      vendorRoute: 'openai'
    });

    expect(compareDomainRefs(authorization, request)).toEqual({ ok: true, reasons: [] });
  });

  it('denies cross-domain reuse unless an explicit bridge policy is supplied', () => {
    const authorization = normalizeDomainRef({
      abacLabels: { project: 'rosetta' },
      classification: 'confidential',
      tenantId: 'entif-ai'
    });
    const request = normalizeDomainRef({
      abacLabels: { project: 'rosetta' },
      classification: 'confidential',
      tenantId: 'other-tenant'
    });

    expect(compareDomainRefs(authorization, request)).toEqual({
      ok: false,
      reasons: ['TENANT_MISMATCH', 'CROSS_DOMAIN_REUSE_DENIED']
    });
    expect(compareDomainRefs(authorization, request, { bridgePolicyRef: 'policy.cross-domain.entif-to-other' })).toEqual({
      ok: true,
      reasons: ['CROSS_DOMAIN_BRIDGE_AUTHORIZED']
    });
  });

  it('denies classification widening, missing ABAC labels, and vendor-route mismatch', () => {
    const authorization = normalizeDomainRef({
      abacLabels: { project: 'rosetta' },
      classification: 'internal',
      tenantId: 'entif-ai',
      vendorRoute: 'openai'
    });

    expect(
      compareDomainRefs(
        authorization,
        normalizeDomainRef({
          abacLabels: { project: 'rosetta', role: 'operator' },
          classification: 'confidential',
          tenantId: 'entif-ai',
          vendorRoute: 'anthropic'
        })
      )
    ).toEqual({
      ok: false,
      reasons: ['CLASSIFICATION_WIDENING', 'ABAC_LABEL_MISSING:role=operator', 'VENDOR_ROUTE_MISMATCH', 'CROSS_DOMAIN_REUSE_DENIED']
    });
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

  it('models translation evidence as an ambiguity-preserving transport artifact', () => {
    const artifact = buildTranslationEvidence({
      evidenceRefs: ['cidv1-source-evidence'],
      lineageRefs: ['translation-evidence.previous'],
      normalizationProfile: 'doubly-stochastic-v1',
      receiptBundleCid: 'cidv1-receipt-bundle',
      sourceConceptRefs: ['source.a', 'source.b'],
      supersedesRefs: [],
      targetConceptRefs: ['target.x', 'target.y'],
      tolerance: 0.001,
      transport: [
        [0.7, 0.3],
        [0.3, 0.7]
      ],
      validationProfile: 'translation-evidence.v1'
    });

    expect(validatePayload('rosetta.translation_evidence', artifact).ok).toBe(true);
    expect(validateTranslationEvidence(artifact).numerical.ok).toBe(true);
    expect(artifact.artifactCid).toMatch(/^cidv1-sha256-/u);
    expect(artifact.ambiguity.entropy).toBeGreaterThan(0);
  });

  it('models Entif workflow postmortems as scored lifecycle artifacts', () => {
    const artifact = buildPostmortemArtifact({
      envelopeId: 'env.workflow.step.1',
      outcomeClass: 'FAIL',
      receiptChain: ['cidv1-receipt-start', 'cidv1-receipt-eval'],
      reproductionSteps: ['Replay envelope env.workflow.step.1', 'Run evaluator profile entif.v0'],
      rootCause: 'Evaluator confidence fell below the release threshold.',
      stepId: 'step.evaluate',
      suggestedRubricChanges: [
        {
          dimension: 'confidence',
          proposedNewThreshold: 0.92,
          scorecard: 'entif.v0.release'
        }
      ],
      timestamp: '2026-05-04T03:20:00.000Z',
      workflowId: 'workflow.release-check'
    });

    expect(validatePayload('entif.postmortem_artifact', artifact).ok).toBe(true);
    expect(validatePostmortemArtifact(artifact).ok).toBe(true);
    expect(artifact.artifactCid).toMatch(/^cidv1-sha256-/u);
    expect(artifact.review.humanReviewRequired).toBe(true);
    expect(artifact.retention.warmDays).toBe(90);
    expect(shouldGeneratePostmortem('FAIL')).toBe(true);
    expect(shouldGeneratePostmortem('PARTIAL')).toBe(true);
    expect(shouldGeneratePostmortem('PASS')).toBe(false);
  });

  it('builds universal intake envelopes with canonical URLs and receipt hashes', () => {
    const envelope = buildIntakeEnvelope({
      contentPointer: 'https://example.com/article?utm_source=feed',
      itemUrl: 'https://example.com/article?utm_source=newsletter&fbclid=abc&ref=keep',
      rawExcerpt: 'Read this immediately. Consider using receipts.',
      retrievedAt: '2026-05-04T03:30:00.000Z',
      sourceName: 'example-feed',
      sourceType: 'rss',
      title: 'Receipts-first intake'
    });

    expect(validatePayload('entif.intake_envelope', envelope).ok).toBe(true);
    expect(validateIntakeEnvelope(envelope).ok).toBe(true);
    expect(envelope.itemUrl).toBe('https://example.com/article?ref=keep');
    expect(envelope.receipts.itemHash).toMatch(/^cidv1-sha256-/u);
    expect(envelope.normalized.highSignalImperatives).toEqual(['Read this immediately.', 'Consider using receipts.']);
  });

  it('does not fragment imperative signals across abbreviation periods', () => {
    const envelope = buildIntakeEnvelope({
      contentPointer: 'https://example.com/report',
      itemUrl: 'https://example.com/report',
      rawExcerpt: 'Read Dr. Smith et al. before acting. Use p. 42 as source.',
      retrievedAt: '2026-05-04T03:40:00.000Z',
      sourceName: 'manual-drop',
      sourceType: 'manual',
      title: 'Abbreviation report'
    });

    expect(envelope.normalized.highSignalImperatives).toEqual([
      'Read Dr. Smith et al. before acting.',
      'Use p. 42 as source.'
    ]);
  });

  it('builds daily top shelf digests with the required 3/2/1/1 structure', () => {
    const digest = buildDailyTopShelfDigest({
      date: '2026-05-04',
      deliveredTo: 'telegram:crates',
      generatedAt: '2026-05-04T10:00:00.000Z',
      slots: {
        actThisWeek: [
          { action: 'Prototype the adapter.', source: 'HF sweep', title: 'Adapter paper', why: 'It removes an integration blocker.' },
          { action: 'Open a design note.', source: 'HF sweep', title: 'Routing result', why: 'It changes route scoring.' },
          { action: 'Add to backlog.', source: 'HF sweep', title: 'Eval harness', why: 'It gives a cheap validation path.' }
        ],
        designDecisionChange: {
          decision: 'Prefer parse-only intake before deep ingest.',
          source: 'HF sweep',
          title: 'Pipeline study',
          why: 'It reduces wasted full-text fetches.'
        },
        riskToTrack: {
          source: 'HF sweep',
          title: 'Provider pricing shift',
          watch: 'Token cost changes over the next two sweeps.',
          why: 'It could make the daily sweep exceed budget.'
        },
        storeForLater: [
          { source: 'HF sweep', title: 'Long horizon model', why: 'Relevant but not actionable this week.' },
          { source: 'HF sweep', title: 'Reference implementation', why: 'Useful as a future fixture.' }
        ]
      }
    });

    expect(validatePayload('entif.daily_top_shelf_digest', digest).ok).toBe(true);
    expect(validateDailyTopShelfDigest(digest).ok).toBe(true);
    expect(digest.artifactName).toBe('daily-top-shelf-2026-05-04');
    expect(digest.artifactCid).toMatch(/^cidv1-sha256-/u);
    expect(digest.slots.actThisWeek).toHaveLength(3);
    expect(digest.slots.storeForLater).toHaveLength(2);
  });

  it('keeps escalated daily digest items outside the 3/2/1/1 slots', () => {
    const digest = buildDailyTopShelfDigest({
      date: '2026-05-04',
      escalated: [{ action: 'Page the operator.', source: 'watchlist', title: 'Critical provider outage', why: 'Sweep input is unavailable.' }],
      generatedAt: '2026-05-04T10:00:00.000Z',
      slots: {
        actThisWeek: [
          { action: 'A', source: 's', title: 'a', why: 'w' },
          { action: 'B', source: 's', title: 'b', why: 'w' },
          { action: 'C', source: 's', title: 'c', why: 'w' }
        ],
        designDecisionChange: { decision: 'Change decision.', source: 's', title: 'd', why: 'w' },
        riskToTrack: { source: 's', title: 'r', watch: 'Watch the constraint.', why: 'w' },
        storeForLater: [
          { source: 's', title: 'x', why: 'w' },
          { source: 's', title: 'y', why: 'w' }
        ]
      }
    });

    expect(digest.escalated).toHaveLength(1);
    expect(digest.slots.actThisWeek).toHaveLength(3);
  });

  it('rejects daily digests that degrade into incomplete link lists', () => {
    const result = validateDailyTopShelfDigest({
      artifactCid: 'cidv1-sha256-demo',
      artifactName: 'daily-top-shelf-2026-05-04',
      date: '2026-05-04',
      generatedAt: 'bad-date',
      slots: {
        actThisWeek: [{ action: '', source: 's', title: 'only one', why: '' }],
        designDecisionChange: { decision: '', source: 's', title: 'd', why: 'w' },
        riskToTrack: { source: 's', title: 'r', watch: '', why: 'w' },
        storeForLater: [{ source: 's', title: 'x', why: 'w' }]
      }
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContain('DailyTopShelfDigest must include exactly 3 actThisWeek items.');
    expect(result.errors).toContain('DailyTopShelfDigest must include exactly 2 storeForLater items.');
    expect(result.errors).toContain('DailyTopShelfDigest generatedAt must be an ISO-8601 timestamp.');
    expect(result.errors).toContain('Act item 0 must include why and action.');
    expect(result.errors).toContain('Design decision change must name the changed decision.');
    expect(result.errors).toContain('Risk to track must identify what is being watched.');
  });

  it('retains content pointers for pending deep ingest and rejects missing receipt metadata', () => {
    const result = validateIntakeEnvelope({
      contentPointer: '',
      itemUrl: 'not-a-url',
      rawExcerpt: 'Preview only.',
      receipts: {},
      retrievedAt: 'not-a-date',
      sourceName: 'manual-drop',
      sourceType: 'manual',
      title: 'Manual note'
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContain('IntakeEnvelope contentPointer is required even when full-text fetch fails.');
    expect(result.errors).toContain('IntakeEnvelope receipts.itemHash is required.');
    expect(result.errors).toContain('IntakeEnvelope itemUrl must be a URL.');
    expect(result.errors).toContain('IntakeEnvelope retrievedAt must be an ISO-8601 timestamp.');
  });

  it('rejects incomplete Entif postmortems', () => {
    const result = validatePostmortemArtifact({
      envelopeId: 'env.workflow.step.1',
      outcomeClass: 'PARTIAL',
      receiptChain: [],
      reproductionSteps: [],
      rootCause: '',
      stepId: 'step.evaluate',
      timestamp: 'not-a-date',
      workflowId: 'workflow.release-check'
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContain('Postmortem rootCause is required.');
    expect(result.errors).toContain('Postmortem reproductionSteps must include at least one step.');
    expect(result.errors).toContain('Postmortem receiptChain must include at least one receipt id.');
    expect(result.errors).toContain('Postmortem timestamp must be an ISO-8601 timestamp.');
  });

  it('rejects translation evidence with negative transport mass', () => {
    const result = validateTranslationEvidence({
      evidenceRefs: ['cidv1-source-evidence'],
      lineageRefs: [],
      normalizationProfile: 'doubly-stochastic-v1',
      receiptBundleCid: 'cidv1-receipt-bundle',
      sourceConceptRefs: ['source.a'],
      supersedesRefs: [],
      targetConceptRefs: ['target.x', 'target.y'],
      tolerance: 0.001,
      transport: [[1.1, -0.1]],
      validationProfile: 'translation-evidence.v1'
    });

    expect(result.numerical.ok).toBe(false);
    expect(result.numerical.errors).toContain('Transport entry [0,1] must be nonnegative.');
  });

  it('separates structural validation from numerical mass validation', () => {
    const result = validateTranslationEvidence({
      evidenceRefs: ['cidv1-source-evidence'],
      lineageRefs: [],
      normalizationProfile: 'doubly-stochastic-v1',
      receiptBundleCid: 'cidv1-receipt-bundle',
      sourceConceptRefs: ['source.a', 'source.b'],
      supersedesRefs: [],
      targetConceptRefs: ['target.x', 'target.y'],
      tolerance: 0.001,
      transport: [
        [0.9, 0.1],
        [0.9, 0.1]
      ],
      validationProfile: 'translation-evidence.v1'
    });

    expect(result.structural.ok).toBe(true);
    expect(result.numerical.ok).toBe(false);
    expect(result.numerical.errors).toContain('Column 0 mass 1.8 differs from 1 by more than tolerance 0.001.');
  });

  it('composes compatible translation evidence and revalidates closure', () => {
    const first = buildTranslationEvidence({
      evidenceRefs: ['cidv1-source-evidence-a'],
      lineageRefs: [],
      normalizationProfile: 'doubly-stochastic-v1',
      receiptBundleCid: 'cidv1-receipt-a',
      sourceConceptRefs: ['source.a', 'source.b'],
      supersedesRefs: [],
      targetConceptRefs: ['mid.x', 'mid.y'],
      tolerance: 0.001,
      transport: [
        [0.8, 0.2],
        [0.2, 0.8]
      ],
      validationProfile: 'translation-evidence.v1'
    });
    const second = buildTranslationEvidence({
      evidenceRefs: ['cidv1-source-evidence-b'],
      lineageRefs: [],
      normalizationProfile: 'doubly-stochastic-v1',
      receiptBundleCid: 'cidv1-receipt-b',
      sourceConceptRefs: ['mid.x', 'mid.y'],
      supersedesRefs: [],
      targetConceptRefs: ['target.m', 'target.n'],
      tolerance: 0.001,
      transport: [
        [0.6, 0.4],
        [0.4, 0.6]
      ],
      validationProfile: 'translation-evidence.v1'
    });

    const composed = composeTranslationEvidence(first, second);

    expect(composed.sourceConceptRefs).toEqual(['source.a', 'source.b']);
    expect(composed.targetConceptRefs).toEqual(['target.m', 'target.n']);
    expect(validateTranslationEvidence(composed).composition.ok).toBe(true);
  });

  it('registers canonical internal Agentic Messaging schemas for every RFC message family', () => {
    expect(Object.keys(AGENTIC_MESSAGE_TYPE_PROFILES)).toEqual([
      'ACTION_DECISION',
      'ACTION_REQUEST',
      'APPROVAL_REQUEST',
      'APPROVAL_RESPONSE',
      'ARTIFACT_PUBLISH',
      'HEALTH_REPORT',
      'INCIDENT_ENVELOPE',
      'TASK_RECEIPT',
      'WORK_UNIT_UPDATE'
    ]);

    expect(getAgenticMessageSchemaProfile('ACTION_REQUEST')).toMatchObject({
      plane: 'control',
      schemaId: 'entif.agentic-messaging.action-request.v1',
      version: '1.0.0'
    });
    expect(getAgenticMessageSchemaProfile('ACTION_REQUEST')?.nestedComponents).toEqual([
      { field: 'domain_ref', owner: '#711' }
    ]);
    expect(getAgenticMessageSchemaProfile('ACTION_REQUEST')?.migration).toMatchObject({
      additiveChangePolicy: 'minor-compatible',
      breakingChangePolicy: 'new-schema-id-major'
    });
  });

  it('validates signed Agentic Messaging envelopes and rejects unknown types with explicit quarantine reasons', () => {
    const envelope = {
      domain_ref: {
        abacLabels: { project: 'rosetta', role: 'guard' },
        classification: 'restricted',
        tenantId: 'entif-ai',
        vendorRoute: 'openai'
      },
      expires_at: '2026-05-04T15:10:00.000Z',
      issued_at: '2026-05-04T15:00:00.000Z',
      msg_id: '550e8400-e29b-41d4-a716-446655440000',
      msg_type: 'ACTION_REQUEST',
      nonce: 'nonce-001',
      payload_hash: 'sha256:abc123',
      routing_key: 'guard.action.request',
      schema_version: '1.0.0',
      sender: {
        node_id: 'node.guard.mailroom',
        principal_ref: 'iam.principal.guard'
      },
      sig: 'ed25519:signature'
    };

    expect(validateAgenticMessageEnvelope(envelope)).toEqual({
      errors: [],
      ok: true,
      quarantineReasons: [],
      schemaId: 'entif.agentic-messaging.envelope.v1'
    });

    expect(
      validateAgenticMessageEnvelope({
        ...envelope,
        msg_type: 'UNKNOWN_MESSAGE'
      })
    ).toMatchObject({
      ok: false,
      quarantineReasons: ['UNKNOWN_MESSAGE_TYPE']
    });
  });

  it('maps msg_type to schema validation results and mailroom quarantine reasons deterministically', () => {
    const result = validateAgenticMessagePayload('ACTION_REQUEST', {
      actionId: 'action.exec.tool',
      capabilityRef: 'capability.guard.exec',
      justification: 'Need guarded execution.'
    });

    expect(result).toMatchObject({
      ok: false,
      quarantineReasons: ['SCHEMA_INVALID'],
      schemaId: 'entif.agentic-messaging.action-request.v1'
    });
    expect(result.errors).toContain('ACTION_REQUEST missing required field: iamDecisionRef');
    expect(AGENTIC_MAILROOM_VALIDATION_CHECKLIST).toContainEqual({
      failureReasons: ['UNKNOWN_MESSAGE_TYPE', 'SCHEMA_INVALID'],
      stage: 'schema-validate'
    });
  });
});

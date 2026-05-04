import { describe, expect, it } from 'vitest';

import { evaluateGuard, evaluatePrivacyBudget } from './rosetta-guard.js';

describe('rosetta-guard', () => {
  it('denies side effects under parse-only default', () => {
    const decision = evaluateGuard(
      {
        action: 'write.file',
        mode: 'parse-only',
        resource: 'workspace://entif-ai',
        sideEffect: true
      },
      []
    );

    expect(decision.payload.effect).toBe('deny');
  });

  it('allows explicitly permitted parse-only reads', () => {
    const decision = evaluateGuard(
      {
        action: 'read.file',
        mode: 'parse-only',
        resource: 'workspace://entif-ai/docs',
        sideEffect: false
      },
      [{ actionPattern: 'read.', effect: 'allow', id: 'policy.read-only', mode: 'parse-only', resourcePattern: 'workspace://' }]
    );

    expect(decision.payload.effect).toBe('allow');
    expect(decision.payload.policyIds).toContain('policy.read-only');
  });

  it('blocks disclosures whose cumulative privacy budget exceeds the policy threshold', () => {
    const decision = evaluatePrivacyBudget({
      fields: [
        { dataClass: 'proprietary', field: 'crop_type', risk: 0.3 },
        { dataClass: 'proprietary', field: 'price', risk: 0.45 },
        { dataClass: 'proprietary', field: 'market_time', risk: 0.2 }
      ],
      maxCumulativeRisk: 0.8
    });

    expect(decision.effect).toBe('deny');
    expect(decision.reasonCodes).toContain('PRIVACY_BUDGET_EXCEEDED');
  });

  it('treats correlated fields as one disclosure unit instead of independent substitutions', () => {
    const decision = evaluatePrivacyBudget({
      correlationGroups: [
        {
          fields: ['crop_type', 'price', 'market_time'],
          groupId: 'commodity-join',
          risk: 0.9
        }
      ],
      fields: [
        { dataClass: 'proprietary', field: 'crop_type', risk: 0.1 },
        { dataClass: 'proprietary', field: 'price', risk: 0.1 },
        { dataClass: 'proprietary', field: 'market_time', risk: 0.1 }
      ],
      maxCumulativeRisk: 0.8
    });

    expect(decision.effect).toBe('deny');
    expect(decision.disclosureUnits).toEqual([
      {
        fields: ['crop_type', 'price', 'market_time'],
        id: 'commodity-join',
        risk: 0.9
      }
    ]);
  });

  it('denies disallowed cross-boundary field combinations per data class', () => {
    const decision = evaluatePrivacyBudget({
      boundaryRules: [
        {
          dataClass: 'pii',
          deniedCombinations: [['zip_code', 'birth_date']]
        }
      ],
      fields: [
        { dataClass: 'pii', field: 'zip_code', risk: 0.15 },
        { dataClass: 'pii', field: 'birth_date', risk: 0.2 }
      ],
      maxCumulativeRisk: 0.8
    });

    expect(decision.effect).toBe('deny');
    expect(decision.reasonCodes).toContain('DENIED_FIELD_COMBINATION');
  });

  it('counts request-pattern leakage against the same privacy budget', () => {
    const decision = evaluatePrivacyBudget({
      fields: [{ dataClass: 'financial', field: 'benefit_claim_type', risk: 0.2 }],
      maxCumulativeRisk: 0.8,
      trafficPattern: {
        frequencyRisk: 0.7,
        window: 'PT1H'
      }
    });

    expect(decision.effect).toBe('deny');
    expect(decision.reasonCodes).toContain('TRAFFIC_PATTERN_RISK');
  });
});

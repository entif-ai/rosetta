import { describe, expect, it } from 'vitest';

import { evaluateGuard } from './rosetta-guard.js';

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
});

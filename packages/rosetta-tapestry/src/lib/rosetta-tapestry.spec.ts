import { describe, expect, it } from 'vitest';

import { compileReceiptBundleTapestry } from './rosetta-tapestry.js';

describe('rosetta-tapestry', () => {
  it('compiles receipt-bundle closure into a tapestry tile', () => {
    const tapestry = compileReceiptBundleTapestry('receipt-1', ['subject-1'], ['evidence-1'], ['policy-1']);

    expect(tapestry.kind).toBe('rosetta.tapestry');
    expect(tapestry.payload.totalTokens).toBeGreaterThan(0);
  });
});

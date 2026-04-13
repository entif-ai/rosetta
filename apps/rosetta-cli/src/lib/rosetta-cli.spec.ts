import { describe, expect, it } from 'vitest';

import { buildRosettaCliOutput } from './rosetta-cli.js';

describe('rosetta-cli', () => {
  it('builds a bootstrap output with verified receipts and read-only projections', () => {
    const output = buildRosettaCliOutput();

    expect(output.receiptBundleVerification.ok).toBe(true);
    expect(output.signedReceiptVerification.ok).toBe(true);
    expect(output.ob1.mutable).toBe(false);
    expect(output.prism.viewMode).toBe('shadow-memory');
    expect(output.missionControl.viewMode).toBe('operator-shell');
  });
});

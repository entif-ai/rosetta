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

  it('exposes deterministic Bootstrap Gate verification evidence', () => {
    const output = buildRosettaCliOutput();

    expect(output).not.toHaveProperty('guardlessNote');
    expect(output.bootstrapGate.status).toBe('pass');
    expect(output.bootstrapGate.guard.effect).toBe('allow');
    expect(output.bootstrapGate.echoOutput).toBe(output.bootstrapGate.canonicalInput);
    expect(output.bootstrapGate.receiptBundleVerification.ok).toBe(true);
    expect(output.bootstrapGate.steps.map((step) => step.id)).toEqual([
      'canonicalize-input',
      'compute-cid',
      'guard-decision',
      'execute-builtin-echo',
      'mint-observation',
      'emit-receipt',
      'compile-closure',
      'verify-chain'
    ]);
  });

  it('includes schema catalog inspection data without promoting reserved interfaces', () => {
    const output = buildRosettaCliOutput();

    expect(output.schemaCatalog).toMatchObject({
      entries: expect.arrayContaining([
        expect.objectContaining({
          exposureStatus: 'downstream-contract',
          schemaId: 'entif.agentic-messaging.envelope.v1'
        }),
        expect.objectContaining({
          exposureStatus: 'reserved-interface',
          schemaId: 'entif.iam.decision.ref'
        })
      ])
    });
  });
});

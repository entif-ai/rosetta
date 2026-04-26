import { describe, expect, it } from 'vitest';

import { buildTile } from '@entif-ai/rosetta-core';
import { InMemoryTileStore } from '@entif-ai/rosetta-store';

import { buildReceiptBundle, createReceipt, createSigningKeyPair, digestTile, signReceiptEd25519, verifyReceiptBundle, verifySignedReceipt } from './rosetta-receipts.js';

describe('rosetta-receipts', () => {
  it('signs and verifies an RRP receipt', () => {
    const run = buildTile('rosetta.run', { runId: 'run.demo', summary: 'demo', tags: ['bootstrap'] });
    const receipt = createReceipt({
      claims: [
        {
          claimType: 'rrp:claim.executed',
          evidence: [{ cid: run.cid }],
          statement: 'Run tile emitted.',
          verdict: 'pass'
        }
      ],
      digests: [digestTile(run, 'run.canonical')],
      policyRefs: [],
      receiptType: 'rrp:operation',
      subjects: [{ cid: run.cid, role: 'rrp:subject.run' }]
    });
    const keys = createSigningKeyPair();
    const signed = signReceiptEd25519(receipt, keys.privateKey, keys.publicKeyPem);

    expect(verifySignedReceipt(signed).ok).toBe(true);
  });

  it('rejects incomplete receipt bundles', () => {
    const subject = buildTile('rosetta.run', { runId: 'run.demo', summary: 'demo', tags: ['bootstrap'] });
    const receipt = createReceipt({
      claims: [{ claimType: 'rrp:claim.executed', evidence: [{ cid: subject.cid }], statement: 'ok', verdict: 'pass' }],
      digests: [digestTile(subject, 'run.canonical')],
      policyRefs: ['policy.missing'],
      receiptType: 'rrp:operation',
      subjects: [{ cid: subject.cid }]
    });

    const store = new InMemoryTileStore();
    store.put(subject);
    store.put(receipt);

    expect(verifyReceiptBundle(buildReceiptBundle(receipt), store).ok).toBe(false);
  });
});

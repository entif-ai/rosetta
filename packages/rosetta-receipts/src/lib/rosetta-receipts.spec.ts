import { describe, expect, it } from 'vitest';

import { buildTile } from '@entif-ai/rosetta-core';
import { InMemoryTileStore } from '@entif-ai/rosetta-store';

import {
  buildReceiptBundle,
  createFinalizeAnswerEvent,
  createPartialResultTile,
  createReceipt,
  createSigningKeyPair,
  createTerminationReceipt,
  digestTile,
  signReceiptEd25519,
  verifyReceiptBundle,
  verifySignedReceipt
} from './rosetta-receipts.js';

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

  it('creates a typed FinalizeAnswer event with guard checkpoint evidence', () => {
    const answer = buildTile('rosetta.observation', { observationId: 'answer.final', signal: 'done', source: 'rlm' });
    const guard = buildTile('guard.decision_token', {
      action: 'FinalizeAnswer',
      effect: 'allow',
      expiresAt: '2026-05-04T04:00:00.000Z',
      mode: 'live',
      policyIds: ['policy.rlm.finalize'],
      reason: 'final answer accepted',
      resource: answer.cid,
      tokenId: 'guard.finalize.allow'
    });

    const event = createFinalizeAnswerEvent({
      guardDecisionCid: guard.cid,
      tileCid: answer.cid,
      terminationType: 'normal'
    });

    expect(event.kind).toBe('rosetta.toolcall');
    expect(event.payload.tool).toBe('FinalizeAnswer');
    expect(event.payload.args).toMatchObject({
      guard_decision_cid: guard.cid,
      tile_cid: answer.cid,
      termination_type: 'normal'
    });
  });

  it('creates a signed termination receipt bound to the final answer event', () => {
    const answer = buildTile('rosetta.observation', { observationId: 'answer.final', signal: 'done', source: 'rlm' });
    const event = createFinalizeAnswerEvent({
      guardDecisionCid: 'cidv1-guard-finalize',
      tileCid: answer.cid,
      terminationType: 'normal'
    });
    const receipt = createTerminationReceipt({ answerTileCid: answer.cid, finalizeEvent: event });
    const keys = createSigningKeyPair();

    const signed = signReceiptEd25519(receipt, keys.privateKey, keys.publicKeyPem);

    expect(receipt.payload.receiptType).toBe('rlm.termination');
    expect(receipt.payload.claims[0]).toMatchObject({
      claimType: 'rlm.finalized',
      verdict: 'pass'
    });
    expect(receipt.payload.policyRefs).toContain('cidv1-guard-finalize');
    expect(verifySignedReceipt(signed).ok).toBe(true);
  });

  it('returns a partial-result tile and hard-stop receipt when max iterations are reached', () => {
    const partial = createPartialResultTile({
      completed: ['retrieved context', 'drafted answer'],
      outstandingWork: ['final verification'],
      partialTrace: ['step:retrieve', 'step:draft'],
      reason: 'max iterations reached',
      runCid: 'cidv1-run-rlm'
    });
    const event = createFinalizeAnswerEvent({
      guardDecisionCid: 'cidv1-guard-hard-stop',
      tileCid: partial.cid,
      terminationType: 'hard-stop'
    });
    const receipt = createTerminationReceipt({ answerTileCid: partial.cid, finalizeEvent: event });

    expect(partial.kind).toBe('rosetta.rlm_partial_result');
    expect(partial.payload).toMatchObject({
      completed: ['retrieved context', 'drafted answer'],
      outstandingWork: ['final verification'],
      terminationType: 'hard-stop'
    });
    expect(receipt.payload.claims[0]).toMatchObject({
      claimType: 'rlm.hard_stop',
      verdict: 'partial'
    });
  });
});

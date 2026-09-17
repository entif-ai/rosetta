import { createPrivateKey, createPublicKey, generateKeyPairSync, sign as cryptoSign, verify as cryptoVerify, type KeyObject } from 'node:crypto';

import { sha256Hex } from '@entif-ai/rosetta-cid';
import { buildTile, verifyTileIntegrity, type TileEnvelope } from '@entif-ai/rosetta-core';
import { validatePayload } from '@entif-ai/rosetta-schemas';
import type { InMemoryTileStore } from '@entif-ai/rosetta-store';

export type ReceiptVerdict = 'deny' | 'fail' | 'partial' | 'pass' | 'unknown';

export interface ReceiptSubjectRef {
  cid: string;
  role?: string;
}

export interface ReceiptEvidenceRef {
  cid: string;
  span?: string;
}

export interface ReceiptClaim {
  claimType: string;
  confidence?: number;
  evidence: ReceiptEvidenceRef[];
  statement: string;
  verdict: ReceiptVerdict;
}

export interface ReceiptDigest {
  alg: 'sha256';
  cidRef?: string;
  digest: string;
  of: string;
}

export interface ReceiptPayload {
  claims: ReceiptClaim[];
  digests: ReceiptDigest[];
  policyRefs: string[];
  receiptType: string;
  subjects: ReceiptSubjectRef[];
}

export interface Ed25519ReceiptSignature {
  algorithm: 'ed25519';
  keyId: string;
  publicKeyPem: string;
  signatureBase64: string;
  signedCid: string;
}

export interface SignedReceiptEnvelope {
  receipt: TileEnvelope<ReceiptPayload>;
  signature: Ed25519ReceiptSignature;
}

export interface ReceiptBundle {
  bundleId: string;
  closureCids: string[];
  evidenceCids: string[];
  policyCids: string[];
  receiptCid: string;
  subjectCids: string[];
}

export type RlmTerminationType = 'error' | 'hard-stop' | 'normal' | 'timeout';

export interface FinalizeAnswerArgs {
  guard_decision_cid: string;
  tile_cid: string;
  termination_type: RlmTerminationType;
}

export interface FinalizeAnswerPayload {
  args: FinalizeAnswerArgs;
  tool: 'FinalizeAnswer';
  toolCallId: string;
}

export interface CreateFinalizeAnswerEventInput {
  guardDecisionCid: string;
  tileCid: string;
  terminationType: RlmTerminationType;
}

export interface PartialResultPayload {
  completed: string[];
  outstandingWork: string[];
  partialTrace: string[];
  reason: string;
  runCid: string;
  terminationType: 'hard-stop' | 'timeout';
}

export interface CreatePartialResultInput {
  completed: string[];
  outstandingWork: string[];
  partialTrace: string[];
  reason: string;
  runCid: string;
  terminationType?: 'hard-stop' | 'timeout';
}

export interface CreateTerminationReceiptInput {
  answerTileCid: string;
  finalizeEvent: TileEnvelope<FinalizeAnswerPayload>;
}

function normalizeKeyObject(key: KeyObject | string, kind: 'private' | 'public'): KeyObject {
  if (typeof key !== 'string') {
    return key;
  }

  return kind === 'private' ? createPrivateKey(key) : createPublicKey(key);
}

export function createReceipt(payload: ReceiptPayload): TileEnvelope<ReceiptPayload> {
  return buildTile('rosetta.receipt', payload, { pack: 'rrp' });
}

/** A reason-qualified lifecycle outcome, not an additional receipt verdict. */
export type LifecycleOutcome = ReceiptVerdict | 'blocked-precondition';

export interface CreateLifecycleReceiptInput {
  run: TileEnvelope;
  step: TileEnvelope;
  artifacts: TileEnvelope[];
  check: TileEnvelope;
  policies: TileEnvelope[];
  outcome: LifecycleOutcome;
  statement: string;
}

/** Attest a bounded check; this neither executes nor authorizes its subject. */
export function createLifecycleReceipt(input: CreateLifecycleReceiptInput): TileEnvelope<ReceiptPayload> {
  const verdict: ReceiptVerdict = input.outcome === 'blocked-precondition' ? 'unknown' : input.outcome;
  if (!['deny', 'fail', 'partial', 'pass', 'unknown'].includes(verdict)) {
    throw new Error('Unsupported lifecycle verdict.');
  }
  if (input.run.kind !== 'rosetta.run' || input.step.kind !== 'rosetta.action') {
    throw new Error('Lifecycle requires a run and action step.');
  }
  if (input.artifacts.length === 0) throw new Error('Lifecycle requires an artifact subject.');
  if (!input.statement.trim()) throw new Error('Lifecycle requires a statement.');
  const tiles = [input.run, input.step, ...input.artifacts, input.check, ...input.policies];
  for (const tile of tiles) {
    if (typeof tile.payload !== 'object' || tile.payload === null || Array.isArray(tile.payload)) {
      throw new Error('Lifecycle payload must be an object.');
    }
    if (!verifyTileIntegrity(tile).ok) throw new Error(`Lifecycle tile integrity failed: ${tile.cid}`);
    const validation = validatePayload(tile.kind, tile.payload);
    if (!validation.ok) throw new Error(`Lifecycle payload invalid: ${validation.errors.join('; ')}`);
  }
  if ((input.step.payload as { runCid?: string }).runCid !== input.run.cid) {
    throw new Error('Lifecycle step must reference its run.');
  }
  if (input.check.kind !== 'rosetta.evaluation' || (input.check.payload as { verdict?: string }).verdict !== verdict) {
    throw new Error('Lifecycle check kind or verdict mismatch.');
  }
  if (![input.step.cid, ...input.artifacts.map((tile) => tile.cid)].every((cid) => input.check.parents.includes(cid))) {
    throw new Error('Lifecycle check parents must bind the step and every artifact subject.');
  }
  return createReceipt({
    claims: [{
      claimType: `rrp:lifecycle.${input.outcome}`,
      evidence: [{ cid: input.check.cid }],
      statement: input.statement,
      verdict
    }],
    digests: [...new Map(tiles.map((tile) => [tile.cid, tile])).values()].map((tile) => digestTile(tile, tile.kind)),
    policyRefs: input.policies.map((tile) => tile.cid),
    receiptType: 'rrp:lifecycle.v1',
    subjects: [
      { cid: input.run.cid, role: 'rrp:subject.session' },
      { cid: input.step.cid, role: 'rrp:subject.step' },
      ...input.artifacts.map((tile) => ({ cid: tile.cid, role: 'rrp:subject.artifact' }))
    ]
  });
}

export function digestTile(tile: TileEnvelope, label: string): ReceiptDigest {
  return {
    alg: 'sha256',
    cidRef: tile.cid,
    digest: sha256Hex(tile.canonical),
    of: label
  };
}

export function createSigningKeyPair(): { privateKey: KeyObject; publicKeyPem: string } {
  const { privateKey, publicKey } = generateKeyPairSync('ed25519');
  return {
    privateKey,
    publicKeyPem: publicKey.export({ format: 'pem', type: 'spki' }).toString()
  };
}

export function createFinalizeAnswerEvent(input: CreateFinalizeAnswerEventInput): TileEnvelope<FinalizeAnswerPayload> {
  return buildTile(
    'rosetta.toolcall',
    {
      args: {
        guard_decision_cid: input.guardDecisionCid,
        tile_cid: input.tileCid,
        termination_type: input.terminationType
      },
      tool: 'FinalizeAnswer',
      toolCallId: `FinalizeAnswer.${input.tileCid.slice(-12)}`
    },
    { pack: 'rrp.rlm' }
  );
}

export function createPartialResultTile(input: CreatePartialResultInput): TileEnvelope<PartialResultPayload> {
  return buildTile(
    'rosetta.rlm_partial_result',
    {
      completed: [...input.completed],
      outstandingWork: [...input.outstandingWork],
      partialTrace: [...input.partialTrace],
      reason: input.reason,
      runCid: input.runCid,
      terminationType: input.terminationType ?? 'hard-stop'
    },
    { pack: 'rrp.rlm' }
  );
}

export function createTerminationReceipt(input: CreateTerminationReceiptInput): TileEnvelope<ReceiptPayload> {
  const terminationType = input.finalizeEvent.payload.args.termination_type;
  const hardStop = terminationType !== 'normal';

  return createReceipt({
    claims: [
      {
        claimType: hardStop ? `rlm.${terminationType.replace('-', '_')}` : 'rlm.finalized',
        evidence: [{ cid: input.finalizeEvent.cid }],
        statement: hardStop ? `RLM trajectory terminated with ${terminationType}.` : 'RLM trajectory finalized with FinalizeAnswer.',
        verdict: hardStop ? 'partial' : 'pass'
      }
    ],
    digests: [digestTile(input.finalizeEvent, 'rlm.finalize_answer_event')],
    policyRefs: [input.finalizeEvent.payload.args.guard_decision_cid],
    receiptType: 'rlm.termination',
    subjects: [{ cid: input.answerTileCid, role: 'rlm.subject.answer' }]
  });
}

export function signReceiptEd25519(
  receipt: TileEnvelope<ReceiptPayload>,
  privateKey: KeyObject | string,
  publicKeyPem: string,
  keyId = 'rrp.local.ed25519'
): SignedReceiptEnvelope {
  const privateKeyObject = normalizeKeyObject(privateKey, 'private');
  const signature = cryptoSign(null, Buffer.from(receipt.cid, 'utf8'), privateKeyObject).toString('base64');

  return {
    receipt,
    signature: {
      algorithm: 'ed25519',
      keyId,
      publicKeyPem,
      signatureBase64: signature,
      signedCid: receipt.cid
    }
  };
}

export function verifySignedReceipt(signedReceipt: SignedReceiptEnvelope): { errors: string[]; ok: boolean } {
  const errors = [
    ...verifyTileIntegrity(signedReceipt.receipt).errors,
    ...validatePayload(signedReceipt.receipt.kind, signedReceipt.receipt.payload).errors
  ];

  if (signedReceipt.signature.signedCid !== signedReceipt.receipt.cid) {
    errors.push('Signature CID binding mismatch.');
  }

  const publicKeyObject = normalizeKeyObject(signedReceipt.signature.publicKeyPem, 'public');
  const verified = cryptoVerify(
    null,
    Buffer.from(signedReceipt.receipt.cid, 'utf8'),
    publicKeyObject,
    Buffer.from(signedReceipt.signature.signatureBase64, 'base64')
  );

  if (!verified) {
    errors.push('Receipt signature verification failed.');
  }

  return {
    errors,
    ok: errors.length === 0
  };
}

export function buildReceiptBundle(receipt: TileEnvelope<ReceiptPayload>): ReceiptBundle {
  const subjectCids = receipt.payload.subjects.map((subject) => subject.cid);
  const evidenceCids = receipt.payload.claims.flatMap((claim) => claim.evidence.map((evidence) => evidence.cid));
  const policyCids = [...receipt.payload.policyRefs];
  const closureCids = [...new Set([receipt.cid, ...subjectCids, ...evidenceCids, ...policyCids])];

  return {
    bundleId: `bundle.${receipt.cid.slice(-12)}`,
    closureCids,
    evidenceCids: [...new Set(evidenceCids)],
    policyCids,
    receiptCid: receipt.cid,
    subjectCids
  };
}

export function verifyReceiptBundle(bundle: ReceiptBundle, store: InMemoryTileStore): { errors: string[]; ok: boolean } {
  const errors = bundle.closureCids.filter((cid) => !store.has(cid)).map((cid) => `Missing closure member: ${cid}`);
  return {
    errors,
    ok: errors.length === 0
  };
}

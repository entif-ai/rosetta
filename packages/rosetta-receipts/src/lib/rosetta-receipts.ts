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

/**
 * First-wave promotion states. See docs/spec/PROMOTION_TRANSITION_CONTRACT.md.
 * The set is intentionally narrow; later lanes may extend it through additive schemas.
 */
export type PromotionState =
  | 'pending-confirmation'
  | 'active'
  | 'promoted'
  | 'cooled'
  | 'quarantined'
  | 'pending-revisit'
  | 'superseded';

/**
 * Allowed transition kinds. A transition is legal only if it appears in
 * PROMOTION_TRANSITIONS with the expected prior state.
 */
export type PromotionTransitionKind =
  | 'confirm'
  | 'promote'
  | 'cool'
  | 'quarantine'
  | 'revisit'
  | 'activate'
  | 'supersede';

/**
 * Default-deny transition allow-list. Anything not in this map throws.
 */
export const PROMOTION_TRANSITIONS: Readonly<Record<PromotionTransitionKind, readonly PromotionState[]>> = Object.freeze({
  activate: Object.freeze(['cooled', 'pending-revisit'] as const),
  confirm: Object.freeze(['pending-confirmation'] as const),
  cool: Object.freeze(['active'] as const),
  promote: Object.freeze(['active'] as const),
  quarantine: Object.freeze(['active'] as const),
  revisit: Object.freeze(['active', 'quarantined'] as const),
  supersede: Object.freeze(['active', 'promoted'] as const)
});

/**
 * Blocked-precondition is mapped onto the existing verdict union (#158).
 * - 'soft' closes onto 'unknown' (may resolve through evidence closure)
 * - 'hard' closes onto 'deny' (rights/policy backing missing)
 */
export type PromotionBlockKind = 'soft' | 'hard';

export interface PromotionTransitionBlocked {
  block: PromotionBlockKind;
  kind: PromotionTransitionKind;
  reason: string;
}

export interface PromotionTransitionApplied {
  fromState: PromotionState;
  kind: PromotionTransitionKind;
  nextState: PromotionState;
  nextStateTile: TileEnvelope;
  receipt: TileEnvelope<ReceiptPayload>;
}

export type PromotionTransitionResult = PromotionTransitionApplied | PromotionTransitionBlocked;

export interface CreatePromotionTransitionInput {
  /** Subject being transitioned (the derived artifact or the source artifact it points at). */
  subject: TileEnvelope;
  /** Current promotion state of the subject. */
  priorState: PromotionState;
  /** Transition kind requested. */
  kind: PromotionTransitionKind;
  /** Evidence closure: the source observation, canonical artifact, trust matrix, evaluation tiles. */
  evidenceRefs: TileEnvelope[];
  /** Policy tiles backing the transition. */
  policies: TileEnvelope[];
  /** Lane-local evaluation vectors; preserved as evidence, never collapsed into a scalar. */
  evaluationVectors?: TileEnvelope[];
  /** Optional reason the transition is being applied. */
  reason?: string;
}

/**
 * Apply a promotion transition. Emits a typed receipt over the existing receipt family.
 * Does NOT mutate the subject, the evidence, or any artifact on the closure.
 */
export function createPromotionTransition(input: CreatePromotionTransitionInput): PromotionTransitionResult {
  if (!verifyTileIntegrity(input.subject).ok) {
    throw new Error('Promotion subject integrity failed.');
  }
  if (input.priorState === 'superseded') {
    return {
      block: 'hard',
      kind: input.kind,
      reason: 'Superseded is a terminal promotion state.'
    };
  }
  const allowedFromStates = PROMOTION_TRANSITIONS[input.kind];
  if (!allowedFromStates.includes(input.priorState)) {
    return {
      block: 'hard',
      kind: input.kind,
      reason: `Transition '${input.kind}' is not allowed from state '${input.priorState}'.`
    };
  }
  if (input.evidenceRefs.length === 0) {
    return {
      block: 'soft',
      kind: input.kind,
      reason: 'Evidence closure is missing; promotion transition cannot be applied.'
    };
  }
  if (input.policies.length === 0) {
    return {
      block: 'hard',
      kind: input.kind,
      reason: 'Policy backing is missing; promotion transition cannot be applied.'
    };
  }
  const closure = [input.subject, ...input.evidenceRefs, ...input.policies, ...(input.evaluationVectors ?? [])];
  for (const tile of closure) {
    if (typeof tile.payload !== 'object' || tile.payload === null || Array.isArray(tile.payload)) {
      throw new Error(`Promotion closure member payload must be an object: ${tile.cid}`);
    }
    if (!verifyTileIntegrity(tile).ok) {
      throw new Error(`Promotion closure member failed integrity: ${tile.cid}`);
    }
    const validation = validatePayload(tile.kind, tile.payload);
    if (!validation.ok) {
      throw new Error(`Promotion closure member failed payload validation: ${validation.errors.join('; ')}`);
    }
  }
  const nextState = nextPromotionState(input.kind, input.priorState);
  if (!nextState) {
    return {
      block: 'hard',
      kind: input.kind,
      reason: `Transition '${input.kind}' produced no next state from '${input.priorState}'.`
    };
  }
  const newStateTile = buildTile('rosetta.observation', {
    observationId: `promotion.${input.kind}.${input.subject.cid.slice(-12)}`,
    signal: `Promotion transition '${input.kind}' applied: ${input.priorState} -> ${nextState}.`,
    source: 'rosetta.promotion'
  }, { pack: 'rrp.rlm' });
  const statement = input.reason?.trim() || `Promotion transition '${input.kind}' applied from '${input.priorState}' to '${nextState}'.`;
  const receipt = createReceipt({
    claims: [{
      claimType: `rrp:promotion.transition.${input.kind}`,
      evidence: input.evidenceRefs.map((tile) => ({ cid: tile.cid })),
      statement,
      verdict: 'pass'
    }],
    digests: [
      digestTile(input.subject, 'rrp:promotion.subject'),
      digestTile(newStateTile, 'rrp:promotion.next_state'),
      ...input.evidenceRefs.map((tile) => digestTile(tile, 'rrp:promotion.evidence'))
    ],
    policyRefs: input.policies.map((tile) => tile.cid),
    receiptType: 'rrp:promotion.transition.v1',
    subjects: [
      { cid: input.subject.cid, role: 'rrp:promotion.subject' },
      { cid: newStateTile.cid, role: 'rrp:promotion.next_state' }
    ]
  });
  return {
    fromState: input.priorState,
    kind: input.kind,
    nextState,
    nextStateTile: newStateTile,
    receipt
  };
}

/**
 * Emit a typed refusal/denial receipt for a blocked promotion transition.
 * Maps the block kind onto the existing verdict union (#158).
 */
export function createPromotionTransitionRefusal(
  input: CreatePromotionTransitionInput,
  block: PromotionBlockKind,
  reason: string
): TileEnvelope<ReceiptPayload> {
  if (input.evidenceRefs.length === 0 && input.policies.length === 0) {
    throw new Error('Refusal requires at least the attempted transition inputs.');
  }
  const verdict: ReceiptVerdict = block === 'hard' ? 'deny' : 'unknown';
  const suffix = block === 'hard' ? '.denied' : '.blocked';
  const closure = [input.subject, ...input.evidenceRefs, ...input.policies];
  for (const tile of closure) {
    if (typeof tile.payload !== 'object' || tile.payload === null || Array.isArray(tile.payload)) {
      throw new Error(`Promotion refusal closure member payload must be an object: ${tile.cid}`);
    }
    if (!verifyTileIntegrity(tile).ok) {
      throw new Error(`Promotion refusal closure member failed integrity: ${tile.cid}`);
    }
    const validation = validatePayload(tile.kind, tile.payload);
    if (!validation.ok) {
      throw new Error(`Promotion refusal closure member failed payload validation: ${validation.errors.join('; ')}`);
    }
  }
  return createReceipt({
    claims: [{
      claimType: `rrp:promotion.transition.${input.kind}${suffix}`,
      evidence: [...input.evidenceRefs, ...input.policies].map((tile) => ({ cid: tile.cid })),
      statement: reason,
      verdict
    }],
    digests: [
      digestTile(input.subject, 'rrp:promotion.subject'),
      ...input.evidenceRefs.map((tile) => digestTile(tile, 'rrp:promotion.evidence')),
      ...input.policies.map((tile) => digestTile(tile, 'rrp:promotion.policy'))
    ],
    policyRefs: input.policies.map((tile) => tile.cid),
    receiptType: 'rrp:promotion.transition.v1',
    subjects: [{ cid: input.subject.cid, role: 'rrp:promotion.subject' }]
  });
}

function nextPromotionState(kind: PromotionTransitionKind, priorState: PromotionState): PromotionState | null {
  if (kind === 'confirm' && priorState === 'pending-confirmation') return 'active';
  if (kind === 'promote' && priorState === 'active') return 'promoted';
  if (kind === 'cool' && priorState === 'active') return 'cooled';
  if (kind === 'quarantine' && priorState === 'active') return 'quarantined';
  if (kind === 'revisit' && priorState === 'active') return 'pending-revisit';
  if (kind === 'revisit' && priorState === 'quarantined') return 'pending-revisit';
  if (kind === 'activate' && (priorState === 'cooled' || priorState === 'pending-revisit')) return 'active';
  if (kind === 'supersede' && (priorState === 'active' || priorState === 'promoted')) return 'superseded';
  return null;
}

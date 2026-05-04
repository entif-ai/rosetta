import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

import type { TileEnvelope } from '@entif-ai/rosetta-core';
import type { CanonicalArtifact } from '@entif-ai/ingress-refinery';
import type { CorrectionEvent } from '@entif-ai/source-substrate';

export interface DedupeProposal {
  layer: 'byte' | 'conceptual' | 'manifestation' | 'record-family';
  memberArtifactCids: string[];
  mergeEligible: boolean;
  reason: string;
}

export interface CanonicalCacheOptions {
  persistencePath?: string;
}

export interface PolicyCacheMetadata {
  authoritativeTimestamp: string;
  entitlementFingerprint: string;
  policyVersion: string;
  sourceBundleHash: string;
  sourceVersion: string;
}

export interface PolicyCacheEntry {
  answerCid: string;
  cacheKey: string;
  createdAt: string;
  expiresAt: string;
  metadata: PolicyCacheMetadata;
}

export type PolicyCacheReasonCode =
  | 'CACHE_HIT'
  | 'CACHE_MISS'
  | 'ENTITLEMENT_CHANGED'
  | 'POLICY_VERSION_CHANGED'
  | 'SOURCE_BUNDLE_HASH_CHANGED'
  | 'SOURCE_SUPERSEDED'
  | 'TTL_EXPIRED';

export interface PolicyCacheEvaluationContext {
  entitlementFingerprint?: string;
  now?: string;
  policyVersion?: string;
  requestId?: string;
  sourceBundleHash?: string;
  supersededSourceVersions?: string[];
}

export interface PolicyCacheEvaluation {
  entry?: PolicyCacheEntry;
  reasonCode: PolicyCacheReasonCode;
  serveable: boolean;
}

export interface PolicyCacheAuditEntry {
  cacheKey: string;
  decision: 'recomputed' | 'served';
  reasonCode: PolicyCacheReasonCode;
  requestId?: string;
}

export interface RevisionGraphNode {
  artifactCid: string;
  parentArtifactCid?: string;
  revisionFingerprint: string;
}

interface PersistedCanonicalCacheState {
  artifacts: [string, TileEnvelope<CanonicalArtifact>][];
  byteIndex: [string, string[]][];
  canonicalArtifactCids: string[];
  conceptualIndex: [string, string[]][];
  contentIndex: [string, string][];
  lifecycleEvents: [string, CorrectionEvent[]][];
  manifestationIndex: [string, string[]][];
  policyCacheAudit?: PolicyCacheAuditEntry[];
  policyCacheEntries?: [string, PolicyCacheEntry][];
  rawEvidenceByCanonicalCid: [string, string[]][];
  recordFamilyIndex: [string, string[]][];
  revisionChains: [string, RevisionGraphNode[]][];
}

export class CanonicalCorpusCache {
  private readonly artifacts = new Map<string, TileEnvelope<CanonicalArtifact>>();
  private readonly byteIndex = new Map<string, string[]>();
  private readonly canonicalArtifactCids: string[] = [];
  private readonly conceptualIndex = new Map<string, string[]>();
  private readonly contentIndex = new Map<string, string>();
  private readonly manifestationIndex = new Map<string, string[]>();
  private readonly rawEvidenceByCanonicalCid = new Map<string, string[]>();
  private readonly recordFamilyIndex = new Map<string, string[]>();
  private readonly revisionChains = new Map<string, RevisionGraphNode[]>();
  private readonly lifecycleEvents = new Map<string, CorrectionEvent[]>();
  private readonly policyCacheAudit: PolicyCacheAuditEntry[] = [];
  private readonly policyCacheEntries = new Map<string, PolicyCacheEntry>();

  constructor(private readonly options: CanonicalCacheOptions = {}) {}

  private static addToIndex(index: Map<string, string[]>, key: string, artifactCid: string): string[] {
    const next = [...(index.get(key) ?? [])];
    if (!next.includes(artifactCid)) {
      next.push(artifactCid);
      index.set(key, next);
    }
    return next;
  }

  private static fromState(state: PersistedCanonicalCacheState, options: CanonicalCacheOptions): CanonicalCorpusCache {
    const cache = new CanonicalCorpusCache(options);

    for (const [key, value] of state.artifacts) cache.artifacts.set(key, value);
    for (const [key, value] of state.byteIndex) cache.byteIndex.set(key, value);
    cache.canonicalArtifactCids.push(...state.canonicalArtifactCids);
    for (const [key, value] of state.conceptualIndex) cache.conceptualIndex.set(key, value);
    for (const [key, value] of state.contentIndex) cache.contentIndex.set(key, value);
    for (const [key, value] of state.lifecycleEvents) cache.lifecycleEvents.set(key, value);
    for (const [key, value] of state.manifestationIndex) cache.manifestationIndex.set(key, value);
    cache.policyCacheAudit.push(...(state.policyCacheAudit ?? []));
    for (const [key, value] of state.policyCacheEntries ?? []) cache.policyCacheEntries.set(key, value);
    for (const [key, value] of state.rawEvidenceByCanonicalCid) cache.rawEvidenceByCanonicalCid.set(key, value);
    for (const [key, value] of state.recordFamilyIndex) cache.recordFamilyIndex.set(key, value);
    for (const [key, value] of state.revisionChains) cache.revisionChains.set(key, value);

    return cache;
  }

  static load(options: CanonicalCacheOptions): CanonicalCorpusCache {
    if (!options.persistencePath || !existsSync(options.persistencePath)) {
      return new CanonicalCorpusCache(options);
    }

    return CanonicalCorpusCache.fromState(
      JSON.parse(readFileSync(options.persistencePath, 'utf8')) as PersistedCanonicalCacheState,
      options
    );
  }

  private addRawEvidence(canonicalArtifactCid: string, evidenceArtifactCid: string): void {
    const next = [...(this.rawEvidenceByCanonicalCid.get(canonicalArtifactCid) ?? [])];
    if (!next.includes(evidenceArtifactCid)) {
      next.push(evidenceArtifactCid);
      this.rawEvidenceByCanonicalCid.set(canonicalArtifactCid, next);
    }
  }

  private addCanonicalArtifact(artifact: TileEnvelope<CanonicalArtifact>): void {
    this.contentIndex.set(artifact.payload.contentFingerprint, artifact.cid);
    this.canonicalArtifactCids.push(artifact.cid);
    this.addRawEvidence(artifact.cid, artifact.cid);

    const recordFamilyKey = artifact.payload.dedupe.recordFamilyKey;
    const chain = [...(this.revisionChains.get(recordFamilyKey) ?? [])];
    chain.push({
      artifactCid: artifact.cid,
      parentArtifactCid: chain.at(-1)?.artifactCid,
      revisionFingerprint: artifact.payload.revisionFingerprint
    });
    this.revisionChains.set(recordFamilyKey, chain);
  }

  ingest(artifact: TileEnvelope<CanonicalArtifact>): DedupeProposal[] {
    this.artifacts.set(artifact.cid, artifact);
    const dedupe = artifact.payload.dedupe;

    const byteMembers = CanonicalCorpusCache.addToIndex(this.byteIndex, dedupe.byteIdentityKey, artifact.cid);
    const manifestationMembers = CanonicalCorpusCache.addToIndex(this.manifestationIndex, dedupe.manifestationKey, artifact.cid);
    const recordFamilyMembers = CanonicalCorpusCache.addToIndex(this.recordFamilyIndex, dedupe.recordFamilyKey, artifact.cid);
    const conceptualMembers = CanonicalCorpusCache.addToIndex(this.conceptualIndex, dedupe.conceptualClusterKey, artifact.cid);
    const canonicalArtifactCid = this.contentIndex.get(artifact.payload.contentFingerprint);
    if (canonicalArtifactCid) {
      this.addRawEvidence(canonicalArtifactCid, artifact.cid);
    } else {
      this.addCanonicalArtifact(artifact);
    }

    return [
      {
        layer: 'byte',
        memberArtifactCids: byteMembers,
        mergeEligible: byteMembers.length > 1,
        reason: 'Identical raw bytes cluster together.'
      },
      {
        layer: 'manifestation',
        memberArtifactCids: manifestationMembers,
        mergeEligible: manifestationMembers.length > 1,
        reason: 'Equivalent manifestations cluster together.'
      },
      {
        layer: 'record-family',
        memberArtifactCids: recordFamilyMembers,
        mergeEligible: false,
        reason: 'Record-family clustering is high-recall and not auto-merged.'
      },
      {
        layer: 'conceptual',
        memberArtifactCids: conceptualMembers,
        mergeEligible: false,
        reason: 'Conceptual clustering remains evidence-gated and reversible.'
      }
    ];
  }

  applyCorrectionEvent(event: TileEnvelope<CorrectionEvent>): void {
    const next = [...(this.lifecycleEvents.get(event.payload.subjectCid) ?? []), event.payload];
    this.lifecycleEvents.set(event.payload.subjectCid, next);
  }

  getLifecycleEvents(subjectCid: string): CorrectionEvent[] {
    return [...(this.lifecycleEvents.get(subjectCid) ?? [])];
  }

  getCanonicalArtifactCids(): string[] {
    return [...this.canonicalArtifactCids];
  }

  getCanonicalCidForContentFingerprint(contentFingerprint: string): string | undefined {
    return this.contentIndex.get(contentFingerprint);
  }

  getRawEvidenceCids(canonicalArtifactCid: string): string[] {
    return [...(this.rawEvidenceByCanonicalCid.get(canonicalArtifactCid) ?? [])];
  }

  getRevisionChain(recordFamilyKey: string): RevisionGraphNode[] {
    return (this.revisionChains.get(recordFamilyKey) ?? []).map((node) => ({ ...node }));
  }

  putPolicyCacheEntry(entry: PolicyCacheEntry): void {
    this.policyCacheEntries.set(entry.cacheKey, {
      ...entry,
      metadata: { ...entry.metadata }
    });
  }

  evaluatePolicyCacheEntry(cacheKey: string, context: PolicyCacheEvaluationContext = {}): PolicyCacheEvaluation {
    const entry = this.policyCacheEntries.get(cacheKey);
    if (!entry) {
      return this.recordPolicyCacheAudit(cacheKey, 'CACHE_MISS', context.requestId);
    }

    if (context.now && Date.parse(context.now) > Date.parse(entry.expiresAt)) {
      return this.recordPolicyCacheAudit(cacheKey, 'TTL_EXPIRED', context.requestId, entry);
    }
    if (context.policyVersion && context.policyVersion !== entry.metadata.policyVersion) {
      return this.recordPolicyCacheAudit(cacheKey, 'POLICY_VERSION_CHANGED', context.requestId, entry);
    }
    if (context.sourceBundleHash && context.sourceBundleHash !== entry.metadata.sourceBundleHash) {
      return this.recordPolicyCacheAudit(cacheKey, 'SOURCE_BUNDLE_HASH_CHANGED', context.requestId, entry);
    }
    if (context.entitlementFingerprint && context.entitlementFingerprint !== entry.metadata.entitlementFingerprint) {
      return this.recordPolicyCacheAudit(cacheKey, 'ENTITLEMENT_CHANGED', context.requestId, entry);
    }
    if (context.supersededSourceVersions?.includes(entry.metadata.sourceVersion)) {
      return this.recordPolicyCacheAudit(cacheKey, 'SOURCE_SUPERSEDED', context.requestId, entry);
    }

    return this.recordPolicyCacheAudit(cacheKey, 'CACHE_HIT', context.requestId, entry);
  }

  getPolicyCacheAudit(): PolicyCacheAuditEntry[] {
    return this.policyCacheAudit.map((entry) => ({ ...entry }));
  }

  private recordPolicyCacheAudit(
    cacheKey: string,
    reasonCode: PolicyCacheReasonCode,
    requestId?: string,
    entry?: PolicyCacheEntry
  ): PolicyCacheEvaluation {
    const serveable = reasonCode === 'CACHE_HIT';
    this.policyCacheAudit.push({
      cacheKey,
      decision: serveable ? 'served' : 'recomputed',
      reasonCode,
      ...(requestId ? { requestId } : {})
    });

    return {
      ...(entry ? { entry: { ...entry, metadata: { ...entry.metadata } } } : {}),
      reasonCode,
      serveable
    };
  }

  save(): void {
    if (!this.options.persistencePath) {
      throw new Error('Canonical cache persistence requires a persistencePath.');
    }

    const state: PersistedCanonicalCacheState = {
      artifacts: [...this.artifacts.entries()],
      byteIndex: [...this.byteIndex.entries()],
      canonicalArtifactCids: [...this.canonicalArtifactCids],
      conceptualIndex: [...this.conceptualIndex.entries()],
      contentIndex: [...this.contentIndex.entries()],
      lifecycleEvents: [...this.lifecycleEvents.entries()],
      manifestationIndex: [...this.manifestationIndex.entries()],
      policyCacheAudit: [...this.policyCacheAudit],
      policyCacheEntries: [...this.policyCacheEntries.entries()],
      rawEvidenceByCanonicalCid: [...this.rawEvidenceByCanonicalCid.entries()],
      recordFamilyIndex: [...this.recordFamilyIndex.entries()],
      revisionChains: [...this.revisionChains.entries()]
    };

    mkdirSync(dirname(this.options.persistencePath), { recursive: true });
    writeFileSync(this.options.persistencePath, `${JSON.stringify(state, null, 2)}\n`);
  }
}

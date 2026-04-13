import type { TileEnvelope } from '@entif-ai/rosetta-core';
import type { CanonicalArtifact } from '@entif-ai/ingress-refinery';
import type { CorrectionEvent } from '@entif-ai/source-substrate';

export interface DedupeProposal {
  layer: 'byte' | 'conceptual' | 'manifestation' | 'record-family';
  memberArtifactCids: string[];
  mergeEligible: boolean;
  reason: string;
}

export class CanonicalCorpusCache {
  private readonly artifacts = new Map<string, TileEnvelope<CanonicalArtifact>>();
  private readonly byteIndex = new Map<string, string[]>();
  private readonly conceptualIndex = new Map<string, string[]>();
  private readonly manifestationIndex = new Map<string, string[]>();
  private readonly recordFamilyIndex = new Map<string, string[]>();
  private readonly lifecycleEvents = new Map<string, CorrectionEvent[]>();

  private static addToIndex(index: Map<string, string[]>, key: string, artifactCid: string): string[] {
    const next = [...(index.get(key) ?? [])];
    if (!next.includes(artifactCid)) {
      next.push(artifactCid);
      index.set(key, next);
    }
    return next;
  }

  ingest(artifact: TileEnvelope<CanonicalArtifact>): DedupeProposal[] {
    this.artifacts.set(artifact.cid, artifact);
    const dedupe = artifact.payload.dedupe;

    const byteMembers = CanonicalCorpusCache.addToIndex(this.byteIndex, dedupe.byteIdentityKey, artifact.cid);
    const manifestationMembers = CanonicalCorpusCache.addToIndex(this.manifestationIndex, dedupe.manifestationKey, artifact.cid);
    const recordFamilyMembers = CanonicalCorpusCache.addToIndex(this.recordFamilyIndex, dedupe.recordFamilyKey, artifact.cid);
    const conceptualMembers = CanonicalCorpusCache.addToIndex(this.conceptualIndex, dedupe.conceptualClusterKey, artifact.cid);

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
}

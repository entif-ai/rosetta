import { createHash } from "node:crypto";

export interface MemoryFactInput {
  fact: string;
  confidence: number;
  sourceRef: string;
}

export interface MemoryFact extends MemoryFactInput {
  fingerprint: string;
}

export type MemoryFactDedupDecision =
  | {
      action: "kept";
      incomingConfidence: number;
      incomingFingerprint: string;
      incomingSourceRef: string;
    }
  | {
      action: "flagged_for_review";
      existingConfidence: number;
      existingFingerprint: string;
      existingSourceRef: string;
      incomingConfidence: number;
      incomingFingerprint: string;
      incomingSourceRef: string;
      reason: "confidence_collision";
    };

export interface MemoryFactDedupResult {
  facts: MemoryFact[];
  decisions: MemoryFactDedupDecision[];
}

export function fingerprintMemoryFact(fact: string): string {
  return `sha256:${createHash("sha256").update(fact, "utf8").digest("hex")}`;
}

export function dedupeMemoryFacts(inputs: MemoryFactInput[]): MemoryFactDedupResult {
  const facts: MemoryFact[] = [];
  const decisions: MemoryFactDedupDecision[] = [];
  const byFingerprint = new Map<string, MemoryFact>();

  for (const input of inputs) {
    const incoming: MemoryFact = {
      ...input,
      fingerprint: fingerprintMemoryFact(input.fact),
    };
    const existing = byFingerprint.get(incoming.fingerprint);

    if (existing) {
      decisions.push({
        action: "flagged_for_review",
        existingConfidence: existing.confidence,
        existingFingerprint: existing.fingerprint,
        existingSourceRef: existing.sourceRef,
        incomingConfidence: incoming.confidence,
        incomingFingerprint: incoming.fingerprint,
        incomingSourceRef: incoming.sourceRef,
        reason: "confidence_collision",
      });
      continue;
    }

    byFingerprint.set(incoming.fingerprint, incoming);
    facts.push(incoming);
    decisions.push({
      action: "kept",
      incomingConfidence: incoming.confidence,
      incomingFingerprint: incoming.fingerprint,
      incomingSourceRef: incoming.sourceRef,
    });
  }

  return { decisions, facts };
}

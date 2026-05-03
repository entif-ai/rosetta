import { describe, expect, it } from 'vitest';

import {
  emitConformanceBundle,
  normalizeIntakeEnvelope,
  validateIntakeEnvelope,
  validatePayload
} from './rosetta-schemas.js';

describe('rosetta-schemas', () => {
  it('rejects incomplete source profiles', () => {
    const result = validatePayload('source.system_profile', {
      sourceSystemId: 'datacite'
    });

    expect(result.ok).toBe(false);
  });

  it('builds a conformance bundle summary', () => {
    const bundle = emitConformanceBundle([
      {
        cid: 'cidv1-sha256-demo',
        kind: 'source.registry_entry',
        payload: {
          defaultTrustClass: 'infrastructure',
          entryId: 'registry.datacite',
          priorityTier: 'P0',
          sourceSystemId: 'datacite'
        }
      }
    ]);

    expect(bundle.summary.conforms).toBe(1);
  });

  it('requires source episode fields for Text-Core ingest', () => {
    const result = validatePayload('source.episode', {
      episodeId: 'episode.chat.20260423',
      family: 'chat-transcript',
      mode: 'parse-only'
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContain('Missing required field: rawEvidenceRefs');
    expect(result.errors).toContain('Missing required field: chronology');
    expect(result.errors).toContain('Missing required field: rightsScope');
  });

  it('normalizes intake envelopes and strips tracking params from item URLs', () => {
    const envelope = normalizeIntakeEnvelope({
      content_pointer: 'https://example.com/full-article',
      item_url: 'https://example.com/article?utm_source=newsletter&fbclid=123&x=1',
      raw_excerpt: 'Short excerpt',
      receipts: {},
      retrieved_at: '2026-05-03T06:30:00.000Z',
      source_name: 'wired',
      source_type: 'magazine',
      title: 'Edge AI roundup'
    });

    expect(envelope.item_url).toBe('https://example.com/article?x=1');
    expect(envelope.receipts.item_hash).toMatch(/^cidv1-sha256-/);
  });

  it('rejects intake envelopes without a content pointer', () => {
    const result = validateIntakeEnvelope({
      item_url: 'https://example.com/article',
      raw_excerpt: 'Short excerpt',
      receipts: {
        item_hash: 'cidv1-sha256-demo'
      },
      retrieved_at: '2026-05-03T06:30:00.000Z',
      source_name: 'wired',
      source_type: 'magazine',
      title: 'Edge AI roundup'
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContain('Missing required field: content_pointer');
  });

  it('rejects unsupported intake envelope source types', () => {
    const result = validateIntakeEnvelope({
      content_pointer: 'pointer://demo',
      item_url: 'https://example.com/article',
      raw_excerpt: 'Short excerpt',
      receipts: {
        item_hash: 'cidv1-sha256-demo'
      },
      retrieved_at: '2026-05-03T06:30:00.000Z',
      source_name: 'wired',
      source_type: 'slack',
      title: 'Edge AI roundup'
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContain('Unsupported source_type: slack');
  });
});

import { describe, expect, it } from 'vitest';

import { emitConformanceBundle, validatePayload } from './rosetta-schemas.js';

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
});

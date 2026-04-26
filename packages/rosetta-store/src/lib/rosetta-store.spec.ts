import { describe, expect, it } from 'vitest';

import { buildTile } from '@entif-ai/rosetta-core';

import { InMemoryTileStore, RightsError } from './rosetta-store.js';

describe('rosetta-store', () => {
  it('enforces rights at retrieval time', () => {
    const store = new InMemoryTileStore();
    const tile = buildTile('rosetta.run', { runId: 'r1', summary: 'demo', tags: [] });

    store.put(tile, ['tenant:private']);

    expect(() => store.get(tile.cid)).toThrow(RightsError);
    expect(store.get(tile.cid, ['tenant:private']).cid).toBe(tile.cid);
  });
});

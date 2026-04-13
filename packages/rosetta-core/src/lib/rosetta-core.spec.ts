import { describe, expect, it } from 'vitest';

import { buildTile, createObservation, createRun, verifyTileIntegrity } from './rosetta-core.js';

describe('rosetta-core', () => {
  it('keeps tile ids stable across payload key order changes', () => {
    const left = buildTile('rosetta.action', { actionId: 'a', intent: 'alpha', extra: { y: 2, x: 1 } });
    const right = buildTile('rosetta.action', { extra: { x: 1, y: 2 }, intent: 'alpha', actionId: 'a' });

    expect(left.cid).toBe(right.cid);
  });

  it('verifies tile integrity', () => {
    const run = createRun('bootstrap');
    expect(verifyTileIntegrity(run).ok).toBe(true);
  });

  it('creates source observations', () => {
    const observation = createObservation('datacite', 'metadata fetched');
    expect(observation.kind).toBe('rosetta.observation');
  });
});

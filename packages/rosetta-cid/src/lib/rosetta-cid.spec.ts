import { describe, expect, it } from 'vitest';

import { makeContentId, sha256Hex, toMultihashHex } from './rosetta-cid.js';

describe('rosetta-cid', () => {
  it('creates stable content ids', () => {
    expect(makeContentId('alpha')).toBe(makeContentId('alpha'));
  });

  it('emits the sha2-256 multihash prefix', () => {
    expect(toMultihashHex(sha256Hex('alpha')).startsWith('1220')).toBe(true);
  });
});

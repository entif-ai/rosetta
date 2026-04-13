import { describe, expect, it } from 'vitest';

import { canonicalizeJson, normalizePlainText } from './rosetta-canon.js';

describe('rosetta-canon', () => {
  it('keeps object key order deterministic', () => {
    const left = canonicalizeJson({
      z: 1,
      nested: { b: 2, a: 1 }
    });
    const right = canonicalizeJson({
      nested: { a: 1, b: 2 },
      z: 1
    });

    expect(left).toBe(right);
  });

  it('normalizes whitespace for refinery text promotion', () => {
    expect(normalizePlainText('alpha   beta\r\n\r\ngamma')).toBe('alpha beta\n\ngamma');
  });
});

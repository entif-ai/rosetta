import { describe, expect, it } from 'vitest';

import { buildTextFingerprints, canonicalizeJson, normalizePlainText } from './rosetta-canon.js';

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

  it('keeps content fingerprints stable across formatting-only changes', () => {
    const left = buildTextFingerprints('alpha   beta\r\n\r\n gamma');
    const right = buildTextFingerprints('alpha beta\n\ngamma');

    expect(left.normalizedText).toBe(right.normalizedText);
    expect(left.contentFingerprint).toBe(right.contentFingerprint);
    expect(left.revisionFingerprint).toBe(right.revisionFingerprint);
  });

  it('changes revision fingerprints when material content changes', () => {
    const left = buildTextFingerprints('alpha beta');
    const right = buildTextFingerprints('alpha gamma');

    expect(left.contentFingerprint).not.toBe(right.contentFingerprint);
    expect(left.revisionFingerprint).not.toBe(right.revisionFingerprint);
  });
});

import { describe, expect, it } from 'vitest';

import { buildCanonicalJsonVector, buildTextFingerprints, canonicalizeJson, normalizePlainText } from './rosetta-canon.js';

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

  it('uses JCS-compatible lexical key ordering for Entif canonical JSON', () => {
    expect(canonicalizeJson({ z: 1, ä: 2, a: 3 })).toBe('{"a":3,"z":1,"ä":2}');
  });

  it('rejects non-JSON finite numbers before hashing or signing', () => {
    expect(() => canonicalizeJson({ bad: Number.NaN })).toThrow('JCS canonicalization only accepts finite JSON numbers.');
    expect(() => canonicalizeJson({ bad: Number.POSITIVE_INFINITY })).toThrow('JCS canonicalization only accepts finite JSON numbers.');
  });

  it('publishes a replayable Entif canonicalization vector', () => {
    const vector = buildCanonicalJsonVector({
      b: true,
      a: ['Rosetta', { version: 1 }]
    });

    expect(vector).toEqual({
      canonicalization: 'RFC8785_JCS',
      canonicalJson: '{"a":["Rosetta",{"version":1}],"b":true}',
      cid: 'cidv1-sha256-1a1cf9c1931a64e6d8288c5335f8a26a56405e3d023eac3a0971ea70df7494b6',
      sha256: '1a1cf9c1931a64e6d8288c5335f8a26a56405e3d023eac3a0971ea70df7494b6'
    });
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

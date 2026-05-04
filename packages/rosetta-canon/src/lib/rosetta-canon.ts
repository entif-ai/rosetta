import { createHash } from 'node:crypto';

export type JsonPrimitive = boolean | null | number | string;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

export interface TextFingerprints {
  contentFingerprint: string;
  normalizedText: string;
  normalizationProfile: 'plain-text-collapse-v1';
  revisionFingerprint: string;
}

export interface CanonicalJsonVector {
  canonicalization: 'RFC8785_JCS';
  canonicalJson: string;
  cid: string;
  sha256: string;
}

function sortValue(value: JsonValue): JsonValue {
  if (Array.isArray(value)) {
    return value.map((entry) => sortValue(entry));
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value).sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0));
    return Object.fromEntries(entries.map(([key, entry]) => [key, sortValue(entry)]));
  }

  if (typeof value === 'number' && !Number.isFinite(value)) {
    throw new Error('JCS canonicalization only accepts finite JSON numbers.');
  }

  return value;
}

export function canonicalizeJson<T extends JsonValue>(value: T): string {
  return JSON.stringify(sortValue(value));
}

export function normalizePlainText(input: string): string {
  return input
    .replace(/\r\n/gu, '\n')
    .replace(/[ \t]+/gu, ' ')
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .replace(/\n{3,}/gu, '\n\n')
    .trim();
}

function sha256Hex(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

export function buildCanonicalJsonVector(value: JsonValue): CanonicalJsonVector {
  const canonicalJson = canonicalizeJson(value);
  const sha256 = sha256Hex(canonicalJson);

  return {
    canonicalJson,
    canonicalization: 'RFC8785_JCS',
    cid: `cidv1-sha256-${sha256}`,
    sha256
  };
}

export function buildTextFingerprints(input: string): TextFingerprints {
  const normalizationProfile = 'plain-text-collapse-v1';
  const normalizedText = normalizePlainText(input);
  const contentFingerprint = sha256Hex(normalizedText);
  const revisionFingerprint = sha256Hex(
    canonicalizeJson({
      contentFingerprint,
      normalizationProfile,
      normalizedText
    })
  );

  return {
    contentFingerprint,
    normalizedText,
    normalizationProfile,
    revisionFingerprint
  };
}

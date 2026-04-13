export type JsonPrimitive = boolean | null | number | string;
export type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

function sortValue(value: JsonValue): JsonValue {
  if (Array.isArray(value)) {
    return value.map((entry) => sortValue(entry));
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value).sort(([left], [right]) => left.localeCompare(right));
    return Object.fromEntries(entries.map(([key, entry]) => [key, sortValue(entry)]));
  }

  return value;
}

export function canonicalizeJson<T extends JsonValue>(value: T): string {
  return JSON.stringify(sortValue(value));
}

export function normalizePlainText(input: string): string {
  return input.replace(/\r\n/gu, '\n').replace(/[ \t]+/gu, ' ').replace(/\n{3,}/gu, '\n\n').trim();
}

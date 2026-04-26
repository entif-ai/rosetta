import { createHash } from 'node:crypto';

export function sha256Hex(input: string | Uint8Array): string {
  return createHash('sha256').update(input).digest('hex');
}

export function toMultihashHex(digestHex: string): string {
  return `1220${digestHex}`;
}

export function makeContentId(input: string | Uint8Array): string {
  return `cidv1-sha256-${sha256Hex(input)}`;
}

export function sameContent(left: string, right: string): boolean {
  return left === right;
}

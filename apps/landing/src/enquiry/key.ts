const UUID_BYTES = 16;
const VERSION_BYTE = 6;
const VARIANT_BYTE = 8;
const SEGMENTS = [4, 2, 2, 2, 6] as const;

/**
 * A random UUID for one form, so a request sent twice is one request. `crypto.randomUUID` needs a secure context and
 * the site may be served over plain HTTP, while `getRandomValues` works in both.
 */
export function newKey(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(UUID_BYTES));
  const view = new DataView(bytes.buffer);
  view.setUint8(VERSION_BYTE, (view.getUint8(VERSION_BYTE) & 0x0f) | 0x40);
  view.setUint8(VARIANT_BYTE, (view.getUint8(VARIANT_BYTE) & 0x3f) | 0x80);
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0'));
  let start = 0;
  return SEGMENTS.map((length) => hex.slice(start, (start += length)).join('')).join('-');
}

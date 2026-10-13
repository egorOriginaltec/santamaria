/** Collapse internal whitespace and trim ends. */
export function normalizePersonName(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

/** Email: no spaces, lowercased for consistency. */
export function normalizeEmail(value: string): string {
  return value.replace(/\s+/g, '').trim().toLowerCase();
}

/** Message: trim ends, collapse runs of spaces/newlines carefully. */
export function normalizeMessage(value: string): string {
  return value
    .replace(/\r\n/g, '\n')
    .replace(/[^\S\n]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Strip characters that are never valid in a person name. */
export function stripUnsafeNameChars(value: string): string {
  return value.replace(/[<>{};\\\"`$]/g, '');
}

/** Strip HTML-ish / control chars from free text. */
export function stripUnsafeMessageChars(value: string): string {
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '');
}

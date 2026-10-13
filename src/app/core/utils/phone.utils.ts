/** Country dial codes (longest first) for Spain + common LATAM. */
const DIAL_CODES = [
  '593', // Ecuador
  '595', // Paraguay
  '598', // Uruguay
  '502', // Guatemala
  '503', // El Salvador
  '504', // Honduras
  '505', // Nicaragua
  '506', // Costa Rica
  '507', // Panama
  '591', // Bolivia
  '34', // Spain
  '52', // Mexico
  '54', // Argentina
  '56', // Chile
  '57', // Colombia
  '51', // Peru
  '58', // Venezuela
  '53', // Cuba
] as const;

/** Digits only, optional leading +. Spaces/symbols stripped. */
export function sanitizePhoneInput(raw: string): string {
  const trimmed = raw.trim();
  const hasPlus = trimmed.startsWith('+');
  const digits = trimmed.replace(/\D/g, '');
  return hasPlus ? `+${digits}` : digits;
}

function groupDigits(digits: string, pattern: number[]): string {
  const parts: string[] = [];
  let cursor = 0;

  for (const size of pattern) {
    if (cursor >= digits.length) {
      break;
    }
    parts.push(digits.slice(cursor, cursor + size));
    cursor += size;
  }

  if (cursor < digits.length) {
    parts.push(digits.slice(cursor));
  }

  return parts.filter(Boolean).join(' ');
}

function spanishNationalPattern(length: number): number[] {
  // Mobile/landline ES: 696 91 92 28 → 3-2-2-2
  if (length <= 3) {
    return [length];
  }
  if (length <= 5) {
    return [3, length - 3];
  }
  if (length <= 7) {
    return [3, 2, length - 5];
  }
  return [3, 2, 2, Math.max(0, length - 7)];
}

function detectDialCode(digits: string): string | null {
  for (const code of DIAL_CODES) {
    if (digits.startsWith(code)) {
      return code;
    }
  }
  return null;
}

/**
 * Formats as the user types. User never types spaces — we insert them.
 * Supports Spain (+34 / national 6xx/7xx/8xx/9xx) and LATAM dial codes.
 */
export function formatPhoneDisplay(raw: string): string {
  const sanitized = sanitizePhoneInput(raw);
  if (!sanitized) {
    return '';
  }

  const hasPlus = sanitized.startsWith('+');
  const digits = sanitized.replace(/\D/g, '');

  if (!digits) {
    return hasPlus ? '+' : '';
  }

  // National Spain (9 digits starting 6-9)
  if (!hasPlus && /^[6-9]\d{0,8}$/.test(digits)) {
    return groupDigits(digits, spanishNationalPattern(digits.length));
  }

  const dial = detectDialCode(digits);
  if (dial) {
    const rest = digits.slice(dial.length);
    const restFormatted =
      dial === '34'
        ? groupDigits(rest, spanishNationalPattern(rest.length))
        : groupDigits(rest, [3, 3, 3, 3, 3]);

    return `+${dial}${restFormatted ? ` ${restFormatted}` : ''}`.trim();
  }

  if (hasPlus) {
    return `+${groupDigits(digits, [3, 3, 3, 3, 3])}`.trim();
  }

  return groupDigits(digits, [3, 3, 3, 3, 3]);
}

/** Value sent to the API: E.164-ish, no spaces. */
export function normalizePhoneForApi(raw: string): string | undefined {
  const sanitized = sanitizePhoneInput(raw);
  if (!sanitized) {
    return undefined;
  }

  let digits = sanitized.replace(/\D/g, '');
  if (!digits) {
    return undefined;
  }

  // National Spain → +34
  if (!sanitized.startsWith('+') && /^[6-9]\d{8}$/.test(digits)) {
    digits = `34${digits}`;
  }

  return `+${digits}`;
}

/** Spain mobile/landline or LATAM international (+CC…). */
export function isValidEsOrLatamPhone(raw: string): boolean {
  if (!raw.trim()) {
    return true;
  }

  const normalized = normalizePhoneForApi(raw);
  if (!normalized) {
    return false;
  }

  const digits = normalized.slice(1);

  // Spain: +34 + 9 digits
  if (digits.startsWith('34')) {
    return /^34[6-9]\d{8}$/.test(digits);
  }

  // LATAM: known dial + 8–12 national digits
  const dial = detectDialCode(digits);
  if (!dial || dial === '34') {
    return false;
  }

  const national = digits.slice(dial.length);
  return national.length >= 8 && national.length <= 12;
}

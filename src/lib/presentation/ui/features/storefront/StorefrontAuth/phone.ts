const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
const arabicDigits = "٠١٢٣٤٥٦٧٨٩";

/** Converts Persian/Arabic digits to Latin digits and drops every other character. */
export function normalizeDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (digit) => String(persianDigits.indexOf(digit)))
    .replace(/[٠-٩]/g, (digit) => String(arabicDigits.indexOf(digit)))
    .replace(/\D/g, "");
}

/** Normalizes `+98…`, `0098…`, and `98…` mobile numbers to a local `09…` form. */
export function normalizeMobileNumber(value: string): string {
  const digits = normalizeDigits(value);
  if (digits.length === 12 && digits.startsWith("98")) {
    return `0${digits.slice(2)}`;
  }
  if (digits.length === 14 && digits.startsWith("0098")) {
    return `0${digits.slice(4)}`;
  }
  return digits.slice(0, 11);
}

export function isValidIranMobile(value: string): boolean {
  return /^09\d{9}$/.test(value);
}

export function toPersianDigits(value: string | number): string {
  return String(value).replace(
    /[0-9]/g,
    (digit) => persianDigits[Number(digit)],
  );
}

/** Groups a local mobile number as `۰۹۱۲ ۳۴۵ ۶۷۸۹` for display. */
export function formatMobileNumber(value: string): string {
  const digits = normalizeMobileNumber(value);
  if (!isValidIranMobile(digits)) return toPersianDigits(digits);
  return toPersianDigits(
    `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`,
  );
}

/** Formats remaining seconds as a Persian `mm:ss` countdown. */
export function formatCountdown(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return toPersianDigits(
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
  );
}

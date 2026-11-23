import { describe, expect, it } from "vitest";
import {
  formatCountdown,
  formatMobileNumber,
  isValidIranMobile,
  normalizeDigits,
  normalizeMobileNumber,
  toPersianDigits,
} from "./phone";

describe("storefront customer auth phone helpers", () => {
  it("converts Persian and Arabic digits to Latin digits", () => {
    expect(normalizeDigits("۰۹۱۲ ۳۴۵ ۶۷۸۹")).toBe("09123456789");
    expect(normalizeDigits("٠٩١٢٣٤٥٦٧٨٩")).toBe("09123456789");
    expect(normalizeDigits("۰۹۱۲-abc-۳۴۵")).toBe("0912345");
  });

  it("normalizes international Iranian mobile prefixes to the local form", () => {
    expect(normalizeMobileNumber("+98 912 345 6789")).toBe("09123456789");
    expect(normalizeMobileNumber("00989123456789")).toBe("09123456789");
    expect(normalizeMobileNumber("09123456789")).toBe("09123456789");
    expect(normalizeMobileNumber("۰۹۱۲۳۴۵۶۷۸۹۱۲۳")).toBe("09123456789");
  });

  it("validates only ۱۱-digit local mobile numbers starting with 09", () => {
    expect(isValidIranMobile("09123456789")).toBe(true);
    expect(isValidIranMobile("0912345678")).toBe(false);
    expect(isValidIranMobile("08123456789")).toBe(false);
  });

  it("formats numbers for Persian display", () => {
    expect(toPersianDigits(1405)).toBe("۱۴۰۵");
    expect(formatMobileNumber("09123456789")).toBe("۰۹۱۲ ۳۴۵ ۶۷۸۹");
    expect(formatMobileNumber("")).toBe("");
  });

  it("formats the resend countdown as Persian mm:ss", () => {
    expect(formatCountdown(102)).toBe("۰۱:۴۲");
    expect(formatCountdown(5)).toBe("۰۰:۰۵");
    expect(formatCountdown(-3)).toBe("۰۰:۰۰");
  });
});

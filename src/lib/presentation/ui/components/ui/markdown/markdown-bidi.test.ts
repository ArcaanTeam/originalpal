import { describe, expect, it } from "vitest";
import { dominantTextDirection } from "./markdown-bidi";

describe("dominantTextDirection", () => {
  it("detects Persian as RTL", () => {
    expect(dominantTextDirection("سلام دنیا")).toBe("rtl");
  });

  it("detects English as LTR", () => {
    expect(dominantTextDirection("Hello world")).toBe("ltr");
  });

  it("returns auto for empty or neutral text", () => {
    expect(dominantTextDirection("")).toBe("auto");
    expect(dominantTextDirection("   ")).toBe("auto");
  });

  it("picks dominant script in mixed text", () => {
    expect(dominantTextDirection("این یک test است")).toBe("rtl");
    expect(dominantTextDirection("API برای sync")).toBe("ltr");
  });
});

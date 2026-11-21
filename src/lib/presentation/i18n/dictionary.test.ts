import { describe, expect, it } from "vitest";
import { direction, htmlLang } from "./config";
import { formatMessage, getDictionary } from "./dictionary";

describe("i18n", () => {
  it("uses fa with rtl direction", () => {
    expect(htmlLang).toBe("fa-IR");
    expect(direction).toBe("rtl");
  });

  it("returns fa strings", () => {
    expect(getDictionary().metadata.title).toBe("Originalpal");
    expect(getDictionary().nav.home).toBe("خانه");
  });

  it("interpolates message placeholders", () => {
    expect(
      formatMessage("ورود با نام کاربری {username}", { username: "admin" }),
    ).toBe("ورود با نام کاربری admin");
  });
});

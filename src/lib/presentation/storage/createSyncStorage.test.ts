import { beforeEach, describe, expect, it, vi } from "vitest";
import { createSyncStorage, removeStorageKey } from "./createSyncStorage";

describe("createSyncStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("reads and writes parsed values", () => {
    const storage = createSyncStorage<{ count: number }>({
      parse: (raw, initial) =>
        raw && typeof raw === "object" && "count" in raw
          ? (raw as { count: number })
          : initial,
    });

    storage.setItem("app:test", { count: 2 });
    expect(storage.getItem("app:test", { count: 0 })).toEqual({ count: 2 });
  });

  it("returns initial value for invalid JSON", () => {
    const storage = createSyncStorage<number>({
      parse: (raw, initial) => (typeof raw === "number" ? raw : initial),
    });
    localStorage.setItem("app:test", "not-json");
    expect(storage.getItem("app:test", 0)).toBe(0);
  });

  it("removeStorageKey clears storage", () => {
    localStorage.setItem("app:test", "x");
    removeStorageKey("app:test");
    expect(localStorage.getItem("app:test")).toBeNull();
  });

  it("subscribe notifies on cross-tab storage events", () => {
    const storage = createSyncStorage<string>({
      parse: (raw, initial) => (typeof raw === "string" ? raw : initial),
    });
    const listener = vi.fn();
    const unsubscribe = storage.subscribe("app:test", listener, "default");

    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "app:test",
        newValue: JSON.stringify("next"),
        storageArea: localStorage,
      }),
    );

    expect(listener).toHaveBeenCalledWith("next");
    unsubscribe();
  });
});

/**
 * Jotai `atomWithStorage` sync adapters (https://jotai.org/docs/utilities/storage).
 * Persisted client state should use `atomWithStorage` + `createSyncStorage` only.
 */

export type SyncStorage<T> = {
  getItem: (key: string, initialValue: T) => T;
  setItem: (key: string, value: T) => void;
  removeItem: (key: string) => void;
  subscribe: (
    key: string,
    callback: (value: T) => void,
    initialValue: T,
  ) => () => void;
};

function isBrowserLocalStorageAvailable(): boolean {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

export function removeStorageKey(key: string): void {
  if (!isBrowserLocalStorageAvailable()) {
    return;
  }
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

export function createSyncStorage<T>(options: {
  parse: (raw: unknown, initialValue: T) => T;
}): SyncStorage<T> {
  const { parse } = options;

  return {
    getItem(key: string, initialValue: T): T {
      if (!isBrowserLocalStorageAvailable()) {
        return initialValue;
      }
      try {
        const raw = window.localStorage.getItem(key);
        if (raw === null) {
          return initialValue;
        }
        return parse(JSON.parse(raw), initialValue);
      } catch {
        return initialValue;
      }
    },
    setItem(key: string, value: T): void {
      if (!isBrowserLocalStorageAvailable()) {
        return;
      }
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        /* quota / private mode */
      }
    },
    removeItem(key: string): void {
      removeStorageKey(key);
    },
    subscribe(
      key: string,
      callback: (value: T) => void,
      initialValue: T,
    ): () => void {
      if (
        typeof window === "undefined" ||
        typeof window.addEventListener === "undefined"
      ) {
        return () => {};
      }
      const handler = (event: StorageEvent) => {
        if (event.storageArea !== window.localStorage || event.key !== key) {
          return;
        }
        if (event.newValue === null) {
          callback(initialValue);
          return;
        }
        try {
          callback(parse(JSON.parse(event.newValue), initialValue));
        } catch {
          callback(initialValue);
        }
      };
      window.addEventListener("storage", handler);
      return () => window.removeEventListener("storage", handler);
    },
  };
}

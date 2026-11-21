import "server-only";

const TAG = "[API]";

export const apiLogger = {
  error(...args: unknown[]): void {
    console.error(TAG, ...args);
  },
  warn(...args: unknown[]): void {
    console.warn(TAG, ...args);
  },
  info(...args: unknown[]): void {
    console.info(TAG, ...args);
  },
};

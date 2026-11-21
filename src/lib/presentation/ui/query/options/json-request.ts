export type JsonRequestFn = <T>(
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<T>;

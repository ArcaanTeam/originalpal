import { useEffect, useMemo, useRef } from "react";

type DebouncedFunction<T extends (...args: never[]) => void> = ((
  ...args: Parameters<T>
) => void) & {
  cancel: () => void;
};

export function useDebouncedCallback<T extends (...args: never[]) => void>(
  callback: T,
  delayMs: number,
): DebouncedFunction<T> {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const timerRef = useRef<number | undefined>(undefined);

  const debounced = useMemo(() => {
    const fn = ((...args: Parameters<T>) => {
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        callbackRef.current(...args);
      }, delayMs);
    }) as DebouncedFunction<T>;

    fn.cancel = () => {
      window.clearTimeout(timerRef.current);
    };

    return fn;
  }, [delayMs]);

  useEffect(() => () => debounced.cancel(), [debounced]);

  return debounced;
}

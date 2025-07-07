import { useRef, useCallback, useEffect } from 'react';

//eslint-disable-next-line
type AnyFunction = (...args: any[]) => void;

export function useDebounceCallback<T extends AnyFunction>(func: T, delay = 1000): T {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const funcRef = useRef(func);

  useEffect(() => {
    funcRef.current = func;
  }, [func]);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        funcRef.current(...args);
      }, delay);
    },
    [delay],
  ) as T;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return debouncedFn;
}

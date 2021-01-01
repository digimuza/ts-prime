import { hash } from './hash';

export interface CacheMechanism<R> {
  set: (key: string, data: R) => void;
  get: (key: string) => R | undefined;
}
export declare type ArgsType<T> = T extends (...args: infer U) => any ? U : [];
export interface CacheOptions<I extends any[], R> {
  cacheKeyFn?: (...args: I) => string;
  cacheMechanism?: CacheMechanism<R>;
}

/**
 * Function middleware that caches function output based on input
 * @param fn - target function
 * @param cacheFn - function that receives and return cache key
 * @signature
 *    P.cache(fn, options)
 * @signature
 *    P.cache(options)(fn)
 * @example
 *    const request = (url: string) => axios.get(url)
 *    const requestWithCache = P.cache(request, (url) => url)
 * @category Utility, Pipe
 */
export function cache<I extends (...args: any[]) => any>(
  fn: I,
  options?: CacheOptions<ArgsType<I>, ReturnType<I>>
): I;
export function cache<I extends any[], R>(
  fn: (...args: I) => R,
  options?: CacheOptions<I, R>
): (...args: I) => R {
  const defaultCache = (): CacheMechanism<R> => {
    const cache: Record<string, R> = {};
    return {
      get: key => {
        return cache[key];
      },
      set: (key, data) => {
        cache[key] = data;
      },
    };
  };
  const defaultCacheFn = (...args: I) => hash(JSON.stringify(args));
  const cacheFnF = options?.cacheKeyFn || defaultCacheFn;
  const cacheMechanism = options?.cacheMechanism || defaultCache();
  return (...args: I) => {
    const cacheId = cacheFnF(...args);
    const cached = cacheMechanism.get(cacheId);
    if (cached == null) {
      const result = fn(...args);
      if (result instanceof Promise) {
        return (result.then(r => {
          cacheMechanism.set(cacheId, r);
          return r;
        }) as unknown) as R;
      }
      cacheMechanism.set(cacheId, result);
      return result as R;
    }
    return cached;
  };
}

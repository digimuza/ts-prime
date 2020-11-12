import { purry } from "./purry";

/**
 * Function middleware that caches function output based on input
 * @param fn - target function
 * @param cacheFn - function that receives and return cache key
 * @signature
 *    const newFn = R.cache(fn)
 * @example
 *    const request = (url: string) => axios.get(url)
 *    const requestWithCache = R.cache(request, (url) => url)
 * @data_first
 */
export function cache<I extends any[], R>(fn: (...args: I) => R, cacheFn: (...args: I) => string): (...args: I) => Promise<R>
/**
 * Function middleware that caches function output based on input
 * @param fn - target function
 * @param cacheFn - function that receives and return cache key
 * @signature
 *    const newFn = R.cache(fn)
 * @example
 *    const request = (url: string) => axios.get(url)
 *    const requestWithCache = R.pipe(request, R.cache((url) => url))
 * @data_last
 */
export function cache<I extends any[], R>(cacheFn: (...args: I) => string): (fn: (...args: I) => Promise<R>) => (...args: I) => Promise<R>
export function cache() {
    return purry(_cache, arguments);
}
function _cache<I extends any[], R>(fn: (...args: I) => R, cacheFn: (...args: I) => string): (...args: I) => R {
    const cache: Record<string, R> = {}
    const cacheFnF = cacheFn
    return (...args: I) => {
        const cacheId = cacheFnF(...args)
        if (cache[cacheId] == null) {
            const result = fn(...args)
            if (result instanceof Promise) {
                return result.then((r) => {
                    cache[cacheId] = r
                    return r
                }) as unknown as R
            }
            cache[cacheId] = result
            return result as R
        }
        return cache[cacheId]
    }
}
import { isArray } from "./guards";


/**
 * Ensures array data type
 * @example
 *    ensureArray(1) // => [1]
 *    ensureArray([1]) // => [1]
 * @param data - Item or array
 */
export function ensureArray<T>(data: T | readonly T[]): ReadonlyArray<T> {
    return isArray(data) ? data as ReadonlyArray<T> : [data as T]
}
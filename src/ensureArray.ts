import { isArray } from './guards';

/**
 * Ensures array data type
 * @param data - Item or array
 * @signature
 *    P.ensureArray(data)
 * @example
 *    ensureArray(1) // => [1]
 *    ensureArray([1]) // => [1]
 * @category Array
 */
export function ensureArray<T>(data: T | readonly T[]): ReadonlyArray<T> {
  return isArray(data) ? (data as ReadonlyArray<T>) : [data as T];
}

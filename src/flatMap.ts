import { flatten } from './flatten';
import { purry } from './purry';

/**
 * Map each element of an array using a defined callback function and flatten the mapped result.
 * @param array The array to map.
 * @param fn The function mapper.
 * @signature
 *    P.flatMap(array, fn)
 * @example
 *    P.flatMap([1, 2, 3], x => [x, x * 10]) // => [1, 10, 2, 20, 3, 30]
 * @data_first
 * @pipeable
 * @category Array
 */
export function flatMap<T, K>(
  array: readonly T[],
  fn: (input: T) => K | readonly K[]
): K[];

/**
 * Map each element of an array using a defined callback function and flatten the mapped result.
 * @param array The array to map.
 * @param fn The function mapper.
 * @signature
 *    P.flatMap(fn)(array)
 * @example
 *    P.pipe([1, 2, 3], P.flatMap(x => [x, x * 10])) // => [1, 10, 2, 20, 3, 30]
 * @data_last
 * @pipeable
 * @category Array
 */
export function flatMap<T, K>(
  fn: (input: T) => K | K[]
): (array: readonly T[]) => readonly K[];

export function flatMap() {
  return purry(_flatMap, arguments);
}

function _flatMap<T, K>(
  array: readonly T[],
  fn: (input: T, index: number, arr: readonly T[]) => K[]
): readonly K[] {
  return flatten(array.map((item, index, array) => fn(item, index, array)));
}

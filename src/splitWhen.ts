import { splitAt } from './splitAt';
import { purry } from './purry';

/**
 * Splits a given array at the first index where the given predicate returns true.
 * @param array the array to split
 * @param fn the predicate
 * @signature
 *    P.splitWhen(array, fn)
 * @signature
 *    P.splitWhen(fn)(array)
 * @example
 *    P.splitWhen([1, 2, 3], x => x === 2) // => [[1], [2, 3]]
 *    P.splitWhen(x => x === 2)([1, 2, 3]) // => [[1], [2, 3]]
 * @category Array, Pipe
 */
export function splitWhen<T>(
  array: readonly T[],
  fn: (item: T) => boolean
): [T[], T[]];
export function splitWhen<T>(
  fn: (item: T) => boolean
): (array: readonly T[]) => [T[], T[]];

export function splitWhen() {
  return purry(_splitWhen, arguments);
}

function _splitWhen<T>(array: T[], fn: (item: T) => boolean) {
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i])) {
      return splitAt(array, i);
    }
  }
  return [array, []];
}

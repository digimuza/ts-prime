import { purry } from './purry';

/**
 * Sorts an array. The comparator function should accept two values at a time and return a negative number if the first value is smaller, a positive number if it's larger, and zero if they are equal.
 * Sorting is based on a native `sort` function. It's not guaranteed to be stable.
 * @param items the array to sort
 * @param cmp the comparator function
 * @signature
 *    P.sort(items, cmp)
 * @signature
 *    P.sort(cmp)(items)
 * @example
 *    P.sort([4, 2, 7, 5], (a, b) => a - b) // => [2, 4, 5, 7]
 *    P.pipe([4, 2, 7, 5], P.sort((a, b) => a - b)) // => [2, 4, 5, 7]
 * @category Array, Pipe
 */
export function sort<T>(items: readonly T[], cmp: (a: T, b: T) => number): T[];
export function sort<T>(
  cmp: (a: T, b: T) => number
): (items: readonly T[]) => T[];

export function sort<T>() {
  return purry(_sort, arguments);
}

function _sort<T>(items: T[], cmp: (a: T, b: T) => number) {
  const ret = [...items];
  ret.sort(cmp);
  return ret;
}

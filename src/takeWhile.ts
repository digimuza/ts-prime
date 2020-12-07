import { purry } from './purry';

/**
 * Returns elements from the array until predicate returns false.
 * @param array the array
 * @param fn the predicate
 * @signature
 *    P.takeWhile(array, fn)
 * @signature
 *    P.takeWhile(fn)(array)
 * @example
 *    P.takeWhile([1, 2, 3, 4, 3, 2, 1], x => x !== 4) // => [1, 2, 3]
 *    P.pipe([1, 2, 3, 4, 3, 2, 1], P.takeWhile(x => x !== 4))  // => [1, 2, 3]
 * @category Array, Pipe
 */
export function takeWhile<T>(
  array: readonly T[],
  fn: (item: T) => boolean
): T[];

export function takeWhile<T>(
  fn: (item: T) => boolean
): (array: readonly T[]) => T[];

export function takeWhile() {
  return purry(_takeWhile, arguments);
}

function _takeWhile<T>(array: T[], fn: (item: T) => boolean) {
  const ret: T[] = [];
  for (const item of array) {
    if (!fn(item)) {
      break;
    }
    ret.push(item);
  }
  return ret;
}

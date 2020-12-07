import { purry } from './purry';
import { _reduceLazy, LazyResult } from './_reduceLazy';

/**
 * Returns a list of elements that exist in both array.
 * @param array the source array
 * @param other the second array
 * @signature
 *    P.intersection(array, other)
 * @signature
 *    P.intersection(other)(array)
 * @example
 *    P.intersection([1, 2, 3], [2, 3, 5]) // => [2, 3]
 *    P.intersection([2, 3, 5])([1, 2, 3]) // => [2, 3]
 * @category Array, Pipe
 */
export function intersection<T>(source: readonly T[], other: readonly T[]): T[];

export function intersection<T, K>(
  other: readonly T[]
): (source: readonly K[]) => T[];

export function intersection() {
  return purry(_intersection, arguments, intersection.lazy);
}

function _intersection<T>(array: T[], other: T[]) {
  const lazy = intersection.lazy(other);
  return _reduceLazy(array, lazy);
}

export namespace intersection {
  export function lazy<T>(other: T[]) {
    return (value: T): LazyResult<T> => {
      const set = new Set(other);
      if (set.has(value)) {
        return {
          done: false,
          hasNext: true,
          next: value,
        };
      }
      return {
        done: false,
        hasNext: false,
      };
    };
  }
}

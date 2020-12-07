import { purry } from './purry';
import { _reduceLazy, LazyResult } from './_reduceLazy';

/**
 * Returns the first `n` elements of `array`.
 * @param array the array
 * @param n the number of elements to take
 * @signature
 *    P.take(array, n)
 * @signature
 *    P.take(n)(array)
 * @example
 *    P.take([1, 2, 3, 4, 3, 2, 1], 3) // => [1, 2, 3]
 *    P.pipe([1, 2, 3, 4, 3, 2, 1], P.take(n)) // => [1, 2, 3]
 * @category Array, Pipe
 */
export function take<T>(array: readonly T[], n: number): T[];
export function take<T>(n: number): (array: readonly T[]) => T[];

export function take() {
  return purry(_take, arguments, take.lazy);
}

function _take<T>(array: T[], n: number) {
  return _reduceLazy(array, take.lazy(n));
}

export namespace take {
  export function lazy<T>(n: number) {
    return (value: T): LazyResult<T> => {
      if (n === 0) {
        return {
          done: true,
          hasNext: false,
        };
      }
      n--;
      if (n === 0) {
        return {
          done: true,
          hasNext: true,
          next: value,
        };
      }
      return {
        done: false,
        hasNext: true,
        next: value,
      };
    };
  }
}

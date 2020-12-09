import { purry } from './purry';

/**
 * Gets the first element of `array`.
 * Note: In `pipe`, use `first()` form instead of `first`. Otherwise, the inferred type is lost.
 * @param array the array
 * @signature
 *    P.first(array)
 * @example
 *    P.first([1, 2, 3]) // => 1
 *    P.first([]) // => undefined
 *    P.pipe(
 *      [1, 2, 4, 8, 16],
 *      P.filter(x => x > 3),
 *      P.first(),
 *      x => x + 1
 *    ); // => 5
 *
 * @category Array, Pipe
 */
export function first<T>(array: readonly T[]): T | undefined;
export function first<T>(): (array: readonly T[]) => T | undefined;
export function first<T>(defaultValue: T): (array: readonly T[]) => T;

export function first() {
  return purry(_first, arguments, first.lazy);
}

function _first<T>(array: T[] ) {
  return array[0];
}

export namespace first {
  export function lazy<T>() {
    return (value: T) => {
      return {
        done: true,
        hasNext: true,
        next: value,
      };
    };
  }
  export namespace lazy {
    export const single = true;
  }
}

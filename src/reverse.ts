import { purry } from './purry';

/**
 * Reverses array.
 * @param array the array
 * @signature
 *    P.reverse(arr);
 * @signature
 *    P.reverse()(array);
 * @example
 *    P.reverse([1, 2, 3]) // [3, 2, 1]
 *    P.reverse()([1, 2, 3]) // [3, 2, 1]
 * @category Array, Pipe
 */
export function reverse<T>(array: readonly T[]): Array<T>;
export function reverse<T>(): (array: readonly T[]) => Array<T>;

export function reverse() {
  return purry(_reverse, arguments);
}

function _reverse(array: any[]) {
  return array.slice().reverse();
}

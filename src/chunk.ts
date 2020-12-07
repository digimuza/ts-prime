import { purry } from './purry';

/**
 * Split an array into groups the length of `size`. If `array` can't be split evenly, the final chunk will be the remaining elements.
 * @param array - the array
 * @param size - the length of the chunk
 * @signature
 *    P.chunk(array, size)
 * @signature
 *    P.chunk(size)(array)
 * @example
 *    P.chunk(['a', 'b', 'c', 'd'], 2) // => [['a', 'b'], ['c', 'd']]
 *    P.chunk(['a', 'b', 'c', 'd'], 3) // => [['a', 'b', 'c'], ['d']]
 *    P.chunk(2)(['a', 'b', 'c', 'd']) // => [['a', 'b'], ['c', 'd']]
 *    P.chunk(3)(['a', 'b', 'c', 'd']) // => [['a', 'b', 'c'], ['d']]
 * @category Array, Pipe
 */
export function chunk<T>(array: readonly T[], size: number): readonly T[][];
export function chunk<T>(size: number): (array: readonly T[]) => readonly T[][];

export function chunk() {
  return purry(_chunk, arguments);
}

function _chunk<T>(array: T[], size: number) {
  const ret: T[][] = [];
  let current: T[] | null = null;
  array.forEach(x => {
    if (!current) {
      current = [];
      ret.push(current);
    }
    current.push(x);
    if (current.length === size) {
      current = null;
    }
  });
  return ret;
}

import { purry } from './purry';

/**
 * Returns a list of numbers from `start` (inclusive) to `end` (exclusive).
 * @param start the start number
 * @param end the end number
 * @signature 
 *    P.range(start, end)
 * @signature 
 *    P.range(end)(start)
 * @example
 *    P.range(1, 5) // => [1, 2, 3, 4]
 *    P.range(5)(1) // => [1, 2, 3, 4]
 * @category Array, Pipe
 */
export function range(start: number, end: number): number[];
export function range(end: number): (start: number) => number[];

export function range() {
  return purry(_range, arguments);
}

function _range(start: number, end: number) {
  const ret: number[] = [];
  for (let i = start; i < end; i++) {
    ret.push(i);
  }
  return ret;
}

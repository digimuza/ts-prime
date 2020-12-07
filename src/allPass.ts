import { purry } from './purry';

/**
 * Determines whether all predicates returns true for the input data.
 * @param data - The input data for predicates.
 * @param fns - The list of predicates.
 * @signature
 *    P.allPass(data, fns)
 * @signature
 *    P.allPass(fns)(data)
 * @example
 *    const isDivisibleBy3 = (x: number) => x % 3 === 0
 *    const isDivisibleBy4 = (x: number) => x % 4 === 0
 *    const fns = [isDivisibleBy3, isDivisibleBy4]
 *    P.allPass(12, fns) // => true
 *    P.allPass(8, fns) // => false
 * @category Array, Pipe
 */
export function allPass<T>(
  data: T,
  fns: ReadonlyArray<(data: T) => boolean>
): boolean;
export function allPass<T>(
  fns: ReadonlyArray<(data: T) => boolean>
): (data: T) => boolean;

export function allPass() {
  return purry(_allPass, arguments);
}

function _allPass(data: any, fns: ReadonlyArray<(data: any) => boolean>) {
  return fns.every(fn => fn(data));
}

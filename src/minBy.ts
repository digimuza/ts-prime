import { purry } from './purry';
import { sortBy } from './sortBy';
/**
 * Returns a new array containing items that have maximum numeric values defined by `fn` function.
 * @param array - List of items
 * @param fn - Selector function
 * @signature
 *  P.minBy(arrayOfNumbers)
 * @signature
 *  P.minBy(array, fn)
 * @signature
 *  P.minBy(fn)(array)
 * @signature
 *  P.minBy()(arrayOfNumbers)
 * @example
 *    P.minBy([1,2,3,4,5,6,7,7]) //=> [1]
 *    P.minBy([{ data: 5, score: 2 }, { data: 6, score: 5 }], (q) => q.data * q.score) //=> [{ data: 5, score: 2 }]
 * @category Number, Pipe
 */
export function minBy(array: readonly number[]): number[];
export function minBy<T>(array: readonly T[], fn: (item: T) => number): T[];
export function minBy(): (array: readonly number[]) => number[];
export function minBy<T>(fn: (item: T) => number): (array: readonly T[]) => T[];

export function minBy() {
  return purry(_minBy, arguments);
}

function _minBy<T>(array: readonly T[], fn: (item: T) => number): T[] {
  const items = sortBy(array, fn);
  const minArr: T[] = [];
  let minV: number = 0;
  for (const i of items) {
    if (minArr.length === 0) {
      minArr.push(i);
      minV = fn(i);
      continue;
    }

    if (minV === fn(i)) {
      minArr.push(i);
      continue;
    }
    break;
  }
  return minArr;
}

/**
 * Returns a new array containing items that have maximum numeric values defined by `fn` function.
 * @param array - List of items
 * @param fn - Selector function
 * @signature
 *  P.maxBy(arrayOfNumbers)
 * @signature
 *  P.maxBy(array, fn)
 * @signature
 *  P.maxBy(fn)(array)
 * @signature
 *  P.maxBy()(arrayOfNumbers)
 * @example
 *    P.maxBy([1,2,3,4,5,6,7,7]) //=> [7]
 *    P.maxBy([{ data: 5, score: 2 }, { data: 6, score: 5 }], (q) => q.data * q.score) //=> [{ data: 6, score: 5 }]
 * @category Number
 */
export function maxBy(array: readonly number[]): number[];
export function maxBy<T>(array: readonly T[], fn: (item: T) => number): T[];

export function maxBy<T>(fn: (item: T) => number): (array: readonly T[]) => T[];
export function maxBy(): (array: readonly number[]) => number[];

export function maxBy() {
  return purry(_maxBy, arguments);
}
function _maxBy<T>(array: readonly T[], fn?: (item: T) => number): T[] {
  const def = fn || ((q: T) => Number(q));
  const items = sortBy(array, q => -1 * def(q));
  const minArr: T[] = [];
  let maxV: number = 0;
  for (const i of items) {
    if (minArr.length === 0) {
      minArr.push(i);
      maxV = def(i);
      continue;
    }

    if (maxV === def(i)) {
      minArr.push(i);
      continue;
    }
    break;
  }
  return minArr;
}

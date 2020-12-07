import { PredIndexedOptional } from './_types';
import { purry } from './purry';

/**
 * Map each element of an array into an object using a defined callback function and flatten the result.
 * @param array The array to map.
 * @param fn The mapping function, which should return an Array of key-value pairs, similar to Object.fromEntries
 * @returns The new mapped object.
 * @signature
 *    P.flatMapToObj(array, fn)
 *    P.flatMapToObj.indexed(array, fn)
 * @example
 *  P.flatMapToObj([1, 2, 3], (x) =>
 *    x % 2 === 1 ? [[String(x), x]] : []
 *  ) // => {1: 1, 3: 3}
 *  P.flatMapToObj.indexed(['a', 'b'], (x, i) => [
 *    [x, i],
 *    [x + x, i + i],
 *  ]) // => {a: 0, aa: 0, b: 1, bb: 2}
 * @data_first
 * @indexed
 * @category Array
 */
export function flatMapToObj<T, K extends string | number | symbol, V>(
  array: readonly T[],
  fn: (element: T, index: number, array: readonly T[]) => [K, V][]
): Record<K, V>;

/**
 * Map each element of an array into an object using a defined callback function and flatten the result.
 * @param fn The mapping function, which should return an Array of key-value pairs, similar to Object.fromEntries
 * @returns The new mapped object.
 * @signature
 *    P.flatMapToObj(fn)(array)
 *    P.flatMapToObj(fn)(array)
 * @example
 *    P.pipe(
 *      [1, 2, 3],
 *      P.flatMapToObj(x => (x % 2 === 1 ? [[String(x), x]] : []))
 *    ) // => {1: 1, 3: 3}
 *    P.pipe(
 *      ['a', 'b'],
 *      P.flatMapToObj.indexed((x, i) => [
 *        [x, i],
 *        [x + x, i + i],
 *      ])
 *    ) // => {a: 0, aa: 0, b: 1, bb: 2}
 * @data_last
 * @indexed
 * @category Array
 */
export function flatMapToObj<T, K extends string | number | symbol, V>(
  fn: (element: T, index: number, array: readonly T[]) => [K, V][]
): (array: readonly T[]) => Record<K, V>;

export function flatMapToObj() {
  return purry(_flatMapToObj(), arguments);
}

const _flatMapToObj = () => <T>(
  array: any[],
  fn: PredIndexedOptional<any, any>
) => {
  return array.reduce((result, element, index) => {
    const items = fn(element, index, array);
    items.forEach(([key, value]: [any, any]) => {
      result[key] = value;
    });
    return result;
  }, {});
};

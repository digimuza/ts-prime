import { purry } from './purry';
import { _reduceLazy, LazyResult } from './_reduceLazy';

/**
 * Returns a new array containing only one copy of each element in the original list transformed by a function.
 * Elements are compared by reference using Set.
 * @param array - List of items
 * @signature
 *    P.uniqBy(fn, array)
 * @signature
 *    P.pipe(array, P.uniqBy(fn))
 * @example
 *    P.uniq(obj => obj.n, [{n: 1}, {n: 2}, {n: 2}, {n: 5}, {n: 1}, {n: 6}, {n: 7}]) // => [{n: 1}, {n: 2}, {n: 5}, {n: 6}, {n: 7}]
 *    P.pipe(
 *      [{n: 1}, {n: 2}, {n: 2}, {n: 5}, {n: 1}, {n: 6}, {n: 7}], // only 4 iterations
 *      P.uniq(obj => obj.n),
 *      P.take(3)
 *    ) // => [{n: 1}, {n: 2}, {n: 5}]
 * @category Array, Pipe
 */
export function uniqBy<T, K>(
  array: readonly T[],
  transformer: (item: T) => K
): T[];

export function uniqBy<T, K>(
  transformer: (item: T) => K
): (array: readonly T[]) => T[];

export function uniqBy() {
  return purry(_uniqBy, arguments, lazyUniqBy);
}

function _uniqBy<T, K>(array: T[], transformer: (item: T) => K) {
  return _reduceLazy(array, lazyUniqBy(transformer));
}

function lazyUniqBy(transformer: (item: any) => any) {
  const set = new Set<any>();
  return (value: any): LazyResult<any> => {
    const appliedItem = transformer(value);
    if (set.has(appliedItem)) {
      return {
        done: false,
        hasNext: false,
      };
    }

    set.add(appliedItem);
    return {
      done: false,
      hasNext: true,
      next: value,
    };
  };
}

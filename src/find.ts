import { purry } from './purry';
import { Pred, PredIndexedOptional, PredIndexed } from './_types';
import { _toLazyIndexed } from './_toLazyIndexed';
import { _toSingle } from './_toSingle';

/**
 * Returns the value of the first element in the array where predicate is true, and undefined otherwise.
 * @param items the array
 * @param fn the predicate
 * @signature
 *    P.find(items, fn)
 * @signature
 *    P.find(fn)(items)
 * @example
 *    P.find([1, 3, 4, 6], n => n % 2 === 0) // => 4
 *    P.pipe(
 *      [1, 3, 4, 6],
 *      P.find(n => n % 2 === 0)
 *    ) // => 4
 *    P.pipe(
 *      [1, 3, 4, 6],
 *      P.find.indexed((n, i) => n % 2 === 0)
 *    ) // => 4
 * @category Array, Pipe
 */
export function find<T>(
  array: readonly T[],
  fn: Pred<T, boolean>
): T | undefined;
export function find<T = never>(
  fn: Pred<T, boolean>
): (array: readonly T[]) => T | undefined;

export function find() {
  return purry(_find(false), arguments, find.lazy);
}

const _find = (indexed: boolean) => <T>(
  array: T[],
  fn: PredIndexedOptional<T, boolean>
) => {
  if (indexed) {
    return array.find(fn);
  }

  return array.find(x => fn(x));
};

const _lazy = (indexed: boolean) => <T>(
  fn: PredIndexedOptional<T, boolean>
) => {
  return (value: T, index?: number, array?: T[]) => {
    const valid = indexed ? fn(value, index, array) : fn(value);
    return {
      done: valid,
      hasNext: valid,
      next: value,
    };
  };
};

export namespace find {
  export function indexed<T>(
    array: readonly T[],
    fn: PredIndexed<T, boolean>
  ): T | undefined;
  export function indexed<T>(
    fn: PredIndexed<T, boolean>
  ): (array: readonly T[]) => T | undefined;
  export function indexed() {
    return purry(_find(true), arguments, find.lazyIndexed);
  }

  export const lazy = _toSingle(_lazy(false));

  export const lazyIndexed = _toSingle(_toLazyIndexed(_lazy(true)));
}

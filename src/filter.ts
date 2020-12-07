import { purry } from './purry';
import { _reduceLazy, LazyResult } from './_reduceLazy';
import { Pred, PredIndexedOptional, PredIndexed } from './_types';
import { _toLazyIndexed } from './_toLazyIndexed';

/**
 * Filter the elements of an array that meet the condition specified in a callback function.
 * @param array The array to filter.
 * @param fn the callback function.
 * @signature
 *    P.filter(array, fn)
 * @signature
 *    P.filter(fn)(array)
 * @example
 *    P.filter([1, 2, 3], x => x % 2 === 1) // => [1, 3]
 * 
 *    P.pipe([1, 2, 3], P.filter(x => x % 2 === 1)) // => [1, 3]
 * @category Array, Pipe
 */
export function filter<T, S extends T>(
  array: readonly T[],
  fn: (value: T) => value is S
): S[];
export function filter<T>(array: readonly T[], fn: Pred<T, boolean>): T[];
export function filter<T, S extends T>(
  fn: (input: T) => input is S
): (array: readonly T[]) => S[];
export function filter<T>(fn: Pred<T, boolean>): (array: readonly T[]) => T[];

export function filter() {
  return purry(_filter(false), arguments, filter.lazy);
}

const _filter = (indexed: boolean) => <T>(
  array: T[],
  fn: PredIndexedOptional<T, boolean>
) => {
  return _reduceLazy(
    array,
    indexed ? filter.lazyIndexed(fn) : filter.lazy(fn),
    indexed
  );
};

const _lazy = (indexed: boolean) => <T>(
  fn: PredIndexedOptional<T, boolean>
) => {
  return (value: T, index?: number, array?: readonly T[]): LazyResult<T> => {
    const valid = indexed ? fn(value, index, array) : fn(value);
    if (!!valid === true) {
      return {
        done: false,
        hasNext: true,
        next: value,
      };
    }
    return {
      done: false,
      hasNext: false,
    };
  };
};

export namespace filter {
  export function indexed<T, S extends T>(
    array: readonly T[],
    fn: (input: T, index: number, array: readonly T[]) => input is S
  ): S[];
  export function indexed<T>(
    array: readonly T[],
    fn: PredIndexed<T, boolean>
  ): T[];
  /**
   * @data_last
   */
  export function indexed<T, S extends T>(
    fn: (input: T, index: number, array: readonly T[]) => input is S
  ): (array: readonly T[]) => S[];
  export function indexed<T>(
    fn: PredIndexed<T, boolean>
  ): (array: readonly T[]) => T[];
  export function indexed() {
    return purry(_filter(true), arguments, filter.lazyIndexed);
  }

  export const lazy = _lazy(false);
  export const lazyIndexed = _toLazyIndexed(_lazy(true));
}

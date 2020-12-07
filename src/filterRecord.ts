import { Pred } from './_types';
import { purry } from './purry';

/**
 * Loops each record element and match against provided predicate.
 * @param record The object to filter.
 * @param fn Predicate function.
 * @returns The new filtered record.
 * @signature
 *    P.filterRecord(record, fn)
 * @signature
 *    P.pipe({ a: 1, b: 2, c: 3 }, P.filterRecord(fn))
 * @example
 *    P.filterRecord({ a: 1, b: 2, c: 3 }, ([k,v]) => [k, v * 2]) // => { a: 2, b: 4, c: 6 }
 *    P.pipe({ a: 1, b: 2, c: 3 }, P.filterRecord(([k,v]) => [k, v * 2]))) // => { a: 2, b: 4, c: 6 }
 * @category Object, Pipe
 */
export function filterRecord<T extends Record<string, unknown>>(
  record: T,
  fn: Pred<[keyof T, T[keyof T]], any>
): Record<keyof T, T[keyof T]>;
export function filterRecord<T extends Record<string, unknown>>(
  fn: (v: [keyof T, T[keyof T]]) => any
): (record: T) => Record<keyof T, T[keyof T]>;
export function filterRecord() {
  return purry(_filterRecord(), arguments);
}

const _filterRecord = () => <
  T extends { [k: string]: any },
  K extends string,
  V
>(
  rec: T,
  fn: (v: [keyof T, T[keyof T]]) => any
) => {
  return Object.entries(rec)
    .filter(fn)
    .reduce((acc, [k, v]: [keyof T, T[keyof T]]) => {
      acc[k] = v;
      return acc;
    }, {} as Record<keyof T, T[keyof T]>);
};

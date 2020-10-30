import { Pred } from "./_types";
import { purry } from "./purry";

/**
 * Loops each record element and match against provided predicate.
 * @param record The object to filter.
 * @param fn Predicate function.
 * @returns The new filtered record.
 * @signature
 *    R.filterRecord(record, fn)
 * @example
 *    R.filterRecord({ a: 1, b: 2, c: 3 }, ([k,v]) => [k, v * 2]) // => { a: 2, b: 4, c: 6 }
 * @data_first
 * @pipeable
 * @category Object
 */
export function filterRecord<T extends Record<string, unknown>>(record: T, fn: Pred<[keyof T, T[keyof T]], any>): Record<keyof T, T[keyof T]>;

/**
 * Loops each record element and match against provided predicate.
 * @param record - The object to filter.
 * @param fn - Predicate function.
 * @returns The new filtered record.
 * @signature
 *    R.pipe({ a: 1, b: 2, c: 3 }, R.filterRecord(fn))
 * @example
 *    R.pipe({ a: 1, b: 2, c: 3 }, R.filterRecord(([k,v]) => [k, v * 2]))) // => { a: 2, b: 4, c: 6 }
 * @data_last
 * @pipeable
 * @category Object
 */
export function filterRecord<T extends Record<string, unknown>>(fn: (v: [keyof T, T[keyof T]]) => any): (record: T) => Record<keyof T, T[keyof T]>;
export function filterRecord() {
    return purry(_filterRecord(), arguments);
}


const _filterRecord = () => <T extends { [k: string]: any }, K extends string, V>(
    rec: T,
    fn: (v: [keyof T, T[keyof T]]) => any
) => {
    return Object.entries(rec).filter(fn).reduce((acc, [k,v]: [keyof T, T[keyof T]]) => {
        acc[k] = v
        return acc
    }, {} as Record<keyof T, T[keyof T]>)
};

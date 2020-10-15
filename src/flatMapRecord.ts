import { Pred } from "./_types";
import { purry } from "./purry";

/**
 * Loops each record element and flatMaps against provided function.
 * @param record The target object.
 * @param fn Mapping function.
 * @returns The new record.
 * @signature
 *    R.flatMapRecord(record, fn)
 * @example
 *    R.flatMapRecord({ a: 1, b: 2, c: 3 }, ([k,v]) => [[k, v * 2], [k + "_abc", v * 2]]) // => { a: 2, a_abc: 2, b: 4, b_abc: 4, c: 6, c_abc: 6 }
 * @data_first
 * @pipeable
 * @category Object
 */
export function flatMapRecord<T extends Record<string, unknown>, K extends string, V>(record: T, fn: Pred<[keyof T, T[keyof T]], ReadonlyArray<[K, V]>>): Record<K, V>;

/**
 * Loops each record element and flatMaps against provided function.
 * @param record The target object.
 * @param fn Mapping function.
 * @returns The new record.
 * @signature
 *    R.pipe(record, R.flatMapRecord(fn))
 * @example
 *    R.pipe(({ a: 1, b: 2, c: 3 }, R.flatMapRecord(([k,v]) => [[k, v * 2], [k + "_abc", v * 2]])) // => { a: 2, a_abc: 2, b: 4, b_abc: 4, c: 6, c_abc: 6 }
 * @data_last
 * @pipeable
 * @category Object
 */
export function flatMapRecord<T extends Record<string, unknown>, K extends string, V extends unknown>(fn: (v: [keyof T, T[keyof T]]) => ReadonlyArray<[K, V]>): (record: T) => Record<K, V>;
export function flatMapRecord() {
    return purry(_flatMapRecord(), arguments);
}


const _flatMapRecord = () => <T extends { [k: string]: any }, K extends string, V>(
    rec: T,
    fn: (v: [keyof T, T[keyof T]]) => ReadonlyArray<[K, V]>
) => {
    return Object.entries(rec).map(([k, v]) => {
        return fn([k as keyof T, v as unknown as T[keyof T]])
    }).reduce((acc, w) => {
        for (const [k, v] of w) {
            acc[k] = v
        }
        return acc
    }, {} as Record<K, V>)
};

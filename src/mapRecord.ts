import { Pred } from "./_types";
import { purry } from "./purry";

/**
 * Loops each record element and maps against provided function.
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
export function mapRecord<T extends Record<string, unknown>, K extends string, V>(record: T, fn: Pred<[keyof T, T[keyof T]], [K, V]>): Record<K, V>;

/**
 * Loops each record element and maps against provided function.
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
export function mapRecord<T extends Record<string, unknown>, K extends string, V extends unknown>(fn: (v: [keyof T, T[keyof T]]) => [K, V]): (record: T) => Record<K, V>;
export function mapRecord() {
    return purry(_mapRecord(), arguments);
}


const _mapRecord = () => <T extends { [k: string]: any }, K extends string, V>(
    rec: T,
    fn: (v: [keyof T, T[keyof T]]) => [K, V]
) => {
    return Object.entries(rec).map(([k, v]) => {
        return fn([k as keyof T, v as unknown as T[keyof T]])
    }).reduce((acc, [k, v]) => {
        acc[k] = v
        return acc
    }, {} as Record<K, V>)
};
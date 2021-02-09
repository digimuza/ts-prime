import { purry } from "./purry"

function _values<T extends { [k: string]: unknown }>(object: T): ReadonlyArray<T[keyof T]> {
    return Object.values(object) as ReadonlyArray<T[keyof T]>
}

/**
 * Return object values
 * @param object - object value
 * @signature
 *    P.values(object)
 * @example
 *    P.values()(object)
 * @data_first
 * @category Array
 */
export function values<T extends { [k: string]: unknown }>(): (object: T) => ReadonlyArray<T[keyof T]>
export function values<T extends { [k: string]: unknown }>(object: T): ReadonlyArray<T[keyof T]>
export function values() {
    return purry(_values, arguments)
}



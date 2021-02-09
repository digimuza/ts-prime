import { purry } from "./purry"

function _keys<T extends { [k: string]: unknown }>(object: T): ReadonlyArray<keyof T> {
    return Object.keys(object) as ReadonlyArray<keyof T>
}

/**
 * Return object keys
 * @param object - object value
 * @signature
 *    P.keys(object)
 * @example
 *    P.keys()(object)
 * @data_first
 * @category Array
 */
export function keys<T extends { [k: string]: unknown }>(): (object: T) => ReadonlyArray<keyof T>
export function keys<T extends { [k: string]: unknown }>(object: T): ReadonlyArray<keyof T>
export function keys() {
    return purry(_keys, arguments)
}



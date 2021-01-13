import { purry } from "./purry"

type PlainType = string | number | boolean | null | undefined
interface PlainObject {
    readonly [key: string]: PlainType | PlainObject | ReadonlyArray<PlainType | PlainObject>
}
function isPlainObject(value: unknown): value is PlainObject {
    return value != null && {}.toString.call(value) === '[object Object]'
}
function _compact<T>(a: T): T {
    return Object.assign(
        {},
        ...Object.entries(a)
            .filter(([, v]) => v !== undefined && v !== null)
            .map(([k, v]) => ({
                [k]: Array.isArray(v)
                    ? v
                        .filter((val) => val !== undefined && val !== null)
                        .map((val) => (isPlainObject(val) ? _compact(val) : val))
                    : isPlainObject(v)
                        ? _compact(v)
                        : v,
            }))
    )
}

/**
 * Removes all undefined and null values from object rreecursively
 * @param data - the object to compact
 * @signature P.compact(value)
 * @example 
 *      P.compact({foo: undefined}) // {}
 * @category Object
 */
export function compact<T>(data: T): T
export function compact<T>(): (data: T) => T
export function compact() {
    return purry(_compact, arguments)
}
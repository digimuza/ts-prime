import { isString, isNumber, isFunction, isPromise, isBoolean, isObject, isArray } from "./guards";
import { pipe } from "./pipe";
import { sortBy } from "./sortBy";
import { map } from "./map";


export type SortFunction<T> = (a: T, b: T) => number

function anyToString(data: unknown): string {
    if (isObject(data)) {
        const keys = Object.keys(data)
        return pipe(
            keys,
            map((key) => {
                const value = data[key]
                if (isString(value)) return `${key}:${value}`
                if (isNumber(value)) return `${key}:${value}`
                if (isBoolean(value)) return `${key}:${String(value)}`
                if (isObject(value)) {
                    return `${key}:${anyToString(value)}`
                }

                return `${key}:${String(value)}`
            }),
            sortBy((c) => {
                return c
            }),
        ).join(":")
    }

    if (isArray(data)) {
        return pipe(data.map((d) => anyToString(d)), sortBy((c) => c)).join(":")
    }
    return String(data)
}

/**
 * Recursivly sort arrays and objects.
 * @param value - anything
 */
export function deepSort<T>(value: T): T {
    const v = value as unknown
    if (isString(v)) return value
    if (isNumber(v)) return value
    if (isFunction(v)) return value
    if (isPromise(v)) return value
    if (isBoolean(v)) return value

    if (isObject(v)) {
        const keys = pipe(Object.keys(value), sortBy((c) => c))
        const obj = {} as Record<string, unknown>
        for (const k of keys) {
            obj[k] = deepSort(v[k])
        }

        return obj as T
    }

    if (isArray(v)) {
        return pipe(v.map((q) => deepSort(q)), sortBy((c) => {
            return anyToString(c)
        })) as unknown as T
    }

    return value
}
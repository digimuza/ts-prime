import { isNumber, isString } from "./index"


export function toString(data: unknown) {
    return String(data)
}

/**
 * Parses floating number
 */
export function toFloat(data: unknown): number | undefined
export function toFloat<T extends number>(data: unknown, defaultValue: T): number
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toFloat(data: unknown, defaultValue?: number): any {
    if (isNumber(data)) {
        return data
    }
    if (isString(data)) {
        const parsedString = parseFloat(data)
        return !isNaN(parsedString) ? parsedString : isNumber(defaultValue) ? defaultValue : undefined
    }

    if (isNumber(defaultValue)) {
        return defaultValue
    }
    return
}


export function toInt(data: unknown): number | undefined
export function toInt<T extends number>(data: unknown, defaultValue: T): number
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toInt(data: unknown, defaultValue?: number): any {
    if (isNumber(data)) {
        return parseInt(`${data}`, 10)
    }

    if (isString(data)) {
        const parsedString = parseInt(data, 10)
        return !isNaN(parsedString) ? parsedString : isNumber(defaultValue) ? defaultValue : undefined
    }

    if (isNumber(defaultValue)) {
        return defaultValue
    }
    return
}
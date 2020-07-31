import { isError } from "./index"


export class UnknownError extends Error {
    readonly name = 'UnknownError'
    constructor(public data: unknown) {
        super(JSON.stringify(data))
    }
}

/**
 * Ensures that err is Error instance
 */
export function ensureError(err: unknown): Error {
    if (isError(err)) {
        return err
    }

    return new UnknownError(err)
}

export type CanGetError<T> = Error | T
/**
 * Similar to try catch statement. If function throws insisted callback this function will return `Error` instance
 */
export function canFail<T>(fn: () => Promise<T>): Promise<CanGetError<T>>
export function canFail<T>(fn: () => T): CanGetError<T>
// tslint:disable-next-line: promise-function-async
export function canFail<T>(fn: (() => T) | (() => Promise<T>)): CanGetError<T> | Promise<CanGetError<T>> {
    try {
        const r = fn()
        if (r instanceof Promise) {
            return r.catch((err) => {
                if (isError(err)) {
                    return err
                }
                return new UnknownError(err)
            })
        }
        return r
    } catch (err) {
        if (isError(err)) {
            return err
        }
        return new UnknownError(err)
    }
}
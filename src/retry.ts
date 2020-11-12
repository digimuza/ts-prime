

// args?: {
//     retryCount?: number
//     retryCondition?: (err: Error) => boolean
//     delay?: number | ((count: number) => Promise<void>)
// }

import { delay } from "./delay"
import { ensureError } from "./errors"
import { isNumber } from "./guards"
import { purry } from "./purry"

export interface RetryArgs {
    count: number,
    err: Error
    startTime: number
    logger?: Partial<Pick<Console, 'warn'>>
}
export const RETRY_STRATEGIES = {
    EXP: (options: {
        retryOnError: (err: Error) => boolean
        retryCount: number
        retryDelay: number | ((count: number) => number)
    }) => {
        const { retryCount, retryDelay, retryOnError } = options
        return async (args: RetryArgs) => {
            isNumber(retryDelay)
            const delayMs = isNumber(retryDelay) ? retryDelay : retryDelay(args.count)
            const shouldRetry = () => {
                if (retryCount < args.count) return {
                    ...args,
                    retry: false
                }
                if (retryOnError(args.err)) return {
                    ...args,
                    retry: true
                }
                return true
            }
            if (!shouldRetry()) return {
                ...args,
                retry: false
            }

            args.logger?.warn?.(`Retrying ${args.count}. Error ${args.err.message}`)
            await delay(delayMs)
            return {
                ...args,
                count: args.count + 1,
                retry: true
            }
        }
    }
}
export type RetryFn = (args: RetryArgs) => Promise<RetryArgs & { retry: boolean }>

const defaultRetryStrategy = RETRY_STRATEGIES.EXP({ retryCount: 5, retryDelay: (count) => Math.pow(count, 2) * 1000, retryOnError: () => true })

/**
 * Retry promise on exception
 * @param fn - function that return promise
 * @param options - Options
 */
export interface RetryOnFailArgs {
    /**
     * Check `RETRY_STRATEGIES` for available retry strategies
     */
    retryStrategy?: RetryFn
    /**
     * Logging function you can use regular console object or custom logger
     */
    logger?: Pick<Console, 'warn'>
}

/**
 * Function middleware that retry function if function crashes
 * @description
 * By default `retryOnFail` function uses `RETRY_STRATEGIES.EXP` strategy this strategy tries maximum 5 times and after each retry delays `Math.pow(count, 2) * 1000`
 * @param fn - target function
 * @param options - additional retry options
 * @signature
 *    const newFn = R.retryOnFail(fn)
 * @example
 *    const request = (url: string) => axios.get(url)
 *    const requestWithRetry = R.retryOnFail(request)
 * @data_first
 */
export function retryOnFail<I extends any[], R>(fn: (...args: I) => Promise<R>, options?: RetryOnFailArgs): (...args: I) => Promise<R>

/**
 * Function middleware that retry function if function crashes
 * @description
 * By default `retryOnFail` function uses `RETRY_STRATEGIES.EXP` strategy this strategy tries maximum 5 times and after each retry delays `Math.pow(count, 2) * 1000`
 * @param fn - target function
 * @param options - additional retry options
 * @signature
 *    const newFn = R.pipe(fn, R.retryOnFail())
 * @example
 *    const request = (url: string) => axios.get(url)
 *    const requestWithRetry = P.pipe(request, R.retryOnFail())
 * @data_first
 */
export function retryOnFail<I extends any[], R>(options?: RetryOnFailArgs): (fn: (...args: I) => Promise<R>) => (...args: I) => Promise<R>
export function retryOnFail() {
    return purry(_retryOnFail, arguments);
}
function _retryOnFail<I extends any[], R>(fn: (...args: I) => Promise<R>, options?: RetryOnFailArgs): (...args: I) => Promise<R> {
    const { retryStrategy: retryFn = defaultRetryStrategy } = options || {}
    return (...args: I) => {
        const startTime = Date.now()
        return fn(...args).catch(async (e) => {
            const err = ensureError(e)
            let prev: RetryArgs | undefined = undefined
            while (true) {
                const retryFDS: RetryArgs & { retry: boolean } = await retryFn(prev || { count: 0, err, startTime, logger: options?.logger })
                if (retryFDS.retry) {
                    prev = { ...retryFDS as any }
                    continue
                }
                throw err
            }

        })
    }
}


import { canFail } from "./errors"
import { isError } from "./guards"
import { purry } from "./purry"

function __retry<E extends (...args: any[]) => Promise<any>>(
    fn: E,
    errorHandler: (stats: { err: Error; count: number }) => (Promise<boolean> | boolean)
): E {
    const stats = {
        count: 0,
    }
    return (async (...args) => {
        const request = async (): Promise<any> => {
            const result = await canFail(() => fn(...args))
            if (isError(result)) {
                stats.count += 1
                const continueReq = await errorHandler({ count: stats.count, err: result })
                if (continueReq) {
                    return request()
                }
                throw new Error(`Retry operation failed "${stats.count}" times. ${result.message}`)
            }

            return result
        }

        return request()
    }) as E
}

/**
 * Retry promise function
 * @param errorHandler Logic when to retry
 * @param fn the callback function
 * @signature
 *    P.retry(fn, errorHandler)
 * @example
 *    P.retry(async () => {
 *          await delay(1000)
 *          throw new Error("Failed!")
 *    }, ({ count }) => count < 10) // Retry function 10 times
 * @category Array
 */
export function retry<E extends (...args: any[]) => Promise<any>>(errorHandler: (stats: { err: Error; count: number }) => Promise<boolean> | boolean): (fn: E) => E
export function retry<E extends (...args: any[]) => Promise<any>>(fn: E, errorHandler: (stats: { err: Error; count: number }) => Promise<boolean> | boolean): E
export function retry() {
    return purry(__retry, arguments)
}
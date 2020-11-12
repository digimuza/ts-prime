import { isError } from "./index";
import { purry } from "./purry";


/**
 * Prevents promise to execute longer than X ms
 * @param {Function} fn The function to invoke. 
 * @param {number} maxDuration - Duration in milliseconds 
 * @data_first
 */
export function timeout<I extends any[], R>(fn: (...args: I) => Promise<R>, maxDuration: number): (...args: I) => Promise<R>
export function timeout<I extends any[], R>(maxDuration: number): (fn: (...args: I) => Promise<R>) => (...args: I) => Promise<R>
export function timeout() {
    return purry(_timeout, arguments);
}
function _timeout<I extends any[], R>(fn: (...args: I) => Promise<R>, maxDuration: number): (...args: I) => Promise<R> {
    return (...args: I) => {
        return Promise.race([
            new Promise<Error>((resolve) => {
                setTimeout(() => {
                    resolve(new Error(`${fn.name} timeout after ${maxDuration}ms`))
                }, maxDuration)
            }),
            fn(...args)
        ]).then((q) => {
            if (isError(q)) {
                throw q
            }
            return q as R
        })
    }
}

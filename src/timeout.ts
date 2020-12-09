import { isError } from './index';
import { purry } from './purry';

/**
 * Prevents promise to execute longer than X ms
 * @param fn The function to invoke.
 * @param maxDuration - Duration in milliseconds
 * @throws If provided function executes longer than `maxDuration` milliseconds
 * @signature
 *    P.timeout(fn, milliseconds)
 * @signature
 *    P.timeout(milliseconds)(fn)
 * @example
 *    const req = P.timeout(request, 500)
 *    req({ ... }) // Will throw if function executes longer than 500ms
 * @category Utility, Pipe
 */
export function timeout<I extends any[], R>(
  fn: (...args: I) => Promise<R>,
  maxDuration: number
): (...args: I) => Promise<R>;
export function timeout<I extends any[], R>(
  maxDuration: number
): (fn: (...args: I) => Promise<R>) => (...args: I) => Promise<R>;
export function timeout() {
  return purry(_timeout, arguments);
}
function _timeout<I extends any[], R>(
  fn: (...args: I) => Promise<R>,
  maxDuration: number
): (...args: I) => Promise<R> {
  return (...args: I) => {
    return Promise.race([
      new Promise<Error>(resolve => {
        setTimeout(() => {
          resolve(new Error(`${fn.name} timeout after ${maxDuration}ms`));
        }, maxDuration);
      }),
      fn(...args),
    ]).then(q => {
      if (isError(q)) {
        throw q;
      }
      return q as R;
    });
  };
}

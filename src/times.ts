import { purry } from './purry';

/**
 * Calls an input function `n` times, returning an array containing the results
 * of those function calls.
 *
 * @description
 * `fn` is passed one argument: The current value of `n`, which begins at `0`
 * and is gradually incremented to `n - 1`.
 *
 * @param count A value between `0` and `n - 1`. Increments after each function call.
 * @param fn The function to invoke. Passed one argument, the current value of `n`.
 * @return An array containing the return values of all calls to `fn`.
 * @throws If count is less than 0
 * @signature
 *    P.times(5, fn)
 * @signature
 *    P.times(fn)(count)
 * @example
 *  P.times(identity, 5); //=> [0, 1, 2, 3, 4]
 * @category Utility, Pipe
 */
export function times<T>(count: number, fn: (n: number) => T): T[];
export function times<T>(fn: (n: number) => T): (count: number) => T[];

export function times() {
  return purry(_times, arguments);
}

function _times<T>(count: number, fn: (n: number) => T): T[] {
  if (count < 0) {
    throw new RangeError('n must be a non-negative number');
  }

  const res = [];
  for (let i = 0; i < count; i++) {
    res.push(fn(i));
  }

  return res;
}

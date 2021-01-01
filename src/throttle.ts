/**
 * The Debounce technique allow us to “group” multiple sequential calls in a single one.
 * @description
 * You can find great article that explains how throttle works [here](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * @param func - Any provided function
 * @param debounceTimeMs - duration in milliseconds
 * @signature
 *    P.throttle(func, throttleTimeMs)
 * @example
 *    // Execute log
 *    P.throttle(console.log, 1000)
 * @category Function
 */
export function throttle<Input extends any[], R>(
  func: (...args: Input) => R,
  throttleTimeMs: number
): (...args: Input) => R {
  // tslint:disable: no-let
  let lastExec: number | null = null;
  let result: { readonly r: R } | null = null;
  return (...args) => {
    if (result == null) {
      lastExec = Date.now();
      result = {
        r: func(...args),
      };
      return result.r;
    }
    const diff = Date.now() - lastExec!;
    if (diff >= throttleTimeMs) {
      lastExec = Date.now();
      result = {
        r: func(...args),
      };
      return result.r;
    }
    return result.r;
  };
}

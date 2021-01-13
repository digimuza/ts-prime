import { purry } from "./purry";
/**
 * The Debounce technique allow us to “group” multiple sequential calls in a single one.
 * @description
 * https://css-tricks.com/debouncing-throttling-explained-examples/
 * @param func - Any provided function
 * @param debounceTimeMs - duration in milliseconds
 * @example
 *    const debouncedLog = P.debounce(console.log, 500)
 *    debouncedLog("I will be printed only if 500ms ago this function was not called")
 * @category Function
 */

export function debounce<E extends (...args: any[]) => any>(debounceTimeMs: number): (func: E) => E
export function debounce<E extends (...args: any[]) => any>(func: E, debounceTimeMs: number): E
export function debounce() {
  return purry(__debounce, arguments)
}

function __debounce<E extends (...args: any[]) => any>(
  func: E,
  debounceTimeMs: number
): E {
  // tslint:disable: no-let
  let result: { readonly r: ReturnType<E> } | null = null;
  let debounceTimer: any = null;
  return ((...args) => {
    if (result == null) {
      result = {
        r: func(...args),
      };
      return result.r;
    }
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      result = {
        r: func(...args),
      };
    }, debounceTimeMs);

    return result.r;
  }) as E;
}

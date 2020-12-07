/**
 * The Debounce technique allow us to “group” multiple sequential calls in a single one.
 * @description
 * https://css-tricks.com/debouncing-throttling-explained-examples/
 * @param func - Any provided function
 * @param debounceTimeMs - duration in milliseconds
 * @category Utility
 */
export function debounce<Input extends any[], R>(
  func: (...args: Input) => R,
  debounceTimeMs: number
): (...args: Input) => R {
  // tslint:disable: no-let
  let result: { readonly r: R } | null = null;
  let debounceTimer: any = null;
  return (...args) => {
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
  };
}

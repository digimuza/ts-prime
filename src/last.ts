/**
 * Gets the last element of `array`.
 * @param array the array
 * @param defaultValue default value
 * @signature
 *    P.last(array)
 *    P.last(array, default)
 * @example
 *    P.last([1, 2, 3]) // => 3
 *    P.last([]) // => undefined
 *    P.last([], 2) // => 2
 *    P.last([1], 2) // => 1
 * @category Array
 */
export function last<T>(array: readonly T[]): T | undefined;
export function last<T>(array: readonly T[], defaultValue: T): T;
export function last<T>(array: readonly T[], defaultValue?: T): T | undefined {
  return array[array.length - 1] || defaultValue;
}

import { purry } from "./purry";


function _isOneOf<T extends string | number | boolean>(
  value: string | number | boolean | undefined,
  array: ReadonlyArray<T>,
): value is T {
  return typeof value !== 'undefined' && array.indexOf(value as T) !== -1;
}


/**
 * Checks if value is one of provided list
 * @param value - Value to check
 * @param array - Provided list
 * @signature
 *    P.isOneOf(value, list)
 * @signature
 *    P.isOneOf(list)(value)
 * @example
 *    P.isOneOf('apple',['apple', 'microsoft']) //=> true
 *    P.isOneOf(['apple', 'microsoft'])('apple') //=> true
 * @category Guard, Pipe
 */
export function isOneOf<T extends string | number | boolean>(
  value: string | number | boolean | undefined,
  array: ReadonlyArray<T>,
): value is T
export function isOneOf<T extends string | number | boolean>(
  array: ReadonlyArray<T>,
): (value: string | number | boolean | undefined) => value is T
export function isOneOf() {
  return purry(_isOneOf, arguments)
}
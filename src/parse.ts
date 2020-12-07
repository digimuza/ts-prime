import { isNumber, isString } from './index';

/**
 * Converts data to string
 * @param data - Anything
 * @example
 * P.toString({ data: 55 }) //=> [object Object]
 * @category String
 */
export function toString(data: unknown) {
  return String(data);
}

/**
 * Parses string to `floating` number
 * @description
 * This function litle bit different than parseFloat. First of all it can return undefined if float parsing is unsuccessful. 
 * Regular parseFloat return `NaN` this is really misleading
 * @param data - Anything
 * @example
 * P.toFloat("1.378998") // = 1.378998
 * P.toFloat("test") // undefined
 * P.toFloat("test", 0) // 0
 * @category Number
 */
export function toFloat(data: unknown): number | undefined;
export function toFloat<T extends number>(
  data: unknown,
  defaultValue: T
): number;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toFloat(data: unknown, defaultValue?: number): any {
  if (isNumber(data)) {
    return data;
  }
  if (isString(data)) {
    const parsedString = parseFloat(data);
    return !isNaN(parsedString)
      ? parsedString
      : isNumber(defaultValue)
        ? defaultValue
        : undefined;
  }

  if (isNumber(defaultValue)) {
    return defaultValue;
  }
  return;
}

/**
 * Parses string to `int` number
 * @description
 * This function litle bit different than parseInt. First of all it can return undefined if int parsing is unsuccessful. 
 * Regular parseInt cant return `NaN` and this is really misleading
 * @param data - Anything
 * @example
 * P.toInt("1.378998") // = 1
 * P.toInt("test") // undefined
 * P.toInt("test", 0) // 0
 * @category Number
 */
export function toInt(data: unknown): number | undefined;
export function toInt<T extends number>(data: unknown, defaultValue: T): number;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toInt(data: unknown, defaultValue?: number): any {
  if (isNumber(data)) {
    return parseInt(`${data}`, 10);
  }

  if (isString(data)) {
    const parsedString = parseInt(data, 10);
    return !isNaN(parsedString)
      ? parsedString
      : isNumber(defaultValue)
        ? defaultValue
        : undefined;
  }

  if (isNumber(defaultValue)) {
    return defaultValue;
  }
  return;
}

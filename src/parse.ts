import { isNumber, isString } from './index';

/**
 * Parses date and if success returns Date object otherwise returns undefined
 * @description
 * If for example we want parse data new Date("asd") this will be invalid date and javascript will not return exception. So for every date parsing we need to do additional validity checks
 * @param data - Anything
 * @example
 * P.toFloat("1.378998") // = 1.378998
 * P.toFloat("test") // undefined
 * P.toFloat("test", 0) // 0
 * @category Number
 */
export function toDate(data: string | number | Date): Date | undefined;
export function toDate(data: string | number | Date, defaultValue: Date): Date;
export function toDate(
  data: string | number | Date,
  defaultValue?: Date
): Date | undefined {
  const parsed = new Date(data);
  if (isNaN(parsed.getTime())) return defaultValue;
  return parsed;
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

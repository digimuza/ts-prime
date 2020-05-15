
type DefinitelyString<T> = Extract<T, string> extends never ? string : Extract<T, string> extends any ? string : Extract<T, string>


// @ts-ignore
export function isString<T>(data: T): data is DefinitelyString<T> {
  return typeof data === 'string';
}

type DefinitelyNumber<T> = Extract<T, number> extends never ? number : Extract<T, number> extends any ? number : Extract<T, number>

// @ts-ignore
export function isNumber<T>(data: T): data is DefinitelyNumber<T> {
  return typeof data === 'number' && !isNaN(data);
}

export function isDefined<T>(data: T): data is NonNullable<T> {
  return typeof data !== 'undefined' && data !== null;
}

type DefinitelyBoolean<T> = Extract<T, boolean> extends never ? boolean : Extract<T, boolean> extends any ? boolean : Extract<T, number>

// @ts-ignore
export function isBoolean<T>(data: T): data is DefinitelyBoolean<T> {
  return typeof data === 'boolean';
}

type DefinitelyPromise<T extends unknown> = Extract<T, Promise<any>> extends never ? Promise<unknown> : Extract<T, Promise<any>>

// @ts-ignore
export function isPromise<T>(data: T): data is DefinitelyPromise<T> {
  return data instanceof Promise;
}

type DefinitelyArray<T extends unknown> = Extract<T, Array<any> | ReadonlyArray<any>> extends never ? ReadonlyArray<unknown> : Extract<T, Array<any> | ReadonlyArray<any>>

// @ts-ignore
export function isArray<T extends unknown>(data: T): data is DefinitelyArray<T> {
  return Array.isArray(data);
}

type DefinitelyObject<T extends unknown> = Exclude<Extract<T, object>, Array<any> | Function> extends never ? { [k: string]: unknown } : Exclude<Extract<T, object>, Array<any> | Function>

// @ts-ignore
export function isObject<T extends unknown>(data: T): data is DefinitelyObject<T> {
  return !!data && !Array.isArray(data) && typeof data === 'object';
}

type DefinitelyFunction<T> = Extract<T, Function> extends never ? Function : Extract<T, Function>

// @ts-ignore
export function isFunction<T>(data: T): data is DefinitelyFunction<T> {
  return typeof data === 'function';
}

export function isNil<T>(data: T): data is Extract<T, null | undefined> {
  return data == null;
}

type DefinitelyError<T> = Extract<T, Error> extends never ? Error : Extract<T, Error>

// @ts-ignore
export function isError<T>(data: T): data is DefinitelyError<T> {
  return data instanceof Error;
}

type DefinitelyDate<T> = Extract<T, Date> extends never ? Date : Extract<T, Date>

// @ts-ignore
export function isDate<T>(data: T): data is DefinitelyDate<T> {
  return data instanceof Date;
}

export function isTruthy<T>(
  value: T
): value is Exclude<T, null | undefined | false | '' | 0> {
  return !!value;
}

export function isNot<T, S>(
  // @ts-ignore
  predicate: (data: T) => data is S
): (data: T) => data is Exclude<T, S>;
export function isNot<T>(predicate: (data: T) => any): (data: T) => boolean;
export function isNot<T>(predicate: (data: T) => any) {
  return (data: T) => {
    return !predicate(data);
  };
}

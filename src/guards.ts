type DefinitelyString<T> = Extract<T, string> extends never
  ? string
  : Extract<T, string> extends any
  ? string
  : Extract<T, string>;

/**
 * Checks if `data` is `Number`
 * @param data - Anything
 * @example
 * const item = { data: 1 } as { data: number } | string
 * if (P.isString(item)) {
 *    console.log("My name is", item)
 * }
 * @category Guard
 */
// @ts-ignore
export function isString<T>(data: T): data is DefinitelyString<T> {
  return typeof data === 'string';
}

type DefinitelyNumber<T> = Extract<T, number> extends never
  ? number
  : Extract<T, number> extends any
  ? number
  : Extract<T, number>;

/**
 * Checks if `data` is `Number`
 * @param data - Anything
 * @example
 * const item = { data: 1 } as { data: number } | number
 * if (P.isNumber(item)) {
 *    console.log("My phone number is", item)
 * }
 * @category Guard
 */
// @ts-ignore
export function isNumber<T>(data: T): data is DefinitelyNumber<T> {
  return typeof data === 'number' && !isNaN(data);
}

/**
 * Checks if `data` is defined
 * @param data - Anything
 * @example
 * const item = { data: 1 } as { data: number } | undefined
 * if (P.isDefined(item)) {
 *    console.log(item.data)
 * }
 * @category Guard
 */
export function isDefined<T>(data: T): data is NonNullable<T> {
  return typeof data !== 'undefined' && data !== null;
}

type DefinitelyBoolean<T> = Extract<T, boolean> extends never
  ? boolean
  : Extract<T, boolean> extends any
  ? boolean
  : Extract<T, number>;

/**
 * Checks if `data` is boolean
 * @param data - Anything
 * @example
 * const item = false as { data: number } | undefined | boolean
 * if (P.isBoolean(item)) {
 *    console.log(item.data)
 * }
 * @category Guard
 */
// @ts-ignore
export function isBoolean<T>(data: T): data is DefinitelyBoolean<T> {
  return typeof data === 'boolean';
}

type DefinitelyPromise<T extends unknown> = Extract<
  T,
  Promise<any>
> extends never
  ? Promise<unknown>
  : Extract<T, Promise<any>>;

/**
 * Checks if `data` is `Promise`.
 * @param data - Anything
 * @example
 * const item = { data: 1 } as { data: number } | Promise<string[]>
 * if (P.isPromise(item)) {
 *    const result = await item
 *    console.log(Promise resolved,result.map((q)=> q.match(/.../)))
 * }
 * // Item is not promise
 * @category Guard
 */
// @ts-ignore
export function isPromise<T>(data: T): data is DefinitelyPromise<T> {
  return data instanceof Promise;
}

type DefinitelyArray<T extends unknown> = Extract<
  T,
  Array<any> | ReadonlyArray<any>
> extends never
  ? ReadonlyArray<unknown>
  : Extract<T, Array<any> | ReadonlyArray<any>>;

/**
 * Checks if `data` is `array`.
 * @param data - Anything
 * @example
 * const item = { data: 1 } as { data: number } | string[]
 * if (P.isArray(item)) {
 *    console.log(item.map((q)=> q.match(/.../)))
 * }
 *
 * const items = [{ data: 1 },[],"1",4,P.clamp].filter(P.isArray) //=> ["1"]
 * @category Guard
 */
export function isArray<T extends unknown>(
  data: T
  // @ts-ignore
): data is DefinitelyArray<T> {
  return Array.isArray(data);
}

type DefinitelyObject<T extends unknown> = Exclude<
  Extract<T, object>,
  Array<any> | Function | ReadonlyArray<any>
> extends never
  ? { [k: string]: unknown }
  : Exclude<Extract<T, object>, Array<any> | Function | ReadonlyArray<any>>;

/**
 * Checks if `data` is `object`.
 * @warning This function does not treat `Array` as `object`
 * @param data - Anything
 * @example
 * const item = { data: 1 } as { data: number } | string[]
 * if (P.isObject(item)) {
 *    console.log(item.data)
 * }
 *
 * const items = [{ data: 1 },[],1,4,P.clamp].filter(P.isObject) //=> [{ data: 1 }]
 * @category Guard
 */
export function isObject<T extends unknown>(
  data: T
  // @ts-ignore
): data is DefinitelyObject<T> {
  return !!data && !Array.isArray(data) && typeof data === 'object';
}

type DefinitelyFunction<T> = Extract<T, Function> extends never
  ? Function
  : Extract<T, Function>;

/**
 * Checks if `data` is `function`
 * @param data - Anything
 * @example
 * const item = P.clamp as unknown
 * if (P.isNil(item)) {
 *    // Item is definitely function
 *    console.log('Nice function', item.name)
 * }
 *
 * const items = [1,2,3,4,P.clamp].filter(P.isFunction) //=> [P.clamp]
 * @category Guard
 */
// @ts-ignore
export function isFunction<T>(data: T): data is DefinitelyFunction<T> {
  return typeof data === 'function';
}

/**
 * Checks if `data` is `null` or `undefined`. Executes basic `data == null` evaluation
 * @param data - Anything
 * @example
 * const item = undefined as unknown
 * if (P.isNil(item)) {
 *    // Item is definitely null | undefined
 *    console.log('Do something')
 * }
 *
 * const items = [1,2,3,4,undefined].filter(P.isNil) //=> [undefined]
 * @category Guard
 */
export function isNil<T>(data: T): data is Extract<T, null | undefined> {
  return data == null;
}

type DefinitelyError<T> = Extract<T, Error> extends never
  ? Error
  : Extract<T, Error>;

/**
 * Checks if `data` is instance of Error class
 * @param data - Anything
 * @example
 * const item = new Error('Error') as unknown
 * if (P.isError(item)) {
 *    // This is definitely an error and Typescript resolves it
 *    console.log(item.message)
 * }
 *
 * const items = [1,2,3,4,new Error('Error')].filter(P.isError) //=> [new Error('Error')]
 * @category Guard
 */
// @ts-ignore
export function isError<T>(data: T): data is DefinitelyError<T> {
  return data instanceof Error;
}
/**
 * Inverse predicate
 * @param predicate - predicate function
 * @example
 * const data = [new Error('sample'), 1, 2].filter(P.isNot(P.isError)) // [1,2]
 * @category Guard
 */
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

/**
 * Checks if object contains defined
 * @param predicate - predicate function
 * @example
 * const data = [new Error('sample'), 1, 2].filter(P.isNot(P.isError)) // [1,2]
 * @category Guard
 */
export function haveKeys<K extends string>(
  keys: ReadonlyArray<K>
): <T extends { [k: string]: unknown }>(
  data: T
) => data is T & { [k in K]: NonNullable<T[k]> };
export function haveKeys<K extends string>(keys: ReadonlyArray<K>) {
  return <T extends { [k: string]: unknown }>(data: T) => {
    return keys.every(q => {
      return isDefined(data[q]);
    });
  };
}

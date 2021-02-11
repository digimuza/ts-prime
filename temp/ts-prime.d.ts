
/**
 * Determines whether all predicates returns true for the input data.
 * @param data - The input data for predicates.
 * @param fns - The list of predicates.
 * @signature
 *    P.allPass(data, fns)
 * @signature
 *    P.allPass(fns)(data)
 * @example
 *    const isDivisibleBy3 = (x: number) => x % 3 === 0
 *    const isDivisibleBy4 = (x: number) => x % 4 === 0
 *    const fns = [isDivisibleBy3, isDivisibleBy4]
 *    P.allPass(12, fns) // => true
 *    P.allPass(8, fns) // => false
 * @category Array, Pipe
 */
export declare function allPass<T>(data: T, fns: ReadonlyArray<(data: T) => boolean>): boolean;

export declare function allPass<T>(fns: ReadonlyArray<(data: T) => boolean>): (data: T) => boolean;

declare type AnyArray<T> = ReadonlyArray<T> | Array<T>;

/**
 * Determines whether any predicate returns true for the input data.
 * @param data item
 * @param fns The list of predicates.
 * @signature
 *    P.anyPass(data,fns)
 * @signature
 *    P.anyPass(fns)(data)
 * @example
 *    const isDivisibleBy3 = (x: number) => x % 3 === 0
 *    const isDivisibleBy4 = (x: number) => x % 4 === 0
 *    const fns = [isDivisibleBy3, isDivisibleBy4]
 *    P.anyPass(fns)(8) // => true
 *    P.anyPass(fns)(11) // => false
 * @category Array, Pipe
 */
export declare function anyPass<T>(data: T, fns: ReadonlyArray<(data: T) => boolean>): boolean;

export declare function anyPass<T>(fns: ReadonlyArray<(data: T) => boolean>): (data: T) => boolean;

export declare type ArgsType<T> = T extends (...args: infer U) => any ? U : [];

/**
 * Assertion statement
 * @throws Throws if data is instance of error
 * @export
 *  const request = () =>  P.canFail(()=> axios.get(url))
 *  const result = await request.then(P.assertError)
 * @category Utility
 */
export declare function assertError<T>(data: T | Error): T;

/**
 * Decode base64 encoded string.
 * @signature
 *    P.base64decode(str)
 * @example
 *    P.base64decode("dHMtcHJpbWUgaXMgYXdlc29tZQ==") //=> ts-prime is awesome
 * @category Utility
 */
export declare function base64decode(input: string): string;

/**
 * @documentation true
 * @sectionName Base64
 */
/**
 * Encode string with base64 encoding.
 * @signature
 *    P.base64encode(str)
 * @example
 *    P.base64encode("ts-prime is awesome") //=> dHMtcHJpbWUgaXMgYXdlc29tZQ==
 * @category Utility
 */
export declare function base64encode(input: string): string;

/**
 * Function middleware that caches function output based on input
 * @param fn - target function
 * @param cacheFn - function that receives and return cache key
 * @signature
 *    P.cache(fn, options)
 * @signature
 *    P.cache(options)(fn)
 * @example
 *    const request = (url: string) => axios.get(url)
 *    const requestWithCache = P.cache(request, (url) => url)
 * @category Utility, Pipe
 */
export declare function cache<I extends (...args: any[]) => any>(fn: I, options?: CacheOptions<ArgsType<I>, ReturnType<I>>): I;

export declare interface CacheMechanism<R> {
    set: (key: string, data: R) => void;
    get: (key: string) => R | undefined;
}

export declare interface CacheOptions<I extends any[], R> {
    cacheKeyFn?: (...args: I) => string;
    cacheMechanism?: CacheMechanism<R>;
}

/**
 * Similar to try catch statement. If function throws insisted callback this function will return `Error` instance
 * @example
 *    const err = P.canFail(()=> JSON.parse(data))
 *    if (P.isError(err)) {
 *        console.log(err)
 *    }
 *
 *
 *    const request = await canFail(() => axios.get(url))
 *    if (P.isError(request)) return
 * @category Utility
 */
export declare function canFail<T>(fn: () => Promise<T>): Promise<CanGetError<T>>;

export declare function canFail<T>(fn: () => T): CanGetError<T>;

export declare type CanGetError<T> = Error | T;

/**
 * Capitalize first letter of word
 * @param str - Any string
 * @signature
 *  P.capitalize(str)
 * @example
 *  P.capitalize("tom") //=> Tom
 * @category String
 */
export declare function capitalize(str: string): string;

/**
 * Split an array into groups the length of `size`. If `array` can't be split evenly, the final chunk will be the remaining elements.
 * @param array - the array
 * @param size - the length of the chunk
 * @signature
 *    P.chunk(array, size)
 * @signature
 *    P.chunk(size)(array)
 * @example
 *    P.chunk(['a', 'b', 'c', 'd'], 2) // => [['a', 'b'], ['c', 'd']]
 *    P.chunk(['a', 'b', 'c', 'd'], 3) // => [['a', 'b', 'c'], ['d']]
 *    P.chunk(2)(['a', 'b', 'c', 'd']) // => [['a', 'b'], ['c', 'd']]
 *    P.chunk(3)(['a', 'b', 'c', 'd']) // => [['a', 'b', 'c'], ['d']]
 * @category Array, Pipe
 */
export declare function chunk<T>(array: readonly T[], size: number): readonly T[][];

export declare function chunk<T>(size: number): (array: readonly T[]) => readonly T[][];

/**
 * Clamp the given value within the inclusive min and max bounds.
 * @param value - the number
 * @param limits - the bounds limits
 * @signature
 *    P.clamp(value, { min, max });
 * @signature
 *    P.clamp({ min, max })(value);
 * @example
 *    P.clamp(10, { min: 20 }) // => 20
 *    P.clamp(10, { max: 5 }) // => 5
 *    P.clamp(10, { max: 20, min: 5 }) // => 10
 *
 *    P.clamp({ min: 20 })(10) // => 20
 *    P.clamp({ max: 5 })(10) // => 5
 *    P.clamp({ max: 20, min: 5 })(10) // => 10
 * @category Number, Pipe
 */
export declare function clamp(value: number, limits: {
    min?: number;
    max?: number;
}): number;

export declare function clamp(limits: {
    min?: number;
    max?: number;
}): (value: number) => number;

/**
 * Creates a deep copy of the value. Supported types: `Array`, `Object`, `Number`, `String`, `Boolean`, `Date`, `RegExp`. Functions are assigned by reference rather than copied.
 * @param value - the object to clone
 * @signature P.clone(value)
 * @example P.clone({foo: 'bar'}) // {foo: 'bar'}
 * @category Object
 */
export declare function clone<T extends any>(value: T): T;

/**
 * Removes all undefined and null values from object rreecursively
 * @param data - the object to compact
 * @signature P.compact(value)
 * @example
 *      P.compact({foo: undefined}) // {}
 * @category Object
 */
export declare function compact<T>(data: T): T;

export declare function compact<T>(): (data: T) => T;

export declare type ComplexSort = {
    order?: 'asc' | 'desc';
    value: SortValue;
    compare?: (a: SortValue, b: SortValue) => number;
};

/**
 * Convert any string to nameCased variant
 * @param str - the string
 * @param to - convert string to 'PascalCase' | 'camelCase' | 'snake_case' | 'kebab-case' | 'Train-Case'
 * @signature
 *    P.convertStringToNameCase(str, to);
 * @example
 *    P.convertStringToNameCase("Super#@! ===-0- ball %%% cup", 'PascalCase') // -> Super0BallCup
 *    P.convertStringToNameCase("Super#@! ===-0- ball %%% cup", 'camelCase') // -> super0BallCup
 *    P.convertStringToNameCase("Super#@! ===-0- ball %%% cup", 'snake_case') // -> super_0_ball_cup
 *    P.convertStringToNameCase("Super#@! ===-0- ball %%% cup", 'kebab-case') // -> super-0-ball-cup
 *    P.convertStringToNameCase("Super#@! ===-0- ball %%% cup", 'Train-Case') // -> Super-0-Ball-Cup
 * @category String
 */
export declare function convertStringToNameCase(str: string, to: 'PascalCase' | 'camelCase' | 'snake_case' | 'kebab-case' | 'Train-Case'): string;

/**
 * Creates a data-last pipe function. First function must be always annotated. Other functions are automatically inferred.
 * @signature
 *    P.createPipe(op1, op2, op3)(data);
 * @example
 *    P.createPipe(
 *      (x: number) => x * 2,
 *      x => x * 3
 *    )(1) // => 6
 * @category Function
 */
export declare function createPipe<A, B>(op1: (input: A) => B): (value: A) => B;

export declare function createPipe<A, B, C>(op1: (input: A) => B, op2: (input: B) => C): (value: A) => C;

export declare function createPipe<A, B, C, D>(op1: (input: A) => B, op2: (input: B) => C, op3: (input: C) => D): (value: A) => D;

export declare function createPipe<A, B, C, D, E>(op1: (input: A) => B, op2: (input: B) => C, op3: (input: C) => D, op4: (input: D) => E): (value: A) => E;

export declare function createPipe<A, B, C, D, E, F>(op1: (input: A) => B, op2: (input: B) => C, op3: (input: C) => D, op4: (input: D) => E, op5: (input: E) => F): (value: A) => F;

export declare function createPipe<A, B, C, D, E, F, G>(op1: (input: A) => B, op2: (input: B) => C, op3: (input: C) => D, op4: (input: D) => E, op5: (input: E) => F, op6: (input: F) => G): (value: A) => G;

export declare function createPipe<A, B, C, D, E, F, G, H>(op1: (input: A) => B, op2: (input: B) => C, op3: (input: C) => D, op4: (input: D) => E, op5: (input: E) => F, op6: (input: F) => G, op7: (input: G) => H): (value: A) => H;

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
export declare function debounce<E extends (...args: any[]) => any>(debounceTimeMs: number): (func: E) => E;

export declare function debounce<E extends (...args: any[]) => any>(func: E, debounceTimeMs: number): E;

/**
 * Decode UTF8 encoded characters
 * @category Utility
 */
export declare function decodeUTF8(utftext: string): string;

/**
 * Compares two values recursively.
 * @warning Soft mode is relative expensive operation.
 * @description
 * The function has two modes `soft` and `hard` soft mode ignores array order hard mode preserves array order
 *  - `Soft mode` ignore array order.
 * @param valueA - anything
 * @param valueB - anything
 * @example
 *    P.deepEquals({
 *        data: 1,
 *        super: [{ id: 1, name: "Tom" }, { id: 2, name: "Martin" }]
 *    }, {
 *        data: 1,
 *        super: [{ id: 2, name: "Martin" }, { id: 1, name: "Tom" }]
 *    }) // false super property is not equal
 *
 *    P.deepEquals({
 *        data: 1,
 *        super: [{ id: 1, name: "Tom" }, { id: 2, name: "Martin" }]
 *    }, {
 *        data: 1,
 *        super: [{ id: 2, name: "Martin" }, { id: 1, name: "Tom" }]
 *    }, 'soft') // true Ignores array order
 *
 *
 * @param mode - array comparison mode
 * @category Utility
 */
export declare function deepEqual(valueA: unknown, valueB: unknown, mode?: 'soft' | 'hard'): boolean;

/**
 * Merging object from left to right
 *
 * @param target - value be preserved if possible.
 * @param sources - value be preserved if possible.
 * @description
 * Consider following
 *
 * -  `array + obj = array`
 * -  `obj + array = obj`
 * -  `obj + obj = obj` (recursively merged)
 * -  `array + array = array` (removes duplicates using Set)
 * -  `(truthy plain value) + ob = (truthy plain value)`
 * -  `(truthy plain value) + undefined = (truthy plain value)`
 * -  `A(truthy plain value) + B(truthy plain value) = A(truthy plain value)`
 * -  `undefined + B(truthy plain value) = B(truthy plain value)`
 * -  `null + B(truthy plain value) = B(truthy plain value)`
 *
 *
 * Handles circular references
 * @category Utility
 */
export declare function deepMergeLeft<T extends object, X extends DeepPartial<T>>(data: T, ...source: X[]): T;

export declare function deepMergeLeft<T extends object>(...sources: T[]): T;

/**
 * Merging object from right to left
 *
 * @param target value will be replaced if possible.
 * @description
 * Consider following
 * -  `array + obj = obj`
 * -  `obj + array = array`
 * -  `obj + obj = obj` (recursively merged)
 * -  `array + array = array` (removes duplicates using Set)
 * -  `(truthy plain value) + undefined = (truthy plain value)`
 * -  `A(truthy plain value) + B(truthy plain value) = B(truthy plain value)`
 * Handles circular references
 * @category Utility
 */
export declare function deepMergeRight<T extends object, X extends DeepPartial<T>>(data: T, ...source: X[]): T;

export declare function deepMergeRight<T extends object>(...sources: T[]): T;

/**
 * NonNullable that works for deeply nested structure
 * @example
 * // Expect: {
 * //   first: {
 * //     second: {
 * //       name: string;
 * //     };
 * //   };
 * // }
 * type NestedProps = {
 *   first?: null | {
 *     second?: null | {
 *       name?: string | null |
 *       undefined;
 *     };
 *   };
 * };
 * type RequiredNestedProps = DeepNonNullable<NestedProps>;
 * @category Type
 */
export declare type DeepNonNullable<T> = T extends (...args: any[]) => any ? T : T extends any[] ? DeepNonNullableArray<T[number]> : T extends object ? DeepNonNullableObject<T> : T;

export declare interface DeepNonNullableArray<T> extends Array<DeepNonNullable<NonNullable<T>>> {
}

export declare type DeepNonNullableObject<T> = {
    [P in keyof T]-?: DeepNonNullable<NonNullable<T[P]>>;
};

/**
 * Partial that works for deeply nested structure
 * @example
 *   // Expect: {
 *   //   first?: {
 *   //     second?: {
 *   //       name?: string;
 *   //     };
 *   //   };
 *   // }
 *   type NestedProps = {
 *     first: {
 *       second: {
 *         name: string;
 *       };
 *     };
 *   };
 *   type PartialNestedProps = DeepPartial<NestedProps>;
 * @category Type
 */
export declare type DeepPartial<T> = T extends Function ? T : T extends Array<infer U> ? DeepPartialArray<U> : T extends object ? DeepPartialObject<T> : T | undefined;

export declare interface DeepPartialArray<T> extends Array<DeepPartial<T>> {
}

export declare type DeepPartialObject<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

/**
 * Readonly that works for deeply nested structure
 * @example
 *   // Expect: {
 *   //   readonly first: {
 *   //     readonly second: {
 *   //       readonly name: string;
 *   //     };
 *   //   };
 *   // }
 *   type NestedProps = {
 *     first: {
 *       second: {
 *         name: string;
 *       };
 *     };
 *   };
 *   type ReadonlyNestedProps = DeepReadonly<NestedProps>;
 * @category Type
 */
export declare type DeepReadonly<T> = T extends (...args: any[]) => any ? T : T extends any[] ? DeepReadonlyArray<T[number]> : T extends object ? DeepReadonlyObject<T> : T;

export declare interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {
}

export declare type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};

/**
 * Required that works for deeply nested structure
 * @example
 * // Expect: {
 * //   first: {
 * //     second: {
 * //       name: string;
 * //     };
 * //   };
 * // }
 * type NestedProps = {
 *   first?: {
 *     second?: {
 *       name?: string;
 *     };
 *   };
 * };
 * type RequiredNestedProps = DeepRequired<NestedProps>;
 * @category Type
 */
export declare type DeepRequired<T> = T extends (...args: any[]) => any ? T : T extends any[] ? DeepRequiredArray<T[number]> : T extends object ? DeepRequiredObject<T> : T;

export declare interface DeepRequiredArray<T> extends Array<DeepRequired<NonNullable<T>>> {
}

export declare type DeepRequiredObject<T> = {
    [P in keyof T]-?: DeepRequired<NonNullable<T[P]>>;
};

declare type DefinitelyArray<T extends unknown> = Extract<T, Array<any> | ReadonlyArray<any>> extends never ? ReadonlyArray<unknown> : Extract<T, Array<any> | ReadonlyArray<any>>;

declare type DefinitelyBoolean<T> = Extract<T, boolean> extends never ? boolean : Extract<T, boolean> extends any ? boolean : Extract<T, number>;

declare type DefinitelyError<T> = Extract<T, Error> extends never ? Error : Extract<T, Error>;

declare type DefinitelyFunction<T> = Extract<T, Function> extends never ? Function : Extract<T, Function>;

declare type DefinitelyNumber<T> = Extract<T, number> extends never ? number : Extract<T, number> extends any ? number : Extract<T, number>;

declare type DefinitelyObject<T extends unknown> = Exclude<Extract<T, object>, Array<any> | Function | ReadonlyArray<any>> extends never ? {
    [k: string]: unknown;
} : Exclude<Extract<T, object>, Array<any> | Function | ReadonlyArray<any>>;

declare type DefinitelyPromise<T extends unknown> = Extract<T, Promise<any>> extends never ? Promise<unknown> : Extract<T, Promise<any>>;

declare type DefinitelyString<T> = Extract<T, string> extends never ? string : Extract<T, string> extends any ? string : Extract<T, string>;

/**
 * Creates delay
 * @param ms - Time in milliseconds
 * @signature
 *    P.delay(ms)
 * @example
 *    await P.delay(1000)
 * @category Function
 */
export declare function delay(ms: number): Promise<void>;

/**
 * Excludes the values from `other` array.
 * @param array - the source array
 * @param other - the values to exclude
 * @signature
 *    P.difference(array, other)
 * @example
 *    P.difference([1, 2, 3, 4], [2, 5, 3]) // => [1, 4]
 * @data_first
 * @category Array
 * @pipeable
 */
export declare function difference<T>(array: readonly T[], other: readonly T[]): T[];

/**
 * Excludes the values from `other` array.
 * @param other the values to exclude
 * @signature
 *    P.difference(other)(array)
 * @example
 *    P.difference([2, 5, 3])([1, 2, 3, 4]) // => [1, 4]
 *    P.pipe(
 *      [1, 2, 3, 4, 5, 6], // only 4 iterations
 *      P.difference([2, 3]),
 *      P.take(2)
 *    ) // => [1, 4]
 * @data_last
 * @category Array
 * @pipeable
 */
export declare function difference<T, K>(other: readonly T[]): (array: readonly K[]) => readonly T[];

export declare namespace difference {
    export function lazy<T>(other: readonly T[]): (value: T) => LazyResult<T>;
}

/**
 * Removes first `n` elements from the `array`.
 * @param array - the target array
 * @param n - the number of elements to skip
 * @signature
 *    P.drop(array, n)
 * @example
 *    P.drop([1, 2, 3, 4, 5], 2) // => [1, 2, 3]
 * @data_first
 * @pipeable
 * @category Array
 */
export declare function drop<T>(array: readonly T[], n: number): T[];

/**
 * Removes first `n` elements from the `array`.
 * @param array - the target array
 * @param n - the number of elements to skip
 * @signature
 *    P.drop(n)(array)
 * @example
 *    P.drop(2)([1, 2, 3, 4, 5]) // => [1, 2, 3]
 * @data_last
 * @pipeable
 * @category Array
 */
export declare function drop<T>(n: number): (array: readonly T[]) => T[];

export declare namespace drop {
    export function lazy<T>(n: number): (value: T) => LazyResult<T>;
}

/**
 * Removes last `n` elements from the `array`.
 * @param array the target array
 * @param n the number of elements to skip
 * @signature
 *    P.dropLast(array, n)
 * @example
 *    P.dropLast([1, 2, 3, 4, 5], 2) // => [1, 2, 3]
 * @data_first
 * @category Array
 */
export declare function dropLast<T>(array: readonly T[], n: number): T[];

/**
 * Removes last `n` elements from the `array`.
 * @param array the target array
 * @param n the number of elements to skip
 * @signature
 *    P.dropLast(n)(array)
 * @example
 *    P.dropLast(2)([1, 2, 3, 4, 5]) // => [1, 2, 3]
 * @data_last
 * @category Array
 */
export declare function dropLast<T>(n: number): (array: readonly T[]) => T[];

/**
 * Encode UTF8 characters
 * @category Utility
 */
export declare function encodeUTF8(input: string): string;

/**
 * Ensures array data type
 * @param data - Item or array
 * @signature
 *    P.ensureArray(data)
 * @example
 *    ensureArray(1) // => [1]
 *    ensureArray([1]) // => [1]
 * @category Array
 */
export declare function ensureArray<T>(data: T | readonly T[]): ReadonlyArray<T>;

/**
 * Ensures that err is Error instance
 * @signature
 *    P.ensureError(any)
 * @example
 *    const request = doRequest().catch(P.ensureError)
 *    if (P.isError(request)) return
 * @category Utility
 */
export declare function ensureError(err: unknown): Error;

/**
 * Ensures typescript type
 * @param data - data object
 * @example
 *    const data = myFunction()
 *    P.ensureType<number>(data) // If data is not number typescript compiler will complain
 * @category Utility
 */
export declare function ensureType<T>(data: T): T;

/**
 * Returns an array of key/values of the enumerable properties of an object.
 * @param object - Any object
 * @signature
 *    P.entries(object)
 * @example
 *    P.entries({ a: 1, b: 2, c: 3 }) // => [['a', 1], ['b', 2], ['c', 3]]
 * @category Object
 */
export declare function entries<T extends {
    [k: string]: unknown;
}>(): (obj: T) => ReadonlyArray<[keyof T, T[keyof T]]>;

export declare function entries<T extends {
    [k: string]: unknown;
}>(obj: T): ReadonlyArray<[keyof T, T[keyof T]]>;

/**
 * Returns true if its arguments are equivalent, false otherwise.
 * @warning Doesn't handle cyclical data structures.
 * @param a the first object to compare
 * @param b the second object to compare
 * @signature
 *    P.equals(a, b)
 * @example
 *    P.equals(1, 1) //=> true
 *    P.equals(1, '1') //=> false
 *    P.equals([1, 2, 3], [1, 2, 3]) //=> true
 * @data_first
 * @category Object
 */
export declare function equals(a: any, b: any): boolean;

/**
 * Returns true if its arguments are equivalent, false otherwise.
 * @warning Doesn't handle cyclical data structures.
 * @param a the first object to compare
 * @param b the second object to compare
 * @signature
 *    P.equals(b)(a)
 * @example
 *    P.equals(1)(1) //=> true
 *    P.equals('1')(1) //=> false
 *    P.equals([1, 2, 3])([1, 2, 3]) //=> true
 * @data_last
 * @category Object
 */
export declare function equals(a: any): (b: any) => boolean;

/**
 * Filter the elements of an array that meet the condition specified in a callback function.
 * @param array The array to filter.
 * @param fn the callback function.
 * @signature
 *    P.filter(array, fn)
 * @signature
 *    P.filter(fn)(array)
 * @example
 *    P.filter([1, 2, 3], x => x % 2 === 1) // => [1, 3]
 *
 *    P.pipe([1, 2, 3], P.filter(x => x % 2 === 1)) // => [1, 3]
 * @category Array, Pipe
 */
export declare function filter<T, S extends T>(array: readonly T[], fn: (value: T) => value is S): S[];

export declare function filter<T>(array: readonly T[], fn: Pred<T, boolean>): T[];

export declare function filter<T, S extends T>(fn: (input: T) => input is S): (array: readonly T[]) => S[];

export declare function filter<T>(fn: Pred<T, boolean>): (array: readonly T[]) => T[];

export declare namespace filter {
    export function indexed<T, S extends T>(array: readonly T[], fn: (input: T, index: number, array: readonly T[]) => input is S): S[];
    export function indexed<T>(array: readonly T[], fn: PredIndexed_2<T, boolean>): T[];
    /**
     * @data_last
     */
    export function indexed<T, S extends T>(fn: (input: T, index: number, array: readonly T[]) => input is S): (array: readonly T[]) => S[];
    export function indexed<T>(fn: PredIndexed_2<T, boolean>): (array: readonly T[]) => T[];
    const lazy: <T>(fn: PredIndexedOptional<T, boolean>) => (value: T, index?: number | undefined, array?: readonly T[] | undefined) => LazyResult<T>;
    const lazyIndexed: (<T>(fn: PredIndexedOptional<T, boolean>) => (value: T, index?: number | undefined, array?: readonly T[] | undefined) => LazyResult<T>) & {
        indexed: true;
    };
}

/**
 * Loops each record element and match against provided predicate.
 * @param record The object to filter.
 * @param fn Predicate function.
 * @returns The new filtered record.
 * @signature
 *    P.filterRecord(record, fn)
 * @signature
 *    P.pipe({ a: 1, b: 2, c: 3 }, P.filterRecord(fn))
 * @example
 *    P.filterRecord({ a: 1, b: 2, c: 3 }, ([k,v]) => [k, v * 2]) // => { a: 2, b: 4, c: 6 }
 *    P.pipe({ a: 1, b: 2, c: 3 }, P.filterRecord(([k,v]) => [k, v * 2]))) // => { a: 2, b: 4, c: 6 }
 * @category Object, Pipe
 */
export declare function filterRecord<T extends Record<string, unknown>>(record: T, fn: Pred<[keyof T, T[keyof T]], any>): Record<keyof T, T[keyof T]>;

export declare function filterRecord<T extends Record<string, unknown>>(fn: (v: [keyof T, T[keyof T]]) => any): (record: T) => Record<keyof T, T[keyof T]>;

/**
 * Returns the value of the first element in the array where predicate is true, and undefined otherwise.
 * @param items the array
 * @param fn the predicate
 * @signature
 *    P.find(items, fn)
 * @signature
 *    P.find(fn)(items)
 * @example
 *    P.find([1, 3, 4, 6], n => n % 2 === 0) // => 4
 *    P.pipe(
 *      [1, 3, 4, 6],
 *      P.find(n => n % 2 === 0)
 *    ) // => 4
 *    P.pipe(
 *      [1, 3, 4, 6],
 *      P.find.indexed((n, i) => n % 2 === 0)
 *    ) // => 4
 * @category Array, Pipe
 */
export declare function find<T>(array: readonly T[], fn: Pred<T, boolean>): T | undefined;

export declare function find<T = never>(fn: Pred<T, boolean>): (array: readonly T[]) => T | undefined;

export declare namespace find {
    export function indexed<T>(array: readonly T[], fn: PredIndexed_2<T, boolean>): T | undefined;
    export function indexed<T>(fn: PredIndexed_2<T, boolean>): (array: readonly T[]) => T | undefined;
    const lazy: (<T>(fn: PredIndexedOptional<T, boolean>) => (value: T, index?: number | undefined, array?: T[] | undefined) => {
        done: boolean;
        hasNext: boolean;
        next: T;
    }) & {
        single: true;
    };
    const lazyIndexed: (<T>(fn: PredIndexedOptional<T, boolean>) => (value: T, index?: number | undefined, array?: T[] | undefined) => {
        done: boolean;
        hasNext: boolean;
        next: T;
    }) & {
        indexed: true;
    } & {
        single: true;
    };
}

/**
 * Returns the index of the first element in the array where predicate is true, and -1 otherwise.
 * @param items - the array
 * @param fn - the predicate
 * @signature
 *    P.findIndex(items, fn)
 * @signature
 *    P.findIndex(fn)(items)
 * @example
 *    P.findIndex([1, 3, 4, 6], n => n % 2 === 0) // => 2
 *    P.pipe(
 *      [1, 3, 4, 6],
 *      P.findIndex(n => n % 2 === 0)
 *    ) // => 4
 * @category Array, Pipe
 */
export declare function findIndex<T>(array: readonly T[], fn: Pred<T, boolean>): number;

export declare function findIndex<T>(fn: Pred<T, boolean>): (array: readonly T[]) => number;

export declare namespace findIndex {
    export function indexed<T>(array: readonly T[], fn: PredIndexed_2<T, boolean>): T | undefined;
    export function indexed<T>(fn: PredIndexed_2<T, boolean>): (array: readonly T[]) => T | undefined;
    const lazy: (<T>(fn: PredIndexedOptional<T, boolean>) => (value: T, index?: number | undefined, array?: T[] | undefined) => {
        done: boolean;
        hasNext: boolean;
        next: number;
    } | {
        done: boolean;
        hasNext: boolean;
        next?: undefined;
    }) & {
        single: true;
    };
    const lazyIndexed: (<T>(fn: PredIndexedOptional<T, boolean>) => (value: T, index?: number | undefined, array?: T[] | undefined) => {
        done: boolean;
        hasNext: boolean;
        next: number;
    } | {
        done: boolean;
        hasNext: boolean;
        next?: undefined;
    }) & {
        indexed: true;
    } & {
        single: true;
    };
}

/**
 * Gets the first element of `array`.
 * Note: In `pipe`, use `first()` form instead of `first`. Otherwise, the inferred type is lost.
 * @param array the array
 * @signature
 *    P.first(array)
 * @example
 *    P.first([1, 2, 3]) // => 1
 *    P.first([]) // => undefined
 *    P.pipe(
 *      [1, 2, 4, 8, 16],
 *      P.filter(x => x > 3),
 *      P.first(),
 *      x => x + 1
 *    ); // => 5
 *
 * @category Array, Pipe
 */
export declare function first<T>(array: readonly T[]): T | undefined;

export declare function first<T>(): (array: readonly T[]) => T | undefined;

export declare function first<T>(defaultValue: T): (array: readonly T[]) => T;

export declare namespace first {
    export function lazy<T>(): (value: T) => {
        done: boolean;
        hasNext: boolean;
        next: T;
    };
    export namespace lazy {
        const single = true;
    }
}

/**
 * Map each element of an array using a defined callback function and flatten the mapped result.
 * @param array The array to map.
 * @param fn The function mapper.
 * @signature
 *    P.flatMap(array, fn)
 * @example
 *    P.flatMap([1, 2, 3], x => [x, x * 10]) // => [1, 10, 2, 20, 3, 30]
 * @data_first
 * @pipeable
 * @category Array
 */
export declare function flatMap<T, K>(array: readonly T[], fn: (input: T) => K | readonly K[]): K[];

/**
 * Map each element of an array using a defined callback function and flatten the mapped result.
 * @param array The array to map.
 * @param fn The function mapper.
 * @signature
 *    P.flatMap(fn)(array)
 * @example
 *    P.pipe([1, 2, 3], P.flatMap(x => [x, x * 10])) // => [1, 10, 2, 20, 3, 30]
 * @data_last
 * @pipeable
 * @category Array
 */
export declare function flatMap<T, K>(fn: (input: T) => K | K[]): (array: readonly T[]) => readonly K[];

/**
 * Loops each record element and flatMaps against provided function.
 * @param record The target object.
 * @param fn Mapping function.
 * @returns The new record.
 * @signature
 *    P.flatMapRecord(record, fn)
 * @example
 *    P.flatMapRecord({ a: 1, b: 2, c: 3 }, ([k,v]) => [[k, v * 2], [k + "_abc", v * 2]]) // => { a: 2, a_abc: 2, b: 4, b_abc: 4, c: 6, c_abc: 6 }
 * @data_first
 * @pipeable
 * @category Object
 */
export declare function flatMapRecord<T extends Record<string, unknown>, K extends string, V>(record: T, fn: Pred<[keyof T, T[keyof T]], ReadonlyArray<[K, V]>>): Record<K, V>;

/**
 * Loops each record element and flatMaps against provided function.
 * @param record The target object.
 * @param fn Mapping function.
 * @returns The new record.
 * @signature
 *    P.pipe(record, P.flatMapRecord(fn))
 * @example
 *    P.pipe(({ a: 1, b: 2, c: 3 }, P.flatMapRecord(([k,v]) => [[k, v * 2], [k + "_abc", v * 2]])) // => { a: 2, a_abc: 2, b: 4, b_abc: 4, c: 6, c_abc: 6 }
 * @data_last
 * @pipeable
 * @category Object
 */
export declare function flatMapRecord<T extends Record<string, unknown>, K extends string, V extends unknown>(fn: (v: [keyof T, T[keyof T]]) => ReadonlyArray<[K, V]>): (record: T) => Record<K, V>;

/**
 * Map each element of an array into an object using a defined callback function and flatten the result.
 * @param array The array to map.
 * @param fn The mapping function, which should return an Array of key-value pairs, similar to Object.fromEntries
 * @returns The new mapped object.
 * @signature
 *    P.flatMapToObj(array, fn)
 *    P.flatMapToObj.indexed(array, fn)
 * @example
 *  P.flatMapToObj([1, 2, 3], (x) =>
 *    x % 2 === 1 ? [[String(x), x]] : []
 *  ) // => {1: 1, 3: 3}
 *  P.flatMapToObj.indexed(['a', 'b'], (x, i) => [
 *    [x, i],
 *    [x + x, i + i],
 *  ]) // => {a: 0, aa: 0, b: 1, bb: 2}
 * @data_first
 * @indexed
 * @category Array
 */
export declare function flatMapToObj<T, K extends string | number | symbol, V>(array: readonly T[], fn: (element: T, index: number, array: readonly T[]) => [K, V][]): Record<K, V>;

/**
 * Map each element of an array into an object using a defined callback function and flatten the result.
 * @param fn The mapping function, which should return an Array of key-value pairs, similar to Object.fromEntries
 * @returns The new mapped object.
 * @signature
 *    P.flatMapToObj(fn)(array)
 *    P.flatMapToObj(fn)(array)
 * @example
 *    P.pipe(
 *      [1, 2, 3],
 *      P.flatMapToObj(x => (x % 2 === 1 ? [[String(x), x]] : []))
 *    ) // => {1: 1, 3: 3}
 *    P.pipe(
 *      ['a', 'b'],
 *      P.flatMapToObj.indexed((x, i) => [
 *        [x, i],
 *        [x + x, i + i],
 *      ])
 *    ) // => {a: 0, aa: 0, b: 1, bb: 2}
 * @data_last
 * @indexed
 * @category Array
 */
export declare function flatMapToObj<T, K extends string | number | symbol, V>(fn: (element: T, index: number, array: readonly T[]) => [K, V][]): (array: readonly T[]) => Record<K, V>;

declare type Flatten<T> = T extends ReadonlyArray<infer K> ? K : T;

/**
 * Flattens `array` a single level deep.
 * Note: In `pipe`, use `flatten()` form instead of `flatten`. Otherwise, the inferred type is lost.
 
 * @param items the target array
 * @signature P.flatten(array)
 * @example
 *    P.flatten([[1, 2], [3], [4, 5]]) // => [1, 2, 3, 4, 5]
 *    P.pipe(
 *      [[1, 2], [3], [4, 5]],
 *      P.flatten(),
 *    ); // => [1, 2, 3, 4, 5]
 * @category Array
 * @pipeable
 */
export declare function flatten<T>(items: readonly T[]): Array<Flatten<T>>;

export declare function flatten<T>(): (items: readonly T[]) => Array<Flatten<T>>;

export declare namespace flatten {
    export function lazy<T>(): (next: T) => LazyResult<any>;
}

declare type FlattenDeep<T> = T extends ReadonlyArray<infer K> ? FlattenDeep2<K> : T;

/**
 * Recursively flattens `array`.
 * Note: In `pipe`, use `flattenDeep()` form instead of `flattenDeep`. Otherwise, the inferred type is lost.
 * @param items the target array
 * @signature P.flattenDeep(array)
 * @example
 *    P.flattenDeep([[1, 2], [[3], [4, 5]]]) // => [1, 2, 3, 4, 5]
 *    P.pipe(
 *      [[1, 2], [[3], [4, 5]]],
 *      P.flattenDeep(),
 *    ); // => [1, 2, 3, 4, 5]
 * @category Array
 * @pipeable
 */
export declare function flattenDeep<T>(items: readonly T[]): Array<FlattenDeep<T>>;

export declare function flattenDeep<T>(): (items: readonly T[]) => Array<FlattenDeep<T>>;

export declare namespace flattenDeep {
    export function lazy(): (value: any) => LazyResult<any>;
}

declare type FlattenDeep2<T> = T extends ReadonlyArray<infer K> ? FlattenDeep3<K> : T;

declare type FlattenDeep3<T> = T extends ReadonlyArray<infer K> ? FlattenDeep4<K> : T;

declare type FlattenDeep4<T> = T extends ReadonlyArray<infer K> ? K : T;

/**
 * Format bytes to human readable format
 * @param fn - target function
 * @signature
 *    P.formatBytes(bytes)
 * @example
 *    P.formatBytes(12457150) // => 11.88MB
 * @category Utility, Pipe
 */
export declare function formatBytes(bytes: number, decimals?: number): string;

/**
 * Construct object from tuple array
 * @param data - List of tuples
 * @signature
 *    P.fromEntries(tuples)
 * @example
 *    P.fromEntries([["a", 5], ["b", 4]]) // => { a: 5, b: 4 }
 * @category Object
 */
export declare function fromEntries<T extends AnyArray<[string, any] | readonly [string, any]>>(): (entries: T) => {
    [k in T[number][0]]: T[number][1];
};

export declare function fromEntries<T extends AnyArray<[string, any] | readonly [string, any]>>(entries: T): {
    [k in T[number][0]]: T[number][1];
};

/**
 * Splits a collection into sets, grouped by the result of running each value through `fn`.
 * @param items the items to group
 * @param fn the grouping function
 * @signature
 *    P.groupBy(array, fn)
 * @signature
 *    P.groupBy(fn)(array)
 * @example
 *    P.groupBy(['one', 'two', 'three'], x => x.length) // => {3: ['one', 'two'], 5: ['three']}
 *    P.pipe(['one', 'two', 'three'], P.groupBy(x => x.length)) // => {3: ['one', 'two'], 5: ['three']}
 * @category Array, Pipe
 */
export declare function groupBy<T, K extends keyof any>(items: readonly T[], fn: (item: T) => K | ReadonlyArray<K>): Record<K, T[]>;

export declare function groupBy<T, K extends keyof any>(fn: (item: T) => K | ReadonlyArray<K>): (array: readonly T[]) => Record<K, T[]>;

export declare namespace groupBy {
    export function indexed<T, K extends keyof any>(array: readonly T[], fn: PredIndexed_2<T, K | ReadonlyArray<K>>): Record<K, T[]>;
    export function indexed<T, K extends keyof any>(fn: PredIndexed_2<T, K | ReadonlyArray<K>>): (array: readonly T[]) => Record<K, T[]>;
}

/**
 * Non cryptographic quality hashing function
 * @param data - Hash content
 * @example
 * P.hash("THIS IS AWESOME") //=> LTU1MjU4ODc4NQ
 * @category Utility
 */
export declare function hash(data: string | undefined): string;

/**
 * Checks if object contains defined
 * @param predicate - predicate function
 * @example
 * const data = [new Error('sample'), 1, 2].filter(P.isNot(P.isError)) // [1,2]
 * @category Guard
 */
export declare function haveKeys<K extends string>(keys: ReadonlyArray<K>): <T extends {
    [k: string]: unknown;
}>(data: T) => data is T & {
    [k in K]: NonNullable<T[k]>;
};

/**
 * Return same value
 * @description
 * Function that returns provided value
 * @category Function
 */
export declare function identity<T>(value: T): T;

/**
 * Checks if @param data contains any element of @param includes and returns boolean
 * @param data - Value to check
 * @param includes - Provided list
 * @signature
 *    P.includesAny(sourceList, includeList)
 * @signature
 *    P.includesAny(includeList)(sourceList)
 * @example
 *    P.includesAny(['apple','microsoft','tesla','samsung'],['apple', 'xiomi']) //=> true; Source list contains "apple"
 *    P.includesAny(['apple', 'microsoft'])(['samsung', 'tesla']) //=> false // Source list does not include any of options
 * @category Array, Pipe
 */
export declare function includesAny<T>(data: ReadonlyArray<T>, includes: ReadonlyArray<T>): boolean;

export declare function includesAny<T>(includes: ReadonlyArray<T>): (data: ReadonlyArray<T>) => boolean;

/**
 * Checks if @param data contains every element of @param includes and returns boolean
 * @param data - Value to check
 * @param includes - Provided list
 * @signature
 *    P.includesEvery(sourceList, includeList)
 * @signature
 *    P.includesEvery(includeList)(sourceList)
 * @example
 *    P.includesEvery(['apple','microsoft','tesla','samsung'],['apple', 'microsoft']) //=> true; Source list contains "apple" and 'microsoft'
 *    P.includesEvery(['apple', 'microsoft'])(['samsung', 'tesla', 'apple']) //=> false // Source list does not include every of options
 * @category Array, Pipe
 */
export declare function includesEvery<T>(data: ReadonlyArray<T>, includes: ReadonlyArray<T>): boolean;

export declare function includesEvery<T>(includes: ReadonlyArray<T>): (data: ReadonlyArray<T>) => boolean;

/**
 * Converts a list of objects into an object indexing the objects by the given key.
 * @param array the array
 * @param fn the indexing function
 * @signature
 *    P.indexBy(array, fn)
 *    P.indexBy(fn)(array)
 * @example
 *    P.indexBy(['one', 'two', 'three'], x => x.length) // => {3: 'two', 5: 'three'}
 *    P.pipe(
 *      ['one', 'two', 'three'],
 *      P.indexBy(x => x.length)
 *    ) // => {3: 'two', 5: 'three'}
 * @category Array, Pipe
 */
export declare function indexBy<T>(array: readonly T[], fn: (item: T) => any): Record<string, T>;

export declare function indexBy<T>(fn: (item: T) => string | number): (array: readonly T[]) => Record<string, T>;

export declare namespace indexBy {
    export function indexed<T, K>(array: readonly T[], fn: PredIndexed_2<T, any>): Record<string, T>;
    export function indexed<T, K>(fn: PredIndexed_2<T, any>): (array: readonly T[]) => Record<string, T>;
}

/**
 * Returns a list of elements that exist in both array.
 * @param array the source array
 * @param other the second array
 * @signature
 *    P.intersection(array, other)
 * @signature
 *    P.intersection(other)(array)
 * @example
 *    P.intersection([1, 2, 3], [2, 3, 5]) // => [2, 3]
 *    P.intersection([2, 3, 5])([1, 2, 3]) // => [2, 3]
 * @category Array, Pipe
 */
export declare function intersection<T>(source: readonly T[], other: readonly T[]): T[];

export declare function intersection<T, K>(other: readonly T[]): (source: readonly K[]) => T[];

export declare namespace intersection {
    export function lazy<T>(other: T[]): (value: T) => LazyResult<T>;
}

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
export declare function isArray<T extends unknown>(data: T): data is DefinitelyArray<T>;

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
export declare function isBoolean<T>(data: T): data is DefinitelyBoolean<T>;

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
export declare function isDefined<T>(data: T): data is NonNullable<T>;

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
export declare function isError<T>(data: T): data is DefinitelyError<T>;

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
export declare function isFunction<T>(data: T): data is DefinitelyFunction<T>;

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
export declare function isNil<T>(data: T): data is Extract<T, null | undefined>;

/**
 * Inverse predicate
 * @param predicate - predicate function
 * @example
 * const data = [new Error('sample'), 1, 2].filter(P.isNot(P.isError)) // [1,2]
 * @category Guard
 */
export declare function isNot<T, S>(predicate: (data: T) => data is S): (data: T) => data is Exclude<T, S>;

export declare function isNot<T>(predicate: (data: T) => any): (data: T) => boolean;

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
export declare function isNumber<T>(data: T): data is DefinitelyNumber<T>;

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
export declare function isObject<T extends unknown>(data: T): data is DefinitelyObject<T>;

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
export declare function isOneOf<T extends string | number | boolean>(value: string | number | boolean | undefined, array: ReadonlyArray<T>): value is T;

export declare function isOneOf<T extends string | number | boolean>(array: ReadonlyArray<T>): (value: string | number | boolean | undefined) => value is T;

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
export declare function isPromise<T>(data: T): data is DefinitelyPromise<T>;

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
export declare function isString<T>(data: T): data is DefinitelyString<T>;

/**
 * Return object keys
 * @param object - object value
 * @signature
 *    P.keys(object)
 * @example
 *    P.keys()(object)
 * @data_first
 * @category Array
 */
export declare function keys<T extends {
    [k: string]: unknown;
}>(): (object: T) => ReadonlyArray<keyof T>;

export declare function keys<T extends {
    [k: string]: unknown;
}>(object: T): ReadonlyArray<keyof T>;

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
export declare function last<T>(array: readonly T[]): T | undefined;

export declare function last<T>(array: readonly T[], defaultValue: T): T;

declare interface LazyEmpty<T> {
    done: boolean;
    hasNext: false;
    hasMany?: false | undefined;
    next?: undefined;
}

declare interface LazyMany<T> {
    done: boolean;
    hasNext: true;
    hasMany: true;
    next: T[];
}

declare interface LazyNext<T> {
    done: boolean;
    hasNext: true;
    hasMany?: false | undefined;
    next: T;
}

declare type LazyResult<T> = LazyEmpty<T> | LazyNext<T> | LazyMany<T>;

/**
 * Map each element of an array using a defined callback function.
 * @param array The array to map.
 * @param fn The function mapper.
 * @returns The new mapped array.
 * @signature
 *    P.map(array, fn)
 * @signature
 *    P.map(fn)(array)
 * @example
 *    P.map([1, 2, 3], x => x * 2) // => [2, 4, 6]
 *    P.pipe([0, 1, 2], P.map(x => x * 2)) // => [2, 4, 6]
 * @category Array, Pipe
 */
export declare function map<T, K>(array: readonly T[], fn: Pred<T, K>): K[];

export declare function map<T, K>(fn: Pred<T, K>): (array: readonly T[]) => K[];

export declare namespace map {
    export function indexed<T, K>(array: readonly T[], fn: PredIndexed_2<T, K>): K[];
    export function indexed<T, K>(fn: PredIndexed_2<T, K>): (array: readonly T[]) => K[];
    const lazy: <T, K>(fn: PredIndexedOptional<T, K>) => (value: T, index?: number | undefined, array?: readonly T[] | undefined) => LazyResult<K>;
    const lazyIndexed: (<T, K>(fn: PredIndexedOptional<T, K>) => (value: T, index?: number | undefined, array?: readonly T[] | undefined) => LazyResult<K>) & {
        indexed: true;
    };
}

/**
 * Loops each record element and maps against provided function.
 * @param record The target object.
 * @param fn Mapping function.
 * @returns The new record.
 * @signature
 *    P.flatMapRecord(record, fn)
 * @signature
 *    P.flatMapRecord(record, fn)
 * @example
 *    P.flatMapRecord({ a: 1, b: 2, c: 3 }, ([k,v]) => [[k, v * 2], [k + "_abc", v * 2]]) // => { a: 2, a_abc: 2, b: 4, b_abc: 4, c: 6, c_abc: 6 }
 *    P.flatMapRecord({ a: 1, b: 2, c: 3 }, ([k,v]) => [[k, v * 2], [k + "_abc", v * 2]]) // => { a: 2, a_abc: 2, b: 4, b_abc: 4, c: 6, c_abc: 6 }
 * @category Object, Pipe
 */
export declare function mapRecord<T extends Record<string, unknown>, K extends string, V>(record: T, fn: Pred<[keyof T, T[keyof T]], [K, V]>): Record<K, V>;

export declare function mapRecord<T extends Record<string, unknown>, K extends string, V extends unknown>(fn: (v: [keyof T, T[keyof T]]) => [K, V]): (record: T) => Record<K, V>;

/**
 * Map each element of an array into an object using a defined callback function.
 * @param array The array to map.
 * @param fn The mapping function, which should return a tuple of [key, value], similar to Object.fromEntries
 * @returns The new mapped object.
 * @signature
 *    P.mapToObj(array, fn)
 * @signature
 *    P.mapToObj(fn)(array)
 * @example
 *    P.mapToObj([1, 2, 3], x => [String(x), x * 2]) // => {1: 2, 2: 4, 3: 6}
 *    P.pipe(
 *      [1, 2, 3],
 *      P.mapToObj(x => [String(x), x * 2])
 *    ) // => {1: 2, 2: 4, 3: 6}
 *    P.pipe(
 *      [0, 0, 0],
 *      P.mapToObj.indexed((x, i) => [i, i])
 *    ) // => {0: 0, 1: 1, 2: 2}
 * @category Array, Pipe
 */
export declare function mapToObj<T, K extends string | number | symbol, V>(array: readonly T[], fn: (element: T, index: number, array: readonly T[]) => [K, V]): Record<K, V>;

export declare function mapToObj<T, K extends string | number | symbol, V>(fn: (element: T, index: number, array: readonly T[]) => [K, V]): (array: readonly T[]) => Record<K, V>;

/**
 * Returns a new array containing items that have maximum numeric values defined by `fn` function.
 * @param array - List of items
 * @param fn - Selector function
 * @signature
 *  P.maxBy(arrayOfNumbers)
 * @signature
 *  P.maxBy(array, fn)
 * @signature
 *  P.maxBy(fn)(array)
 * @signature
 *  P.maxBy()(arrayOfNumbers)
 * @example
 *    P.maxBy([1,2,3,4,5,6,7,7]) //=> [7]
 *    P.maxBy([{ data: 5, score: 2 }, { data: 6, score: 5 }], (q) => q.data * q.score) //=> [{ data: 6, score: 5 }]
 * @category Number
 */
export declare function maxBy(array: readonly number[]): number[];

export declare function maxBy<T>(array: readonly T[], fn: (item: T) => number): T[];

export declare function maxBy<T>(fn: (item: T) => number): (array: readonly T[]) => T[];

export declare function maxBy(): (array: readonly number[]) => number[];

/**
 * Merges two objects. The same as `Object.assign`.
 * `b` object will override properties of `a`.
 * @param a the first object
 * @param b the second object
 * @signature
 *    P.merge(a, b)
 * @example
 *    P.merge({ x: 1, y: 2 }, { y: 10, z: 2 }) // => { x: 1, y: 10, z: 2 }
 * @data_first
 * @category Object
 */
export declare function merge<A, B>(a: A, b: B): A & B;

/**
 * Merges two objects. The same as `Object.assign`. `b` object will override properties of `a`.
 * @param b the second object
 * @signature
 *    P.merge(b)(a)
 * @example
 *    P.merge({ y: 10, z: 2 })({ x: 1, y: 2 }) // => { x: 1, y: 10, z: 2 }
 * @data_last
 * @category Object
 */
export declare function merge<A, B>(b: B): (a: A) => A & B;

/**
 * Returns a new array containing items that have maximum numeric values defined by `fn` function.
 * @param array - List of items
 * @param fn - Selector function
 * @signature
 *  P.minBy(arrayOfNumbers)
 * @signature
 *  P.minBy(array, fn)
 * @signature
 *  P.minBy(fn)(array)
 * @signature
 *  P.minBy()(arrayOfNumbers)
 * @example
 *    P.minBy([1,2,3,4,5,6,7,7]) //=> [1]
 *    P.minBy([{ data: 5, score: 2 }, { data: 6, score: 5 }], (q) => q.data * q.score) //=> [{ data: 5, score: 2 }]
 * @category Number, Pipe
 */
export declare function minBy(array: readonly number[]): number[];

export declare function minBy<T>(array: readonly T[], fn: (item: T) => number): T[];

export declare function minBy(): (array: readonly number[]) => number[];

export declare function minBy<T>(fn: (item: T) => number): (array: readonly T[]) => T[];

/**
 * A function that returns always `undefined`.
 * @signature
 *    P.noop()
 * @category Function
 */
export declare function noop(): any;

/**
 * Converts characters like ĖČĘĄ -> ecea, removes non letter and non number characters
 * @param str the string
 * @signature
 *    P.normalizeString(str);
 * @example
 *    P.normalizeString("Super#@! ===-0- ball %%% cup") // => super0ballcup
 * @data_first
 * @category String
 */
export declare function normalizeString(str: string): string;

/**
 * Returns a partial copy of an object omitting the keys specified.
 * @param object the object
 * @param names the property names
 * @signature
 *    P.omit(obj, names);
 * @signature
 *    P.omit(names)(obj);
 * @example
 *    P.omit({ a: 1, b: 2, c: 3, d: 4 }, ['a', 'd']) // => { b: 2, c: 3 }
 *
 *    P.pipe({ a: 1, b: 2, c: 3, d: 4 }, P.omit(['a', 'd'])) // => { b: 2, c: 3 }
 * @category Object, Pipe
 */
export declare function omit<T extends {}, K extends keyof T>(object: T, names: readonly K[]): Omit<T, K>;

export declare function omit<T extends {}, K extends keyof T>(names: readonly K[]): (object: T) => Omit<T, K>;

/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls to the function return the value of the first invocation.
 * @param fn the function to wrap
 * @signature P.once(fn)
 * @example
 * const initialize = P.once(createApplication);
 * initialize();
 * initialize();
 * // => `createApplication` is invoked once
 * @category Function
 */
export declare function once<T>(fn: () => T): () => T;

/**
 * Filter the elements of an array that meet the condition specified in a callback function.
 * @param array The array to filter.
 * @param fn the callback function.
 * @signature
 *    P.filter(array, fn)
 * @signature
 *    P.filter(fn)(array)
 * @example
 *    P.filter([1, 2, 3], x => x % 2 === 1) // => [1, 3]
 *
 *    P.pipe([1, 2, 3], P.filter(x => x % 2 === 1)) // => [1, 3]
 * @category Array, Pipe
 */
export declare function partition<T, S extends T>(array: readonly T[], fn: (value: T) => value is S): [S[], Exclude<T, S>[]];

export declare function partition<T>(array: readonly T[], fn: Pred<T, boolean>): T[];

export declare function partition<T, S extends T>(fn: (input: T) => input is S): (array: readonly T[]) => [S[], Exclude<T, S>[]];

export declare function partition<T>(fn: Pred<T, boolean>): (array: readonly T[]) => [T[], T[]];

/**
 * Gets the value at `path` of `object`
 * @param object the target object
 * @param path the path of the property to get
 * @signature
 *    P.path(object, path)
 * @signature
 *    P.path(path)(object)
 * @example
 *    P.path({x: { y: 1 }}, ['x', 'y']) // 1
 *    P.path({x: { y: 1 }}, ['y']) // undefined
 *    P.pipe({x: { y: { z: { a: [0] }} }}, P.path("x.y.z.a.0".split('.'))) // 0
 * @category Object, Pipe
 */
export declare function path(object: Record<string, unknown>, path: readonly string[]): unknown;

export declare function path(path: readonly (string | number)[]): (object: Record<string, unknown>) => unknown;

/**
 * Perform left-to-right function composition.
 * @param value The initial value.
 * @param operations the list of operations to apply.
 * @signature P.pipe(data, op1, op2, op3)
 * @example
 *    P.pipe(
 *      [1, 2, 3, 4],
 *      P.map(x => x * 2),
 *      arr => [arr[0] + arr[1], arr[2] + arr[3]],
 *    ) // => [6, 14]
 *
 *
 * @data_first
 * @category Function
 */
export declare function pipe<A, B>(value: A, op1: (input: A) => B): B;

export declare function pipe<A, B, C>(value: A, op1: (input: A) => B, op2: (input: B) => C): C;

export declare function pipe<A, B, C, D>(value: A, op1: (input: A) => B, op2: (input: B) => C, op3: (input: C) => D): D;

export declare function pipe<A, B, C, D, E>(value: A, op1: (input: A) => B, op2: (input: B) => C, op3: (input: C) => D, op4: (input: D) => E): E;

export declare function pipe<A, B, C, D, E, F>(value: A, op1: (input: A) => B, op2: (input: B) => C, op3: (input: C) => D, op4: (input: D) => E, op5: (input: E) => F): F;

export declare function pipe<A, B, C, D, E, F, G>(value: A, op1: (input: A) => B, op2: (input: B) => C, op3: (input: C) => D, op4: (input: D) => E, op5: (input: E) => F, op6: (input: F) => G): G;

export declare function pipe<A, B, C, D, E, F, G, H>(value: A, op1: (input: A) => B, op2: (input: B) => C, op3: (input: C) => D, op4: (input: D) => E, op5: (input: E) => F, op6: (input: F) => G, op7: (input: G) => H): H;

declare type Pred<T, K> = (input: T) => K;

export declare type PredIndexed<T, K> = (input: T, index: number, array: readonly T[]) => K;

declare type PredIndexed_2<T, K> = (input: T, index: number, array: readonly T[]) => K;

declare type PredIndexedOptional<T, K> = (input: T, index?: number, array?: readonly T[]) => K;

/**
 * Extracts Promise value
 * @example
 * export function example(): Promise<number> { ... }
 *
 * type E =  PromiseValueOf<ReturnType<typeof example>>
 *
 * // type: number
 * @category Type
 */
export declare type PromiseValueOf<O> = O extends Promise<infer T> ? T : never;

/**
 * Creates a function with `data-first` and `data-last` signatures.
 *
 * `purry` is a dynamic function and it's not type safe. It should be wrapped by a function that have proper typings.
 * Refer to the example below for correct usage.
 *
 * @param fn the function to purry.
 * @param args the arguments
 * @signature P.purry(fn, arguments);
 * @example
 *    function _findIndex(array, fn) {
 *      for (let i = 0; i < array.length; i++) {
 *        if (fn(array[i])) {
 *          return i;
 *        }
 *      }
 *      return -1;
 *    }
 *
 *    // data-first
 *    function findIndex<T>(array: T[], fn: (item: T) => boolean): number;
 *
 *    // data-last
 *    function findIndex<T>(fn: (item: T) => boolean): (array: T[]) => number;
 *
 *    function findIndex() {
 *      return P.purry(_findIndex, arguments);
 *    }
 * @category Function
 */
export declare function purry(fn: any, args: IArguments | readonly any[], lazy?: any): any;

/**
 * Random a non-cryptographic random string from characters a-zA-Z0-9.
 * @param length the length of the random string
 * @signature randomString(length)
 * @example
 *    randomString(5) // => aB92J
 * @category String
 */
export declare function randomString(length: number): string;

/**
 * Returns a list of numbers from `start` (inclusive) to `end` (exclusive).
 * @param start the start number
 * @param end the end number
 * @signature
 *    P.range(start, end)
 * @signature
 *    P.range(end)(start)
 * @example
 *    P.range(1, 5) // => [1, 2, 3, 4]
 *    P.range(5)(1) // => [1, 2, 3, 4]
 * @category Array, Pipe
 */
export declare function range(start: number, end: number): number[];

export declare function range(end: number): (start: number) => number[];

/**
 * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
 * @param array the array to reduce
 * @param fn the callback function
 * @param initialValue the initial value to use as an accumulator value in the callback function
 * @signature
 *    P.reduce(items, fn, initialValue)
 *    P.reduce.indexed(items, fn, initialValue)
 * @example
 *    P.reduce([1, 2, 3, 4, 5], (acc, x) => acc + x, 100) // => 115
 *    P.reduce.indexed([1, 2, 3, 4, 5], (acc, x, i, array) => acc + x, 100) // => 115
 * @data_first
 * @indexed
 * @category Array
 */
export declare function reduce<T, K>(items: readonly T[], fn: (acc: K, item: T) => K, initialValue: K): K;

/**
 * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.
 * @param fn the callback function
 * @param initialValue the initial value to use as an accumulator value in the callback function
 * @signature
 *    P.reduce(fn, initialValue)(array)
 * @example
 *    P.pipe([1, 2, 3, 4, 5], P.reduce((acc, x) => acc + x, 100)) // => 115
 *    P.pipe([1, 2, 3, 4, 5], P.reduce.indexed((acc, x, i, array) => acc + x, 100)) // => 115
 * @data_last
 * @indexed
 * @category Array
 */
export declare function reduce<T, K>(fn: (acc: K, item: T) => K, initialValue: K): (items: readonly T[]) => K;

export declare namespace reduce {
    export function indexed<T, K>(array: readonly T[], fn: (acc: K, item: T, index: number, items: T[]) => K, initialValue: K): Record<string, T>;
    export function indexed<T, K>(fn: (acc: K, item: T, index: number, items: T[]) => K, initialValue: K): (array: readonly T[]) => Record<string, T>;
}

/**
 * Retry promise function
 * @param errorHandler Logic when to retry
 * @param fn the callback function
 * @signature
 *    P.retry(fn, errorHandler)
 * @example
 *    P.retry(async () => {
 *          await delay(1000)
 *          throw new Error("Failed!")
 *    }, ({ count }) => count < 10) // Retry function 10 times
 * @category Array
 */
export declare function retry<E extends (...args: any[]) => Promise<any>>(errorHandler: (stats: {
    err: Error;
    count: number;
}) => Promise<boolean> | boolean): (fn: E) => E;

export declare function retry<E extends (...args: any[]) => Promise<any>>(fn: E, errorHandler: (stats: {
    err: Error;
    count: number;
}) => Promise<boolean> | boolean): E;

/**
 * Reverses array.
 * @param array the array
 * @signature
 *    P.reverse(arr);
 * @signature
 *    P.reverse()(array);
 * @example
 *    P.reverse([1, 2, 3]) // [3, 2, 1]
 *    P.reverse()([1, 2, 3]) // [3, 2, 1]
 * @category Array, Pipe
 */
export declare function reverse<T>(array: readonly T[]): Array<T>;

export declare function reverse<T>(): (array: readonly T[]) => Array<T>;

/**
 * Dynamically sets object path
 * @param target - Target object
 * @param path - Path in object
 * @param value - On final object element
 * @signature
 *    P.setPath(obj, path, value)
 * @example
 *    P.setPath({ data: {} }, "data.value.max", 100) // { data: { value: { max: 100 } } }
 * @category Object
 */
export declare function setPath(target: {
    [k: string]: unknown;
} | Array<unknown>, path: (string | number)[], value: unknown): unknown;

/**
 * Converts any string to slug
 * @param str the string
 * @signature
 *    P.slugify(str);
 * @example
 *    P.slugify("Super ball cup") // => super-ball-cup
 * @category String
 */
export declare function slugify(str: string): string;

/**
 * Sorts an array. The comparator function should accept two values at a time and return a negative number if the first value is smaller, a positive number if it's larger, and zero if they are equal.
 * Sorting is based on a native `sort` function. It's not guaranteed to be stable.
 * @param items the array to sort
 * @param cmp the comparator function
 * @signature
 *    P.sort(items, cmp)
 * @signature
 *    P.sort(cmp)(items)
 * @example
 *    P.sort([4, 2, 7, 5], (a, b) => a - b) // => [2, 4, 5, 7]
 *    P.pipe([4, 2, 7, 5], P.sort((a, b) => a - b)) // => [2, 4, 5, 7]
 * @category Array, Pipe
 */
export declare function sort<T>(items: readonly T[], cmp: (a: T, b: T) => number): T[];

export declare function sort<T>(cmp: (a: T, b: T) => number): (items: readonly T[]) => T[];

/**
 * Sorts the list according to the supplied function in ascending order.
 * Sorting is based on a native `sort` function. It's not guaranteed to be stable.
 * @param array - the array to sort
 * @param fn - the mapping function
 * @signature
 *    P.sortBy(array, fn)
 * @signature
 *    P.sortBy(fn)(array)
 * @example
 *    P.sortBy(
 *      [{ a: 1 }, { a: 3 }, { a: 7 }, { a: 2 }],
 *      x => x.a
 *    )
 *    // => [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 7 }]
 *
 *    P.pipe(
 *      [{ a: 1 }, { a: 3 }, { a: 7 }, { a: 2 }],
 *      P.sortBy(x => x.a)
 *    ) // => [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 7 }]
 * @category Array, Pipe
 */
export declare function sortBy<T>(array: readonly T[], fn: (item: T) => SortByProp): T[];

export declare function sortBy<T>(fn: (item: T) => SortByProp): (array: readonly T[]) => T[];

export declare type SortByProp = SortValue | ComplexSort | (SortValue | ComplexSort)[];

export declare type SortValue = boolean | number | string;

/**
 * Splits a given array at a given index.
 * @param array the array to split
 * @param index the index to split at
 * @signature
 *    P.splitAt(array, index)
 * @example
 *    P.splitAt([1, 2, 3], 1) // => [[1], [2, 3]]
 *    P.splitAt([1, 2, 3, 4, 5], -1) // => [[1, 2, 3, 4], [5]]
 * @data_first
 * @category Array
 */
export declare function splitAt<T>(array: readonly T[], index: number): [T[], T[]];

/**
 * Splits a given array at a given index.
 * @param array the array to split
 * @param index the index to split at
 * @signature
 *    P.splitAt(index)(array)
 * @example
 *    P.splitAt(1)([1, 2, 3]) // => [[1], [2, 3]]
 *    P.splitAt(-1)([1, 2, 3, 4, 5]) // => [[1, 2, 3, 4], [5]]
 * @data_last
 * @category Array
 */
export declare function splitAt<T>(index: number): (array: readonly T[]) => [T[], T[]];

/**
 * Splits a given array at the first index where the given predicate returns true.
 * @param array the array to split
 * @param fn the predicate
 * @signature
 *    P.splitWhen(array, fn)
 * @signature
 *    P.splitWhen(fn)(array)
 * @example
 *    P.splitWhen([1, 2, 3], x => x === 2) // => [[1], [2, 3]]
 *    P.splitWhen(x => x === 2)([1, 2, 3]) // => [[1], [2, 3]]
 * @category Array, Pipe
 */
export declare function splitWhen<T>(array: readonly T[], fn: (item: T) => boolean): [T[], T[]];

export declare function splitWhen<T>(fn: (item: T) => boolean): (array: readonly T[]) => [T[], T[]];

export declare interface Stats {
    min: number;
    max: number;
    arithmetic_mean: number;
    median: number;
    geometric_mean: number;
    middle: number;
    quadratic_mean: number;
    sum: number;
}

/**
 * Calculate objet numeric statistics
 * @param data - Array of data
 * @param fn - Function that maps to numeric data
 * @signature
 *    P.stats(data, fn)
 * @signature
 *    P.pipe(data,P.stats(fn))
 * @example
 *    P.stats([{ data: 1 }, { data: 2 }, { data: 3 }], (q) => q.data) // => { sum: 6, middle: 2, min: 1, max: 3, arithmetic_mean: 2, geometric_mean: 6, median: 2, quadratic_mean: 14 }
 *    P.pipe([1, 2, 3], P.stats((q) => q)) // => { sum: 6, middle: 2, min: 1, max: 3, arithmetic_mean: 2, geometric_mean: 6, median: 2, quadratic_mean: 14 }
 * @category Number, Pipe
 */
export declare function stats<T>(data: readonly T[], fn: (item: T) => number): Stats;

export declare function stats(data: readonly number[]): Stats;

export declare function stats<T>(fn: (item: T) => number): (array: readonly T[]) => Stats;

/**
 * Returns the first `n` elements of `array`.
 * @param array the array
 * @param n the number of elements to take
 * @signature
 *    P.take(array, n)
 * @signature
 *    P.take(n)(array)
 * @example
 *    P.take([1, 2, 3, 4, 3, 2, 1], 3) // => [1, 2, 3]
 *    P.pipe([1, 2, 3, 4, 3, 2, 1], P.take(n)) // => [1, 2, 3]
 * @category Array, Pipe
 */
export declare function take<T>(array: readonly T[], n: number): T[];

export declare function take<T>(n: number): (array: readonly T[]) => T[];

export declare namespace take {
    export function lazy<T>(n: number): (value: T) => LazyResult<T>;
}

/**
 * Returns elements from the array until predicate returns false.
 * @param array the array
 * @param fn the predicate
 * @signature
 *    P.takeWhile(array, fn)
 * @signature
 *    P.takeWhile(fn)(array)
 * @example
 *    P.takeWhile([1, 2, 3, 4, 3, 2, 1], x => x !== 4) // => [1, 2, 3]
 *    P.pipe([1, 2, 3, 4, 3, 2, 1], P.takeWhile(x => x !== 4))  // => [1, 2, 3]
 * @category Array, Pipe
 */
export declare function takeWhile<T>(array: readonly T[], fn: (item: T) => boolean): T[];

export declare function takeWhile<T>(fn: (item: T) => boolean): (array: readonly T[]) => T[];

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
export declare function throttle<E extends (...args: any[]) => any>(func: E, throttleTimeMs: number): E;

export declare function throttle<E extends (...args: any[]) => any>(throttleTimeMs: number): (func: E) => E;

/**
 * Prevents promise to execute longer than X ms
 * @param fn The function to invoke.
 * @param maxDuration - Duration in milliseconds
 * @throws If provided function executes longer than `maxDuration` milliseconds
 * @signature
 *    P.timeout(fn, milliseconds)
 * @signature
 *    P.timeout(milliseconds)(fn)
 * @example
 *    const req = P.timeout(request, 500)
 *    req({ ... }) // Will throw if function executes longer than 500ms
 * @category Utility, Pipe
 */
export declare function timeout<I extends any[], R>(fn: (...args: I) => Promise<R>, maxDuration: number): (...args: I) => Promise<R>;

export declare function timeout<I extends any[], R>(maxDuration: number): (fn: (...args: I) => Promise<R>) => (...args: I) => Promise<R>;

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
export declare function times<T>(count: number, fn: (n: number) => T): T[];

export declare function times<T>(fn: (n: number) => T): (count: number) => T[];

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
export declare function toDate(data: string | number | Date): Date | undefined;

export declare function toDate(data: string | number | Date, defaultValue: Date): Date;

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
export declare function toFloat(data: unknown): number | undefined;

export declare function toFloat<T extends number>(data: unknown, defaultValue: T): number;

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
export declare function toInt(data: unknown): number | undefined;

export declare function toInt<T extends number>(data: unknown, defaultValue: T): number;

/**
 * Gives a single-word string description of the (native) type of a value, returning such answers as 'Object', 'Number', 'Array', or 'Null'. Does not attempt to distinguish user Object types any further, reporting them all as 'Object'.
 * @param val
 * @signature
 *    P.type(obj)
 * @example
 *    P.type({}); //=> "Object"
 *    P.type(1); //=> "Number"
 *    P.type(false); //=> "Boolean"
 *    P.type('s'); //=> "String"
 *    P.type(null); //=> "Null"
 *    P.type([]); //=> "Array"
 *    P.type(/[A-z]/); //=> "RegExp"
 *    P.type(() => {}); //=> "Function"
 *    P.type(undefined); //=> "Undefined"
 *    P.type(new Date()); //=> "Date"
 *    P.type(new MyClass()); // => "MyClass"
 * @category Utility
 */
export declare function type(val: any): string;

/**
 * Returns a new array containing only one copy of each element in the original list.
 * Elements are compared by reference using Set.
 * Note: In `pipe`, use `uniq()` form instead of `uniq`. Otherwise, the inferred type is lost.
 * @param array - List of items
 * @signature
 *    P.uniq(array)
 * @signature
 *    P.pipe(array, P.uniq())
 * @example
 *    P.uniq([1, 2, 2, 5, 1, 6, 7]) // => [1, 2, 5, 6, 7]
 *    P.pipe(
 *      [1, 2, 2, 5, 1, 6, 7], // only 4 iterations
 *      P.uniq(),
 *      P.take(3)
 *    ) // => [1, 2, 5]
 * @category Array, Pipe
 */
export declare function uniq<T>(array: readonly T[]): T[];

export declare function uniq<T>(): (array: readonly T[]) => T[];

export declare namespace uniq {
    export function lazy(): (value: any) => LazyResult<any>;
}

/**
 * Returns a new array containing only one copy of each element in the original list transformed by a function.
 * Elements are compared by reference using Set.
 * @param array - List of items
 * @signature
 *    P.uniqBy(fn, array)
 * @signature
 *    P.pipe(array, P.uniqBy(fn))
 * @example
 *    P.uniq(obj => obj.n, [{n: 1}, {n: 2}, {n: 2}, {n: 5}, {n: 1}, {n: 6}, {n: 7}]) // => [{n: 1}, {n: 2}, {n: 5}, {n: 6}, {n: 7}]
 *    P.pipe(
 *      [{n: 1}, {n: 2}, {n: 2}, {n: 5}, {n: 1}, {n: 6}, {n: 7}], // only 4 iterations
 *      P.uniq(obj => obj.n),
 *      P.take(3)
 *    ) // => [{n: 1}, {n: 2}, {n: 5}]
 * @category Array, Pipe
 */
export declare function uniqBy<T, K>(array: readonly T[], transformer: (item: T) => K): T[];

export declare function uniqBy<T, K>(transformer: (item: T) => K): (array: readonly T[]) => T[];

export declare class UnknownError extends Error {
    data: unknown;
    readonly name = "UnknownError";
    constructor(data: unknown);
}

/**
 * Joins two url paths
 * @param url - Valid url
 * @category Utility
 */
export declare function urlJoin(...concat: string[]): string;

/**
 * Converts url to relative url
 * @param url - Valid url
 * @category Utility
 */
export declare function urlToRelative(url: string): string;

/**
 * Generates non cryptographic UUID
 * @example
 * P.uuidv4() //=> aecad060-0bb7-4567-af08-4dfe5f46d130
 * @category Utility
 */
export declare function uuidv4(): string;

/**
 * Return object values
 * @param object - object value
 * @signature
 *    P.values(object)
 * @example
 *    P.values()(object)
 * @data_first
 * @category Array
 */
export declare function values<T extends {
    [k: string]: unknown;
}>(): (object: T) => ReadonlyArray<T[keyof T]>;

export declare function values<T extends {
    [k: string]: unknown;
}>(object: T): ReadonlyArray<T[keyof T]>;

/**
 * Function repeats provided call until it returns not null or undefined value.
 * If this process exceeds `maxDurationMs` function will throw
 * of those function calls.
 *
 * @param fn - The function to invoke.
 * @param maxDurationMs - Max waiting duration
 * @example
 * const result = await waitUntilDefined(() => document.body.getElementById("#app"))
 * @category Utility
 * @throws If if fn does not return not nil value in given time frame
 */
export declare function waitUntilDefined<T>(fn: () => T | undefined, maxDurationMs: number): Promise<NonNullable<T>>;

export { }

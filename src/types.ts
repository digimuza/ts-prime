

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
export type PromiseValueOf<O> = O extends Promise<infer T> ? T : never

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
export type DeepNonNullable<T> = T extends (...args: any[]) => any
    ? T
    : T extends any[]
    ? DeepNonNullableArray<T[number]>
    : T extends object
    ? DeepNonNullableObject<T>
    : T


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
export type DeepPartial<T> = T extends Function
    ? T
    : T extends Array<infer U>
    ? DeepPartialArray<U>
    : T extends object
    ? DeepPartialObject<T>
    : T | undefined


export interface DeepRequiredArray<T> extends Array<DeepRequired<NonNullable<T>>> { }

export type DeepRequiredObject<T> = { [P in keyof T]-?: DeepRequired<NonNullable<T[P]>> }


export interface DeepNonNullableArray<T> extends Array<DeepNonNullable<NonNullable<T>>> { }

export type DeepNonNullableObject<T> = { [P in keyof T]-?: DeepNonNullable<NonNullable<T[P]>> }

export interface DeepPartialArray<T> extends Array<DeepPartial<T>> { }

export type DeepPartialObject<T> = { [P in keyof T]?: DeepPartial<T[P]> }


// tslint:disable-next-line: class-name
export interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> { }

export type DeepReadonlyObject<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> }

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
export type DeepReadonly<T> = T extends (...args: any[]) => any
    ? T
    : T extends any[]
    ? DeepReadonlyArray<T[number]>
    : T extends object
    ? DeepReadonlyObject<T>
    : T

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
export type DeepRequired<T> = T extends (...args: any[]) => any
    ? T
    : T extends any[]
    ? DeepRequiredArray<T[number]>
    : T extends object
    ? DeepRequiredObject<T>
    : T

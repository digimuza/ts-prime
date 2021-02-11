import { purry } from "./purry";
import { AnyArray } from "./_types";

function _entries<T extends { [k: string]: unknown }>(
  object: T
): ReadonlyArray<[keyof T, T[keyof T]]> {
  return Object.entries(object) as ReadonlyArray<[keyof T, T[keyof T]]>;
}

/**
 * Returns an array of key/values of the enumerable properties of an object.
 * @param object - Any object
 * @signature
 *    P.entries(object)
 * @example
 *    P.entries({ a: 1, b: 2, c: 3 }) // => [['a', 1], ['b', 2], ['c', 3]]
 * @category Object
 */
export function entries<T extends { [k: string]: unknown }>(): (obj: T) => ReadonlyArray<[keyof T, T[keyof T]]>
export function entries<T extends { [k: string]: unknown }>(obj: T): ReadonlyArray<[keyof T, T[keyof T]]>
export function entries() {
  return purry(_entries, arguments);
}


function _fromEntries<T extends [string, unknown]>(data: ReadonlyArray<T>) {
  let rec = {} as Record<string, unknown>;
  for (const [k, v] of data) {
    rec[k] = v;
  }
  return rec as Record<string, T[1]>;
}


/**
 * Construct object from tuple array
 * @param data - List of tuples
 * @signature
 *    P.fromEntries(tuples)
 * @example
 *    P.fromEntries([["a", 5], ["b", 4]]) // => { a: 5, b: 4 }
 * @category Object
 */
export function fromEntries<T extends AnyArray<[string, any] | readonly [string, any]>>(): (entries: T) => { [k in T[number][0]]: T[number][1] }
export function fromEntries<T extends AnyArray<[string, any] | readonly [string, any]>>(entries: T): { [k in T[number][0]]: T[number][1] }
export function fromEntries() {
  return purry(_fromEntries, arguments)
}



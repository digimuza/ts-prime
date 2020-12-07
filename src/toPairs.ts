/**
 * Returns an array of key/values of the enumerable properties of an object.
 * @param object - Any object
 * @signature
 *    P.toPairs(object)
 * @example
 *    P.toPairs({ a: 1, b: 2, c: 3 }) // => [['a', 1], ['b', 2], ['c', 3]]
 * @category Object
 */
export function toPairs<T extends { [k: string]: unknown }>(
  object: T
): ReadonlyArray<[keyof T, T[keyof T]]> {
  return Object.entries(object) as ReadonlyArray<[keyof T, T[keyof T]]>;
}


/**
 * Construct object from tuple array
 * @param data - List of tuples
 * @signature
 *    P.fromPairs(tuples)
 * @example
 *    P.fromPairs([["a", 5], ["b", 4]]) // => { a: 5, b: 4 }
 * @category Object
 */
export function fromPairs<T extends [string, unknown]>(data: ReadonlyArray<T>) {
  let rec = {} as Record<string, unknown>;
  for (const [k, v] of data) {
    rec[k] = v;
  }
  return rec as Record<string, T[1]>;
}

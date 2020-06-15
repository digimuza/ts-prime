/**
 * Returns an array of key/values of the enumerable properties of an object.
 * @param object
 * @signature
 *    R.toPairs(object)
 * @example
 *    R.toPairs({ a: 1, b: 2, c: 3 }) // => [['a', 1], ['b', 2], ['c', 3]]
 * @category Object
 */
export function toPairs<T>(object: T): Array<[string, T]> {
  return Object.entries(object);
}

export function fromPairs<T extends [string, unknown]>(data: ReadonlyArray<T>) {
  let rec = {} as Record<string, unknown>
  for (const [k, v] of data) {
    rec[k] = v
  }
  return rec as Record<string, T[1]>
}
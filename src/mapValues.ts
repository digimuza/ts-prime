/**
 * Maps keys of `object` and keeps the same values.
 * @param object the object to map
 * @param fn the mapping function
 * @signature
 *    R.mapKeys(object, fn)
 * @example
 *    R.mapKeys({a: 1, b: 2}, (key, value) => key + value) // => { a1: 1, b2: 2 }
 * @data_first
 * @category Object
 */
export function mapValues<T, S>(
  object: T,
  fn: (key: keyof T, value: T[keyof T]) => S
): { [x in keyof T]: S };

/**
 * Maps keys of `object` and keeps the same values.
 * @param fn the mapping function
 * @signature
 *    R.mapValues(fn)(object)
 * @example
 *    R.pipe({a: 1, b: 2}, R.mapValues((key, value) => key + value)) // => { a1: 1, b2: 2 }
 * @data_last
 * @category Object
 */
export function mapValues<T, S>(
  fn: (key: keyof T, value: T[keyof T]) => any
): (object: T) => { [x: string]: any };

export function mapValues(arg1: any, arg2?: any): any {
  if (arguments.length === 1) {
    return (data: any) => _mapValues(data, arg1);
  }
  return _mapValues(arg1, arg2);
}

function _mapValues(obj: any, fn: (key: string, value: any) => any) {
  return Object.keys(obj).reduce((acc, key) => {
    acc[fn(key, obj[key])] = obj[key];
    return acc;
  }, {} as any);
}

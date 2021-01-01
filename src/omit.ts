import { purry } from './purry';

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
export function omit<T extends {}, K extends keyof T>(
  object: T,
  names: readonly K[]
): Omit<T, K>;

export function omit<T extends {}, K extends keyof T>(
  names: readonly K[]
): (object: T) => Omit<T, K>;

export function omit() {
  return purry(_omit, arguments);
}

function _omit<T extends {}, K extends keyof T>(
  object: T,
  names: K[]
): Omit<T, K> {
  const set = new Set(names as string[]);
  return Object.entries(object).reduce((acc, [name, value]) => {
    if (!set.has(name)) {
      acc[name] = value;
    }
    return acc;
  }, {} as any) as Omit<T, K>;
}

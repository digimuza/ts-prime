import { purry } from './purry';
import { NonNull, Key } from './_types';
import { isObject, isArray } from './guards';

/**
 * Given a union of indexable types `T`, we derive an indexable type
 * containing all of the keys of each variant of `T`. If a key is
 * present in multiple variants of `T`, then the corresponding type in
 * `Pathable<T>` will be the intersection of all types for that key.
 * @example
 *    type T1 = Pathable<{a: number} | {a: string; b: boolean}>
 *    // {a: number | string; b: boolean}
 *
 *    type T2 = Pathable<{a?: {b: string}}
 *    // {a: {b: string} | undefined}
 *
 *    type T3 = Pathable<{a: string} | number>
 *    // {a: string}
 *
 *    type T4 = Pathable<{a: number} | {a: string} | {b: boolean}>
 *    // {a: number | string; b: boolean}
 *
 * This type lets us answer the questions:
 * - Given some object of type `T`, what keys might this object have?
 * - If this object did happen to have a particular key, what values
 *   might that key have?
 */
type Pathable<T> = { [K in AllKeys<T>]: TypesForKey<T, K> };

type AllKeys<T> = T extends infer I ? keyof I : never;
type TypesForKey<T, K extends Key> = T extends infer I
  ? K extends keyof I
    ? I[K]
    : never
  : never;

/**
 * Given some `A` which is a key of at least one variant of `T`, derive
 * `T[A]` for the cases where `A` is present in `T`, and `T[A]` is not
 * null or undefined.
 */
type PathValue1<T, A extends keyof Pathable<T>> = NonNull<Pathable<T>>[A];
/** All possible options after successfully reaching `T[A]` */
type Pathable1<T, A extends keyof Pathable<T>> = Pathable<PathValue1<T, A>>;

/** As `PathValue1`, but for `T[A][B]` */
type PathValue2<
  T,
  A extends keyof Pathable<T>,
  B extends keyof Pathable1<T, A>
> = NonNull<Pathable1<T, A>>[B];
/** As `Pathable1`, but for `T[A][B]` */
type Pathable2<
  T,
  A extends keyof Pathable<T>,
  B extends keyof Pathable1<T, A>
> = Pathable<PathValue2<T, A, B>>;

/** As `PathValue1`, but for `T[A][B][C]` */
type PathValue3<
  T,
  A extends keyof Pathable<T>,
  B extends keyof Pathable1<T, A>,
  C extends keyof Pathable2<T, A, B>
> = NonNull<Pathable2<T, A, B>>[C];

/**
 * Gets the value at `path` of `object`. If the resolved value is `undefined`, the `defaultValue` is returned in its place.
 * @param object the target object
 * @param path the path of the property to get
 * @param defaultValue the default value
 * @signature R.pathOr(object, array, defaultValue)
 * @example
 *    R.pathOr({x: 10}, ['y'], 2) // 2
 *    R.pathOr({y: 10}, ['y'], 2) // 10
 * @data_first
 * @category Object
 */
export function pathOr<T, A extends keyof Pathable<T>>(
  object: T,
  path: readonly [A],
  defaultValue: PathValue1<T, A>
): PathValue1<T, A>;

export function pathOr<
  T,
  A extends keyof Pathable<T>,
  B extends keyof Pathable1<T, A>
>(
  object: T,
  path: readonly [A, B],
  defaultValue: PathValue2<T, A, B>
): PathValue2<T, A, B>;

export function pathOr<
  T,
  A extends keyof Pathable<T>,
  B extends keyof Pathable1<T, A>,
  C extends keyof Pathable2<T, A, B>
>(
  object: T,
  path: readonly [A, B, C],
  defaultValue: PathValue3<T, A, B, C>
): PathValue3<T, A, B, C>;

/**
 * Gets the value at `path` of `object`. If the resolved value is `undefined`, the `defaultValue` is returned in its place.
 * @param object the target object
 * @param path the path of the property to get
 * @param defaultValue the default value
 * @signature R.pathOr(array, defaultValue)(object)
 * @example
 *    R.pipe({x: 10}, R.pathOr(['y'], 2)) // 2
 *    R.pipe({y: 10}, R.pathOr(['y'], 2)) // 10
 * @data_last
 * @category Object
 */
export function pathOr<T, A extends keyof Pathable<T>>(
  path: readonly [A],
  defaultValue: PathValue1<T, A>
): (object: T) => PathValue1<T, A>;

export function pathOr<
  T,
  A extends keyof Pathable<T>,
  B extends keyof Pathable1<T, A>
>(
  path: readonly [A, B],
  defaultValue: PathValue2<T, A, B>
): (object: T) => PathValue2<T, A, B>;

export function pathOr<
  T,
  A extends keyof Pathable<T>,
  B extends keyof Pathable1<T, A>,
  C extends keyof Pathable2<T, A, B>
>(
  path: readonly [A, B, C],
  defaultValue: PathValue3<T, A, B, C>
): (object: T) => PathValue3<T, A, B, C>;


export function pathOr() {
  return purry(_pathOr, arguments);
}

function _pathOr(object: any, path: any[], defaultValue: any): any {
  let current = object;
  for (const prop of path) {
    if (current == null || current[prop] == null) {
      return defaultValue;
    }
    current = current[prop];
  }
  return current;
}

/**
 * Gets the value at `path` of `object`
 * @param object the target object
 * @param path the path of the property to get
 * @signature R.path(object, path)
 * @example
 *    R.path({x: { y: 1 }}, ['x', 'y']) // 1
 *    R.path({x: { y: 1 }}, ['y']) // undefined
 * @data_first
 * @category Object
 */
export function path(
  object: Record<string, unknown>,
  path: readonly string[],
): unknown;

/**
 * Gets the value at `path` of `object`.
 * @param object the target object
 * @param path the path of the property to get
 * @signature R.path(path)(object)
 * @example
 *    R.pipe({x: { y: { z: { a: [0] }} }}, R.path("x.y.z.a.0".split('.'))) // 0
 * @data_last
 * @category Object
 */
export function path<T, A extends keyof Pathable<T>>(
  path: readonly string[],
): (object: Record<string, unknown>) => unknown;
export function path() {
  return purry(_path, arguments);
}
function _path(obj: Record<string, unknown>, path: ReadonlyArray<string | number>): unknown {
  const recursion = (path: ReadonlyArray<string | number>, _ro: unknown): unknown => {
    if (path.length === 0) return _ro
    if (!isObject(_ro) && !isArray(_ro)) return

    const rest = path.slice(1)
    const firstSegment = path[0]
    if (firstSegment in _ro) {
      return recursion(rest, (_ro as any)[firstSegment])
    }

    return 
  }
  return recursion(path, obj)
}
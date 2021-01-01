import { purry } from './purry';
import { isObject, isArray } from './guards';

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
export function path(
  object: Record<string, unknown>,
  path: readonly string[]
): unknown;
export function path(
  path: readonly (string | number)[]
): (object: Record<string, unknown>) => unknown;
export function path() {
  return purry(_path, arguments);
}
function _path(
  obj: Record<string, unknown>,
  path: ReadonlyArray<string | number>
): unknown {
  const recursion = (
    path: ReadonlyArray<string | number>,
    _ro: unknown
  ): unknown => {
    if (path.length === 0) return _ro;
    if (!isObject(_ro) && !isArray(_ro)) return;

    const rest = path.slice(1);
    const firstSegment = path[0];
    if (firstSegment in _ro) {
      return recursion(rest, (_ro as any)[firstSegment]);
    }

    return;
  };
  return recursion(path, obj);
}

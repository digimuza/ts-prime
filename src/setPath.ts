import { clone } from './clone';
import { isArray, isObject } from './guards';
import { type } from './type';

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
export function setPath(
  target: { [k: string]: unknown } | Array<unknown>,
  path: (string | number)[],
  value: unknown
): unknown {
  if (!(isObject(target) || isArray(target))) {
    throw new Error(
      `Expecting to receive object or array. But received ${type(target)}`
    );
  }
  const clonedTarget = clone(target);
  let result = clonedTarget as any;
  const clonedPath = [...path];
  while (clonedPath.length !== 0) {
    const k = clonedPath.shift();
    if (k != null) {
      if (result[k] == null) {
        result[k] = clonedPath.length === 0 ? value : {};
        result = result[k];
        continue;
      }

      if (clonedPath.length === 0) {
        result[k] = value;
      }

      result = result[k];
    }
  }
  return clonedTarget;
}

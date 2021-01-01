import { type } from './type';
import { isFunction, isPromise, isArray, isObject } from './index';

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
export function deepEqual(
  valueA: unknown,
  valueB: unknown,
  mode: 'soft' | 'hard' = 'hard'
): boolean {
  const compare = (a: unknown, b: unknown) => {
    if (a === b) return true;
    if (type(a) !== type(b)) return false;
    if (isFunction(a) && isFunction(b)) a.toString() === b.toString();
    if (isPromise(a) && isPromise(b)) return a === b;
    if (isArray(a) && isArray(b)) {
      if (a.length !== b.length) return false;
      const aArray = mode === 'hard' ? a : a;
      const bArray = mode === 'hard' ? b : b;
      for (const index in aArray) {
        if (!deepEqual(aArray[index], bArray[index])) return false;
      }
      return true;
    }
    if (isObject(a) && isObject(b)) {
      const aKeys = Object.keys(a);
      const bKeys = Object.keys(b);
      if (aKeys.length !== bKeys.length) return false;
      if (!deepEqual(aKeys, bKeys)) return false;
      for (const aKey of aKeys) {
        if (!deepEqual(a[aKey], b[aKey])) return false;
      }
      return true;
    }
    return false;
  };
  return compare(valueA, valueB);
}

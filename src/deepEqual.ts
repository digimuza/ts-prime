import { type } from "./type";
import { isFunction, isPromise, isArray, isObject } from "./index";

/**
 * Compares two values recursively.
 * @description
 * The function has two modes `soft` and `hard` soft mode ignores array order hard mode preserves array order
 * @param valueA - anything
 * @param valueB - anything
 * @param mode - array comparison mode
 */
export function deepEqual(valueA: unknown, valueB: unknown, mode: 'soft' | 'hard' = 'soft'): boolean {
    const compare = (a: unknown, b: unknown) => {
        if (a === b) return true;
        if (type(a) !== type(b)) return false;
        if (isFunction(a) && isFunction(b)) a.toString() === b.toString();
        if (isPromise(a) && isPromise(b)) return a === b;
        if (isArray(a) && isArray(b)) {
            if (a.length !== b.length) return false
            const aArray = mode === 'hard' ? a : a
            const bArray = mode === 'hard' ? b : b
            for (const index in aArray) {
                if (!deepEqual(aArray[index], bArray[index])) return false
            }
            return true
        }
        if (isObject(a) && isObject(b)) {
            const aKeys = Object.keys(a)
            const bKeys = Object.keys(b)
            if (aKeys.length !== bKeys.length) return false;
            if (!deepEqual(aKeys, bKeys)) return false;
            for (const aKey of aKeys) {
                if (!deepEqual(a[aKey], b[aKey])) return false;
            }
            return true
        }
        return false
    }
    return compare(valueA, valueB)
}
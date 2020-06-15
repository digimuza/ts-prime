import { purry } from "./purry";
import { uniq } from "./uniq";
import { deepEqual } from "./deepEqual";

function _deepUniq<T>(array: T[], mode: 'soft' | 'hard') {
    const uniqArr = uniq(array)
    let uniqeItems: T[] = []
    let compareList = [...uniqArr]
    while (compareList.length !== 0) {
        const compareValue = compareList.shift()
        if (!compareValue) break
        for (const iIndex in compareList) {
            if (deepEqual(compareValue, compareList[iIndex], mode)) {
                compareList.splice(parseInt(iIndex), 1)
                continue
            }
        }
        uniqeItems.push(compareValue)
    }
    return uniqeItems
}

/**
 * Function will filter non unique value recursivly.
 * @description
 * The function has two modes `soft` and `hard` soft mode ignores array order hard mode preserves array order.
 * @param array - source array
 * @param mode - array comparison mode
 * @example
 *    deepUniq([{ a: [1, 2] }, { a: [1, 2] }] }, { a: [2, 1] }] }], 'soft') // [{ a: [1, 2] }]
 * @example
 *    deepUniq([{ a: [1, 2] }, { a: [1, 2] }] }, { a: [2, 1] }] }], 'hard') // [{ a: [1, 2] }, { a: [2, 1] }]
 * @pipeable
 * @category Array
 */
export function deepUniq<T>(array: readonly T[], mode?: 'soft' | 'hard'): T[];
export function deepUniq<T>(mode?: 'soft' | 'hard'): (array: readonly T[]) => T[];
export function deepUniq() {
    return purry(_deepUniq, arguments);
}

import { purry } from './purry';
import { sortBy } from './sortBy';
/**
 * Returns a new array containing items that have minimum numeric values.
 * @param array
 * @signature
 *    R.minBy(array, fn)
 * @example
 *    R.minBy([{ a: 1 }, { a: 1 }, { a: 2 }], (item) => item.a) // => [{ a: 1 }, { a: 1 }]
 *    R.minBy([{ a: 1 }, { a: 1.2 }, { a: 2 }], (item) => item.a) // => [{ a: 1 }]
 * @pipeable
 * @category Array
 */
export function minBy<T extends object>(array: readonly T[], fn: (item: T) => number): T[];
export function minBy<T>(fn: (item: T) => number): (array: readonly T[]) => T[];

export function minBy() {
    return purry(_minBy, arguments);
}

function _minBy<T>(array: readonly T[], fn: (item: T) => number): T[] {
    const items = sortBy(array, fn)
    const minArr: T[] = []
    let minV: number = 0
    for (const i of items) {
        if (minArr.length === 0) {
            minArr.push(i)
            minV = fn(i)
            continue
        }

        if (minV === fn(i)) {
            minArr.push(i)
            continue
        }
        break
    }
    return minArr
}





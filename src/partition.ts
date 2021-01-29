import { purry } from './purry';
import { Pred } from './_types';
import { _toLazyIndexed } from './_toLazyIndexed';

/**
 * Filter the elements of an array that meet the condition specified in a callback function.
 * @param array The array to filter.
 * @param fn the callback function.
 * @signature
 *    P.filter(array, fn)
 * @signature
 *    P.filter(fn)(array)
 * @example
 *    P.filter([1, 2, 3], x => x % 2 === 1) // => [1, 3]
 *
 *    P.pipe([1, 2, 3], P.filter(x => x % 2 === 1)) // => [1, 3]
 * @category Array, Pipe
 */
export function partition<T, S extends T>(
    array: readonly T[],
    fn: (value: T) => value is S
): [S[], Exclude<T, S>[]];
export function partition<T>(array: readonly T[], fn: Pred<T, boolean>): T[];
export function partition<T, S extends T>(
    fn: (input: T) => input is S
): (array: readonly T[]) => [S[], Exclude<T, S>[]];
export function partition<T>(fn: Pred<T, boolean>): (array: readonly T[]) => [T[], T[]];

export function partition() {
    return purry(_partition(), arguments);
}
export type PredIndexed<T, K> = (
    input: T,
    index: number,
    array: readonly T[]
) => K;
const _partition = () => <T>(
    array: T[],
    fn: (
        input: T,
        index: number,
        array: readonly T[]
    ) => any
) => {
    let right = []
    let left = []
    let index = 0
    for (const s of array) {
        if (fn(s, index, array)) {
            index++
            right.push(s)
            continue
        }

        index++
        left.push(s)
    }

    return [right, left]
};
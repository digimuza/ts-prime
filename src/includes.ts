import { purry } from "./purry";



function _includesAny<T>(data: ReadonlyArray<T>, includes: ReadonlyArray<T>) {
    for (const i of includes) {
        if (data.indexOf(i) !== -1) {
            return true
        }
    }
    return false
}

/**
 * Checks if @param data contains any element of @param includes and returns boolean
 * @param data - Value to check
 * @param includes - Provided list
 * @signature
 *    P.includesAny(sourceList, includeList)
 * @signature
 *    P.includesAny(includeList)(sourceList)
 * @example
 *    P.includesAny(['apple','microsoft','tesla','samsung'],['apple', 'xiomi']) //=> true; Source list contains "apple"
 *    P.includesAny(['apple', 'microsoft'])(['samsung', 'tesla']) //=> false // Source list does not include any of options
 * @category Array, Pipe
 */
export function includesAny<T>(data: ReadonlyArray<T>, includes: ReadonlyArray<T>): boolean
export function includesAny<T>(includes: ReadonlyArray<T>): (data: ReadonlyArray<T>) => boolean
export function includesAny() {
    return purry(_includesAny, arguments);
}


function _includesEvery<T>(data: ReadonlyArray<T>, includes: ReadonlyArray<T>) {
    for (const i of includes) {
        if (data.indexOf(i) === -1) {
            return false
        }
    }
    return true
}


/**
 * Checks if @param data contains every element of @param includes and returns boolean
 * @param data - Value to check
 * @param includes - Provided list
 * @signature
 *    P.includesEvery(sourceList, includeList)
 * @signature
 *    P.includesEvery(includeList)(sourceList)
 * @example
 *    P.includesEvery(['apple','microsoft','tesla','samsung'],['apple', 'microsoft']) //=> true; Source list contains "apple" and 'microsoft'
 *    P.includesEvery(['apple', 'microsoft'])(['samsung', 'tesla', 'apple']) //=> false // Source list does not include every of options
 * @category Array, Pipe
 */
export function includesEvery<T>(data: ReadonlyArray<T>, includes: ReadonlyArray<T>): boolean
export function includesEvery<T>(includes: ReadonlyArray<T>): (data: ReadonlyArray<T>) => boolean
export function includesEvery() {
    return purry(_includesEvery, arguments);
}
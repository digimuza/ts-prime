import { purry } from './purry';
import { AnyArray } from './_types';


type IsPickKey<T extends { [k: string]: unknown }, Keys extends string> = Keys extends keyof T ? 'ON' : 'OFF'

/**
 * Creates an object composed of the picked `object` properties.
 * @param object the target object
 * @param names the properties names
 * @signature R.pick(object, [prop1, prop2])
 * @example
 *    P.pick({ a: 1, b: 2, c: 3, d: 4 }, ['a', 'd']) // => { a: 1, d: 4 }
 * @example
 *    P.pipe({ a: 1, b: 2, c: 3, d: 4 }, R.pick(['a', 'd'])) // => { a: 1, d: 4 }
 * @data_first
 * @category Object
 */
export function pick<T extends {}, Q extends string>(
    object: T,
    names: AnyArray<Q>
    // @ts-ignore
): IsPickKey<T, Q> extends 'ON' ? { [k in Q]: T[k] } : { [k in keyof T]?: T[k] };
export function pick<T extends {}, K extends keyof T>(
    object: T,
    names: readonly K[]
): { [k in K]: T[k] };

export function pick<T extends {}, Q extends string>(
    names: readonly Q[]
    // @ts-ignore
): (object: T) => IsPickKey<T, Q> extends 'ON' ? { [k in Q]: T[k] } : { [k in keyof T]?: T[k] };

export function pick() {
    return purry(_pick, arguments);
}

function _pick(object: any, names: string[]) {
    if (object == null) {
        return {};
    }
    return names.reduce((acc, name) => {
        if (name in object) {
            acc[name] = object[name];
        }
        return acc;
    }, {} as any);
}
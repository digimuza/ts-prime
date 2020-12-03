import { clone } from "./clone"
import { isArray, isObject } from "./guards"
import { type } from "./type"

 /**
 * Dynamically sets object path
 * @param obj - Target object
 * @param path - Path in object
 * @param value - On final object element
 * @signature
 *    P.setPath(obj, path, value)
 * @example
 * ```ts
 *    P.setPath({ data: {} }, "data.value.max", 100) // { data: { value: { max: 100 } } }
 * ```
 * @category Object
 */
export function setPath(obj: { [k: string]: unknown } | Array<unknown>, path: (string | number)[], value: unknown): unknown {
    if (!(isObject(obj) || isArray(obj))) {
        throw new Error(`Expecting to receive object or array. But received ${type(obj)}`)
    }
    const xObject = clone(obj)
    let result = xObject as any
    const pathCloned = [...path]
    while(pathCloned.length !== 0) {
       const k = pathCloned.shift()
       if (k != null) {
        if (result[k] == null) {
            result[k] = pathCloned.length === 0 ? value : {}
        }
        result = result[k]
       }
    }
    return xObject
}
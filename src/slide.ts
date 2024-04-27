import { purry } from "./purry";

function _slide<T>(array: T[], count: number) {
	if (array.length === 0) throw new TypeError("Can't accept empty arrays");
	const size = array.length;
	const divider = Math.floor(count) % size;
	if (divider < 0) return array[size - divider];
	return array[divider];
}


/**
 * Slide through array with number
 * @param items array to slide
 * @example
 *    slide([1,2,3,4,5], 0) // 1
 *    slide([1,2,3,4,5], 1) // 2
 *    slide([1,2,3,4,5], 10) // 5
 *    slide([1,2,3,4,5], -1) // 5
 *    slide([1,2,3,4,5], -2) // 4
 *    slide([1,2,3,4,5], -2.34) // 4
 *    slide([1,2,3,4,5], -4.3) // 2
 * @signature
 *    P.slugify(str);
 * @example
 *    P.slugify("Super ball cup") // => super-ball-cup
 * @category Array
 */
export function slide<T>(items: readonly T[], count: number): T;
export function slide<T>(count: number): (items: readonly T[]) => T;

export function slide() {
  return purry(_slide, arguments);
}
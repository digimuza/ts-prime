import { purry } from './purry';

/**
 * Clamp the given value within the inclusive min and max bounds.
 * @param value - the number
 * @param limits - the bounds limits
 * @signature
 *    P.clamp(value, { min, max });
 * @signature
 *    P.clamp({ min, max })(value);
 * @example
 *    P.clamp(10, { min: 20 }) // => 20
 *    P.clamp(10, { max: 5 }) // => 5
 *    P.clamp(10, { max: 20, min: 5 }) // => 10
 *
 *    P.clamp({ min: 20 })(10) // => 20
 *    P.clamp({ max: 5 })(10) // => 5
 *    P.clamp({ max: 20, min: 5 })(10) // => 10
 * @category Number, Pipe
 */
export function clamp(
  value: number,
  limits: { min?: number; max?: number }
): number;
export function clamp(limits: {
  min?: number;
  max?: number;
}): (value: number) => number;

export function clamp() {
  return purry(_clamp, arguments);
}

function _clamp(value: number, limits: { min?: number; max?: number }) {
  if (limits.min != null) {
    if (limits.min > value) {
      return limits.min;
    }
  }
  if (limits.max != null) {
    if (limits.max < value) {
      return limits.max;
    }
  }
  return value;
}

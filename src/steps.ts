/**
 * Return number that is dividable by step size
 * @signature
 *  P.steps(value, step)
 * @example
 *  P.steps(145, 50) //=> 100
 *  P.steps(150) //=> 150
 *  P.steps(151) //=> 150
 *  P.steps(199) //=> 150
 *  P.steps(200) //=> 200
 * @param value - Current number value
 * @param step - Step size
 * @category Number
 */
export function steps(value: number, step: number) {
    return (value - value % step)
}
import { includesAny, includesEvery } from "./includes"
import { pipe } from "./pipe"


test('includesAny', () => {
    expect(includesAny([1,2,3,4,5,6], [1,2])).toEqual(true)
    expect(includesAny([1,2,3,4,5,6], [1,23])).toEqual(true)
    expect(includesAny([1,2,3,4,5,6], [7,23])).toEqual(false)
    expect(pipe(['A','B','C'], includesAny(['X','C','V']))).toEqual(true)
    expect(pipe(['A','B','C'], includesAny(['X','W','V']))).toEqual(false)
})


test('includesAny', () => {
    expect(includesEvery([1,2,3,4,5,6], [1,2])).toEqual(true)
    expect(includesEvery([1,2,3,4,5,6], [1,23])).toEqual(false)
    expect(includesEvery([1,2,3,4,5,6], [7,23])).toEqual(false)
    expect(pipe(['A','B','C'], includesEvery(['X','C','V']))).toEqual(false)
    expect(pipe(['A','B','C'], includesEvery(['A','C']))).toEqual(true)
    expect(pipe(['A','B','C'], includesEvery(['X','W','V']))).toEqual(false)
})
import { ensureType } from "./ensureType"
import { isString } from "./guards"
import { partition } from "./partition"
import { pipe } from "./pipe"


test("partition data first", () => {
    const arr = [1, 2, 3, 4, 5, 6, "1", "2"]
    const type = partition(arr, isString)
    ensureType<[readonly string[], readonly number[]]>(type)
    expect(type).toEqual([["1","2"], [1, 2, 3, 4, 5, 6]])
})



test("partition data last", () => {
    const arr = [1, 2, 3, 4, 5, 6, "1", "2"]
    const type =  pipe(arr, partition(isString))
    ensureType<[readonly string[], readonly number[]]>(type)
    expect(type).toEqual([["1","2"], [1, 2, 3, 4, 5, 6]])
})
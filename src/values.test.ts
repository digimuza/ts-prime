import { ensureType } from "./ensureType"
import { pipe } from "./pipe"
import { values } from "./values"



test("values tests", () => {
    const obj = {
        "a": 1,
        "b": 2
    } as const
    const result = values(obj)
    ensureType<readonly (1 | 2)[]>(result)
    expect(result).toEqual([1, 2])
})



test("values tests", () => {
    const obj = {
        "a": 1,
        "b": 2
    } as const
    const result = pipe(obj, values())
    ensureType<readonly (1 | 2)[]>(result)
    expect(result).toEqual([1, 2])
})
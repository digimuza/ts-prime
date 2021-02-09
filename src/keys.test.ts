import { ensureType } from "./ensureType"
import { keys } from "./keys"
import { pipe } from "./pipe"



test("values tests", () => {
    const obj = {
        "a": 1,
        "b": 2
    } as const
    const result = keys(obj)
    ensureType<readonly ("a" | "b")[]>(result)
    expect(result).toEqual(["a", "b"])
})

test("values tests", () => {
    const obj = {
        "a": 1,
        "b": 2
    } as const
    const result = pipe(obj, keys())
    ensureType<readonly ("a" | "b")[]>(result)
    expect(result).toEqual(["a", "b"])
})
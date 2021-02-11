import { ensureType } from "./ensureType"
import { PromiseValueOf } from "./types"


test("test PromiseValueOf typescript type", async () =>{
    const result = async () => {
        return "TEST" as const
    }
    const value = await result()

    type Check = PromiseValueOf<ReturnType<typeof result>>

    ensureType<Check>("TEST")
    expect(value).toEqual("TEST")
})
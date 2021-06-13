import { retry } from "./retry"
import { canFail } from './errors';


describe("retry tests", () => {
    test("failed assert sync calls", async () => {
        const cb = jest.fn()
        const wrap = retry(async () => {
            cb()
            throw new Error("mock error")
        }, (q) => {
            return q.count < 3
        })
        await canFail(() => wrap())
        expect(cb).toHaveBeenCalledTimes(3)
    })



    test("retry success", async () => {
        const cb = jest.fn()
        let count = 0
        const example = async (arg: string) => {
            cb()
            if (count < 3) {
                count++
                throw new Error("Sample")
            }
            return arg
        }

        const wrap = retry(example, (q) => {
            return q.count < 4
        })
        const result = await wrap("OK")

        expect(result).toEqual("OK")
        expect(cb).toHaveBeenCalledTimes(4)
    })

    // xtest("assert calls", async () => {
    //     const cb = jest.fn()
    //     await retry(async () => {
    //         cb()
    //         await delay(100)
    //         throw new Error("Error")
    //     }, (q) => q.count < 3)

    //     expect(cb).toHaveBeenCalledTimes(3)
    // })
})
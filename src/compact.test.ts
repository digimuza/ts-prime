import { compact } from "./compact"
test("Compact test", () => {
    expect(
        compact({
            a: undefined,
            b: null
        })
    ).toEqual({})
})


test("Compact test", () => {
    expect(
        compact({
            a: undefined,
            b: [undefined],
            x: {
                zx: [{
                    a: undefined
                }]
            }
        })
    ).toEqual({ "b": [], "x": { "zx": [{}] } })
})
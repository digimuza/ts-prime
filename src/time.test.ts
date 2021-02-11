import { prettyMs, prettyTimeDiff } from "./time"

const NOW = 1487076708000
Date.now = jest.fn(() => NOW) //14.02.2017

test("Date format", () => {
    expect(prettyTimeDiff(NOW + 60 * 1000)).toEqual("after one minute")
    expect(prettyTimeDiff(NOW + 160 * 1000)).toEqual("after 2 minutes")
    expect(prettyTimeDiff(NOW - 160 * 1000)).toEqual("2 minutes ago")
    expect(prettyTimeDiff(NOW - 10 * 1000)).toEqual("just now")
})


test("Date format", () => {
    expect(prettyMs(36045)).toEqual("36s")
    expect(prettyMs(3600 * 1000)).toEqual("1h")
    expect(prettyMs(3600 * 45 * 1000)).toEqual("1d 21h")
})
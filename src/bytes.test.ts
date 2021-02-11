import { formatBytes } from "./bytes"


test('bytes formatting', () => {
    expect(formatBytes(100)).toEqual("100Bytes")
    expect(formatBytes(1045)).toEqual("1.02KB")
    expect(formatBytes(12450)).toEqual("12.16KB")
    expect(formatBytes(124750)).toEqual("121.83KB")
    expect(formatBytes(1245750)).toEqual("1.19MB")
    expect(formatBytes(12457150)).toEqual("11.88MB")
    expect(formatBytes(212457150)).toEqual("202.61MB")
    expect(formatBytes(2112457150)).toEqual("1.97GB")
    expect(formatBytes(21124571500)).toEqual("19.67GB")
    expect(formatBytes(321124571500)).toEqual("299.07GB")
    expect(formatBytes(3221124571500)).toEqual("2.93TB")
    expect(formatBytes(32821124571500)).toEqual("29.85TB")
    expect(formatBytes(328211824571500)).toEqual("298.51TB")
    expect(formatBytes(3282118245791500)).toEqual("2.92PB")
    expect(formatBytes(32821182457915020)).toEqual("29.15PB")
    expect(formatBytes(328211824579115020)).toEqual("291.51PB")
    expect(formatBytes(3282118245791150420)).toEqual("2.85EB")
    expect(formatBytes(32825118245791150420)).toEqual("28.47EB")
    expect(formatBytes(328251182457911508420)).toEqual("284.71EB")
    expect(formatBytes(3282511852457911508420)).toEqual("2.78ZB")
    // Really will some one have 20ZB? Entire internet is less than 1ZB :D
})
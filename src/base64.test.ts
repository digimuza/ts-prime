import { base64decode, base64encode } from "./base64"

test('slugify', () => {
    expect(base64encode('file:///SearchNode/utils-fp/coverage/lcov-report/strings.ts.html')).toEqual(
        'ZmlsZTovLy9TZWFyY2hOb2RlL3V0aWxzLWZwL2NvdmVyYWdlL2xjb3YtcmVwb3J0L3N0cmluZ3MudHMuaHRtbA=='
    )

    expect(
        base64decode('ZmlsZTovLy9TZWFyY2hOb2RlL3V0aWxzLWZwL2NvdmVyYWdlL2xjb3YtcmVwb3J0L3N0cmluZ3MudHMuaHRtbA==')
    ).toEqual('file:///SearchNode/utils-fp/coverage/lcov-report/strings.ts.html')

    expect(base64encode('@ČĄęąčęąčę')).toEqual('QMSMxITEmcSFxI3EmcSFxI3EmQ==')

    expect(base64decode('QMSMxITEmcSFxI3EmcSFxI3EmQ==')).toEqual('@ČĄęąčęąčę')
})

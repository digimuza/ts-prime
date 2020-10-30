import { base64decode, base64encode } from "./base64"

test('slugify', () => {
    expect(base64encode('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nibh lacus, facilisis a semper vel, condimentum id massa. Vivamus pretium tempor nisi eget facilisis. Praesent faucibus eleifend risus, a facilisis mauris fermentum non. In pulvinar mauris purus, nec molestie nisi venenatis nec. Duis blandit iaculis posuere. Vivamus sit amet augue a ex pulvinar maximus non nec purus.')).toEqual(
        'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gTnVsbGEgbmliaCBsYWN1cywgZmFjaWxpc2lzIGEgc2VtcGVyIHZlbCwgY29uZGltZW50dW0gaWQgbWFzc2EuIFZpdmFtdXMgcHJldGl1bSB0ZW1wb3IgbmlzaSBlZ2V0IGZhY2lsaXNpcy4gUHJhZXNlbnQgZmF1Y2lidXMgZWxlaWZlbmQgcmlzdXMsIGEgZmFjaWxpc2lzIG1hdXJpcyBmZXJtZW50dW0gbm9uLiBJbiBwdWx2aW5hciBtYXVyaXMgcHVydXMsIG5lYyBtb2xlc3RpZSBuaXNpIHZlbmVuYXRpcyBuZWMuIER1aXMgYmxhbmRpdCBpYWN1bGlzIHBvc3VlcmUuIFZpdmFtdXMgc2l0IGFtZXQgYXVndWUgYSBleCBwdWx2aW5hciBtYXhpbXVzIG5vbiBuZWMgcHVydXMu'
    )

    expect(
        base64decode('TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gTnVsbGEgbmliaCBsYWN1cywgZmFjaWxpc2lzIGEgc2VtcGVyIHZlbCwgY29uZGltZW50dW0gaWQgbWFzc2EuIFZpdmFtdXMgcHJldGl1bSB0ZW1wb3IgbmlzaSBlZ2V0IGZhY2lsaXNpcy4gUHJhZXNlbnQgZmF1Y2lidXMgZWxlaWZlbmQgcmlzdXMsIGEgZmFjaWxpc2lzIG1hdXJpcyBmZXJtZW50dW0gbm9uLiBJbiBwdWx2aW5hciBtYXVyaXMgcHVydXMsIG5lYyBtb2xlc3RpZSBuaXNpIHZlbmVuYXRpcyBuZWMuIER1aXMgYmxhbmRpdCBpYWN1bGlzIHBvc3VlcmUuIFZpdmFtdXMgc2l0IGFtZXQgYXVndWUgYSBleCBwdWx2aW5hciBtYXhpbXVzIG5vbiBuZWMgcHVydXMu')
    ).toEqual('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nibh lacus, facilisis a semper vel, condimentum id massa. Vivamus pretium tempor nisi eget facilisis. Praesent faucibus eleifend risus, a facilisis mauris fermentum non. In pulvinar mauris purus, nec molestie nisi venenatis nec. Duis blandit iaculis posuere. Vivamus sit amet augue a ex pulvinar maximus non nec purus.')

    expect(base64encode('@ČĄęąčęąčę')).toEqual('QMSMxITEmcSFxI3EmcSFxI3EmQ==')
    expect(base64decode('QMSMxITEmcSFxI3EmcSFxI3EmQ==')).toEqual('@ČĄęąčęąčę')
})

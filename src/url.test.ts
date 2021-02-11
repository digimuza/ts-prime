import { urlJoin, urlToRelative } from './url'
describe('url join', function () {
    it('should work for simple case', function () {
        expect(urlJoin('http://www.google.com/', 'foo/bar', '?test=123')).toEqual('http://www.google.com/foo/bar?test=123')
    });

    it('should work for hashbang urls', function () {
        expect(urlJoin('http://www.google.com', '#!', 'foo/bar', '?test=123')).toEqual('http://www.google.com/#!/foo/bar?test=123')
    });

    it('should be able to join protocol', function () {
        expect(urlJoin('http:', 'www.google.com/', 'foo/bar', '?test=123')).toEqual('http://www.google.com/foo/bar?test=123')
    });

    it('should be able to join protocol with slashes', function () {
        expect(urlJoin('http://', 'www.google.com/', 'foo/bar', '?test=123')).toEqual('http://www.google.com/foo/bar?test=123')
    });

    it('should remove extra slashes', function () {
        expect(urlJoin('http:', 'www.google.com///', 'foo/bar', '?test=123')).toEqual('http://www.google.com/foo/bar?test=123')
    });

    it('should not remove extra slashes in an encoded URL', function () {
        expect(urlJoin('http:', 'www.google.com///', 'foo/bar', '?url=http%3A//Ftest.com')).toEqual('http://www.google.com/foo/bar?url=http%3A//Ftest.com')
    });

    it('should support anchors in urls', function () {
        expect(urlJoin('http:', 'www.google.com///', 'foo/bar', '?test=123', '#faaaaa')).toEqual('http://www.google.com/foo/bar?test=123#faaaaa')
    });

    it('should support protocol-relative urls', function () {
        expect(urlJoin('//www.google.com', 'foo/bar', '?test=123')).toEqual('//www.google.com/foo/bar?test=123')
    });

    it('should support file protocol urls', function () {
        expect(urlJoin('file:/', 'android_asset', 'foo/bar')).toEqual("file://android_asset/foo/bar")
        expect(urlJoin('file:', '/android_asset', 'foo/bar')).toEqual('file://android_asset/foo/bar')
    });

    it('should support absolute file protocol urls', function () {
        expect(urlJoin('file:', '///android_asset', 'foo/bar')).toEqual('file:///android_asset/foo/bar')
        expect(urlJoin('file:///', 'android_asset', 'foo/bar')).toEqual('file:///android_asset/foo/bar')

        expect(urlJoin('file:///', '//android_asset', 'foo/bar')).toEqual('file:///android_asset/foo/bar')
        expect(urlJoin('file:///android_asset', 'foo/bar')).toEqual('file:///android_asset/foo/bar')
    });

    it('should merge multiple query params properly', function () {
        expect(urlJoin('http:', 'www.google.com///', 'foo/bar', '?test=123', '?key=456')).toEqual('http://www.google.com/foo/bar?test=123&key=456');

        expect(urlJoin('http:', 'www.google.com///', 'foo/bar', '?test=123', '?boom=value', '&key=456')).toEqual('http://www.google.com/foo/bar?test=123&boom=value&key=456')

        expect(urlJoin('http://example.org/x', '?a=1', '?b=2', '?c=3', '?d=4')).toEqual('http://example.org/x?a=1&b=2&c=3&d=4')
    });

    it('should merge slashes in paths correctly', function () {
        expect(urlJoin('http://example.org', 'a//', 'b//', 'A//', 'B//')).toEqual('http://example.org/a/b/A/B/')
    });

    it('should merge colons in paths correctly', function () {
        expect(urlJoin('http://example.org/', ':foo:', 'bar')).toEqual('http://example.org/:foo:/bar');
    });

    it('should merge just a simple path without URL correctly', function () {
        expect(urlJoin('/', 'test'))
            .toEqual('/test')
    });

    it('should merge a path with colon properly', function () {
        expect(urlJoin('/users/:userId', '/cars/:carId'))
            .toEqual('/users/:userId/cars/:carId')
    });

    it('should merge slashes in protocol correctly', function () {
        expect(urlJoin('http://example.org', 'a'))
            .toEqual('http://example.org/a')
        expect(urlJoin('http:', '//example.org', 'a'))
            .toEqual('http://example.org/a')
        expect(urlJoin('http:///example.org', 'a'))
            .toEqual('http://example.org/a')
        expect(urlJoin('file:///example.org', 'a'))
            .toEqual('file:///example.org/a')

        expect(urlJoin('file:example.org', 'a'))
            .toEqual('file://example.org/a')

        expect(urlJoin('file:/', 'example.org', 'a'))
            .toEqual('file://example.org/a')
        expect(urlJoin('file:', '/example.org', 'a'))
            .toEqual('file://example.org/a')
        expect(urlJoin('file:', '//example.org', 'a'))
            .toEqual('file://example.org/a')
    });

    it('should skip empty strings', function () {
        expect(urlJoin('http://foobar.com', '', 'test'))
            .toEqual('http://foobar.com/test')
        expect(urlJoin('', 'http://foobar.com', '', 'test'))
            .toEqual('http://foobar.com/test')
    });

    it('should return an empty string if no arguments are supplied', function () {
        expect(urlJoin()).toEqual('')
    });
});


describe("convert url to relative", () => {
    test("expect relative url", () => {
        expect(urlToRelative("https://www.npmjs.com/package/qs")).toEqual("/package/qs")
    })
})
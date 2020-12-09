/**
 * @documentation true
 * @sectionName Base64
 */

/* tslint:disable */
const keyStr =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

/**
 * Encode string with base64 encoding.
 * @signature
 *    P.base64encode(str)
 * @example
 *    P.base64encode("ts-prime is awesome") //=> dHMtcHJpbWUgaXMgYXdlc29tZQ==
 * @category Utility
 */
export function base64encode(input: string): string {
  let output = '';
  let i = 0;
  input = encodeUTF8(input);
  while (i < input.length) {
    const chr1 = input.charCodeAt(i++);
    const chr2 = input.charCodeAt(i++);
    const chr3 = input.charCodeAt(i++);
    const enc1 = chr1 >> 2;
    const enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    let enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    let enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output =
      output +
      keyStr.charAt(enc1) +
      keyStr.charAt(enc2) +
      keyStr.charAt(enc3) +
      keyStr.charAt(enc4);
  }
  return output;
}

/**
 * Decode base64 encoded string.
 * @signature
 *    P.base64decode(str)
 * @example
 *    P.base64decode("dHMtcHJpbWUgaXMgYXdlc29tZQ==") //=> ts-prime is awesome
 * @category Utility
 */
export function base64decode(input: string): string {
  let output = '';
  let i = 0;

  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

  while (i < input.length) {
    const enc1 = keyStr.indexOf(input.charAt(i++));
    const enc2 = keyStr.indexOf(input.charAt(i++));
    const enc3 = keyStr.indexOf(input.charAt(i++));
    const enc4 = keyStr.indexOf(input.charAt(i++));

    const chr1 = (enc1 << 2) | (enc2 >> 4);
    const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    const chr3 = ((enc3 & 3) << 6) | enc4;

    output = output + String.fromCharCode(chr1);

    if (enc3 !== 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output = output + String.fromCharCode(chr3);
    }
  }

  output = decodeUTF8(output);

  return output;
}

/**
 * Encode UTF8 characters
 * @category Utility
 */
export function encodeUTF8(input: string): string {
  input = input.replace(/\r\n/g, '\n');
  let utftext = '';

  for (let n = 0; n < input.length; n++) {
    const c = input.charCodeAt(n);

    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }
  }

  return utftext;
}

/**
 * Decode UTF8 encoded characters
 * @category Utility
 */
export function decodeUTF8(utftext: string): string {
  let str = '';
  let i = 0;
  let c1 = 0;
  let c2 = 0;
  let c3 = 0;
  while (i < utftext.length) {
    c1 = utftext.charCodeAt(i);

    if (c1 < 128) {
      str += String.fromCharCode(c1);
      i++;
    } else if (c1 > 191 && c1 < 224) {
      c2 = utftext.charCodeAt(i + 1);
      str += String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      c2 = utftext.charCodeAt(i + 1);
      c3 = utftext.charCodeAt(i + 2);
      str += String.fromCharCode(
        ((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63)
      );
      i += 3;
    }
  }
  return str;
}

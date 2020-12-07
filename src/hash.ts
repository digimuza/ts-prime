import { base64encode } from './base64';

/**
 * Non cryptographic quality hashing function
 * @param data - Hash content
 * @example 
 * P.hash("THIS IS AWESOME") //=> LTU1MjU4ODc4NQ
 * @category Utils
 */
export function hash(data: string | undefined): string {
  // tslint:disable
  return base64encode(
    (data || '')
      .split('')
      .reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0)
      .toString()
  ).replace(/=/gm, '');
}

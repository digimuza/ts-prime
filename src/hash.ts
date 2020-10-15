import { base64encode } from "./base64"

/**
 * Primitive hashing function
 * Do not recommend using for big objects
 */
export function hash(s: string | undefined): string {
    // tslint:disable
    return base64encode((s || '').split('').reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
    }, 0).toString()).replace(/=/gm, '')
}

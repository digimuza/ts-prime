/**
 * Capitalize first letter of word
 * @param str - Any string
 * @signature
 *  P.capitalize(str)
 * @example
 *  P.capitalize("tom") //=> Tom 
 * @category String
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

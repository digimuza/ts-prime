/**
 * Ensures typescript type
 * @param data - data object
 * @example
 *    const data = myFunction()
 *    P.ensureType<number>(data) // If data is not number typescript compiler will complain
 * @category Utility
 */
export function ensureType<T>(data: T): T {
  return data;
}

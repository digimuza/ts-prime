/**
 * Creates delay
 * @param ms - Time in milliseconds
 * @signature
 *    P.delay(ms)
 * @example
 *    await P.delay(1000)
 * @category Function
 */
export async function delay(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

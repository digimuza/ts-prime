/**
 * Creates delay
 * @param ms - Time in milliseconds
 */
export async function delay(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

import { delay } from './delay';

/**
 * Function repeats provided call until it returns not null or undefined value.
 * If this process exceeds `maxDurationMs` function will throw
 * of those function calls.
 *
 * @param fn - The function to invoke.
 * @param maxDurationMs - Max waiting duration
 * @example
 * const result = await waitUntilDefined(() => document.body.getElementById("#app")) 
 * @category Utility
 * @throws If if fn does not return not nil value in given time frame
 */
export async function waitUntilDefined<T>(
  fn: () => T | undefined,
  maxDurationMs: number
): Promise<NonNullable<T>> {
  const start = Date.now();
  return new Promise<NonNullable<T>>(async resolve => {
    while (true) {
      const diff = Date.now() - start;
      if (diff > maxDurationMs) {
        throw new Error(`Timeout after ${maxDurationMs}`);
      }
      const v = fn();
      if (v == null) {
        await delay(1);
        continue;
      }
      resolve(v as NonNullable<T>);
      return;
    }
  });
}

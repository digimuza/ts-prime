import { isError } from './index';

export class UnknownError extends Error {
  readonly name = 'UnknownError';
  constructor(public data: unknown) {
    super(JSON.stringify(data));
  }
}

/**
 * Assertion statement
 * @throws Throws if data is instance of error
 * @export
 *  const request = () =>  P.canFail(()=> axios.get(url))
 *  const result = await request.then(P.assertError)
 * @category Utility
 */
export function assertError<T>(data: T | Error): T {
  if (isError(data)) {
    throw data;
  }
  return data as T;
}

/**
 * Ensures that err is Error instance
 * @signature
 *    P.ensureError(any)
 * @example
 *    const request = doRequest().catch(P.ensureError)
 *    if (P.isError(request)) return
 * @category Utility
 */
export function ensureError(err: unknown): Error {
  if (isError(err)) {
    return err;
  }

  return new UnknownError(err);
}

export type CanGetError<T> = Error | T;
/**
 * Similar to try catch statement. If function throws insisted callback this function will return `Error` instance
 * @example
 *    const err = P.canFail(()=> JSON.parse(data))
 *    if (P.isError(err)) {
 *        console.log(err)
 *    }
 *
 *
 *    const request = await canFail(() => axios.get(url))
 *    if (P.isError(request)) return
 * @category Utility
 */
export function canFail<T>(fn: () => Promise<T>): Promise<CanGetError<T>>;
export function canFail<T>(fn: () => T): CanGetError<T>;
// tslint:disable-next-line: promise-function-async
export function canFail<T>(
  fn: (() => T) | (() => Promise<T>)
): CanGetError<T> | Promise<CanGetError<T>> {
  try {
    const r = fn();
    if (r instanceof Promise) {
      return r.catch(err => {
        if (isError(err)) {
          return err;
        }
        return new UnknownError(err);
      });
    }
    return r;
  } catch (err) {
    if (isError(err)) {
      return err;
    }
    return new UnknownError(err);
  }
}

import { cache } from './cache';
import { delay } from './delay';

test('cache: Mock function should be called twice', () => {
  const mock = jest.fn((args: number) => {
    return args;
  });

  const fibonacci = cache(mock);
  fibonacci(5);
  fibonacci(5);
  fibonacci(5);
  fibonacci(6);
  fibonacci(6);
  fibonacci(6);
  expect(mock).toHaveBeenCalledTimes(2);
});

test('cache: Mock function check cache mechanism', () => {
  const mock = (args: number) => {
    return args;
  };
  const m = new Map<string, number>();
  const fibonacci = cache(mock, {
    cacheKeyFn: q => q.toString(),
    cacheMechanism: {
      get: (key: string) => {
        return m.get(key);
      },
      set: (key, value) => {
        m.set(key, value);
      },
    },
  });

  fibonacci(5);
  expect(m.get('5')).toEqual(5);
});

test('cache: Mock function check cache mechanism', async () => {
  const fn = jest.fn();
  const mock = async (args: number) => {
    await delay(5);
    fn();
    return args;
  };
  const fibonacci = cache(mock);

  await fibonacci(5);
  expect(fn).toHaveBeenCalledTimes(1);
});

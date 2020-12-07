import { ensureType } from './ensureType';
import { fromPairs, toPairs } from './toPairs';

test('should return pairs', () => {
  const start = { a: 1, b: 2, c: 3 };
  const actual = toPairs({ a: 1, b: 2, c: 3 });
  ensureType<ReadonlyArray<['a' | 'b' | 'c', number]>>(actual);
  expect(fromPairs(actual)).toEqual(start);
  ensureType<Record<'a' | 'b' | 'c', number>>(fromPairs(actual));
  expect(actual).toEqual([
    ['a', 1],
    ['b', 2],
    ['c', 3],
  ]);
});

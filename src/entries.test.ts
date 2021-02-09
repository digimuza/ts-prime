import { ensureType } from './ensureType';
import { fromEntries, entries } from './entries';
import { pipe } from './pipe';

test('should return pairs', () => {
  const start = { a: 1, b: 2, c: 3 };
  const actual = entries({ a: 1, b: 2, c: 3 });
  ensureType<ReadonlyArray<['a' | 'b' | 'c', number]>>(actual);
  expect(fromEntries(actual)).toEqual(start);
  ensureType<Record<'a' | 'b' | 'c', number>>(fromEntries(actual));
  expect(actual).toEqual([
    ['a', 1],
    ['b', 2],
    ['c', 3],
  ]);
});



test('should return pairs', () => {
  const start = { a: 1, b: 2, c: 3 };
  const actual = entries({ a: 1, b: 2, c: 3 });
  const result = pipe(start, entries(), fromEntries())
  ensureType<{ a: number, b: number, c: number }>(result)
  ensureType<ReadonlyArray<['a' | 'b' | 'c', number]>>(actual);
  expect(fromEntries(actual)).toEqual(start);
  ensureType<Record<'a' | 'b' | 'c', number>>(fromEntries(actual));
  expect(actual).toEqual([
    ['a', 1],
    ['b', 2],
    ['c', 3],
  ]);
});

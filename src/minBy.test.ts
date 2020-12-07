import { maxBy, minBy } from './minBy';

test('minBy', () => {
  expect(minBy([{ a: 1 }, { a: 2 }], q => q.a)).toEqual([{ a: 1 }]);
});

test('maxBy', () => {
  expect(maxBy([{ a: 1 }, { a: 2 }], q => q.a)).toEqual([{ a: 2 }]);
});

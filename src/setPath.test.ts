import { setPath } from './setPath';

test('setPath', () => {
  expect(setPath({}, 'a.b.c.d'.split('.'), 58)).toEqual({
    a: { b: { c: { d: 58 } } },
  });
  expect(setPath({ a: { x: 4 } }, 'a.b.c.d'.split('.'), 58)).toEqual({
    a: { x: 4, b: { c: { d: 58 } } },
  });
  const data = { data: 4, a: [1, 2, 3, 4, 5] };
  expect(setPath(data, 'a.5'.split('.'), 58)).toEqual({
    a: [1, 2, 3, 4, 5, 58],
    data: 4,
  });
  expect(data).toEqual({ data: 4, a: [1, 2, 3, 4, 5] });

  expect(setPath([], '0.a.b'.split('.'), 58)).toEqual([{ a: { b: 58 } }]);
});

test('setPath set existing value', () => {
  expect(
    setPath({ a: { b: { c: { d: 58 } } } }, 'a.b.c.d'.split('.'), 22)
  ).toEqual({ a: { b: { c: { d: 22 } } } });
});

test('setPath overwrite entire path', () => {
  expect(
    setPath({ a: { b: { c: { d: 58 } } } }, 'a.b'.split('.'), 22)
  ).toEqual({ a: { b: 22 } });
});

test('setPath overwrite entire path', () => {
  expect(
    setPath({ a: { b: { c: { d: 58 } } } }, 'a.b'.split('.'), [1, 2, 3, 4, 5])
  ).toEqual({ a: { b: [1, 2, 3, 4, 5] } });
});

import { toDate, toFloat, toInt } from './parse';

test('should parse float', () => {
  expect(toFloat('5.5')).toBe(5.5);
  expect(toFloat('zcx5.5')).toBe(undefined);
  expect(toFloat('zcx5.5', 0)).toBe(0);
});

test('should parse int', () => {
  expect(toInt('5.5')).toBe(5);
  expect(toFloat('zcx5.5')).toBe(undefined);
  expect(toFloat('zcx5.5', 0)).toBe(0);
});

test('should parse date', () => {
  expect(toDate('asd')).toBe(undefined);
  expect(toDate('2015-03-25')?.toISOString()).toBe(
    new Date('2015-03-25').toISOString()
  );
});

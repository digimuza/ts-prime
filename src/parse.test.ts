import { toDate, toFloat, toInt } from './parse';

test('should parse float', () => {
  expect(toFloat('5.5')).toBe(5.5);
  expect(toFloat('zcx5.5')).toBe(undefined);
  expect(toFloat('zcx5.5', 0)).toBe(0);
  expect(toFloat(22, 0)).toBe(22);
  expect(toFloat(undefined, 0)).toBe(0);
  expect(toFloat(undefined)).toBe(undefined);
});

test('should parse int', () => {
  expect(toInt('5.5')).toBe(5);
  expect(toInt('zcx5.5')).toBe(undefined);
  expect(toInt('zcx5.5', 0)).toBe(0);
  expect(toInt(22.2, 0)).toBe(22);
  expect(toInt(undefined, 0)).toBe(0);
  expect(toInt(undefined, 12.3)).toBe(12);
  expect(toInt(undefined)).toBe(undefined);
});

test('should parse date', () => {
  expect(toDate('asd')).toBe(undefined);
  expect(toDate('2015-03-25')?.toISOString()).toBe(
    new Date('2015-03-25').toISOString()
  );
});

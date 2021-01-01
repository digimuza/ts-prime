import { ensureType } from './ensureType';
import { isOneOf } from './isOneOf';

test('should return last', () => {
  expect(isOneOf('value', ['value', 'asdas'])).toEqual(true);
});

test('should return last', () => {
  expect(isOneOf('xz', ['value', 'asdas'])).toEqual(false);
});

test('should return last', () => {
  const value: string = 'value';
  const keys = ['value', 'key'] as const;
  if (isOneOf(value, keys)) {
    ensureType<typeof keys[number]>(value);
  }

  if (isOneOf(keys)(value)) {
    ensureType<typeof keys[number]>(value);
  }

  expect(isOneOf(keys)(value)).toEqual(true);
});

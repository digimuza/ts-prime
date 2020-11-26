import { isOneOf } from './isOneOf';

test('should return last', () => {
  expect(isOneOf('value', ['value', 'asdas'])).toEqual(true);
});


test('should return last', () => {
  expect(isOneOf('xz', ['value', 'asdas'])).toEqual(false);
});
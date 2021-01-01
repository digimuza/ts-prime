import { ensureArray } from './ensureArray';

test('ensureArray: tests', () => {
  expect(ensureArray('1')).toEqual(['1']);
  expect(ensureArray(['1'])).toEqual(['1']);
});

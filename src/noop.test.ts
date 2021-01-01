import { noop } from './noop';

test('noop', () => {
  expect(noop()).toEqual(undefined);
});

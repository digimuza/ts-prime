import { steps } from './steps';

test('increment value with steps', () => {
  expect(steps(546, 50)).toEqual(500);
  expect(steps(551, 50)).toEqual(550);
  expect(steps(0, 50)).toEqual(0);
  expect(steps(21, 50)).toEqual(0);
  expect(steps(51, 50)).toEqual(50);
});

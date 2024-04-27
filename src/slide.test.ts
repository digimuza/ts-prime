import { slide } from "./slide";

test('slugify', () => {
  expect(slide([1,2,3], 12)).toEqual(1);
  expect(slide([1,2,3], 11)).toEqual(3);
  expect(slide([1,2,3], 10)).toEqual(2);
  expect(slide([1,2,3], 9)).toEqual(1);
  expect(slide([1,2,3], 8)).toEqual(3);


  expect(slide([1,2,3], 1.23)).toEqual(2);
  expect(slide([1,2,3], 0.23)).toEqual(1);
  expect(slide([1,2,3], 0.73)).toEqual(1);
  expect(slide([1,2,3], 0.99)).toEqual(1);
  expect(slide([1,2,3], 1.01)).toEqual(2);
});

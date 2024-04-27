import { randomItemInArray } from './randomItem';

describe('Random item test', () => {
  test('Random item', () => {
    expect(randomItemInArray([1, 2, 3, 4, 5], () => 0.1)).toEqual(1);
    expect(randomItemInArray([1, 2, 3, 4, 5], () => 0.5123)).toEqual(3);
    expect(randomItemInArray([1, 2, 3, 4, 5], () => 0.9123)).toEqual(5);
    expect(randomItemInArray([1, 2, 3, 4, 5], () => 0.7642653)).toEqual(4);
    return;
  });
});

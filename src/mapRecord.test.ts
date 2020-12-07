import { mapRecord } from './mapRecord';

describe('data first', () => {
  test('should merge', () => {
    expect(mapRecord({ a: 1, b: 2, c: 3 }, ([k, v]) => [k, v * 2])).toEqual({
      a: 2,
      b: 4,
      c: 6,
    });
  });
});

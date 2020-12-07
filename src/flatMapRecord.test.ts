import { flatMapRecord } from './flatMapRecord';
import { pipe } from './pipe';

describe('data first', () => {
  test('should flatMap', () => {
    expect(
      flatMapRecord({ a: 1, b: 2, c: 3 }, ([k, v]) => [
        [k, v * 2],
        [k.toUpperCase(), v * 3],
      ])
    ).toEqual({ A: 3, B: 6, C: 9, a: 2, b: 4, c: 6 });
  });

  test('should flatMap with pipe', () => {
    expect(
      pipe(
        { a: 1, b: 2, c: 3 },
        flatMapRecord(([k, v]) => [
          [k, v * 2],
          [k.toUpperCase(), v * 3],
        ])
      )
    ).toEqual({ A: 3, B: 6, C: 9, a: 2, b: 4, c: 6 });
  });
});

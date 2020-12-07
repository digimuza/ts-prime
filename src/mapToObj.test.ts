import { ensureType } from './ensureType';
import { mapToObj } from './mapToObj';
import { pipe } from './pipe';

describe('data_first', () => {
  it('mapToObj', () => {
    const result = mapToObj([1, 2, 3] as const, x => [String(x), x * 2]);
    ensureType<Record<string, number>>(result);
    const result2 = mapToObj([1, 2, 3] as const, x => [
      String(x),
      (x * 2).toString(),
    ]);
    ensureType<Record<string, string>>(result2);
    expect(result).toEqual({ 1: 2, 2: 4, 3: 6 });
  });
});

describe('data_last', () => {
  it('mapToObj', () => {
    const result = pipe(
      [1, 2, 3] as const,
      mapToObj(x => [String(x), x * 2])
    );
    expect(result).toEqual({ 1: 2, 2: 4, 3: 6 });
  });
});

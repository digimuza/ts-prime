import { flatMapToObj } from './flatMapToObj';
import { pipe } from './pipe';

describe('data_first', () => {
  it('flatMapToObj', () => {
    const result = flatMapToObj([1, 2, 3] as const, x =>
      x % 2 === 1 ? [[String(x), x]] : []
    );
    expect(result).toEqual({ 1: 1, 3: 3 });
  });
});

describe('data_last', () => {
  it('flatMapToObj', () => {
    const result = pipe(
      [1, 2, 3] as const,
      flatMapToObj(x => (x % 2 === 1 ? [[String(x), x]] : []))
    );
    expect(result).toEqual({ 1: 1, 3: 3 });
  });
});
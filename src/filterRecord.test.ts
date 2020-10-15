import { filterRecord } from './filterRecord';
import { pipe } from './pipe';

describe('data first', () => {
    test('should filter', () => {
        expect(filterRecord({ a: 1, b: 2, c: 3 }, ([k, v]) => k !== 'a')).toEqual({ "b": 2, "c": 3 });
    });

    test('should filter with pipe', () => {
        expect(pipe({ a: 1, b: 2, c: 3 }, filterRecord(([k, v]) => k !== 'a'))).toEqual({ "b": 2, "c": 3 });
    });
});

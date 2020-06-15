import { deepUniq } from './deepUniq';

describe('data_first', () => {
    test('should return difference', () => {
        expect(deepUniq([{ a: { b: [1, 2] } }, { a: { b: [1, 2] } }], 'hard')).toEqual([{ a: { b: [1, 2] } }]);
    });
});

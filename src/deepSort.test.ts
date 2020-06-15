import { deepSort } from './deepSort';

describe('deep sort', () => {
    test('should return difference', () => {
        expect(JSON.stringify(deepSort({
            a: [9, 7, 8, 44, { "=": 5, a: 1, q: [7, 1], d: ['q', 'c'] }]
        }))).toEqual(JSON.stringify({ "a": [44, 7, 8, 9, { "=": 5, "a": 1, "d": ["c", "q"], "q": [1, 7], }] }));
    });
});

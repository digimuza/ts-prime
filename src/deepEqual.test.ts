import { deepEqual } from "./deepEqual";

describe('deepEqual tests', () => {
    test("Simple equality", () => {
        const obj1 = {
            a: 1
        }
        expect(deepEqual(obj1, { a: 1 })).toEqual(true)
    })
});

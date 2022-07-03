import { flattenObject, unFlattenObject } from './flattenObject';

describe('Object flattening', () => {
  test('Big', () => {
    const obj = {
      value: {
        foo: {
          bar: 'yes',
          so: {
            freakin: {
              nested: 'Wow',
            },
          },
        },
      },
      // Some edge cases to test
      test: [true, false, [null, undefined, 1]],
      not_lost: [], // Empty arrays should be preserved
      not_lost2: {}, // Empty objects should be preserved
    };
    const result = flattenObject(obj);
    expect(result).toEqual({
      not_lost: [],
      not_lost2: {},
      'test.0': true,
      'test.1': false,
      'test.2.0': null,
      'test.2.1': undefined,
      'test.2.2': 1,
      'value.foo.bar': 'yes',
      'value.foo.so.freakin.nested': 'Wow',
    });
    expect(unFlattenObject(result)).toEqual(obj);
  });
});

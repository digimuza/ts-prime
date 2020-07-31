import { path } from './path';
import { pipe } from './pipe';


const testData = {
  t1: {
    obj: {
      a: {
        b: {
          c: {
            d: {
              a: [0]
            }
          }
        }
      }
    },
    path: "a.b.c.d.a.0".split("."),
    expect: 0
  }
}

describe('data first', () => {
  test('1 level', () => {
    expect(path(testData.t1.obj, testData.t1.path)).toEqual(testData.t1.expect);
  });
});

describe('data last', () => {
  test('1 level', () => {
    expect(pipe(testData.t1.obj, path(testData.t1.path))).toEqual(testData.t1.expect);
  });
});
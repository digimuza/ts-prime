import { pipe } from './pipe'
import { stats } from './stats'
test('calculate stats', () => {
  expect(
    stats([1, 2, 3, 4, 5], (q) => q)
  ).toEqual({"arithmetic_mean": 3, "geometric_mean": 24, "max": 5, "median": 3, "middle": 3, "min": 1, "quadratic_mean": 7.416198487095663, "sum": 15})

  expect(
    pipe([0, 0, 1, 2, 3, 4, 5], stats((q) => q))
  ).toEqual({"arithmetic_mean": 2.142857142857143, "geometric_mean": 17.142857142857142, "max": 5, "median": 2, "middle": 2.5, "min": 0, "quadratic_mean": 7.416198487095663, "sum": 15})
})


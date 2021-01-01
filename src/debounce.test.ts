import { debounce } from './debounce';
test('debounce', () => {
  const mock = jest.fn();
  const s = debounce(mock, 10);
  for (let i = 0; i < 100; i++) {
    s();
  }

  expect(mock).toHaveBeenCalledTimes(1);
});

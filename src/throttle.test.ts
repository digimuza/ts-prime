import { throttle } from './throttle';
import { delay } from './delay';

describe('throttle test', async () => {
  it('1 sec', async () => {
    const mock = jest.fn((r: number) => r);
    const exec = throttle(mock, 10);
    for (let i = 0; i < 10; i++) {
      const r = exec(5);
      expect(r).toEqual(5);
      await delay(100);
    }
    expect(mock).toHaveBeenCalledTimes(10);
  });
});

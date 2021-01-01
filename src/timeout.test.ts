import { delay } from './delay';
import { canFail } from './errors';
import { timeout } from './timeout';

test('timeout function', async () => {
  const w = timeout(async () => {
    await delay(1000);
  }, 500);
  const tim = await canFail(() => {
    return w();
  });

  expect(tim).toEqual(new Error('timeout after 500ms'));
});

test('timeout function', async () => {
  const w = timeout(async (data: number) => {
    await delay(200);
    return data;
  }, 500);
  const tim = await canFail(() => {
    return w(10);
  });

  expect(tim).toEqual(10);
});

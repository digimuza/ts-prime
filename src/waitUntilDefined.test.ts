import { waitUntilDefined } from './waitUntilDefined';

test('wait until defined', async () => {
  let data: string | undefined;
  setTimeout(() => {
    data = 'asd';
  }, 50);
  const result = await waitUntilDefined(() => data, 60);
  expect(result).toEqual('asd');
});

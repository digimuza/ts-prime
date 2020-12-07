import { slugify } from './slugify';

test('slugify', () => {
  expect(slugify('Andrius Mozuraitis')).toEqual('andrius-mozuraitis');
  expect(slugify('Andrius MozŪraitis')).toEqual('andrius-mozuraitis');
  expect(slugify('super6^8@# dasf ------')).toEqual('super68-dasf');
});

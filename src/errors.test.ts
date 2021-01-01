import { ensureError, UnknownError, canFail, assertError } from './errors';

test('ensureError', () => {
  const err = ensureError('Error');
  expect(err).toEqual(new UnknownError('Error'));
});

test('ensureError', () => {
  const err = ensureError(new Error('Error'));
  expect(err).toEqual(new Error('Error'));
});

test('canFail', () => {
  const err = canFail(() => {
    throw new Error('ERROR');
  });
  expect(err).toEqual(new Error('ERROR'));
});

test('canFail', () => {
  const err = canFail(() => {
    throw new Error('ERROR');
  });
  expect(err).toEqual(new Error('ERROR'));
});

test('canFail: Promise return unknown', async () => {
  const err = await canFail(() => new Promise((_, reject) => reject('Error')));
  expect(err).toEqual(new UnknownError('Error'));
});

test('canFail: Promise return unknown', async () => {
  const err = await canFail(
    () =>
      new Promise(() => {
        throw new Error('Error');
      })
  );
  expect(err).toEqual(new Error('Error'));
});
test('canFail: return value', async () => {
  const err = canFail(() => 10);
  expect(err).toEqual(10);
});

test('canFail: return value', async () => {
  const err = canFail(() => {
    throw 'asd';
  });
  expect(err).toEqual(new UnknownError('asd'));
});

test('canFail: Promise return value', async () => {
  const err = await canFail(
    () =>
      new Promise(r => {
        r(5);
      })
  );
  expect(err).toEqual(5);
});

test('assertError: Promise return value', async () => {
  const err = await canFail(() => {
    assertError(new Error('Error'));
  });

  expect(err).toEqual(new Error('Error'));
});

test('assertError: Promise return value', async () => {
  const err = await canFail(() => {
    return assertError(10);
  });

  expect(err).toEqual(10);
});

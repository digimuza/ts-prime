import { convertStringToNameCase } from './convertStringToNameCase';

test('CamelCaseToSnakeCase', () => {
  expect(convertStringToNameCase('Test Is Test', 'PascalCase')).toEqual(
    'TestIsTest'
  );
  expect(convertStringToNameCase('testIsTest', 'PascalCase')).toEqual(
    'TestIsTest'
  );
  expect(convertStringToNameCase('test-IsTest', 'PascalCase')).toEqual(
    'TestIsTest'
  );
  expect(convertStringToNameCase('Test Is Test', 'Train-Case')).toEqual(
    'Test-Is-Test'
  );
  expect(convertStringToNameCase('Test-Is@Test', 'Train-Case')).toEqual(
    'Test-Is-Test'
  );
  expect(convertStringToNameCase('testIs Test', 'camelCase')).toEqual(
    'testIsTest'
  );
  expect(convertStringToNameCase('Test Is Test', 'kebab-case')).toEqual(
    'test-is-test'
  );
  expect(convertStringToNameCase('Test Is Test', 'snake_case')).toEqual(
    'test_is_test'
  );

  expect(convertStringToNameCase('asd zxc%@%', 'Train-Case')).toEqual(
    'Asd-Zxc'
  );
  expect(convertStringToNameCase('asd zxc%@%', 'PascalCase')).toEqual('AsdZxc');
  expect(convertStringToNameCase('asd zxc%@%', 'camelCase')).toEqual('asdZxc');
  expect(convertStringToNameCase('asd zxc%@%', 'kebab-case')).toEqual(
    'asd-zxc'
  );
  expect(convertStringToNameCase('asd zxc%@%', 'snake_case')).toEqual(
    'asd_zxc'
  );
});

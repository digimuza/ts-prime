import { uuidv4 } from './uuid';

const mockMath = Object.create(global.Math);

test('uuid mock test', () => {
  mockMath.random = () => 0.5;
  global.Math = mockMath;
  expect(uuidv4()).toEqual('88888888-8888-4888-8888-888888888888');

  mockMath.random = () => 0.78798;
  global.Math = mockMath;
  expect(uuidv4()).toEqual('cccccccc-cccc-4ccc-8ccc-cccccccccccc');
});

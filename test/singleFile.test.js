var strategy = require('../strategies/strategy');
describe('Strategy Tests', () => {
  test('Import strategy.js', () => {
    expect(strategy).toBeDefined();
  });
  test('Correct type of strategy is a function', () => {
    expect(strategy).toBeInstanceOf(Function);    
  });
  test('Should throw an error for not providing an input and an output path', () => {
    expect(() => strategy()).toThrow(new Error('Please provide an input path and an output path'));
  });
  test('Should return a relative path to node_modules folder', () => {
    expect(singleFileStrategy('./main.js', './').normalizePath('../../')).toBe('..\\..\\');    
  });
});
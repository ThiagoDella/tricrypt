var strategy = require('../strategies/singleFIle');
describe('singleFileStrategy Tests', () => {
  test('Import singleFile.js', () => {
    expect(strategy.singleFileStrategy).toBeDefined();
  });
  test('Correct type of strategy is a function', () => {
    expect(strategy.singleFileStrategy).toBeInstanceOf(Function);    
  });
  test('Should throw an error for not providing an input and an output path', () => {
    expect(() => strategy.singleFileStrategy()).toThrow(new Error('Please provide an input path and an output path'));
  });
  test('Should return a relative path to node_modules folder', () => {
    expect(strategy.normalizePath('../../')).toBe('..\\..\\');    
  });
});
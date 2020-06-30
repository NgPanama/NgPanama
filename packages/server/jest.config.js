module.exports = {
  collectCoverage: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
  testPathIgnorePatterns: ["/node_modules/", "/mocks"],
  globals: {
    'ts-jest': {
      compiler: 'typescript'
    }
  }
};
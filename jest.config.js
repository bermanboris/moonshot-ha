module.exports = {
  preset: '@shelf/jest-mongodb',
  // testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['jest-extended', '<rootDir>/jest/setup-tests.ts'],
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  collectCoverageFrom: ['src/*.{js,ts}'],
};

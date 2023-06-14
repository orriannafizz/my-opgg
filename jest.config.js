const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['<rootDir>/__test__/**/*.test.[jt]s?(x)'],
};

module.exports = createJestConfig(customJestConfig);

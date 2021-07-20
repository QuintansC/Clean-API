// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */

const config = {
roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testMatch: ['**/*.spec.ts']
};
  
module.exports = config;
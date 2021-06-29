export default {
  clearMocks: true,
  collectCoverage: true,
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  testEnvironment: 'node',
  coverageProvider: "v8",
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
};

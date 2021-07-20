// jest.config.ts
import type {Config} from '@jest/types';

// Sync object
const config: Config.InitialOptions = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts', 
    '!<rootDir>/src/main/**', 
    '!<rootDir>/src/**/*-protocols.ts', 
    '!**/protocols/**', '!**/test/**'
  ],
  coverageDirectory: "coverage",
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
};
export default config;

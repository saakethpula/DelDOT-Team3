import { nestConfig } from '@repo/jest-config';

export default {
  ...nestConfig,
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'node',
};
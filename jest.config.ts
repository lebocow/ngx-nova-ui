import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/projects/ngx-nova-ui/tsconfig.spec.json',
      },
    ],
  },
  moduleNameMapper: {
    '^projects/ngx-nova-ui/(.*)$': '<rootDir>/projects/ngx-nova-ui/$1',
    '^ngx-nova-ui/(.*)$': '<rootDir>/projects/ngx-nova-ui/src/$1',
    '\\.(css|scss)$': '<rootDir>/projects/ngx-nova-ui/src/lib/styles/nova-ui.scss',
    '\\.(svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs', 'html', 'json'],
};

export default config;

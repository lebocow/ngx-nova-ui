import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  staticDirs: [{ from: '../src/lib/styles', to: '/styles' }],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
};

export default config;

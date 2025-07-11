import type { Preview, Decorator } from '@storybook/angular';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true,
    },
    layout: 'centered',
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circle',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
          { value: 'system', icon: 'browser', title: 'System' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    ((story, context) => {
      const { theme } = context.globals;
      const root = document.documentElement;

      const isDark =
        theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

      root.classList.toggle('dark', isDark);

      return story();
    }) as Decorator,
    ((story) => ({
      ...story(),
      template: `<div style="padding: 1rem">${story().template || story()}</div>`,
    })) as Decorator,
  ],
};

export default preview;

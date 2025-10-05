import type { Meta, StoryObj } from '@storybook/angular';
import { expect } from 'storybook/test';
import { NovaButtonDirective } from './button';

const meta: Meta<NovaButtonDirective> = {
  title: 'Directives/Button',
  component: NovaButtonDirective,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# NovaButton Directive

A directive that applies button styling to native button elements.

## Usage

\`\`\`html
<button novaButton variant="primary" size="medium">
  Click me
</button>
\`\`\`

## Variants

- **primary**: Primary action button
- **secondary**: Secondary action button
- **danger**: Destructive action button
- **ghost**: Minimal button style
- **outline**: Outlined button style
- **link**: Link-style button

## Sizes

- **small**: Compact button for tight spaces
- **medium**: Standard button size (default)
- **large**: Prominent button for primary actions
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'ghost', 'outline', 'link'],
      description: 'Button visual variant',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width',
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <button novaButton [variant]="variant" [size]="size" [disabled]="disabled" [fullWidth]="fullWidth">
        Button Text
      </button>
    `,
  }),
};

export default meta;
type Story = StoryObj<NovaButtonDirective>;

export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    fullWidth: false,
  },
  async play({ canvas, step }) {
    await step('renders with base classes', async () => {
      const button = await canvas.findByRole('button', { name: /button text/i });
      expect(button).toHaveClass('nova-button', 'nova-button--primary', 'nova-button--medium');
      expect(button).not.toHaveAttribute('disabled');
      expect(button).not.toHaveClass('nova-button--full-width');
    });
  },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <button novaButton variant="primary">Primary</button>
        <button novaButton variant="secondary">Secondary</button>
        <button novaButton variant="danger">Danger</button>
        <button novaButton variant="ghost">Ghost</button>
        <button novaButton variant="outline">Outline</button>
        <button novaButton variant="link">Link</button>
      </div>
    `,
  }),
  async play({ canvas, step }) {
    const variants: readonly { name: string; className: string }[] = [
      { name: 'Primary', className: 'nova-button--primary' },
      { name: 'Secondary', className: 'nova-button--secondary' },
      { name: 'Danger', className: 'nova-button--danger' },
      { name: 'Ghost', className: 'nova-button--ghost' },
      { name: 'Outline', className: 'nova-button--outline' },
      { name: 'Link', className: 'nova-button--link' },
    ];

    for (const variant of variants) {
      await step(`applies ${variant.name} classes`, async () => {
        const button = await canvas.findByRole('button', { name: variant.name });
        expect(button).toHaveClass('nova-button', variant.className);
      });
    }
  },
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <button novaButton size="small">Small</button>
        <button novaButton size="medium">Medium</button>
        <button novaButton size="large">Large</button>
      </div>
    `,
  }),
  async play({ canvas, step }) {
    const sizes: readonly { name: string; className: string }[] = [
      { name: 'Small', className: 'nova-button--small' },
      { name: 'Medium', className: 'nova-button--medium' },
      { name: 'Large', className: 'nova-button--large' },
    ];

    for (const size of sizes) {
      await step(`applies ${size.name} size classes`, async () => {
        const button = await canvas.findByRole('button', { name: size.name });
        expect(button).toHaveClass('nova-button', size.className);
      });
    }
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: true,
  },
  async play({ canvas, step }) {
    await step('renders disabled button', async () => {
      const button = await canvas.findByRole('button', { name: /button text/i });
      expect(button).toBeDisabled();
      expect(button).toHaveClass('nova-button--disabled');
    });
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    fullWidth: true,
  },
  async play({ canvas, step }) {
    await step('renders full width button', async () => {
      const button = await canvas.findByRole('button', { name: /button text/i });
      expect(button).toHaveClass('nova-button', 'nova-button--full-width');
    });
  },
};

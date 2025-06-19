import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NovaButton } from './button';
import { CommonModule } from '@angular/common';

const meta: Meta<NovaButton> = {
  title: 'Components/Button',
  component: NovaButton,
  decorators: [
    moduleMetadata({
      imports: [NovaButton, CommonModule],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'ghost', 'outline', 'link'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<NovaButton>;

export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    fullWidth: false,
  },
  render: (args) => ({
    props: args,
    imports: [NovaButton],
    template: `
      <nova-button
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [fullWidth]="fullWidth">
        Button
      </nova-button>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    imports: [NovaButton],
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <nova-button variant="primary">Primary</nova-button>
        <nova-button variant="secondary">Secondary</nova-button>
        <nova-button variant="danger">Danger</nova-button>
        <nova-button variant="ghost">Ghost</nova-button>
        <nova-button variant="outline">Outline</nova-button>
        <nova-button variant="link">Link</nova-button>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    imports: [NovaButton],
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <nova-button size="small">Small</nova-button>
        <nova-button size="medium">Medium</nova-button>
        <nova-button size="large">Large</nova-button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    imports: [NovaButton],
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <nova-button variant="primary" [disabled]="true">Primary</nova-button>
        <nova-button variant="secondary" [disabled]="true">Secondary</nova-button>
        <nova-button variant="danger" [disabled]="true">Danger</nova-button>
        <nova-button variant="ghost" [disabled]="true">Ghost</nova-button>
        <nova-button variant="outline" [disabled]="true">Outline</nova-button>
        <nova-button variant="link" [disabled]="true">Link</nova-button>
      </div>
    `,
  }),
};

export const FullWidth: Story = {
  render: () => ({
    imports: [NovaButton],
    template: `
      <div style="width: 1000px;">
        <nova-button variant="primary" [fullWidth]="true">Full Width Button</nova-button>
      </div>
    `,
  }),
};

export const AllVariantsAndSizes: Story = {
  name: 'All Variants × All Sizes',
  render: () => ({
    imports: [NovaButton],
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h3 style="margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">Small</h3>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
            <nova-button variant="primary" size="small">Primary</nova-button>
            <nova-button variant="secondary" size="small">Secondary</nova-button>
            <nova-button variant="danger" size="small">Danger</nova-button>
            <nova-button variant="ghost" size="small">Ghost</nova-button>
            <nova-button variant="outline" size="small">Outline</nova-button>
            <nova-button variant="link" size="small">Link</nova-button>
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">Medium (Default)</h3>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
            <nova-button variant="primary" size="medium">Primary</nova-button>
            <nova-button variant="secondary" size="medium">Secondary</nova-button>
            <nova-button variant="danger" size="medium">Danger</nova-button>
            <nova-button variant="ghost" size="medium">Ghost</nova-button>
            <nova-button variant="outline" size="medium">Outline</nova-button>
            <nova-button variant="link" size="medium">Link</nova-button>
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">Large</h3>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
            <nova-button variant="primary" size="large">Primary</nova-button>
            <nova-button variant="secondary" size="large">Secondary</nova-button>
            <nova-button variant="danger" size="large">Danger</nova-button>
            <nova-button variant="ghost" size="large">Ghost</nova-button>
            <nova-button variant="outline" size="large">Outline</nova-button>
            <nova-button variant="link" size="large">Link</nova-button>
          </div>
        </div>
      </div>
    `,
  }),
};

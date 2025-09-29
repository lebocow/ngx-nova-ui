import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { NovaButtonDirective } from './button';

const meta: Meta<NovaButtonDirective> = {
  title: 'Components/Button',
  component: NovaButtonDirective,
  decorators: [
    moduleMetadata({
      imports: [NovaButtonDirective],
    }),
  ],
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
  tags: ['autodocs'],
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
  render: (args) => ({
    props: {
      ...args,
      onClick: (event: MouseEvent): void => {
        console.log('Button clicked!', event);
      },
    },
    imports: [NovaButtonDirective],
    template: `
      <button
        novaButton
        [variant]="variant"
        [size]="size"
        [disabled]="disabled"
        [fullWidth]="fullWidth"
        (clicked)="onClick($event)">
        Button
      </button>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    imports: [NovaButtonDirective],
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
        <button novaButton variant="primary">Primary</button>
        <button novaButton variant="secondary">Secondary</button>
        <button novaButton variant="danger">Danger</button>
        <button novaButton variant="ghost">Ghost</button>
        <button novaButton variant="outline">Outline</button>
        <button novaButton variant="link">Link</button>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    imports: [NovaButtonDirective],
    template: `
      <div style="display: flex; gap: 1rem; align-items: center;">
        <button novaButton size="small">Small</button>
        <button novaButton size="medium">Medium</button>
        <button novaButton size="large">Large</button>
      </div>
    `,
  }),
};

export const Disabled: Story = {
  render: () => ({
    imports: [NovaButtonDirective],
    template: `
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <button novaButton variant="primary" [disabled]="true">Primary</button>
        <button novaButton variant="secondary" [disabled]="true">Secondary</button>
        <button novaButton variant="danger" [disabled]="true">Danger</button>
        <button novaButton variant="ghost" [disabled]="true">Ghost</button>
        <button novaButton variant="outline" [disabled]="true">Outline</button>
        <button novaButton variant="link" [disabled]="true">Link</button>
      </div>
    `,
  }),
};

export const FullWidth: Story = {
  args: {
    fullWidth: false,
  },

  render: () => ({
    imports: [NovaButtonDirective],
    template: `<button novaButton variant="primary" [fullWidth]="true">Full Width Button</button>`,
  }),
};

export const AllVariantsAndSizes: Story = {
  name: 'All Variants × All Sizes',
  render: () => ({
    imports: [NovaButtonDirective],
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h3 style="margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">Small</h3>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
            <button novaButton variant="primary" size="small">Primary</button>
            <button novaButton variant="secondary" size="small">Secondary</button>
            <button novaButton variant="danger" size="small">Danger</button>
            <button novaButton variant="ghost" size="small">Ghost</button>
            <button novaButton variant="outline" size="small">Outline</button>
            <button novaButton variant="link" size="small">Link</button>
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">Medium (Default)</h3>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
            <button novaButton variant="primary" size="medium">Primary</button>
            <button novaButton variant="secondary" size="medium">Secondary</button>
            <button novaButton variant="danger" size="medium">Danger</button>
            <button novaButton variant="ghost" size="medium">Ghost</button>
            <button novaButton variant="outline" size="medium">Outline</button>
            <button novaButton variant="link" size="medium">Link</button>
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">Large</h3>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
            <button novaButton variant="primary" size="large">Primary</button>
            <button novaButton variant="secondary" size="large">Secondary</button>
            <button novaButton variant="danger" size="large">Danger</button>
            <button novaButton variant="ghost" size="large">Ghost</button>
            <button novaButton variant="outline" size="large">Outline</button>
            <button novaButton variant="link" size="large">Link</button>
          </div>
        </div>
      </div>
    `,
  }),
};

export const DirectiveFlexibility: Story = {
  args: {
    fullWidth: true,
  },

  name: 'Directive Flexibility',

  render: () => ({
    imports: [NovaButtonDirective],
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <div>
          <h3 style="margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">Different Elements</h3>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
            <button novaButton variant="primary">Button Element</button>
            <a href="#" novaButton variant="secondary">Link Element</a>
            <div novaButton variant="danger" style="cursor: pointer;">Div Element</div>
            <span novaButton variant="ghost" style="cursor: pointer;">Span Element</span>
          </div>
        </div>

        <div>
          <h3 style="margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">With Icons</h3>
          <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
            <button novaButton variant="primary" size="small">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Star
            </button>
            <button novaButton variant="outline" size="medium">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              Add
            </button>
          </div>
        </div>
      </div>
    `,
  }),
};

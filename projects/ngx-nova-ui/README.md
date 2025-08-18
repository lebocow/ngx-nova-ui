# ngx-nova-ui

A modern Angular 20 UI component library built with the standalone API and Angular signals.

- Components: NovaButton
- Services: NovaThemeService
- Styles: CSS variables and a reset/theme file for light/dark modes

## Installation

Install the library and its peer dependencies (Angular 20+):

```bash
npm install ngx-nova-ui
```

## Global styles (required)

Import the library CSS once in your application global styles (e.g. `src/styles.css`):

```css
@import 'ngx-nova-ui/styles/nova-ui.css';
```

This provides the CSS reset and all theming variables used by components.

## Quick start

Use standalone imports to add components to a feature or page component:

```ts
import { Component } from '@angular/core';
import { NovaButton } from 'ngx-nova-ui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NovaButton],
  template: ` <nova-button variant="primary" (clicked)="onClick()">Get started</nova-button> `,
})
export class HomeComponent {
  onClick() {
    // ...
  }
}
```

## Public API

From `ngx-nova-ui` you can import:

- Components: `NovaButton`
- Services: `NovaThemeService`
- Types: `ButtonVariant`, `ButtonSize`, `ThemeMode`

```ts
import { NovaButton, NovaThemeService, type ButtonVariant, type ButtonSize, type ThemeMode } from 'ngx-nova-ui';
```

---

## Components

### NovaButton

- Selector: `nova-button`
- Standalone: `true` (import directly into components)

Inputs

- `variant: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'link'` (default: `primary`)
- `size: 'small' | 'medium' | 'large'` (default: `medium`)
- `disabled: boolean` (default: `false`)
- `fullWidth: boolean` (default: `false`)
- `type: 'button' | 'submit' | 'reset'` (default: `button`)

Outputs

- `clicked: Event<MouseEvent>` — fires when the button is clicked and not disabled

Examples

```html
<nova-button>Default</nova-button>

<nova-button variant="secondary">Secondary</nova-button>
<nova-button variant="danger">Delete</nova-button>
<nova-button variant="ghost">Ghost</nova-button>
<nova-button variant="outline">Outline</nova-button>
<nova-button variant="link">Link</nova-button>

<nova-button size="small">Small</nova-button>
<nova-button size="large">Large</nova-button>

<nova-button [disabled]="true">Disabled</nova-button>

<div style="width: 100%">
  <nova-button [fullWidth]="true">Full width</nova-button>
  <!-- Use type="submit" inside forms -->
  <form>
    <nova-button type="submit">Submit</nova-button>
  </form>
  <!-- Subscribe to the custom clicked output -->
  <nova-button (clicked)="onClicked($event)">Click me</nova-button>
  <!-- Or bind (clicked) on a host component method -->
  <nova-button (clicked)="handleClick($event)">Action</nova-button>

  <!-- Content projection supports icons/text -->
  <nova-button>
    <svg aria-hidden="true"><!-- icon --></svg>
    Save
  </nova-button>

  <!-- Link style renders as a text link -->
  <nova-button variant="link">Learn more</nova-button>

  <!-- Compose classes via CSS variables only; component manages classes itself -->
  <nova-button class="my-extra-class">Custom</nova-button>
</div>
```

Accessibility

- Keyboard focus uses `:focus-visible` and `--nova-ring` for outlines.
- `disabled` prevents focus and click handling.

---

## Services

### NovaThemeService

Signal-based theming service that manages light/dark/system mode. Provided in root.

Types

- `ThemeMode = 'light' | 'dark' | 'system'`

API

- `currentMode: Signal<ThemeMode>` — readonly signal of the selected mode
- `isDarkMode: Signal<boolean>` — readonly signal indicating if dark is active
- `setMode(mode: ThemeMode): void` — set explicit mode
- `toggleMode(): void` — toggles light/dark; if `system`, flips based on current system preference

Behavior

- Applies or removes the `dark` class on `document.documentElement`.
- Adds a temporary `nova-theme-transition` class for smooth transitions.
- Listens to `prefers-color-scheme` changes when in `system` mode.

Usage

```ts
import { Component, inject } from '@angular/core';
import { NovaButton, NovaThemeService } from 'ngx-nova-ui';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [NovaButton],
  template: `
    <p>Mode: {{ theme.currentMode() }}</p>
    <p>Dark? {{ theme.isDarkMode() }}</p>

    <div style="display:flex; gap: .5rem; align-items:center; flex-wrap: wrap;">
      <nova-button (clicked)="theme.setMode('light')">Light</nova-button>
      <nova-button (clicked)="theme.setMode('dark')">Dark</nova-button>
      <nova-button (clicked)="theme.setMode('system')">System</nova-button>
      <nova-button variant="secondary" (clicked)="theme.toggleMode()">Toggle</nova-button>
    </div>
  `,
})
export class ThemeToggleComponent {
  readonly theme = inject(NovaThemeService);
}
```

SSR

- The service safely guards `document`/`window` access. No extra configuration is needed for Angular SSR.

---

## Theming and customization

All component styles are built on CSS variables. Override them at the `:root` (light) or `.dark` scopes.

Example: tweak primary colors and radius

```css
:root {
  --nova-primary: #1447e6;
  --nova-primary-foreground: #ffffff;
  --nova-radius-md: 0.5rem;
}

.dark {
  --nova-primary: #91c5ff;
  --nova-primary-foreground: #0a0a0a;
}
```

Common tokens used by components include:

- Colors: `--nova-primary`, `--nova-secondary`, `--nova-accent`, `--nova-destructive`, `--nova-foreground`, `--nova-background`
- Typography: `--nova-text-sm|base|lg`, `--nova-font-medium`
- Sizing: `--nova-spacing-*`
- Radius: `--nova-radius-sm|md|lg|xl|full`
- Ring: `--nova-ring`

---

## Building the library

```bash
npm run build
```

Artifacts output to `dist/ngx-nova-ui`.

## Storybook

Run component demos locally:

```bash
npm run storybook
```

## License

MIT

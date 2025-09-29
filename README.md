# Nova UI - Modern Angular UI Library

A modern Angular 20 UI component library built with signals, standalone components, and a CSS-first theming approach.

## ✨ Features

- 🎨 **CSS-First Theming** - Simple, customizable CSS variables
- 🌙 **Dark Mode Support** - Built-in light and dark themes
- 📦 **Tree-shakeable** - Import only what you need
- 🔧 **Fully Typed** - Complete TypeScript support
- ⚡ **Angular 20** - Built with latest Angular features and signals
- 🚀 **Standalone Components** - No NgModules required
- ⚙️ **Signal-based State** - Modern reactive patterns

## 🚀 Quick Start

### Installation

```bash
npm install ngx-nova-ui
```

### Basic Setup

1. Import the CSS in your `styles.css`:

```css
@import 'ngx-nova-ui/styles/nova-ui.css';
```

2. Import components as needed:

```typescript
import { NovaButton } from 'ngx-nova-ui';

@Component({
  selector: 'app-root',
  imports: [NovaButton],
  template: `<nova-button>Click me</nova-button>`,
})
export class AppComponent {}
```

### Using Components

```html
<nova-button variant="primary" (clicked)="handleClick()"> Click me </nova-button>
```

### Customizing Theme

Override CSS variables in your styles:

```css
:root {
  --nova-primary: #4f46e5;
  --nova-primary-foreground: #ffffff;
  --nova-radius: 0.5rem;
}

/* Dark mode is applied automatically with .dark class */
.dark {
  --nova-background: #09090b;
  --nova-foreground: #fafafa;
}
```

## 📚 CSS Variables

The library provides a comprehensive set of CSS variables for colors, spacing, typography, and more. All variables use the `--nova-` prefix for easy identification.

## 🛠️ Development

### Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Building the Library

```bash
# Build library only
npm run build

# Build library
npm run build:all
```

### Running Tests

```bash
# Unit tests
npm test

# Storybook
npm run storybook
```

## 🌙 Dark Mode

Use the theme service to toggle dark mode:

```typescript
import { NovaThemeService } from 'ngx-nova-ui';

export class AppComponent {
  private themeService = inject(NovaThemeService);

  toggleTheme() {
    this.themeService.toggleMode();
  }

  setDarkMode() {
    this.themeService.setMode('dark');
  }
}
```

## 🏗️ Project Structure

```
ngx-nova-ui-workspace/
├── projects/
│   └── ngx-nova-ui/          # Library source
│       ├── src/
│       │   ├── lib/
│       │   │   ├── components/   # UI components
│       │   │   ├── services/     # Theme service
│       │   │   └── styles/       # CSS with variables
│       │   └── public-api.ts     # Public exports
│       └── ng-package.json       # Library config
└── .storybook/               # Storybook configuration
```

## 📦 Available Components

- **NovaButton** - Button component with variants and sizes
- More components coming soon!

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

CSS variables approach inspired by modern CSS-first design systems.

---

Built with ❤️ using Angular 20

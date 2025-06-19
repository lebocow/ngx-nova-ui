# Nova UI - Modern Angular UI Library

A powerful, themeable Angular 20 UI component library with a comprehensive CSS variables-based design system.

## ✨ Features

- 🎨 **Advanced Theming System** - Runtime CSS variables for complete customization
- 🌙 **Dark Mode Support** - Automatic dark mode with smart color adjustments
- 🎯 **Design Tokens** - Comprehensive tokens for spacing, typography, shadows, and more
- 🚀 **8 Pre-built Themes** - Inspired by Material, GitHub, Stripe, and more
- 📦 **Tree-shakeable** - Import only what you need
- 🔧 **Fully Typed** - Complete TypeScript support
- ⚡ **Angular 20** - Built with latest Angular features and signals

## 🚀 Quick Start

### Installation

```bash
npm install @nova-ui/ngx-nova-ui
```

### Basic Setup

```typescript
import { provideNovaTheme } from '@nova-ui/ngx-nova-ui';

bootstrapApplication(AppComponent, {
  providers: [
    provideNovaTheme('#4f46e5'), // Your brand color
  ],
});
```

### Using Components

```html
<nova-button variant="primary" (clicked)="handleClick()"> Click me </nova-button>
```

### Using CSS Variables

```css
.custom-card {
  background: var(--nova-surface-surface);
  padding: var(--nova-spacing-6);
  border-radius: var(--nova-radius-lg);
  box-shadow: var(--nova-shadow-md);
}
```

## 📚 Documentation

- [Component Build Order](./COMPONENT_BUILD_ORDER.md) - Roadmap for component development
- [Angular 20 UI Library Guide](./Angular%2020%20UI%20Library.md) - Comprehensive development guide

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

## 🎨 Pre-built Themes

```typescript
import { themes } from '@nova-ui/ngx-nova-ui';

// Available themes:
provideNovaTheme(themes.material); // Material Design inspired
provideNovaTheme(themes.github); // GitHub inspired
provideNovaTheme(themes.stripe); // Stripe inspired
provideNovaTheme(themes.vercel); // Vercel inspired (dark)
provideNovaTheme(themes.tailwind); // Tailwind UI inspired
provideNovaTheme(themes.ant); // Ant Design inspired
provideNovaTheme(themes.radix); // Radix UI inspired
provideNovaTheme(themes.chakra); // Chakra UI inspired
```

## 🏗️ Project Structure

```
ngx-nova-ui-workspace/
├── projects/
│   └── ngx-nova-ui/          # Library source
│       ├── src/
│       │   ├── lib/
│       │   │   ├── components/   # UI components
│       │   │   ├── theming/      # Theme system
│       │   │   └── utils/        # Utilities
│       │   └── public-api.ts     # Public exports
│       └── ng-package.json       # Library config
├── scripts/
└── docs/                        # Documentation
```

## 📦 Bundle Sizes

- **Core Library**: ~15KB (minified + gzipped)

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

Design inspiration from:

- Material Design
- Tailwind CSS
- Ant Design
- GitHub Primer
- Stripe Elements
- And many other excellent design systems

---

Built with ❤️ using Angular 20

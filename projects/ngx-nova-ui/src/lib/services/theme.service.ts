import { Injectable, signal, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root',
})
export class NovaThemeService {
  private mode = signal<ThemeMode>('system');
  private isDark = signal(false);

  readonly currentMode = this.mode.asReadonly();
  readonly isDarkMode = this.isDark.asReadonly();

  constructor() {
    // Apply theme changes
    effect(() => {
      const mode = this.mode();
      this.applyTheme(mode);
    });

    // Initialize with system preference
    this.detectSystemPreference();
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
  }

  toggleMode(): void {
    const currentMode = this.mode();
    if (currentMode === 'light') {
      this.mode.set('dark');
    } else if (currentMode === 'dark') {
      this.mode.set('light');
    } else {
      // If system, switch to opposite of current state
      this.mode.set(this.isDark() ? 'light' : 'dark');
    }
  }

  private applyTheme(mode: ThemeMode): void {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    if (mode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDark.set(prefersDark);
      root.classList.toggle('dark', prefersDark);
    } else {
      const isDark = mode === 'dark';
      this.isDark.set(isDark);
      root.classList.toggle('dark', isDark);
    }

    // Add transition class for smooth theme changes
    root.classList.add('nova-theme-transition');
    setTimeout(() => {
      root.classList.remove('nova-theme-transition');
    }, 300);
  }

  private detectSystemPreference(): void {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Listen for system theme changes
    mediaQuery.addEventListener('change', () => {
      if (this.mode() === 'system') {
        this.applyTheme('system');
      }
    });
  }
}

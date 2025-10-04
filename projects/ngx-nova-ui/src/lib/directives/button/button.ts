import { Directive, input, output, Renderer2, OnInit, OnDestroy, inject } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'link';
export type ButtonSize = 'small' | 'medium' | 'large';

@Directive({
  selector: '[novaButton]',
  standalone: true,
  host: {
    '[class.nova-button]': 'true',
    '[class.nova-button--primary]': 'variant() === "primary"',
    '[class.nova-button--secondary]': 'variant() === "secondary"',
    '[class.nova-button--danger]': 'variant() === "danger"',
    '[class.nova-button--ghost]': 'variant() === "ghost"',
    '[class.nova-button--outline]': 'variant() === "outline"',
    '[class.nova-button--link]': 'variant() === "link"',
    '[class.nova-button--small]': 'size() === "small"',
    '[class.nova-button--medium]': 'size() === "medium"',
    '[class.nova-button--large]': 'size() === "large"',
    '[class.nova-button--full-width]': 'fullWidth()',
    '[class.nova-button--disabled]': 'disabled()',
    '[attr.disabled]': 'disabled() ? true : null',
    '(click)': 'handleClick($event)',
  },
})
export class NovaButtonDirective implements OnInit, OnDestroy {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('medium');
  readonly disabled = input(false);
  readonly fullWidth = input(false);

  readonly clicked = output<MouseEvent>();

  private readonly renderer = inject(Renderer2);
  private styleElement?: HTMLStyleElement;

  private readonly buttonStyles = `
    .nova-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      border: none;
      border-radius: var(--nova-radius-md);
      font-weight: var(--nova-font-medium);
      line-height: 1;
      cursor: pointer;
      transition:
        color 0.15s ease,
        background-color 0.15s ease,
        border-color 0.15s ease,
        box-shadow 0.15s ease;
      outline: none;
      position: relative;
      overflow: hidden;
    }

    .nova-button:focus-visible {
      outline: 2px solid var(--nova-ring);
      outline-offset: 2px;
    }

    .nova-button.nova-button--full-width {
      width: 100%;
    }

    .nova-button:disabled,
    .nova-button.nova-button--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Button Variants */
    .nova-button.nova-button--primary {
      background-color: var(--nova-primary);
      color: var(--nova-primary-foreground);
    }

    .nova-button.nova-button--primary:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--nova-primary) 90%, transparent);
    }

    .nova-button.nova-button--secondary {
      background-color: var(--nova-secondary);
      color: var(--nova-secondary-foreground);
    }

    .nova-button.nova-button--secondary:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--nova-secondary) 80%, transparent);
    }

    .nova-button.nova-button--danger {
      background-color: var(--nova-destructive);
      color: var(--nova-destructive-foreground);
    }

    .nova-button.nova-button--danger:hover:not(:disabled) {
      background-color: color-mix(in srgb, var(--nova-destructive) 90%, transparent);
    }

    .nova-button.nova-button--ghost {
      background-color: transparent;
      color: var(--nova-foreground);
    }

    .nova-button.nova-button--ghost:hover:not(:disabled) {
      background-color: var(--nova-accent);
      color: var(--nova-accent-foreground);
    }

    .nova-button.nova-button--outline {
      background-color: transparent;
      color: var(--nova-foreground);
      border: 1px solid var(--nova-input);
    }

    .nova-button.nova-button--outline:hover:not(:disabled) {
      background-color: var(--nova-accent);
      color: var(--nova-accent-foreground);
    }

    .nova-button.nova-button--link {
      background-color: transparent;
      color: var(--nova-primary);
      text-decoration: underline;
      text-underline-offset: 4px;
      padding: 0;
      height: auto;
    }

    .nova-button.nova-button--link:hover:not(:disabled) {
      text-decoration: none;
    }

    /* Button Sizes */
    .nova-button.nova-button--small {
      height: var(--nova-spacing-9);
      padding: 0 var(--nova-spacing-3);
      font-size: var(--nova-text-xs);
      gap: var(--nova-spacing-1-5);
    }

    .nova-button.nova-button--small.nova-button--icon-only {
      width: var(--nova-spacing-9);
      padding: 0;
    }

    .nova-button.nova-button--medium {
      height: var(--nova-spacing-10);
      padding: 0 var(--nova-spacing-4);
      font-size: var(--nova-text-sm);
      gap: var(--nova-spacing-2);
    }

    .nova-button.nova-button--medium.nova-button--icon-only {
      width: var(--nova-spacing-10);
      padding: 0;
    }

    .nova-button.nova-button--large {
      height: var(--nova-spacing-11);
      padding: 0 var(--nova-spacing-8);
      font-size: var(--nova-text-base);
      gap: var(--nova-spacing-2);
    }

    .nova-button.nova-button--large.nova-button--icon-only {
      width: var(--nova-spacing-11);
      padding: 0;
    }

    .nova-button svg {
      width: var(--nova-spacing-4);
      height: var(--nova-spacing-4);
      flex-shrink: 0;
    }
  `;

  ngOnInit(): void {
    this.injectStyles();
  }

  ngOnDestroy(): void {
    this.removeStyles();
  }

  private injectStyles(): void {
    // Check if styles are already injected
    if (document.querySelector('style[data-nova-button-styles]')) {
      return;
    }

    this.styleElement = this.renderer.createElement('style');
    this.renderer.setAttribute(this.styleElement, 'data-nova-button-styles', 'true');
    this.renderer.setProperty(this.styleElement, 'textContent', this.buttonStyles);
    this.renderer.appendChild(document.head, this.styleElement);
  }

  private removeStyles(): void {
    if (this.styleElement) {
      this.renderer.removeChild(document.head, this.styleElement);
      this.styleElement = undefined;
    }
  }

  protected handleClick(event: MouseEvent): void {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }
}

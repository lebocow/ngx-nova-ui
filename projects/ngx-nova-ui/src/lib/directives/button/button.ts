import { Directive, input } from '@angular/core';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'link';
export type ButtonSize = 'small' | 'medium' | 'large';

/** Applies Nova button styles and behaviour to the host element. */
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
  },
})
export class NovaButtonDirective {
  /** Button visual variant. */
  readonly variant = input<ButtonVariant>('primary');
  /** Button size. */
  readonly size = input<ButtonSize>('medium');
  /** Whether the button is disabled. */
  readonly disabled = input(false);
  /** Whether the button should stretch to the full width of its container. */
  readonly fullWidth = input(false);
}

import { Directive, input } from '@angular/core';

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
  },
})
export class NovaButtonDirective {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('medium');
  readonly disabled = input(false);
  readonly fullWidth = input(false);
}

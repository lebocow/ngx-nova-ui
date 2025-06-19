import { ChangeDetectionStrategy, Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'link';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'nova-button',
  imports: [CommonModule],
  host: {
    '[class.nova-button-host--full-width]': 'fullWidth()',
  },
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NovaButton {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('medium');
  readonly disabled = input(false);
  readonly fullWidth = input(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  readonly clicked = output<MouseEvent>();

  protected readonly buttonClasses = computed(() => {
    const classes = ['nova-button'];

    classes.push(`nova-button--${this.variant()}`);
    classes.push(`nova-button--${this.size()}`);

    if (this.fullWidth()) {
      classes.push('nova-button--full-width');
    }

    if (this.disabled()) {
      classes.push('nova-button--disabled');
    }

    return classes.join(' ');
  });

  protected handleClick(event: MouseEvent): void {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }
}

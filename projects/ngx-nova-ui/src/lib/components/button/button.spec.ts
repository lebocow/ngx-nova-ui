import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { setProjectAnnotations } from '@storybook/angular';

import preview from '../../../../.storybook/preview';
import * as buttonStories from './button.stories';
import { ButtonSize, ButtonVariant, NovaButtonDirective } from './button';

setProjectAnnotations(preview);

const buttonMeta = buttonStories.default;
const defaultStory = buttonStories.Default;

interface ButtonStoryArgs {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
}
@Component({
  standalone: true,
  imports: [NovaButtonDirective],
  template: `
    <button novaButton [variant]="variant" [size]="size" [disabled]="disabled" [fullWidth]="fullWidth">
      Nova Button
    </button>
  `,
})
class ButtonHostComponent {
  variant: ButtonVariant = 'primary';
  size: ButtonSize = 'medium';
  disabled = false;
  fullWidth = false;
}

function testBaseStyles(getButton: () => HTMLButtonElement): void {
  const button = getButton();
  expect(button).toBeTruthy();
  expect(button.classList.contains('nova-button')).toBeTrue();
  expect(button.classList.contains('nova-button--medium')).toBeTrue();
  expect(button.classList.contains('nova-button--primary')).toBeTrue();
}

function testVariantClasses(
  host: ButtonHostComponent,
  fixture: ComponentFixture<ButtonHostComponent>,
  getButton: () => HTMLButtonElement,
): void {
  const variants = (buttonMeta.argTypes?.variant?.options ?? []) as ButtonVariant[];

  for (const variant of variants) {
    host.variant = variant;
    fixture.detectChanges();

    const button = getButton();
    expect(button.classList.contains(`nova-button--${variant}`))
      .withContext(`Missing class for variant ${variant}`)
      .toBeTrue();
  }
}

function testSizeClasses(
  host: ButtonHostComponent,
  fixture: ComponentFixture<ButtonHostComponent>,
  getButton: () => HTMLButtonElement,
): void {
  const sizes = (buttonMeta.argTypes?.size?.options ?? []) as ButtonSize[];

  for (const size of sizes) {
    host.size = size;
    fixture.detectChanges();

    const button = getButton();
    expect(button.classList.contains(`nova-button--${size}`))
      .withContext(`Missing class for size ${size}`)
      .toBeTrue();
  }
}

function testStoryboardDefaultArgs(
  host: ButtonHostComponent,
  fixture: ComponentFixture<ButtonHostComponent>,
  getButton: () => HTMLButtonElement,
): void {
  const defaultArgs = (defaultStory.args ?? {}) as ButtonStoryArgs;

  host.variant = (defaultArgs.variant as ButtonVariant | undefined) ?? host.variant;
  host.size = (defaultArgs.size as ButtonSize | undefined) ?? host.size;
  host.disabled = Boolean(defaultArgs.disabled);
  host.fullWidth = Boolean(defaultArgs.fullWidth);

  fixture.detectChanges();

  const button = getButton();

  expect(button.classList.contains(`nova-button--${host.variant}`)).toBeTrue();
  expect(button.classList.contains(`nova-button--${host.size}`)).toBeTrue();
  expect(button.classList.contains('nova-button--full-width')).toBe(host.fullWidth);
  expect(button.hasAttribute('disabled')).toBe(host.disabled);
}

function testDisabledState(
  host: ButtonHostComponent,
  fixture: ComponentFixture<ButtonHostComponent>,
  getButton: () => HTMLButtonElement,
): void {
  host.disabled = true;
  fixture.detectChanges();

  const button = getButton();
  expect(button.classList.contains('nova-button--disabled')).toBeTrue();
  expect(button.hasAttribute('disabled')).toBeTrue();
}

function testFullWidthState(
  host: ButtonHostComponent,
  fixture: ComponentFixture<ButtonHostComponent>,
  getButton: () => HTMLButtonElement,
): void {
  host.fullWidth = true;
  fixture.detectChanges();

  const button = getButton();
  expect(button.classList.contains('nova-button--full-width')).toBeTrue();
}

describe('NovaButtonDirective', () => {
  let fixture: ComponentFixture<ButtonHostComponent>;
  let host: ButtonHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  const getButton = (): HTMLButtonElement => fixture.nativeElement.querySelector('button');

  it('should initialise with base styles applied', () => {
    testBaseStyles(getButton);
  });

  it('should reflect the Storybook default args', () => {
    testStoryboardDefaultArgs(host, fixture, getButton);
  });

  it('should apply variant classes for each Storybook variant option', () => {
    testVariantClasses(host, fixture, getButton);
  });

  it('should apply size classes for each Storybook size option', () => {
    testSizeClasses(host, fixture, getButton);
  });

  it('should toggle disabled state', () => {
    testDisabledState(host, fixture, getButton);
  });

  it('should toggle full width state', () => {
    testFullWidthState(host, fixture, getButton);
  });
});

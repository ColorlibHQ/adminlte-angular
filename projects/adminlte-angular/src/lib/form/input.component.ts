import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  input,
  model,
  signal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms';

/**
 * Labeled text input with an optional Bootstrap Icons prefix and validation
 * feedback. Implements ControlValueAccessor so it works with reactive,
 * template-driven and Signal Forms; `[(value)]` also works for simple cases.
 */
@Component({
  selector: 'lte-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true },
  ],
  template: `
    @if (label()) {
      <label [for]="id()" class="form-label">{{ label() }}</label>
    }
    <div [class.input-group]="!!icon()">
      <input
        [id]="id()"
        [type]="type()"
        [class]="controlClass()"
        [placeholder]="placeholder()"
        [value]="value()"
        [disabled]="disabled()"
        [attr.autocomplete]="autocomplete()"
        (input)="onInput($event)"
        (blur)="onTouched()"
      />
      @if (icon()) {
        <span class="input-group-text"><i class="bi {{ icon() }}"></i></span>
      }
    </div>
    @if (error()) {
      <div class="invalid-feedback d-block">{{ error() }}</div>
    } @else if (hint()) {
      <div class="form-text">{{ hint() }}</div>
    }
  `,
})
export class InputComponent implements ControlValueAccessor {
  readonly label = input<string>();
  readonly type = input<string>('text');
  readonly placeholder = input<string>('');
  readonly icon = input<string>();
  readonly hint = input<string>();
  readonly error = input<string>();
  readonly autocomplete = input<string>();
  readonly id = input<string>(`lte-input-${idCounter++}`);
  readonly value = model<string>('');

  protected readonly disabled = signal(false);

  readonly controlClass = computed(() => `form-control${this.error() ? ' is-invalid' : ''}`);

  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  onInput(e: Event): void {
    const v = (e.target as HTMLInputElement).value;
    this.value.set(v);
    this.onChange(v);
  }

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}

let idCounter = 0;

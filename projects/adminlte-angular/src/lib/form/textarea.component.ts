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

let idCounter = 0;

/**
 * Labeled textarea with validation feedback. ControlValueAccessor-backed, so it
 * works with reactive, template-driven and Signal Forms.
 */
@Component({
  selector: 'lte-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextareaComponent), multi: true },
  ],
  template: `
    @if (label()) {
      <label [for]="id()" class="form-label">{{ label() }}</label>
    }
    <textarea
      [id]="id()"
      [class]="controlClass()"
      [placeholder]="placeholder()"
      [rows]="rows()"
      [value]="value()"
      [disabled]="disabled()"
      (input)="onInput($event)"
      (blur)="onTouched()"
    ></textarea>
    @if (error()) {
      <div class="invalid-feedback d-block">{{ error() }}</div>
    } @else if (hint()) {
      <div class="form-text">{{ hint() }}</div>
    }
  `,
})
export class TextareaComponent implements ControlValueAccessor {
  readonly label = input<string>();
  readonly placeholder = input<string>('');
  readonly rows = input<number>(3);
  readonly hint = input<string>();
  readonly error = input<string>();
  readonly id = input<string>(`lte-textarea-${idCounter++}`);
  readonly value = model<string>('');

  protected readonly disabled = signal(false);

  readonly controlClass = computed(() => `form-control${this.error() ? ' is-invalid' : ''}`);

  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  onInput(e: Event): void {
    const v = (e.target as HTMLTextAreaElement).value;
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

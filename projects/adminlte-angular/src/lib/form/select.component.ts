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

/** A single option for {@link SelectComponent}. */
export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

/**
 * Labeled native select. Pass `options`, or project `<option>` elements into the
 * default slot. ControlValueAccessor-backed.
 */
@Component({
  selector: 'lte-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SelectComponent), multi: true },
  ],
  template: `
    @if (label()) {
      <label [for]="id()" class="form-label">{{ label() }}</label>
    }
    <select
      [id]="id()"
      [class]="controlClass()"
      [disabled]="disabled()"
      [value]="value()"
      (change)="onSelect($event)"
      (blur)="onTouched()"
    >
      @if (placeholder()) {
        <option value="" disabled>{{ placeholder() }}</option>
      }
      @for (opt of options(); track opt.value) {
        <option [value]="opt.value" [disabled]="opt.disabled ?? false">{{ opt.label }}</option>
      }
      <ng-content />
    </select>
    @if (error()) {
      <div class="invalid-feedback d-block">{{ error() }}</div>
    } @else if (hint()) {
      <div class="form-text">{{ hint() }}</div>
    }
  `,
})
export class SelectComponent implements ControlValueAccessor {
  readonly label = input<string>();
  readonly placeholder = input<string>('');
  readonly options = input<SelectOption[]>([]);
  readonly hint = input<string>();
  readonly error = input<string>();
  readonly id = input<string>(`lte-select-${idCounter++}`);
  readonly value = model<string | number>('');

  protected readonly disabled = signal(false);

  readonly controlClass = computed(() => `form-select${this.error() ? ' is-invalid' : ''}`);

  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  onSelect(e: Event): void {
    const v = (e.target as HTMLSelectElement).value;
    this.value.set(v);
    this.onChange(v);
  }

  writeValue(value: string | number | null): void {
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

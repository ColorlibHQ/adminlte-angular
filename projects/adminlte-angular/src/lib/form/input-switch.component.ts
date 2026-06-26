import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  model,
  signal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms';

let idCounter = 0;

/**
 * Bootstrap toggle switch (a styled checkbox). ControlValueAccessor-backed, with
 * a `[(checked)]` model for simple two-way binding.
 */
@Component({
  selector: 'lte-input-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSwitchComponent),
      multi: true,
    },
  ],
  template: `
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        [id]="id()"
        [checked]="checked()"
        [disabled]="disabled()"
        (change)="onToggle($event)"
        (blur)="onTouched()"
      />
      @if (label()) {
        <label class="form-check-label" [for]="id()">{{ label() }}</label>
      }
    </div>
  `,
})
export class InputSwitchComponent implements ControlValueAccessor {
  readonly label = input<string>();
  readonly id = input<string>(`lte-switch-${idCounter++}`);
  readonly checked = model<boolean>(false);

  protected readonly disabled = signal(false);

  private onChange: (value: boolean) => void = () => {};
  protected onTouched: () => void = () => {};

  onToggle(e: Event): void {
    const v = (e.target as HTMLInputElement).checked;
    this.checked.set(v);
    this.onChange(v);
  }

  writeValue(value: boolean | null): void {
    this.checked.set(!!value);
  }
  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}

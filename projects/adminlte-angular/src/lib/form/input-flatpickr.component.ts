import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Inject,
  PLATFORM_ID,
  effect,
  forwardRef,
  inject,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms';

let idCounter = 0;

// `flatpickr` is an optional peer dependency — typed loosely so it isn't a
// hard build-time dependency.
interface FlatpickrInstance {
  setDate: (date: string, triggerChange?: boolean) => void;
  destroy: () => void;
}

/**
 * Labeled date input backed by {@link https://flatpickr.js.org/ flatpickr} (an
 * optional peer dep, lazily imported on the browser only). Two-way bind the
 * selected date string with `[(value)]`; also a ControlValueAccessor.
 */
@Component({
  selector: 'lte-input-flatpickr',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputFlatpickrComponent), multi: true },
  ],
  template: `
    <div [class]="'mb-3 ' + fgroupClass()">
      @if (label()) {
        <label [for]="id()" class="form-label">{{ label() }}</label>
      }
      <input #host [id]="id()" type="text" class="form-control" [placeholder]="placeholder()" [value]="value()" />
    </div>
  `,
})
export class InputFlatpickrComponent implements ControlValueAccessor {
  private readonly host = viewChild.required<ElementRef<HTMLInputElement>>('host');
  private readonly isBrowser: boolean;
  private picker: FlatpickrInstance | null = null;

  readonly label = input<string>();
  readonly placeholder = input<string>('');
  readonly fgroupClass = input<string>('');
  readonly id = input<string>(`lte-flatpickr-${idCounter++}`);
  /** Extra flatpickr options (mode, dateFormat, …). */
  readonly options = input<Record<string, unknown>>({});
  readonly value = model<string>('');

  private onChange: (value: string) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Initialise once the view is ready, then keep the picker's date in sync
    // when `value` changes from the outside.
    effect(() => {
      const v = this.value();
      if (!this.isBrowser) return;
      if (!this.picker) {
        void this.init(v);
      } else if (v !== this.host().nativeElement.value) {
        this.picker.setDate(v, false);
      }
    });

    inject(DestroyRef).onDestroy(() => {
      this.picker?.destroy();
      this.picker = null;
    });
  }

  private async init(initial: string): Promise<void> {
    try {
      const mod = await import('flatpickr');
      const flatpickr = (mod.default ?? mod) as unknown as (
        el: Element,
        opts: Record<string, unknown>,
      ) => FlatpickrInstance;
      this.picker = flatpickr(this.host().nativeElement, {
        ...this.options(),
        defaultDate: initial || undefined,
        onChange: (_dates: unknown, dateStr: string) => {
          this.value.set(dateStr);
          this.onChange(dateStr);
          this.onTouched();
        },
      });
    } catch {
      console.warn('[adminlte-angular] flatpickr is not installed — <lte-input-flatpickr> is a plain text input.');
    }
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
}

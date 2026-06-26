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
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from '@angular/forms';
import type { TomSelectOption } from '../types/widgets';

let idCounter = 0;

// `tom-select` is an optional peer dependency — typed loosely.
interface TomSelectInstance {
  setValue: (value: string | string[], silent?: boolean) => void;
  destroy: () => void;
}

/**
 * Labeled enhanced `<select>` backed by {@link https://tom-select.js.org/ Tom Select}
 * (an optional peer dep, lazily imported on the browser only). Supports single or
 * `[multiple]` selection. Two-way bind with `[(value)]`; also a ControlValueAccessor.
 */
@Component({
  selector: 'lte-input-tom-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputTomSelectComponent), multi: true },
  ],
  template: `
    <div [class]="'mb-3 ' + fgroupClass()">
      @if (label()) {
        <label [for]="id()" class="form-label">{{ label() }}</label>
      }
      <select #host [id]="id()" [multiple]="multiple()">
        @for (opt of options(); track opt.value) {
          <option [value]="opt.value">{{ opt.text }}</option>
        }
      </select>
    </div>
  `,
})
export class InputTomSelectComponent implements ControlValueAccessor {
  private readonly host = viewChild.required<ElementRef<HTMLSelectElement>>('host');
  private readonly isBrowser: boolean;
  private instance: TomSelectInstance | null = null;
  private initialized = false;

  readonly label = input<string>();
  readonly placeholder = input<string>('');
  readonly fgroupClass = input<string>('');
  readonly multiple = input<boolean>(false);
  readonly options = input<TomSelectOption[]>([]);
  readonly id = input<string>(`lte-tomselect-${idCounter++}`);
  /** Extra Tom Select settings merged over the defaults. */
  readonly settings = input<Record<string, unknown>>({});
  readonly value = model<string | string[]>('');

  private onChange: (value: string | string[]) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    effect(() => {
      const v = this.value();
      if (!this.isBrowser) return;
      if (!this.initialized) {
        this.initialized = true;
        void this.init(v);
      } else if (this.instance && v != null) {
        this.instance.setValue(v, true);
      }
    });

    inject(DestroyRef).onDestroy(() => {
      this.instance?.destroy();
      this.instance = null;
    });
  }

  private async init(initial: string | string[]): Promise<void> {
    try {
      const mod = await import('tom-select');
      const TomSelect = (mod.default ?? mod) as unknown as new (
        el: Element,
        settings: Record<string, unknown>,
      ) => TomSelectInstance;
      this.instance = new TomSelect(this.host().nativeElement, {
        options: this.options(),
        placeholder: this.placeholder() || undefined,
        ...this.settings(),
        onChange: (value: string | string[]) => {
          this.value.set(value);
          this.onChange(value);
          this.onTouched();
        },
      });
      if (initial != null && initial !== '') this.instance.setValue(initial, true);
    } catch {
      console.warn('[adminlte-angular] tom-select is not installed — <lte-input-tom-select> is a plain select.');
    }
  }

  writeValue(value: string | string[] | null): void {
    this.value.set(value ?? '');
  }
  registerOnChange(fn: (value: string | string[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}

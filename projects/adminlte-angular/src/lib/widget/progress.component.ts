import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '../util/class-name';
import type { BootstrapTheme, ComponentSize } from '../types/theme';

/** Bootstrap progress bar with theme, size, striped/animated and label options. */
@Component({
  selector: 'lte-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="progress"
      [class.progress-sm]="size() === 'sm'"
      [class.progress-lg]="size() === 'lg'"
      [style.height]="height() || null"
      role="progressbar"
      [attr.aria-valuenow]="value()"
      aria-valuemin="0"
      [attr.aria-valuemax]="max()"
    >
      <div [class]="barClass()" [style.width.%]="pct()">
        @if (showLabel()) {
          {{ pct() }}%
        }
      </div>
    </div>
  `,
})
export class ProgressComponent {
  readonly value = input.required<number>();
  readonly max = input<number>(100);
  readonly theme = input<BootstrapTheme>('primary');
  readonly size = input<ComponentSize>();
  readonly striped = input<boolean>(false);
  readonly animated = input<boolean>(false);
  readonly showLabel = input<boolean>(false);
  readonly height = input<string>();

  readonly pct = computed(() =>
    Math.round(Math.min(100, Math.max(0, (this.value() / this.max()) * 100))),
  );

  readonly barClass = computed(() =>
    cn(
      'progress-bar',
      `bg-${this.theme()}`,
      this.striped() && 'progress-bar-striped',
      this.animated() && 'progress-bar-animated',
    ),
  );
}

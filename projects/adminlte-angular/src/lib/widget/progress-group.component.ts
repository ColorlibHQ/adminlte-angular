import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { BootstrapTheme } from '../types/theme';

/** A labeled `value/max` progress row, as used in AdminLTE stat cards. */
@Component({
  selector: 'lte-progress-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="progress-group">
      <span class="progress-text">{{ label() }}</span>
      <span class="float-end"><b>{{ value() }}</b>/{{ max() }}</span>
      <div class="progress progress-sm">
        <div class="progress-bar" [class]="'bg-' + theme()" [style.width.%]="pct()"></div>
      </div>
    </div>
  `,
})
export class ProgressGroupComponent {
  readonly label = input.required<string>();
  readonly value = input.required<number>();
  readonly max = input<number>(100);
  readonly theme = input<BootstrapTheme>('primary');

  readonly pct = computed(() =>
    Math.min(100, Math.max(0, (this.value() / this.max()) * 100)),
  );
}

import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { BootstrapTheme } from '../types/theme';

/** Star rating display supporting half-stars and an optional `value/max` label. */
@Component({
  selector: 'lte-ratings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ratings d-inline-flex align-items-center gap-1">
      @for (star of stars(); track $index) {
        <i class="bi {{ star }} text-{{ theme() }}" aria-hidden="true"></i>
      }
      @if (showText()) {
        <span class="ms-2 text-secondary">{{ value() }}/{{ max() }}</span>
      }
    </div>
  `,
})
export class RatingsComponent {
  readonly value = input.required<number>();
  readonly max = input<number>(5);
  readonly theme = input<BootstrapTheme>('warning');
  readonly showText = input<boolean>(false);

  readonly stars = computed(() =>
    Array.from({ length: this.max() }, (_, i) => {
      const n = i + 1;
      if (this.value() >= n) return 'bi-star-fill';
      if (this.value() >= n - 0.5) return 'bi-star-half';
      return 'bi-star';
    }),
  );
}

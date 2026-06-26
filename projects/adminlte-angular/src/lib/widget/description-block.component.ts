import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { biClass } from '../util/class-name';
import type { BootstrapTheme } from '../types/theme';

/**
 * Description block (used inside card footers): a big header value, a label, and
 * an optional trend percentage (green up / red down).
 */
@Component({
  selector: 'lte-description-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="description-block">
      @if (percentage() != null) {
        <span class="description-percentage" [class.text-success]="positive()" [class.text-danger]="!positive()">
          <i class="bi" [class.bi-caret-up-fill]="positive()" [class.bi-caret-down-fill]="!positive()"></i>
          {{ absPercentage() }}%
        </span>
      }
      <h5 class="description-header">
        @if (icon()) {
          <i class="{{ biClass(icon()) }} me-1" [class]="iconTheme() ? 'text-' + iconTheme() : ''"></i>
        }
        {{ header() }}
      </h5>
      <span class="description-text">{{ text() }}</span>
      <ng-content />
    </div>
  `,
})
export class DescriptionBlockComponent {
  readonly header = input.required<string>();
  readonly text = input<string>();
  readonly icon = input<string>();
  readonly iconTheme = input<BootstrapTheme>();
  readonly percentage = input<number>();

  readonly biClass = biClass;

  readonly positive = computed(() => (this.percentage() ?? 0) >= 0);
  readonly absPercentage = computed(() => Math.abs(this.percentage() ?? 0));
}

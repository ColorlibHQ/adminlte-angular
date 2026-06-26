import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cn } from '../util/class-name';
import type { BootstrapTheme, ComponentSize } from '../types/theme';

/**
 * Bootstrap button with theme, size, outline and loading states. Renders a real
 * `<button>` so it participates in forms; project the label into the slot.
 */
@Component({
  selector: 'lte-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button [type]="type()" [class]="btnClass()" [disabled]="disabled() || loading()">
      @if (loading()) {
        <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
      } @else if (icon()) {
        <i class="bi {{ icon() }} me-1"></i>
      }
      <ng-content />
    </button>
  `,
})
export class ButtonComponent {
  readonly theme = input<BootstrapTheme>('primary');
  readonly size = input<ComponentSize>();
  readonly outline = input<boolean>(false);
  readonly block = input<boolean>(false);
  readonly icon = input<string>();
  readonly loading = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  readonly btnClass = computed(() =>
    cn(
      'btn',
      this.outline() ? `btn-outline-${this.theme()}` : `btn-${this.theme()}`,
      this.size() && `btn-${this.size()}`,
      this.block() && 'w-100',
    ),
  );
}

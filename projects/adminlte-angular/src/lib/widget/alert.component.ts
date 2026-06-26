import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { biClass, cn } from '../util/class-name';
import type { BootstrapTheme } from '../types/theme';

/**
 * Bootstrap alert with optional icon, title and dismiss button. `show` is a
 * two-way model so it can be controlled (`[(show)]`) or left uncontrolled.
 */
@Component({
  selector: 'lte-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (show()) {
      <div [class]="alertClass()" role="alert">
        @if (title() || icon()) {
          <h5>
            @if (icon()) {
              <i class="{{ biClass(icon()) }} me-2"></i>
            }
            {{ title() }}
          </h5>
        }
        <ng-content />
        @if (dismissible()) {
          <button type="button" class="btn-close" aria-label="Close" (click)="dismiss()"></button>
        }
      </div>
    }
  `,
})
export class AlertComponent {
  readonly theme = input<BootstrapTheme>('info');
  readonly icon = input<string>();
  readonly title = input<string>();
  readonly dismissible = input<boolean>(false);
  readonly show = model<boolean>(true);

  readonly biClass = biClass;

  readonly alertClass = computed(() =>
    cn('alert', `alert-${this.theme()}`, this.dismissible() && 'alert-dismissible'),
  );

  dismiss(): void {
    this.show.set(false);
  }
}

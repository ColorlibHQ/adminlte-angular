import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { biClass, cn } from '../util/class-name';
import type { BootstrapTheme } from '../types/theme';

/**
 * Compact info box with a colored icon chip, a label/number, and an optional
 * progress bar. `variant: 'solid'` colors the whole box.
 */
@Component({
  selector: 'lte-info-box',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="boxClass()">
      @if (icon()) {
        <span [class]="iconClass()">
          <i class="{{ biClass(icon()) }}" aria-hidden="true"></i>
        </span>
      }
      <div class="info-box-content">
        @if (text()) {
          <span class="info-box-text">{{ text() }}</span>
        }
        @if (title() != null) {
          <span class="info-box-number">{{ title() }} @if (unit()) {<small>{{ unit() }}</small>}</span>
        }
        <ng-content />
        @if (progress() != null) {
          <div class="progress">
            <div [class]="barClass()" [style.width.%]="progress()"></div>
          </div>
          @if (progressText()) {
            <span class="progress-description">{{ progressText() }}</span>
          }
        }
      </div>
    </div>
  `,
})
export class InfoBoxComponent {
  readonly title = input<string | number>();
  readonly text = input<string>('');
  readonly icon = input<string>();
  readonly theme = input<BootstrapTheme>('info');
  readonly iconTheme = input<BootstrapTheme>();
  readonly variant = input<'default' | 'solid'>('default');
  readonly gradient = input<boolean>(false);
  readonly boxClassExtra = input<string>('');
  readonly unit = input<string>();
  readonly progress = input<number>();
  readonly progressText = input<string>();

  readonly biClass = biClass;

  readonly boxClass = computed(() =>
    cn(
      'info-box',
      this.variant() === 'solid' && `text-bg-${this.theme()}`,
      this.variant() === 'solid' && this.gradient() && 'bg-gradient',
      this.boxClassExtra(),
    ),
  );

  readonly iconClass = computed(() =>
    this.variant() === 'solid'
      ? 'info-box-icon'
      : `info-box-icon text-bg-${this.iconTheme() ?? this.theme()} shadow-sm`,
  );

  readonly barClass = computed(() =>
    this.variant() === 'solid' ? 'progress-bar' : `progress-bar bg-${this.theme()}`,
  );
}

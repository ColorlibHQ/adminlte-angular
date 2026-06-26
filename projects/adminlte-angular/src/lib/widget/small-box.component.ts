import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { BootstrapTheme } from '../types/theme';

/**
 * Colored stat box (`small-box`) with a big number, label, icon and a "More
 * info" footer link. Light/warning backgrounds get a dark footer link for
 * contrast — matching the React/Vue ports.
 */
@Component({
  selector: 'lte-small-box',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="'small-box text-bg-' + theme()">
      <div class="inner">
        <h3>{{ title() }}</h3>
        <p>{{ text() }}<ng-content /></p>
      </div>
      @if (icon()) {
        <i class="small-box-icon bi {{ icon() }}"></i>
      }
      @if (loading()) {
        <div class="overlay">
          <i class="bi bi-arrow-repeat spinner-border-sm"></i>
        </div>
      }
      @if (url()) {
        <a [href]="url()" [class]="footerClass()">
          {{ urlText() }} <i class="bi bi-link-45deg"></i>
        </a>
      }
    </div>
  `,
})
export class SmallBoxComponent {
  readonly title = input<string | number>();
  readonly text = input<string>('');
  readonly icon = input<string>();
  readonly theme = input<BootstrapTheme>('primary');
  readonly url = input<string>();
  readonly urlText = input<string>('More info');
  readonly loading = input<boolean>(false);

  private readonly linkColor = computed(() =>
    this.theme() === 'warning' || this.theme() === 'light' ? 'link-dark' : 'link-light',
  );

  readonly footerClass = computed(
    () =>
      `small-box-footer ${this.linkColor()} link-underline-opacity-0 link-underline-opacity-50-hover`,
  );
}

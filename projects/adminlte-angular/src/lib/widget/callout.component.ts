import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { BootstrapTheme } from '../types/theme';

/** AdminLTE callout box — a bordered, lightly-tinted notice. */
@Component({
  selector: 'lte-callout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="'callout callout-' + theme()">
      @if (title()) {
        <h5>{{ title() }}</h5>
      }
      <ng-content />
    </div>
  `,
})
export class CalloutComponent {
  readonly theme = input<BootstrapTheme>('info');
  readonly title = input<string>();
}

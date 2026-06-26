import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

/**
 * A single tab panel. Must be a content child of {@link TabsComponent}. The host
 * carries the panel data (`tabId`, `title`, `icon`, `disabled`); project the panel
 * body into its default slot. Active state is driven by the parent.
 */
@Component({
  selector: 'lte-tab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="tab-pane fade" [class.show]="active()" [class.active]="active()" role="tabpanel" [hidden]="!active()">
      <ng-content />
    </div>
  `,
})
export class TabComponent {
  /** Unique id used to select this tab. */
  readonly tabId = input.required<string>();
  readonly title = input.required<string>();
  readonly icon = input<string>();
  readonly disabled = input<boolean>(false);

  /** Active flag, toggled by the parent {@link TabsComponent}. */
  readonly active = signal(false);
}

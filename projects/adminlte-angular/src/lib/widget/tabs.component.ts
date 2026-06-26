import {
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  effect,
  input,
  model,
} from '@angular/core';
import { biClass } from '../util/class-name';
import { TabComponent } from './tab.component';

/**
 * Tab container that renders a nav strip from its projected `<lte-tab>` children
 * and toggles their panels. `[(active)]` two-way binds the active tab id; when
 * unset it defaults to the first non-disabled tab.
 */
@Component({
  selector: 'lte-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="nav" [class.nav-tabs]="!pills()" [class.nav-pills]="pills()" [class.nav-justified]="justified()" role="tablist">
      @for (tab of tabs(); track tab.tabId()) {
        <li class="nav-item" role="presentation">
          <button
            type="button"
            class="nav-link"
            [class.active]="tab.active()"
            [class.disabled]="tab.disabled()"
            role="tab"
            [attr.aria-selected]="tab.active()"
            [disabled]="tab.disabled()"
            (click)="select(tab.tabId())"
          >
            @if (tab.icon()) {
              <i class="{{ biClass(tab.icon()!) }} me-1"></i>
            }
            {{ tab.title() }}
          </button>
        </li>
      }
    </ul>
    <div class="tab-content pt-3">
      <ng-content />
    </div>
  `,
})
export class TabsComponent {
  readonly pills = input<boolean>(false);
  readonly justified = input<boolean>(false);
  /** Two-way bound active tab id. */
  readonly active = model<string>();

  readonly tabs = contentChildren(TabComponent);

  readonly biClass = biClass;

  constructor() {
    // Keep each child panel's active flag in sync with the active id, defaulting
    // to the first non-disabled tab when none is selected.
    effect(() => {
      const tabs = this.tabs();
      if (tabs.length === 0) return;
      let current = this.active();
      const known = tabs.some((t) => t.tabId() === current);
      if (!current || !known) {
        current = (tabs.find((t) => !t.disabled()) ?? tabs[0]).tabId();
      }
      for (const tab of tabs) tab.active.set(tab.tabId() === current);
    });
  }

  select(id: string): void {
    const tab = this.tabs().find((t) => t.tabId() === id);
    if (tab?.disabled()) return;
    this.active.set(id);
  }
}

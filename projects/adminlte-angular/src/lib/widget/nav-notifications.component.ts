import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { biClass } from '../util/class-name';
import type { BootstrapTheme } from '../types/theme';
import type { NavNotification } from '../types/widgets';

/**
 * Topbar notifications dropdown (`<li class="nav-item dropdown">`). Drop it into
 * the topbar's `[topbar-end]` slot. Uses Bootstrap's dropdown JS.
 */
@Component({
  selector: 'lte-nav-notifications, [lte-nav-notifications]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'nav-item dropdown' },
  template: `
    <a class="nav-link" data-bs-toggle="dropdown" href="#" (click)="$event.preventDefault()">
      <i class="bi bi-bell-fill"></i>
      @if (notifications().length) {
        <span class="navbar-badge badge text-bg-{{ badgeColor() }}">{{ count() ?? notifications().length }}</span>
      }
    </a>
    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end">
      <span class="dropdown-item dropdown-header">{{ count() ?? notifications().length }} Notifications</span>
      @for (n of notifications(); track $index) {
        <div class="dropdown-divider"></div>
        <a [href]="n.url || '#'" class="dropdown-item">
          <i class="{{ biClass(n.icon || 'bi-info-circle') }} {{ n.iconTheme ? 'text-' + n.iconTheme : '' }} me-2"></i>
          {{ n.text }}
          @if (n.time) {
            <span class="float-end text-secondary fs-7">{{ n.time }}</span>
          }
        </a>
      }
      <div class="dropdown-divider"></div>
      <a [href]="seeAllUrl()" class="dropdown-item dropdown-footer">{{ seeAllText() }}</a>
    </div>
  `,
})
export class NavNotificationsComponent {
  readonly notifications = input.required<NavNotification[]>();
  readonly badgeColor = input<BootstrapTheme>('warning');
  readonly count = input<number | string>();
  readonly seeAllUrl = input<string>('#');
  readonly seeAllText = input<string>('See All Notifications');

  readonly biClass = biClass;
}

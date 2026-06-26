import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { BootstrapTheme } from '../types/theme';
import type { NavTask } from '../types/widgets';

/**
 * Topbar tasks dropdown (`<li class="nav-item dropdown">`) with per-task progress
 * bars. Drop it into the topbar's `[topbar-end]` slot. Uses Bootstrap's dropdown JS.
 */
@Component({
  selector: 'lte-nav-tasks, [lte-nav-tasks]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'nav-item dropdown' },
  template: `
    <a class="nav-link" data-bs-toggle="dropdown" href="#" (click)="$event.preventDefault()">
      <i class="bi bi-list-check"></i>
      @if (tasks().length) {
        <span class="navbar-badge badge text-bg-{{ badgeColor() }}">{{ count() ?? tasks().length }}</span>
      }
    </a>
    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end">
      <span class="dropdown-item dropdown-header">{{ tasks().length }} Tasks</span>
      @for (task of tasks(); track $index) {
        <div class="dropdown-divider"></div>
        <a [href]="task.url || '#'" class="dropdown-item">
          <h3 class="dropdown-item-title">
            {{ task.text }}
            <span class="float-end fs-7">{{ task.progress }}%</span>
          </h3>
          <div class="progress progress-sm">
            <div class="progress-bar" [class]="'bg-' + (task.theme || badgeColor())" [style.width.%]="task.progress"></div>
          </div>
        </a>
      }
      <div class="dropdown-divider"></div>
      <a [href]="seeAllUrl()" class="dropdown-item dropdown-footer">{{ seeAllText() }}</a>
    </div>
  `,
})
export class NavTasksComponent {
  readonly tasks = input.required<NavTask[]>();
  readonly badgeColor = input<BootstrapTheme>('success');
  readonly count = input<number | string>();
  readonly seeAllUrl = input<string>('#');
  readonly seeAllText = input<string>('View All Tasks');
}

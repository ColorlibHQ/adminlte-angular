import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Breadcrumb } from '../types/layout';

/** Standalone breadcrumb trail. The last item renders as the active page. */
@Component({
  selector: 'lte-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        @for (crumb of items(); track $index; let last = $last) {
          <li class="breadcrumb-item" [class.active]="last" [attr.aria-current]="last ? 'page' : null">
            @if (!last && crumb.route) {
              <a [routerLink]="crumb.route">{{ crumb.label }}</a>
            } @else if (!last && crumb.href) {
              <a [href]="crumb.href">{{ crumb.label }}</a>
            } @else {
              {{ crumb.label }}
            }
          </li>
        }
      </ol>
    </nav>
  `,
})
export class BreadcrumbComponent {
  readonly items = input.required<Breadcrumb[]>();
}

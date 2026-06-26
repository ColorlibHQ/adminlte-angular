import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Breadcrumb } from '../types/layout';

/**
 * Page content wrapper with an optional header row (title + breadcrumbs) above a
 * `container`/`container-fluid` body. Project the page body into the default slot.
 */
@Component({
  selector: 'lte-app-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    @if (title() || breadcrumbs().length) {
      <div class="app-content-header">
        <div [class]="containerClass()">
          <div class="row">
            <div class="col-sm-6">
              @if (title()) {
                <h3 class="mb-0">{{ title() }}</h3>
              }
            </div>
            @if (breadcrumbs().length) {
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-end">
                  @for (crumb of breadcrumbs(); track $index; let last = $last) {
                    <li class="breadcrumb-item" [class.active]="last" [attr.aria-current]="last ? 'page' : null">
                      @if ((crumb.route || crumb.href) && !last) {
                        @if (crumb.route) {
                          <a [routerLink]="crumb.route">{{ crumb.label }}</a>
                        } @else {
                          <a [href]="crumb.href">{{ crumb.label }}</a>
                        }
                      } @else {
                        {{ crumb.label }}
                      }
                    </li>
                  }
                </ol>
              </div>
            }
          </div>
        </div>
      </div>
    }

    <div class="app-content">
      <div [class]="containerClass()">
        <ng-content />
      </div>
    </div>
  `,
})
export class AppContentComponent {
  readonly title = input<string>();
  readonly breadcrumbs = input<Breadcrumb[]>([]);
  readonly fluid = input<boolean>(true);

  readonly containerClass = computed(() => (this.fluid() ? 'container-fluid' : 'container-lg'));
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { BootstrapTheme } from '../types/theme';
import type { NavMessage } from '../types/widgets';

/**
 * Topbar messages dropdown (`<li class="nav-item dropdown">`). Drop it into the
 * topbar's `[topbar-end]` slot. Uses Bootstrap's dropdown JS (`data-bs-toggle`).
 */
@Component({
  selector: 'lte-nav-messages, [lte-nav-messages]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'nav-item dropdown' },
  template: `
    <a class="nav-link" data-bs-toggle="dropdown" href="#" (click)="$event.preventDefault()">
      <i class="bi bi-chat-text"></i>
      @if (messages().length) {
        <span class="navbar-badge badge text-bg-{{ badgeColor() }}">{{ count() ?? messages().length }}</span>
      }
    </a>
    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end">
      @for (msg of messages(); track $index) {
        <a [href]="msg.url || '#'" class="dropdown-item">
          <div class="d-flex">
            @if (msg.image) {
              <div class="flex-shrink-0">
                <img [src]="msg.image" alt="User Avatar" class="img-size-50 rounded-circle me-3" />
              </div>
            }
            <div class="flex-grow-1">
              <h3 class="dropdown-item-title">
                {{ msg.from }}
                @if (msg.star) {
                  <span class="float-end fs-7 text-{{ msg.star }}"><i class="bi bi-star-fill"></i></span>
                }
              </h3>
              <p class="fs-7">{{ msg.text }}</p>
              @if (msg.time) {
                <p class="fs-7 text-secondary"><i class="bi bi-clock-fill me-1"></i> {{ msg.time }}</p>
              }
            </div>
          </div>
        </a>
        <div class="dropdown-divider"></div>
      }
      <a [href]="seeAllUrl()" class="dropdown-item dropdown-footer">{{ seeAllText() }}</a>
    </div>
  `,
})
export class NavMessagesComponent {
  readonly messages = input.required<NavMessage[]>();
  readonly badgeColor = input<BootstrapTheme>('danger');
  readonly count = input<number | string>();
  readonly seeAllUrl = input<string>('#');
  readonly seeAllText = input<string>('See All Messages');
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FullscreenService } from '../services/fullscreen.service';

/**
 * Topbar button that toggles browser fullscreen. The host is the navbar `<li>`.
 */
@Component({
  selector: 'li[lte-fullscreen-toggle]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'nav-item' },
  template: `
    <button
      type="button"
      class="nav-link"
      [title]="fullscreen.isFullscreen() ? 'Exit fullscreen' : 'Fullscreen'"
      (click)="fullscreen.toggle()"
    >
      <i class="bi" [class.bi-fullscreen-exit]="fullscreen.isFullscreen()" [class.bi-arrows-fullscreen]="!fullscreen.isFullscreen()"></i>
    </button>
  `,
})
export class FullscreenToggleComponent {
  readonly fullscreen = inject(FullscreenService);
}

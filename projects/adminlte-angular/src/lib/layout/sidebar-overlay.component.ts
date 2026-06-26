import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

/**
 * Click/touch backdrop shown behind the mobile off-canvas sidebar. Tapping it
 * collapses the sidebar.
 */
@Component({
  selector: 'lte-sidebar-overlay',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'sidebar-overlay',
    role: 'presentation',
    '(click)': 'sidebar.collapse()',
    '(touchend)': 'sidebar.collapse()',
  },
  template: ``,
})
export class SidebarOverlayComponent {
  readonly sidebar = inject(SidebarService);
}

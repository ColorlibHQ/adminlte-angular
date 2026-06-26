import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SidebarBrandComponent } from './sidebar-brand.component';
import { SidebarNavComponent } from './sidebar-nav.component';
import { SidebarOverlayComponent } from './sidebar-overlay.component';
import { cn } from '../util/class-name';
import type { MenuNode } from '../types/menu';
import type { SidebarTheme } from '../types/theme';

/**
 * The off-canvas application sidebar: brand header + scrollable config-driven
 * menu, plus the mobile overlay. The `theme` controls the local `data-bs-theme`
 * so the sidebar can be dark while the page is light (and vice versa).
 */
@Component({
  selector: 'lte-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SidebarBrandComponent, SidebarNavComponent, SidebarOverlayComponent],
  // Transparent host so the inner <aside class="app-sidebar"> is the real grid
  // item (grid-area: lte-app-sidebar); the fixed overlay takes no grid track.
  styles: ':host { display: contents; }',
  template: `
    <aside [class]="asideClass()" [attr.data-bs-theme]="theme()">
      <lte-sidebar-brand [logo]="logo()" [href]="logoHref()" [brandText]="brandText()" />
      <div class="sidebar-wrapper">
        <lte-sidebar-nav
          [items]="items()"
          [currentPath]="currentPath()"
          [accordion]="accordion()"
          [animationSpeed]="animationSpeed()"
        />
      </div>
    </aside>

    <lte-sidebar-overlay />
  `,
})
export class SidebarComponent {
  readonly items = input<MenuNode[]>([]);
  readonly logo = input<string>();
  readonly logoHref = input<string>('/');
  readonly brandText = input<string>('AdminLTE 4');
  readonly theme = input<SidebarTheme>('dark');
  readonly sidebarClass = input<string>('bg-body-secondary shadow');
  readonly currentPath = input<string>('/');
  readonly accordion = input<boolean>(false);
  readonly animationSpeed = input<number>(300);

  readonly asideClass = () => cn('app-sidebar', this.sidebarClass());
}

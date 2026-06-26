import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { DashboardLayoutComponent } from '@adminlte/angular';
import type { TopbarUser } from '@adminlte/angular';
import { MENU } from './menu';

/**
 * The dashboard shell: hosts the AdminLTE layout and a router outlet for the
 * dashboard pages. `currentPath` is fed from router events so the sidebar
 * highlights the active link and auto-opens its parent group.
 */
@Component({
  selector: 'app-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DashboardLayoutComponent, RouterOutlet],
  template: `
    <lte-dashboard-layout
      [menuItems]="menu"
      [user]="user"
      brandText="AdminLTE 4"
      [currentPath]="currentPath()"
      [accordion]="true"
      [fixedHeader]="true"
      [enableSidebarPersistence]="true"
      (logout)="onLogout()"
    >
      <router-outlet />
      <span footer>
        <b>Version</b> 4.0.0 &mdash; the Angular 22 port.
      </span>
    </lte-dashboard-layout>
  `,
})
export class ShellComponent {
  private readonly router = inject(Router);

  readonly menu = MENU;
  readonly user: TopbarUser = {
    name: 'Jane Developer',
    image: 'https://www.gravatar.com/avatar/?d=mp&s=160',
    role: 'Angular Engineer',
    memberSince: 'Jan. 2026',
  };

  readonly currentPath = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map((e) => e.urlAfterRedirects.split('?')[0]),
      startWith(this.router.url.split('?')[0]),
    ),
    { initialValue: '/' },
  );

  onLogout(): void {
    void this.router.navigateByUrl('/login');
  }
}

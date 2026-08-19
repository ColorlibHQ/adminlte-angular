import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import {
  DashboardLayoutComponent,
  NavMessagesComponent,
  NavNotificationsComponent,
  NavTasksComponent,
} from '@adminlte/angular';
import type {
  TopbarUser,
  NavMessage,
  NavNotification,
  NavTask,
} from '@adminlte/angular';
import { MENU } from './menu';

/**
 * The dashboard shell: hosts the AdminLTE layout and a router outlet for the
 * dashboard pages. `currentPath` is fed from router events so the sidebar
 * highlights the active link and auto-opens its parent group.
 */
@Component({
  selector: 'app-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DashboardLayoutComponent,
    RouterOutlet,
    NavMessagesComponent,
    NavNotificationsComponent,
    NavTasksComponent,
  ],
  template: `
    <lte-dashboard-layout
      [menuItems]="menu"
      [user]="user"
      brandText="AdminLTE 4"
      logo="/AdminLTELogo.png"
      [currentPath]="currentPath()"
      [accordion]="true"
      [fixedHeader]="true"
      [enableSidebarPersistence]="true"
      (logout)="onLogout()"
    >
      <ng-container topbar-end>
        <li lte-nav-messages [messages]="messages"></li>
        <li lte-nav-notifications [notifications]="notifications"></li>
        <li lte-nav-tasks [tasks]="tasks"></li>
      </ng-container>
      <router-outlet />
      <span footer>
        <b>Version</b> 4.8.1 &mdash; the Angular 22 port.
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

  readonly messages: NavMessage[] = [
    { from: 'Brad Diesel', text: 'Call me whenever you can…', image: 'https://www.gravatar.com/avatar/?d=mp&s=50', time: '4 hours ago', star: 'warning' },
    { from: 'John Pierce', text: 'I got your message bro', image: 'https://www.gravatar.com/avatar/?d=mp&s=50', time: '4 hours ago' },
  ];
  readonly notifications: NavNotification[] = [
    { text: '4 new members joined', icon: 'bi-people-fill', iconTheme: 'info', time: '3 mins' },
    { text: '8 friend requests', icon: 'bi-person-plus-fill', iconTheme: 'danger', time: '12 hours' },
    { text: '3 new reports', icon: 'bi-file-earmark-fill', iconTheme: 'warning', time: '2 days' },
  ];
  readonly tasks: NavTask[] = [
    { text: 'Design new dashboard', progress: 85, theme: 'success' },
    { text: 'Create documentation', progress: 50, theme: 'info' },
    { text: 'QA the release build', progress: 20, theme: 'danger' },
  ];

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

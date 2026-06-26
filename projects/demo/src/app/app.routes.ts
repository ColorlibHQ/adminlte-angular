import type { Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

/**
 * The login page lives outside the dashboard shell (auth layout). Everything else
 * is a child of the shell so it renders inside the AdminLTE layout.
 */
export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login.page').then((m) => m.LoginPage),
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard.page').then((m) => m.DashboardPage),
      },
      {
        path: 'widgets',
        loadComponent: () => import('./pages/widgets.page').then((m) => m.WidgetsPage),
      },
      {
        path: 'forms',
        loadComponent: () => import('./pages/forms.page').then((m) => m.FormsPage),
      },
      {
        path: 'components',
        loadComponent: () => import('./pages/components.page').then((m) => m.ComponentsPage),
      },
      {
        path: 'tables',
        loadComponent: () => import('./pages/placeholder.page').then((m) => m.PlaceholderPage),
        data: { title: 'Tables' },
      },
      {
        path: 'nested/:id',
        loadComponent: () => import('./pages/placeholder.page').then((m) => m.PlaceholderPage),
        data: { title: 'Nested page' },
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

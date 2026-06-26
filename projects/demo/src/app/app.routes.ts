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
      { path: 'profile', loadComponent: () => import('./pages/profile.page').then((m) => m.ProfilePage) },
      { path: 'settings', loadComponent: () => import('./pages/settings.page').then((m) => m.SettingsPage) },
      { path: 'pricing', loadComponent: () => import('./pages/pricing.page').then((m) => m.PricingPage) },
      { path: 'faq', loadComponent: () => import('./pages/faq.page').then((m) => m.FaqPage) },
      { path: 'invoice', loadComponent: () => import('./pages/invoice.page').then((m) => m.InvoicePage) },
      { path: 'projects', loadComponent: () => import('./pages/projects.page').then((m) => m.ProjectsPage) },
    ],
  },
  { path: '404', loadComponent: () => import('./pages/notfound.page').then((m) => m.NotFoundPage) },
  { path: '500', loadComponent: () => import('./pages/server-error.page').then((m) => m.ServerErrorPage) },
  { path: 'maintenance', loadComponent: () => import('./pages/maintenance.page').then((m) => m.MaintenancePage) },
  { path: '**', loadComponent: () => import('./pages/notfound.page').then((m) => m.NotFoundPage) },
];

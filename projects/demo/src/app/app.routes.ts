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
      // Widgets
      { path: 'widgets/small-box', loadComponent: () => import('./pages/widgets-small-box.page').then((m) => m.WidgetsSmallBoxPage) },
      { path: 'widgets/info-box', loadComponent: () => import('./pages/widgets-info-box.page').then((m) => m.WidgetsInfoBoxPage) },
      { path: 'widgets/cards', loadComponent: () => import('./pages/widgets-cards.page').then((m) => m.WidgetsCardsPage) },
      // UI Elements
      { path: 'ui/general', loadComponent: () => import('./pages/ui-general.page').then((m) => m.UiGeneralPage) },
      { path: 'ui/icons', loadComponent: () => import('./pages/ui-icons.page').then((m) => m.UiIconsPage) },
      { path: 'ui/timeline', loadComponent: () => import('./pages/ui-timeline.page').then((m) => m.UiTimelinePage) },
      // Forms
      { path: 'forms/elements', loadComponent: () => import('./pages/forms-elements.page').then((m) => m.FormsElementsPage) },
      { path: 'forms/layout', loadComponent: () => import('./pages/forms-layout.page').then((m) => m.FormsLayoutPage) },
      { path: 'forms/validation', loadComponent: () => import('./pages/forms-validation.page').then((m) => m.FormsValidationPage) },
      // Tables
      { path: 'tables/simple', loadComponent: () => import('./pages/tables-simple.page').then((m) => m.TablesSimplePage) },
      { path: 'tables/data', loadComponent: () => import('./pages/tables-data.page').then((m) => m.TablesDataPage) },
      // Components showcase
      { path: 'components', loadComponent: () => import('./pages/components.page').then((m) => m.ComponentsPage) },
      // Example pages
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

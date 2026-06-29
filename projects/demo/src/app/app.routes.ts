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
  { path: 'login-v2', loadComponent: () => import('./pages/login-v2.page').then((m) => m.LoginV2Page) },
  { path: 'register', loadComponent: () => import('./pages/register.page').then((m) => m.RegisterPage) },
  { path: 'register-v2', loadComponent: () => import('./pages/register-v2.page').then((m) => m.RegisterV2Page) },
  { path: 'lockscreen', loadComponent: () => import('./pages/lockscreen.page').then((m) => m.LockscreenPage) },
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard.page').then((m) => m.DashboardPage),
      },
      { path: 'dashboard/v2', loadComponent: () => import('./pages/dashboard2.page').then((m) => m.Dashboard2Page) },
      { path: 'dashboard/v3', loadComponent: () => import('./pages/dashboard3.page').then((m) => m.Dashboard3Page) },
      // Mailbox
      { path: 'mailbox/inbox', loadComponent: () => import('./pages/mailbox-inbox.page').then((m) => m.MailboxInboxPage) },
      { path: 'mailbox/compose', loadComponent: () => import('./pages/mailbox-compose.page').then((m) => m.MailboxComposePage) },
      { path: 'mailbox/read', loadComponent: () => import('./pages/mailbox-read.page').then((m) => m.MailboxReadPage) },
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
      { path: 'forms/wizard', loadComponent: () => import('./pages/forms-wizard.page').then((m) => m.FormsWizardPage) },
      { path: 'forms/editor', loadComponent: () => import('./pages/forms-editor.page').then((m) => m.FormsEditorPage) },
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
      { path: 'calendar', loadComponent: () => import('./pages/calendar.page').then((m) => m.CalendarPage) },
      { path: 'kanban', loadComponent: () => import('./pages/kanban.page').then((m) => m.KanbanPage) },
      { path: 'chat', loadComponent: () => import('./pages/chat.page').then((m) => m.ChatPage) },
      { path: 'file-manager', loadComponent: () => import('./pages/file-manager.page').then((m) => m.FileManagerPage) },
    ],
  },
  { path: '404', loadComponent: () => import('./pages/notfound.page').then((m) => m.NotFoundPage) },
  { path: '500', loadComponent: () => import('./pages/server-error.page').then((m) => m.ServerErrorPage) },
  { path: 'maintenance', loadComponent: () => import('./pages/maintenance.page').then((m) => m.MaintenancePage) },
  { path: '**', loadComponent: () => import('./pages/notfound.page').then((m) => m.NotFoundPage) },
];

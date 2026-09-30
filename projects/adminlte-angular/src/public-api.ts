/*
 * Public API surface of @adminlte/angular.
 */

// Types
export type * from './lib/types';

// Services
export * from './lib/services';

// Utilities
export { cn, biClass } from './lib/util/class-name';
export { flattenMenuToCommands } from './lib/util/flatten-menu';

// Charts (Chart.js theme preset)
export {
  applyChartDefaults,
  verticalGradient,
  withAlpha,
  type ChartPalette,
  type ChartThemeColor,
} from './lib/chart/chart-theme';

// Layout
export { DashboardLayoutComponent } from './lib/layout/dashboard-layout.component';
export { AuthLayoutComponent } from './lib/layout/auth-layout.component';
export { AppContentComponent } from './lib/layout/app-content.component';
export { TopbarComponent } from './lib/layout/topbar.component';
export { SidebarComponent } from './lib/layout/sidebar.component';
export { SidebarBrandComponent } from './lib/layout/sidebar-brand.component';
export { SidebarNavComponent } from './lib/layout/sidebar-nav.component';
export { SidebarNavItemComponent } from './lib/layout/sidebar-nav-item.component';
export { SidebarOverlayComponent } from './lib/layout/sidebar-overlay.component';
export { FooterComponent } from './lib/layout/footer.component';
export { ColorModeToggleComponent } from './lib/layout/color-mode-toggle.component';
export { FullscreenToggleComponent } from './lib/layout/fullscreen-toggle.component';

// Widgets
export { CardComponent } from './lib/widget/card.component';
export { SmallBoxComponent } from './lib/widget/small-box.component';
export { InfoBoxComponent } from './lib/widget/info-box.component';
export { AlertComponent } from './lib/widget/alert.component';
export { CalloutComponent } from './lib/widget/callout.component';
export { ProgressComponent } from './lib/widget/progress.component';
export { TimelineComponent } from './lib/widget/timeline.component';
export { ProfileCardComponent } from './lib/widget/profile-card.component';
export { DescriptionBlockComponent } from './lib/widget/description-block.component';
export { BreadcrumbComponent } from './lib/widget/breadcrumb.component';
export { CommandPaletteComponent } from './lib/widget/command-palette.component';
export { ChartComponent } from './lib/widget/chart.component';
export { ModalComponent } from './lib/widget/modal.component';
export { ProgressGroupComponent } from './lib/widget/progress-group.component';
export { RatingsComponent } from './lib/widget/ratings.component';
export { DirectChatComponent } from './lib/widget/direct-chat.component';
export { NavMessagesComponent } from './lib/widget/nav-messages.component';
export { NavNotificationsComponent } from './lib/widget/nav-notifications.component';
export { NavTasksComponent } from './lib/widget/nav-tasks.component';
export { TabsComponent } from './lib/widget/tabs.component';
export { TabComponent } from './lib/widget/tab.component';
export { AccordionComponent } from './lib/widget/accordion.component';
export { AccordionItemComponent } from './lib/widget/accordion-item.component';
export { DatatableComponent } from './lib/widget/datatable.component';

// Forms
export { ButtonComponent } from './lib/form/button.component';
export { InputComponent } from './lib/form/input.component';
export { TextareaComponent } from './lib/form/textarea.component';
export { SelectComponent, type SelectOption } from './lib/form/select.component';
export { InputSwitchComponent } from './lib/form/input-switch.component';
export { InputFlatpickrComponent } from './lib/form/input-flatpickr.component';
export { InputTomSelectComponent } from './lib/form/input-tom-select.component';

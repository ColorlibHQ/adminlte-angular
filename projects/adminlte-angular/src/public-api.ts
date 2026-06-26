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
export { ApexChartComponent } from './lib/widget/apex-chart.component';
export { ModalComponent } from './lib/widget/modal.component';

// Forms
export { ButtonComponent } from './lib/form/button.component';
export { InputComponent } from './lib/form/input.component';
export { TextareaComponent } from './lib/form/textarea.component';
export { SelectComponent, type SelectOption } from './lib/form/select.component';
export { InputSwitchComponent } from './lib/form/input-switch.component';

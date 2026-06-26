# Changelog

All notable changes to `@adminlte/angular` are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial Angular 22 port of AdminLTE 4 — a signal-first, standalone-component library
  on Bootstrap 5.3, published as `@adminlte/angular`.
- **Layout components:** `LteDashboardLayout`, `LteAuthLayout`, `LteAppContent`, `LteTopbar`,
  `LteSidebar`, `LteSidebarBrand`, `LteSidebarNav`, `LteSidebarNavItem`, `LteSidebarOverlay`,
  `LteFooter`, `LteColorModeToggle`, `LteFullscreenToggle`.
- **Widgets:** `LteCard`, `LteSmallBox`, `LteInfoBox`, `LteAlert`, `LteCallout`, `LteProgress`,
  `LteTimeline`, `LteProfileCard`, `LteDescriptionBlock`, `LteBreadcrumb`, `LteCommandPalette`,
  `LteApexChart`, `LteModal`.
- **Forms:** `LteButton`, `LteInput`, `LteSelect`, `LteTextarea`, `LteInputSwitch`
  (`ControlValueAccessor` + `model()` two-way binding).
- **Signal services:** `ColorModeService` (SSR-safe dark mode, no-flash), `SidebarService`
  (responsive state + body classes), `CommandPaletteService` (⌘K), `FullscreenService`,
  `TreeviewService` (accordion registry).
- Typed, config-driven sidebar menu (`MenuNode` discriminated union with `visible` flag).
- `@adminlte/angular/css` export — AdminLTE's compiled CSS copied into `dist` at build time.
- Demo application (`projects/demo`) dogfooding the library: dashboard, widgets, forms and
  login pages with a theme-aware ApexCharts chart.

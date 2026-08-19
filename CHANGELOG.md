# Changelog

All notable changes to `@adminlte/angular` are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Stretch-set components for parity with the Vue/React ports:**
  - Widgets: `LteProgressGroup`, `LteRatings`, `LteDirectChat`, `LteTabs` / `LteTab`,
    `LteAccordion` / `LteAccordionItem`.
  - Topbar dropdown menus: `LteNavMessages`, `LteNavNotifications`, `LteNavTasks`.
  - Plugin wrappers (optional peer deps, lazily imported like `LteApexChart`):
    `LteInputFlatpickr` (flatpickr), `LteInputTomSelect` (tom-select), and
    `LteDatatable` (simple-datatables).
- New `Components` demo page (`/components`) dogfooding the additions, plus the three
  nav dropdowns wired into the demo topbar.
- Optional peer dependencies `flatpickr`, `tom-select` and `simple-datatables`
  (all `optional: true`).
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

### Changed

- Target **AdminLTE 4.8.1** (was 4.0.0) — the `admin-lte` peer dependency is now `^4.8.1`,
  so `@adminlte/angular/css` re-exports AdminLTE 4.8.1's compiled stylesheet. Upstream
  additions now available to consumers: the opt-in extended palette
  (`admin-lte/dist/css/adminlte-colors.css`) and the AdminLTE 3 palette
  (`adminlte-colors-v3.css`), `data-lte-primary="…"` on `<html>` to promote a palette
  colour to Bootstrap's `primary`, `data-lte-print="plain"` for document printing,
  `data-lte-contrast="aa"` for WCAG AA text on the v3 palette, and a pagination
  focus-ring fix. The library imports no AdminLTE JavaScript, so the modules bundled
  upstream since 4.1 (`ColorMode`, `SidebarSearch`) never collide with the Angular
  services.

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
- **Dependencies refreshed.** Angular **22.0.x → 22.1.x** (`@angular/common`, `compiler`,
  `compiler-cli`, `core`, `forms`, `platform-browser`, `router` → 22.1.2; `@angular/build`
  and `@angular/cli` → 22.1.4) via `ng update`, plus `ng-packagr` 22.0.0 → 22.1.1,
  `zone.js` `~0.15.0` → `~0.16.0` (the version Angular 22's own CLI scaffolds, and inside
  `@angular/core`'s `~0.15.0 || ~0.16.0` peer range), `simple-datatables` 10.2.0 → 10.3.0
  and `tom-select` 2.6.1 → 2.6.2. The refreshed build chain also clears most of the
  workspace's transitive advisories (`npm audit`: 15 → 4, including the only critical).
- **ApexCharts 5 → 6 (major).** The `apexcharts` peer dependency now reads
  `^4.0.0 || ^5.0.0 || ^6.0.0`, and the demo builds against 6.10.0. `LteApexChart` needed
  no changes — v6 keeps the `new ApexCharts(el, options)` / `render()` / `updateOptions()` /
  `destroy()` API and existing option objects unchanged; its two new defaults
  (variable-length data transitions, pinch-zoom/pan gestures) are opt-out via
  `chart.animations.dynamicAnimation` and `chart.zoom.pinch` / `chart.pan.inertia`.
  Consumers staying on ApexCharts 4 or 5 are unaffected. Note that v6's full bundle is
  larger (the demo's lazily-loaded `apexcharts` chunk grows from ~135 kB to ~223 kB
  transfer); v6 also ships per-chart-type entry points (`apexcharts/area`, `apexcharts/bar`,
  …) for consumers who want to trim that.
- The `bootstrap` peer dependency is now `^5.3.8` (was `^5.3.0`), matching what
  `admin-lte@4.8.1` itself requires — the advertised range no longer resolves to a
  Bootstrap older than the CSS it is paired with.
- **Held back — FullCalendar 7.** Only `@fullcalendar/core` has a stable 7.x (7.0.2).
  The plugins the demo calendar needs (`daygrid`, `timegrid`, `list`, `interaction`) are on
  `latest: 6.1.21`, with 7.x available only as `7.0.0-rc.0` / `7.0.0-beta.6` pre-releases,
  and the v6 plugins pin `@fullcalendar/core@~6.1.21`, so upgrading core alone fails
  `npm install` with `ERESOLVE`. FullCalendar 7's core also adds two new required peers
  (`temporal-polyfill`, `@full-ui/headless-calendar`). All `@fullcalendar/*` packages
  therefore stay on 6.1.21 until the plugin set ships stable 7.x builds.
- **Held back — TypeScript 7.** `@angular/compiler-cli@22.1.2` and `@angular/build@22.1.4`
  both declare `typescript: >=6.0 <6.1`, so the workspace stays on `~6.0.0`.

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

### Fixed

- **`LteAuthLayout` rendered an empty card for `variant="v2"` (breaking).** The template
  declared the default `<ng-content />` twice — once per `@if` branch — and Angular
  distributes projected nodes into a single slot when the component is created, so the
  copy in the losing branch never received anything. Every `variant="v2"` page therefore
  shipped `<div class="card-body login-card-body"></div>` with no children: the demo's
  `/login`, `/login-v2` and `/register-v2` showed a blank card, and the `[logo]` slot had
  the same defect. Both slots are now declared exactly once — the default slot in the
  `.card-body` both variants share, and `[logo]` in an `<ng-template>` that each variant
  stamps with `ngTemplateOutlet` — so `default` and `v2` project identically. The rendered
  markup is unchanged for consumers (`.login-box > .card.card-outline.card-primary >
  .card-header + .card-body` for v2, brand above a plain `.card` otherwise). Anyone
  extending the component: a projection slot may only be declared once per template.
- **Sidebar: collapsed submenus stayed keyboard-focusable (a11y).** A closed
  `.nav-treeview` collapses to `height: 0` inside the grid animation wrapper, but stayed
  `visibility: visible` with no `inert`, so its links kept their place in the tab order —
  19 invisible links on the demo's default route, reachable with Tab and focusable via
  script. The wrapper now carries `inert` while closed (removing the subtree from both the
  tab order and the accessibility tree), backed by a `visibility: hidden` that is delayed
  until the collapse transition ends, so the slide-open/slide-shut animation is unchanged.
  The group toggle also gained `aria-controls` pointing at the submenu's new `id`.
- **Header overflowed the viewport on phones.** With the standard toggle row (search,
  messages, notifications, tasks, fullscreen, colour mode, user menu), Bootstrap's 1rem
  navbar link padding made the header 413 px wide inside a 390 px viewport, so every page
  scrolled sideways (`scrollWidth` 413 vs `clientWidth` 390). `LteTopbar` now halves
  `--bs-navbar-nav-link-padding-x` below the `sm` breakpoint; the property is declared on
  `<nav class="app-header">`, so it also applies to items projected through
  `[topbar-start]` / `[topbar-end]`. Measured 390/390 at 390 px and 320/320 at 320 px;
  layout at `sm` and above is untouched.
- **Demo: a MIME-type console error on every two-segment route.** The demo build now sets
  `baseHref` / `deployUrl` to `/`, so `index.html` emits absolute asset URLs (`/main-*.js`,
  `/chunk-*.js`, `/styles-*.css`). The relative `<link rel="modulepreload"
  href="chunk-*.js">` was resolved against the current location rather
  than `<base href="/">` by the browser's speculative preloader, so on a two-segment route
  such as `/dashboard/v2` it fetched `/dashboard/chunk-*.js`; Cloudflare Pages' SPA
  fallback answered with `index.html` and Chrome logged *"Failed to load module script:
  Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of
  text/html"* on ~16 routes. Absolute URLs resolve identically from any depth.

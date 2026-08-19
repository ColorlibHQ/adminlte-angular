# AdminLTE 4 for Angular

The official **[AdminLTE 4](https://adminlte.io)** port for **Angular 22** — a signal-first, standalone-component library on **Bootstrap 5.3**. Dark mode, a config-driven sidebar, and a ⌘K command palette, all without jQuery or NgModules.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Angular 22](https://img.shields.io/badge/Angular-22-DD0031.svg?logo=angular&logoColor=white)](https://angular.dev)
[![Bootstrap 5.3](https://img.shields.io/badge/Bootstrap-5.3-7952B3.svg?logo=bootstrap&logoColor=white)](https://getbootstrap.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Signals](https://img.shields.io/badge/signals-first-DD0031.svg)](https://angular.dev/guide/signals)

**🔗 [Live demo](https://adminlte-angular.pages.dev)** · **📚 [Documentation](https://docs.adminlte.io/angular/introduction)**

> Standalone components, signal inputs (`input()`/`output()`/`model()`), the new control flow (`@if`/`@for`/`@switch`), SSR-safe theming, and the modern esbuild application builder.

## Also available for your stack

The same AdminLTE 4 dashboard, in the framework you know best — you're looking at the **Angular** edition:

<!-- ADMINLTE-ECOSYSTEM:START -->
<div align="center">
  <a href="https://github.com/ColorlibHQ/AdminLTE"><img height="36" alt="HTML" src="https://img.shields.io/badge/HTML-0D6EFD?style=for-the-badge&logo=html5&logoColor=white"></a>
  <a href="https://github.com/ColorlibHQ/adminlte-react"><img height="36" alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"></a>
  <a href="https://github.com/ColorlibHQ/adminlte-react"><img height="36" alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"></a>
  <a href="https://github.com/ColorlibHQ/adminlte-vue"><img height="36" alt="Vue" src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D"></a>
  <a href="https://github.com/ColorlibHQ/adminlte-vue"><img height="36" alt="Nuxt" src="https://img.shields.io/badge/Nuxt-00DC82?style=for-the-badge&logo=nuxt&logoColor=white"></a>
  <a href="https://github.com/ColorlibHQ/adminlte-angular"><img height="36" alt="Angular" src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white"></a>
  <a href="https://github.com/ColorlibHQ/adminlte-laravel"><img height="36" alt="Laravel" src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white"></a>
  <a href="https://github.com/ColorlibHQ/adminlte-symfony"><img height="36" alt="Symfony" src="https://img.shields.io/badge/Symfony-000000?style=for-the-badge&logo=symfony&logoColor=white"></a>
  <a href="https://github.com/ColorlibHQ/adminlte-django"><img height="36" alt="Django" src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white"></a>
  <a href="https://github.com/ColorlibHQ/adminlte-aspnet"><img height="36" alt="ASP.NET" src="https://img.shields.io/badge/ASP.NET-512BD4?style=for-the-badge&logo=dotnet&logoColor=white"></a>
  <a href="https://github.com/ColorlibHQ/adminlte-drupal"><img height="36" alt="Drupal" src="https://img.shields.io/badge/Drupal-0678BE?style=for-the-badge&logo=drupal&logoColor=white"></a>
  <a href="https://docs.adminlte.io"><img height="36" alt="Docs" src="https://img.shields.io/badge/Docs-adminlte.io-0EA5E9?style=for-the-badge&logo=readthedocs&logoColor=white"></a>
</div>
<!-- ADMINLTE-ECOSYSTEM:END -->

<p align="center">
  <a href="https://adminlte-angular.pages.dev"><img src=".github/preview.webp" alt="AdminLTE 4 for Angular — dashboard preview" width="100%"></a>
</p>


## Features

- 🅰️ **Angular 22, signal-first** — standalone components, `input()`/`output()`/`model()`, the new control flow, zoneless-friendly.
- 🌗 **SSR-safe dark mode** — `data-bs-theme` on `<html>`, persisted to `localStorage` with a system-preference fallback and a no-flash inline script.
- 🧭 **Config-driven sidebar** — a typed `MenuNode[]` (headers, links, collapsible groups, badges, per-item `visible` flags) with active-link detection and accordion treeviews.
- ⌘ **Command palette (⌘K)** — fuzzy search over your menu with full keyboard navigation, routing through the Angular Router.
- 🧩 **40+ components** — layout, widgets and form controls, all with the `Lte` prefix.
- 📦 **Tree-shakeable** — standalone components, optional peer deps (ApexCharts, flatpickr, Tom Select, simple-datatables) lazy-loaded.
- 🎨 **Bootstrap 5.3** — ships AdminLTE's compiled CSS via `@adminlte/angular/css`.

## Installation

```bash
npm install @adminlte/angular admin-lte bootstrap bootstrap-icons
# optional, for charts:
npm install apexcharts
```

`@adminlte/angular` lists `@angular/core`, `@angular/common`, `@angular/forms`, `@angular/router`, `bootstrap` and `admin-lte` as peer dependencies.

### 1. Add the styles

In `angular.json` (or your global stylesheet):

```jsonc
"styles": [
  "node_modules/bootstrap-icons/font/bootstrap-icons.css",
  "node_modules/@adminlte/angular/css/adminlte.css",
  "src/styles.css"
]
```

### 2. No-flash theme script

Add this to your `index.html` `<head>` so the correct theme is applied before first paint:

```html
<script>
  (function () {
    try {
      var m = localStorage.getItem('lte-theme') || 'auto';
      var d = m === 'dark' || (m === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.setAttribute('data-bs-theme', d ? 'dark' : 'light');
    } catch (e) {}
  })();
</script>
```

(`COLOR_MODE_NO_FLASH_SCRIPT` is also exported from the library for SSR injection.)

## Usage

Define a typed menu and drop the dashboard layout around your routed content:

```ts
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardLayoutComponent, type MenuNode } from '@adminlte/angular';

const MENU: MenuNode[] = [
  { type: 'header', text: 'MAIN NAVIGATION' },
  { type: 'item', text: 'Dashboard', route: '/', icon: 'bi-speedometer' },
  {
    type: 'group',
    text: 'UI Elements',
    icon: 'bi-collection',
    children: [
      { type: 'item', text: 'Forms', route: '/forms', icon: 'bi-input-cursor-text' },
      { type: 'item', text: 'Tables', route: '/tables', icon: 'bi-table' },
    ],
  },
  { type: 'item', text: 'Admin only', route: '/admin', icon: 'bi-lock', visible: false },
];

@Component({
  selector: 'app-shell',
  imports: [DashboardLayoutComponent, RouterOutlet],
  template: `
    <lte-dashboard-layout [menuItems]="menu" [currentPath]="currentPath()" [accordion]="true">
      <router-outlet />
      <span footer><b>Version</b> 4.8.1</span>
    </lte-dashboard-layout>
  `,
})
export class ShellComponent {
  readonly menu = MENU;
  readonly currentPath = signal('/'); // wire from Router NavigationEnd events
}
```

Then build a page with the widgets:

```html
<lte-app-content title="Dashboard" [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Dashboard' }]">
  <div class="row">
    <div class="col-lg-3 col-6">
      <lte-small-box title="150" text="New Orders" icon="bi-bag" theme="primary" url="#" />
    </div>
  </div>

  <lte-card title="Sales" icon="bi-bar-chart" [collapsible]="true" [maximizable]="true">
    <lte-apex-chart [options]="chartOptions()" />
  </lte-card>
</lte-app-content>
```

## Components

**Layout** — `LteDashboardLayout` · `LteAuthLayout` · `LteAppContent` · `LteTopbar` · `LteSidebar` · `LteSidebarBrand` · `LteSidebarNav` · `LteSidebarNavItem` · `LteSidebarOverlay` · `LteFooter` · `LteColorModeToggle` · `LteFullscreenToggle`

**Widgets** — `LteCard` · `LteSmallBox` · `LteInfoBox` · `LteAlert` · `LteCallout` · `LteProgress` · `LteProgressGroup` · `LteRatings` · `LteTimeline` · `LteProfileCard` · `LteDescriptionBlock` · `LteBreadcrumb` · `LteCommandPalette` · `LteApexChart` · `LteModal` · `LteDirectChat` · `LteTabs` / `LteTab` · `LteAccordion` / `LteAccordionItem` · `LteDatatable`

**Topbar dropdowns** — `LteNavMessages` · `LteNavNotifications` · `LteNavTasks` (drop into the topbar `[topbar-end]` slot)

**Forms** — `LteButton` · `LteInput` · `LteSelect` · `LteTextarea` · `LteInputSwitch` · `LteInputFlatpickr` · `LteInputTomSelect` (all `ControlValueAccessor` + `model()` two-way binding)

**Optional plugin wrappers** lazy-load their library only when used: `LteApexChart` (apexcharts), `LteInputFlatpickr` (flatpickr), `LteInputTomSelect` (tom-select), `LteDatatable` (simple-datatables). Install the ones you need:

```bash
npm install apexcharts flatpickr tom-select simple-datatables
```

> Selectors use the `lte-` prefix (`<lte-card>`); class names use the `Lte…Component` convention.

## Services

State is exposed through `providedIn: 'root'` signal services:

| Service | Responsibility |
|---|---|
| `ColorModeService` | light/dark/auto, `data-bs-theme`, `localStorage` persistence, system fallback |
| `SidebarService` | responsive collapse/overlay/mini state + `<body>` classes |
| `CommandPaletteService` | ⌘K open/close + global key listener |
| `FullscreenService` | Fullscreen API wrapper, `fullscreenchange`-driven |
| `TreeviewService` | sidebar accordion/expand registry (provided per sidebar) |

## Development

```bash
npm install          # install workspace deps
npm run build        # build the library (ng-packagr) + copy AdminLTE CSS
npm start            # serve the demo at http://localhost:4200
npm run build:demo   # production build of the demo app
```

The repo is an Angular workspace: the library lives in `projects/adminlte-angular`, the demo that dogfoods it in `projects/demo`.

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Matches Bootstrap 5.3 and Angular 22 support targets.

## License

[MIT](./LICENSE) © 2014–2026 ColorlibHQ. Built on [AdminLTE](https://github.com/ColorlibHQ/AdminLTE).

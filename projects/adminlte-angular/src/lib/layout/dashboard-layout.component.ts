import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { TopbarComponent } from './topbar.component';
import { SidebarComponent } from './sidebar.component';
import { FooterComponent } from './footer.component';
import { CommandPaletteComponent } from '../widget/command-palette.component';
import { SidebarService } from '../services/sidebar.service';
import { ColorModeService } from '../services/color-mode.service';
import { cn } from '../util/class-name';
import type { MenuNode } from '../types/menu';
import type { TopbarUser } from '../types/layout';
import type { BreakpointSize, ColorMode, SidebarTheme } from '../types/theme';

/**
 * The full dashboard shell: fixed topbar + off-canvas sidebar + main content
 * region + footer, with the ⌘K command palette wired in. Configures the shared
 * {@link SidebarService} (responsive state + body classes) and initializes the
 * {@link ColorModeService}. Project your page content into the default slot,
 * and use `[footer]` for footer content.
 */
@Component({
  selector: 'lte-dashboard-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TopbarComponent, SidebarComponent, FooterComponent, CommandPaletteComponent],
  host: { class: 'app-wrapper' },
  template: `
    <lte-topbar
      [user]="user()"
      [colorModeToggle]="colorModeToggle()"
      [navbarClass]="navbarClass()"
      (logout)="logout.emit()"
      (profile)="profile.emit()"
    >
      <ng-content select="[topbar-start]" topbar-start />
      <ng-content select="[topbar-end]" topbar-end />
    </lte-topbar>

    <lte-sidebar
      [items]="menuItems()"
      [logo]="logo()"
      [logoHref]="logoHref()"
      [brandText]="brandText()"
      [theme]="sidebarTheme()"
      [sidebarClass]="sidebarClass()"
      [currentPath]="currentPath()"
      [accordion]="accordion()"
    />

    <main class="app-main">
      <ng-content />
    </main>

    <lte-footer>
      <ng-content select="[footer]" />
    </lte-footer>

    <lte-command-palette [menuItems]="menuItems()" [navigate]="navigate()" />
  `,
})
export class DashboardLayoutComponent {
  private readonly sidebar = inject(SidebarService);
  private readonly colorMode = inject(ColorModeService);
  private readonly destroyRef = inject(DestroyRef);

  readonly menuItems = input.required<MenuNode[]>();
  readonly logo = input<string>();
  readonly logoHref = input<string>('/');
  readonly brandText = input<string>('AdminLTE 4');
  readonly user = input<TopbarUser>();
  readonly sidebarTheme = input<SidebarTheme>('dark');
  readonly sidebarClass = input<string>('bg-body-secondary shadow');
  readonly sidebarBreakpoint = input<BreakpointSize>('lg');
  readonly sidebarMini = input<boolean>(false);
  readonly fixedHeader = input<boolean>(false);
  readonly fixedSidebar = input<boolean>(false);
  readonly fixedFooter = input<boolean>(false);
  readonly layoutFixed = input<boolean>(true);
  readonly colorModeToggle = input<boolean>(true);
  readonly initialColorMode = input<ColorMode>('auto');
  readonly enableSidebarPersistence = input<boolean>(false);
  readonly navbarClass = input<string>('');
  readonly bodyClass = input<string>('');
  readonly currentPath = input<string>('/');
  readonly accordion = input<boolean>(false);

  readonly logout = output<void>();
  readonly profile = output<void>();
  /**
   * Optional command-palette navigation override. When omitted the palette uses
   * the Angular Router. Provided as an input function (mirrors `LteCommandPalette`).
   */
  readonly navigate = input<(href: string) => void>();

  private readonly staticBodyClasses = computed(() =>
    cn(
      this.layoutFixed() && 'layout-fixed',
      `sidebar-expand-${this.sidebarBreakpoint()}`,
      this.fixedHeader() && 'fixed-header',
      this.fixedSidebar() && 'fixed-sidebar',
      this.fixedFooter() && 'fixed-footer',
      'bg-body-tertiary',
      this.bodyClass(),
    ),
  );

  constructor() {
    // Seed the color mode from the layout's initial preference (a persisted
    // user choice always wins — see ColorModeService.setInitialMode).
    this.colorMode.setInitialMode(this.initialColorMode());

    // Keep the sidebar service configured with the current inputs.
    effect(() => {
      this.sidebar.configure({
        sidebarMini: this.sidebarMini(),
        enablePersistence: this.enableSidebarPersistence(),
        breakpoint: this.sidebarBreakpoint(),
        staticBodyClasses: this.staticBodyClasses(),
      });
    });

    // Clean up the body classes when the dashboard layout is destroyed so they
    // don't leak onto e.g. an auth page.
    this.destroyRef.onDestroy(() => this.sidebar.reset());
  }
}

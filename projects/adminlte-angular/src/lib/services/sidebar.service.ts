import {
  Injectable,
  Inject,
  PLATFORM_ID,
  computed,
  effect,
  signal,
  type Signal,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import type { BreakpointSize } from '../types/theme';

const STORAGE_KEY = 'lte.sidebar.state';

const BREAKPOINT_PX: Record<BreakpointSize, number> = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export interface SidebarConfig {
  sidebarMini?: boolean;
  enablePersistence?: boolean;
  breakpoint?: BreakpointSize;
  /** Static body classes (e.g. `layout-fixed sidebar-expand-lg`). */
  staticBodyClasses?: string;
}

/**
 * Signal-based sidebar state. Ports the responsive logic of AdminLTE's
 * `push-menu.ts`: on desktop the toggle collapses the sidebar
 * (`body.sidebar-collapse`); on mobile it opens an overlay (`body.sidebar-open`).
 * Reflects state onto `<body>` imperatively (hydration-safe — `<body>` lives
 * outside the Angular component tree). SSR-safe via the platform guard.
 */
@Injectable({ providedIn: 'root' })
export class SidebarService {
  private readonly isBrowser: boolean;

  readonly isCollapsed = signal(false);
  readonly isMobileOpen = signal(false);
  readonly isMiniMode = signal(false);

  private readonly windowWidth = signal<number>(9999);
  private readonly breakpoint = signal<BreakpointSize>('lg');
  private readonly staticBodyClasses = signal<string>('');
  private enablePersistence = false;

  /** Reactive: is the viewport at/below the sidebar breakpoint? */
  readonly isMobile: Signal<boolean> = computed(
    () => this.windowWidth() <= BREAKPOINT_PX[this.breakpoint()],
  );

  private appliedBodyClasses = new Set<string>();

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private readonly doc: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const win = this.doc.defaultView;
      this.windowWidth.set(win?.innerWidth ?? 9999);
      win?.addEventListener('resize', this.onResize);
    }

    // When growing back to desktop, close the mobile overlay.
    effect(() => {
      if (!this.isMobile() && this.isMobileOpen()) this.isMobileOpen.set(false);
    });

    // Persist collapse state.
    effect(() => {
      const collapsed = this.isCollapsed();
      if (!this.enablePersistence || !this.isBrowser) return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ collapsed }));
      } catch {
        /* ignore */
      }
    });

    // Reflect state + static classes onto <body>, diffing the applied set.
    effect(() => {
      if (!this.isBrowser) return;
      const next = new Set<string>();
      if (this.isCollapsed()) next.add('sidebar-collapse');
      if (this.isMobileOpen()) next.add('sidebar-open');
      if (this.isMiniMode()) next.add('sidebar-mini');
      for (const cls of this.staticBodyClasses().split(/\s+/).filter(Boolean)) next.add(cls);

      const body = this.doc.body;
      for (const cls of this.appliedBodyClasses) if (!next.has(cls)) body.classList.remove(cls);
      for (const cls of next) body.classList.add(cls);
      this.appliedBodyClasses = next;
    });
  }

  /** Configure the sidebar — called once by the dashboard layout. */
  configure(config: SidebarConfig): void {
    this.isMiniMode.set(config.sidebarMini ?? false);
    this.enablePersistence = config.enablePersistence ?? false;
    this.breakpoint.set(config.breakpoint ?? 'lg');
    this.staticBodyClasses.set(config.staticBodyClasses ?? '');

    if (this.isBrowser && this.enablePersistence) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) this.isCollapsed.set(!!JSON.parse(saved).collapsed);
      } catch {
        /* ignore */
      }
    }
  }

  /** On mobile toggles the overlay; on desktop toggles the collapse state. */
  toggle(): void {
    if (this.isMobile()) this.isMobileOpen.update((v) => !v);
    else this.isCollapsed.update((v) => !v);
  }

  collapse(): void {
    this.isCollapsed.set(true);
    this.isMobileOpen.set(false);
  }

  expand(): void {
    this.isCollapsed.set(false);
    this.isMobileOpen.set(false);
  }

  /** Tear down the body classes (e.g. when leaving the dashboard layout). */
  reset(): void {
    if (!this.isBrowser) return;
    for (const cls of this.appliedBodyClasses) this.doc.body.classList.remove(cls);
    this.appliedBodyClasses = new Set();
  }

  private readonly onResize = (): void => {
    this.windowWidth.set(this.doc.defaultView?.innerWidth ?? 9999);
  };
}

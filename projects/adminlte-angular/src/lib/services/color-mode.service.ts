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
import type { ColorMode, ResolvedColorMode } from '../types/theme';

const STORAGE_KEY = 'lte-theme';

/**
 * Inline script that should be added to `index.html` `<head>` to apply the
 * persisted color mode before first paint (no flash of the wrong theme).
 * Exposed so SSR/host apps can inject it. Keep in sync with {@link STORAGE_KEY}.
 */
export const COLOR_MODE_NO_FLASH_SCRIPT = `(function(){try{var m=localStorage.getItem('lte-theme')||'auto';var d=m==='dark'||(m==='auto'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.setAttribute('data-bs-theme',d?'dark':'light');}catch(e){}})();`;

/**
 * Signal-based color mode (light/dark/auto) service. Persists to localStorage,
 * falls back to the system preference for `auto`, and reflects the resolved mode
 * onto `<html data-bs-theme>` (Bootstrap 5.3 standard). SSR-safe: all DOM access
 * is guarded by the platform check, so it no-ops on the server.
 */
@Injectable({ providedIn: 'root' })
export class ColorModeService {
  private readonly isBrowser: boolean;
  private media: MediaQueryList | null = null;
  /** True when a mode was restored from localStorage on init. */
  private hadPersisted = false;

  /** The user's chosen mode: 'light' | 'dark' | 'auto'. */
  readonly colorMode = signal<ColorMode>('auto');
  private readonly systemDark = signal(false);

  /** The concrete mode after `auto` is evaluated against system preference. */
  readonly resolvedMode: Signal<ResolvedColorMode> = computed(() => {
    if (this.colorMode() === 'auto') return this.systemDark() ? 'dark' : 'light';
    return this.colorMode() as ResolvedColorMode;
  });

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private readonly doc: Document,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const saved = this.readStorage();
      if (saved) {
        this.colorMode.set(saved);
        this.hadPersisted = true;
      }

      this.media = this.doc.defaultView?.matchMedia('(prefers-color-scheme: dark)') ?? null;
      this.systemDark.set(this.media?.matches ?? false);
      this.media?.addEventListener('change', this.onSystemChange);
    }

    // Reflect resolved mode to <html> and persist the chosen mode.
    effect(() => {
      const resolved = this.resolvedMode();
      const chosen = this.colorMode();
      if (!this.isBrowser) return;
      this.doc.documentElement.setAttribute('data-bs-theme', resolved);
      this.writeStorage(chosen);
    });
  }

  /** Set the color mode. */
  setColorMode(mode: ColorMode): void {
    this.colorMode.set(mode);
  }

  /**
   * Apply an initial mode preference. Honored only when the user has no
   * persisted choice — so a saved selection always wins over the layout default.
   */
  setInitialMode(mode: ColorMode): void {
    if (!this.hadPersisted) this.colorMode.set(mode);
  }

  /** Cycle light → dark → auto → light. */
  cycle(): void {
    const order: ColorMode[] = ['light', 'dark', 'auto'];
    const next = order[(order.indexOf(this.colorMode()) + 1) % order.length];
    this.setColorMode(next);
  }

  private readonly onSystemChange = (e: MediaQueryListEvent): void => {
    this.systemDark.set(e.matches);
  };

  private readStorage(): ColorMode | null {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      return v === 'light' || v === 'dark' || v === 'auto' ? v : null;
    } catch {
      return null;
    }
  }

  private writeStorage(mode: ColorMode): void {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* storage unavailable (private mode / SSR) — ignore */
    }
  }
}

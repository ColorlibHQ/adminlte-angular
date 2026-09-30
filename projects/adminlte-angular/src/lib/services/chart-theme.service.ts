import { DestroyRef, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  FALLBACK_CHART_PALETTE,
  readChartPalette,
  samePalette,
  type ChartPalette,
} from '../chart/chart-theme';

/**
 * Keeps the Chart.js theme in sync with the document. Exposes the resolved AdminLTE
 * colours as a `palette` signal and re-reads them whenever `<html>` changes colour mode
 * (`data-bs-theme`, set by `ColorModeService`), direction (`dir`), primary palette
 * (`data-lte-primary`) or inline custom properties. Every `<lte-chart>` reads `palette()`,
 * so a theme switch re-themes existing charts live.
 *
 * Build dataset colours from `palette().colors` (not hard-coded hex) so they follow the
 * theme too. SSR-safe: on the server the palette stays at Bootstrap's light defaults.
 */
@Injectable({ providedIn: 'root' })
export class ChartThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly _palette = signal<ChartPalette>(FALLBACK_CHART_PALETTE, { equal: samePalette });
  private revision = 0;

  /** The current, canvas-safe theme palette. */
  readonly palette = this._palette.asReadonly();

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;

    this.refresh();
    const observer = new MutationObserver(() => this.refresh());
    observer.observe(this.doc.documentElement, {
      attributes: true,
      attributeFilter: ['data-bs-theme', 'dir', 'style', 'class', 'data-lte-primary'],
    });
    inject(DestroyRef).onDestroy(() => observer.disconnect());

    // Canvas text is drawn once; redraw after web fonts arrive so labels use them.
    this.doc.fonts?.ready.then(() => {
      this.revision++;
      this.refresh();
    });
  }

  /** Re-reads the theme tokens (call after changing CSS variables by other means). */
  refresh(): void {
    this._palette.set(readChartPalette(this.doc, this.revision));
  }
}

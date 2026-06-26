import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Inject,
  PLATFORM_ID,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// `apexcharts` is an optional peer dependency — typed loosely to avoid a hard
// build-time dependency on its types.
interface ApexInstance {
  render: () => void;
  updateOptions: (o: unknown) => void;
  destroy: () => void;
}

/**
 * Thin ApexCharts wrapper. Lazily imports `apexcharts` (an optional peer dep) on
 * the browser only, renders into a div, re-renders when `options` change, and
 * destroys the chart on teardown.
 */
@Component({
  selector: 'lte-apex-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div #host></div>`,
})
export class ApexChartComponent {
  private readonly host = viewChild.required<ElementRef<HTMLElement>>('host');
  private readonly isBrowser: boolean;
  private chart: ApexInstance | null = null;

  /** ApexCharts options object (series, chart, xaxis, …). */
  readonly options = input.required<Record<string, unknown>>();

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    effect(() => {
      const opts = this.options();
      if (!this.isBrowser) return;
      void this.renderOrUpdate(opts);
    });

    inject(DestroyRef).onDestroy(() => {
      this.chart?.destroy();
      this.chart = null;
    });
  }

  private async renderOrUpdate(opts: Record<string, unknown>): Promise<void> {
    try {
      if (this.chart) {
        this.chart.updateOptions(opts);
        return;
      }
      const mod = await import('apexcharts');
      const ApexCharts = (mod.default ?? mod) as unknown as new (
        el: Element,
        o: unknown,
      ) => ApexInstance;
      this.chart = new ApexCharts(this.host().nativeElement, opts);
      this.chart.render();
    } catch {
      console.warn('[adminlte-angular] apexcharts is not installed — <lte-apex-chart> is inert.');
    }
  }
}

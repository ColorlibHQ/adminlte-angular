import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  type InputSignal,
  afterRenderEffect,
  computed,
  inject,
  input,
  untracked,
  viewChild,
} from '@angular/core';
import type { Chart, ChartData, ChartOptions, ChartType, Plugin } from 'chart.js';
import { ChartThemeService } from '../services/chart-theme.service';
import { applyChartDefaults, type ChartPalette } from '../chart/chart-theme';

type ChartClass = typeof Chart;

let chartJs: Promise<ChartClass> | null = null;

/** Lazily loads Chart.js (an optional peer dependency) with every controller registered. */
function loadChartJs(): Promise<ChartClass> {
  chartJs ??= import('chart.js/auto').then(
    (mod) => ((mod as { Chart?: ChartClass }).Chart ?? (mod as unknown as { default: ChartClass }).default),
  );
  return chartJs;
}

/**
 * `<lte-chart>` — a thin, signal-driven Chart.js wrapper themed like AdminLTE.
 *
 *     <lte-chart type="line" [data]="data()" [options]="options()" [height]="300" />
 *
 * - Lazily imports `chart.js` (optional peer dependency) in the browser only, so SSR and
 *   prerendering are safe.
 * - Applies the AdminLTE preset to `Chart.defaults` (font, colours, gridlines, tooltip,
 *   legend) and re-themes live when the colour mode or direction changes.
 * - Updates in place when `data`/`options` change; re-creates the chart only when `type`
 *   or `plugins` change — no "Canvas is already in use" errors.
 * - Destroys the chart when the component is destroyed (route change, `@if`, tab switch).
 * - Resizes with its container (sidebar toggle, collapsed cards and hidden tabs included).
 *
 * The host is the sizing box: give it `[height]` (px number or CSS length). Without a
 * height the chart keeps Chart.js' aspect ratio instead.
 */
@Component({
  selector: 'lte-chart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'lte-chart',
    style: 'display: block; position: relative; min-width: 0;',
    '[style.height]': 'hostHeight()',
    '[style.width]': 'hostWidth()',
  },
  template: `<canvas #canvas role="img" [attr.aria-label]="label() ?? null"></canvas>`,
})
export class ChartComponent<TType extends ChartType = ChartType> {
  /** Chart.js chart type: `line`, `bar`, `doughnut`, `pie`, `radar`, `polarArea`, … */
  readonly type: InputSignal<TType> = input.required<TType>();
  /** Chart.js `data` object (labels + datasets). */
  readonly data: InputSignal<ChartData<TType>> = input.required<ChartData<TType>>();
  /** Chart.js `options`, merged over the AdminLTE defaults. */
  readonly options: InputSignal<ChartOptions<TType> | undefined> = input<ChartOptions<TType>>();
  /** Inline Chart.js plugins for this chart. */
  readonly plugins: InputSignal<Plugin<TType>[]> = input<Plugin<TType>[]>([]);
  /** Height of the chart box — a number (px) or any CSS length. */
  readonly height = input<number | string>();
  /** Width of the chart box — defaults to the container width. */
  readonly width = input<number | string>();
  /** Accessible name for the canvas. */
  readonly label = input<string>();

  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly theme = inject(ChartThemeService);
  private instance: Chart<TType> | undefined;
  private instanceType: TType | undefined;
  private instancePlugins: Plugin<TType>[] | undefined;
  private renderSeq = 0;
  private destroyed = false;

  protected readonly hostHeight = computed(() => cssLength(this.height()));
  protected readonly hostWidth = computed(() => cssLength(this.width()));

  /** The live Chart.js instance (undefined until Chart.js has loaded). */
  get chart(): Chart<TType> | undefined {
    return this.instance;
  }

  constructor() {
    // afterRenderEffect never runs on the server.
    afterRenderEffect(() => {
      // Reading the palette subscribes this chart to theme changes.
      const palette = this.theme.palette();
      const type = this.type();
      const data = this.data();
      const options = this.options() ?? ({} as ChartOptions<TType>);
      const plugins = this.plugins();
      const sized = this.height() !== undefined;
      untracked(() => void this.render(palette, type, data, options, plugins, sized));
    });

    inject(DestroyRef).onDestroy(() => {
      this.destroyed = true;
      this.instance?.destroy();
      this.instance = undefined;
    });
  }

  private async render(
    palette: ChartPalette,
    type: TType,
    data: ChartData<TType>,
    rawOptions: ChartOptions<TType>,
    plugins: Plugin<TType>[],
    sized: boolean,
  ): Promise<void> {
    const seq = ++this.renderSeq;
    let ChartJs: ChartClass;
    try {
      ChartJs = await loadChartJs();
    } catch {
      console.warn('[adminlte-angular] chart.js is not installed — <lte-chart> is inert.');
      return;
    }
    // A newer render was requested (or the component died) while Chart.js loaded.
    if (this.destroyed || seq !== this.renderSeq) return;

    applyChartDefaults(ChartJs, palette);

    // Chart.js writes the resolved defaults into the options object it receives, so hand
    // it a fresh copy each time — otherwise a theme switch would keep the old colours.
    const options = clonePlain(rawOptions) as ChartOptions<TType> & { maintainAspectRatio?: boolean };
    if (!sized && options.maintainAspectRatio === undefined) options.maintainAspectRatio = true;

    const current = this.instance;
    if (current && this.instanceType === type && this.instancePlugins === plugins) {
      current.data = data;
      current.options = options;
      current.update();
      return;
    }
    current?.destroy();
    this.instance = new ChartJs(this.canvas().nativeElement, { type, data, options, plugins });
    this.instanceType = type;
    this.instancePlugins = plugins;
  }
}

function cssLength(value: number | string | undefined): string | null {
  if (value === undefined) return null;
  return typeof value === 'number' ? `${value}px` : value;
}

/** Deep-copies plain objects and arrays; functions, gradients and class instances are shared. */
function clonePlain<T>(value: T): T {
  if (Array.isArray(value)) return value.map(clonePlain) as T;
  if (value !== null && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    const copy: Record<string, unknown> = {};
    for (const [key, v] of Object.entries(value)) copy[key] = clonePlain(v);
    return copy as T;
  }
  return value;
}

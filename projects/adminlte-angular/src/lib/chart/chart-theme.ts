/*
 * Chart.js theme preset for AdminLTE — the single place that makes every `<lte-chart>`
 * look like the rest of the dashboard.
 *
 * Chart.js draws on a <canvas>, which cannot resolve `var(--bs-*)`. This module reads
 * Bootstrap/AdminLTE's CSS custom properties from the live document, resolves each one to
 * an `rgb()` string, and pushes them into `Chart.defaults`. `ChartThemeService` repeats
 * the read whenever `<html>` changes colour mode (`data-bs-theme`), direction or palette,
 * and every `<lte-chart>` then re-applies the defaults and calls `chart.update()`.
 *
 * `chart.js` is an optional peer dependency that is loaded lazily, so nothing here imports
 * a Chart.js *value* — only types. `applyChartDefaults()` receives the loaded `Chart` class.
 */
import type {
  CartesianScaleOptions,
  Chart,
  ChartType,
  LegendItem,
  ScriptableContext,
  TooltipItem,
} from 'chart.js';

/** Bootstrap theme + palette colours exposed to charts (`--bs-<name>`). */
export type ChartThemeColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'teal'
  | 'cyan'
  | 'gray';

/** The resolved, canvas-safe colours and font of the current AdminLTE theme. */
export interface ChartPalette {
  /** Bootstrap colours (`--bs-primary`, `--bs-teal`, … ; `gray` is `--bs-gray-500`). */
  colors: Record<ChartThemeColor, string>;
  /** Body text (`--bs-body-color`). */
  text: string;
  /** Muted text for ticks and legends (`--bs-secondary-color`). */
  muted: string;
  /** Strongest text colour (`--bs-emphasis-color`) — also the tooltip surface. */
  emphasis: string;
  /** Subtle gridlines (`--bs-border-color-translucent`). */
  grid: string;
  /** Regular borders (`--bs-border-color`). */
  border: string;
  /** Page background (`--bs-body-bg`). */
  background: string;
  /** Card background — slice separators and hollow points use it. */
  surface: string;
  /** Tertiary background (`--bs-tertiary-bg`) for bands and tracks. */
  surfaceAlt: string;
  fontFamily: string;
  dark: boolean;
  rtl: boolean;
  /** Bumped to force a redraw when nothing else changed (e.g. the web font finished loading). */
  revision: number;
}

const COLOR_NAMES: readonly ChartThemeColor[] = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
  'blue',
  'indigo',
  'purple',
  'pink',
  'red',
  'orange',
  'yellow',
  'green',
  'teal',
  'cyan',
  'gray',
];

/** Bootstrap 5.3 light-mode values — used on the server and before the first browser read. */
export const FALLBACK_CHART_PALETTE: ChartPalette = {
  colors: {
    primary: 'rgb(13, 110, 253)',
    secondary: 'rgb(108, 117, 125)',
    success: 'rgb(25, 135, 84)',
    info: 'rgb(13, 202, 240)',
    warning: 'rgb(255, 193, 7)',
    danger: 'rgb(220, 53, 69)',
    blue: 'rgb(13, 110, 253)',
    indigo: 'rgb(102, 16, 242)',
    purple: 'rgb(111, 66, 193)',
    pink: 'rgb(214, 51, 132)',
    red: 'rgb(220, 53, 69)',
    orange: 'rgb(253, 126, 20)',
    yellow: 'rgb(255, 193, 7)',
    green: 'rgb(25, 135, 84)',
    teal: 'rgb(32, 201, 151)',
    cyan: 'rgb(13, 202, 240)',
    gray: 'rgb(173, 181, 189)',
  },
  text: 'rgb(33, 37, 41)',
  muted: 'rgba(33, 37, 41, 0.75)',
  emphasis: 'rgb(0, 0, 0)',
  grid: 'rgba(0, 0, 0, 0.175)',
  border: 'rgb(222, 226, 230)',
  background: 'rgb(255, 255, 255)',
  surface: 'rgb(255, 255, 255)',
  surfaceAlt: 'rgb(248, 249, 250)',
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  dark: false,
  rtl: false,
  revision: 0,
};

/** Adds an alpha channel to an `rgb()`/`rgba()` colour (other formats are returned unchanged). */
export function withAlpha(color: string, alpha: number): string {
  const m = /rgba?\(([^)]+)\)/.exec(color);
  if (!m) return color;
  const [r, g, b] = m[1].split(/[\s,/]+/).filter(Boolean);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Scriptable `backgroundColor` for area charts: `color` fading from `from` opacity at the
 * top of the plot area to `to` at the bottom.
 */
export function verticalGradient(color: string, from = 0.4, to = 0.05) {
  return (ctx: ScriptableContext<'line'>): CanvasGradient | string => {
    const { chart } = ctx;
    const area = chart.chartArea;
    if (!area) return withAlpha(color, from);
    const gradient = chart.ctx.createLinearGradient(0, area.top, 0, area.bottom);
    gradient.addColorStop(0, withAlpha(color, from));
    gradient.addColorStop(1, withAlpha(color, to));
    return gradient;
  };
}

/** Reads the theme tokens from the document and resolves them to canvas-safe colours. */
export function readChartPalette(doc: Document, revision: number): ChartPalette {
  const f = FALLBACK_CHART_PALETTE;
  const body = doc.body;
  if (!body) return { ...f, revision };

  const probe = doc.createElement('span');
  probe.style.display = 'none';
  const card = doc.createElement('div');
  card.className = 'card';
  card.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;width:0;height:0;';
  body.append(probe, card);

  const canvas = doc.createElement('canvas');
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const view = doc.defaultView ?? window;

  // Normalises any CSS colour (hex, rgb, oklch, color-mix…) to rgb()/rgba().
  const normalise = (computed: string, fallback: string): string => {
    if (!computed) return fallback;
    if (/^rgba?\(/.test(computed)) return computed;
    if (!ctx) return fallback;
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#000';
    ctx.fillStyle = computed;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    return a === 255 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${+(a / 255).toFixed(3)})`;
  };
  const token = (name: string, fallback: string): string => {
    probe.style.color = '';
    probe.style.color = `var(${name})`;
    return normalise(view.getComputedStyle(probe).color, fallback);
  };

  const colors = {} as Record<ChartThemeColor, string>;
  for (const name of COLOR_NAMES) {
    colors[name] = token(name === 'gray' ? '--bs-gray-500' : `--bs-${name}`, f.colors[name]);
  }

  const background = token('--bs-body-bg', f.background);
  const cardBg = view.getComputedStyle(card).backgroundColor;
  const surface =
    cardBg && cardBg !== 'transparent' && cardBg !== 'rgba(0, 0, 0, 0)' ? normalise(cardBg, background) : background;

  const html = doc.documentElement;
  const palette: ChartPalette = {
    colors,
    text: token('--bs-body-color', f.text),
    muted: token('--bs-secondary-color', f.muted),
    emphasis: token('--bs-emphasis-color', f.emphasis),
    grid: token('--bs-border-color-translucent', f.grid),
    border: token('--bs-border-color', f.border),
    background,
    surface,
    surfaceAlt: token('--bs-tertiary-bg', f.surfaceAlt),
    fontFamily: view.getComputedStyle(body).fontFamily || f.fontFamily,
    dark: html.getAttribute('data-bs-theme') === 'dark',
    rtl: (html.getAttribute('dir') || body.getAttribute('dir')) === 'rtl',
    revision,
  };
  probe.remove();
  card.remove();
  return palette;
}

export function samePalette(a: ChartPalette, b: ChartPalette): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

type ChartClass = typeof Chart;

let appliedPalette: ChartPalette | null = null;
let baseGenerateLabels: ((chart: Chart) => LegendItem[]) | null = null;

/** The colour a legend/tooltip marker should use: line stroke, bar/slice fill. */
function markerColor(chart: Chart, datasetIndex: number, options: unknown, fallback: string): string {
  const type = chart.getDatasetMeta(datasetIndex).type ?? (chart.config as { type?: string }).type;
  const o = options as { borderColor?: unknown; backgroundColor?: unknown } | undefined;
  const pick = type === 'line' || type === 'radar' ? o?.borderColor : o?.backgroundColor;
  return typeof pick === 'string' ? pick : fallback;
}

/**
 * Pushes the palette into `Chart.defaults` (fonts, colours, gridlines, rounded bars, point
 * style, Bootstrap-style tooltip and legend). Existing charts pick it up on their next
 * `update()`. Idempotent — repeated calls with the same palette are no-ops.
 */
export function applyChartDefaults(ChartJs: ChartClass, p: ChartPalette): void {
  if (appliedPalette && samePalette(appliedPalette, p)) return;
  appliedPalette = p;
  const d = ChartJs.defaults;

  d.font.family = p.fontFamily;
  d.font.size = 12;
  d.color = p.muted;
  d.borderColor = p.grid;
  d.backgroundColor = withAlpha(p.colors.primary, 0.2);
  d.responsive = true;
  d.maintainAspectRatio = false;
  d.animation = { ...(d.animation || {}), duration: 500, easing: 'easeOutQuart' };
  d.interaction.mode = 'index';
  d.interaction.intersect = false;

  // Axes: no axis line or tick marks, subtle horizontal gridlines only.
  const scale = d.scale as unknown as CartesianScaleOptions;
  scale.border.display = false;
  scale.grid.drawTicks = false;
  scale.grid.tickLength = 0;
  scale.grid.color = p.grid;
  scale.ticks.padding = 8;
  scale.ticks.color = p.muted;
  const scales = d.scales as Record<string, { grid?: object; ticks?: object }>;
  scales['category'].grid = { display: false };
  (scales['linear'].ticks as { maxTicksLimit?: number }).maxTicksLimit = 6;

  // Elements: smooth 2px lines, hidden points until hover, rounded bars, separated slices.
  d.elements.line.tension = 0.4;
  d.elements.line.borderWidth = 2;
  d.elements.line.borderCapStyle = 'round';
  d.elements.point.radius = 0;
  d.elements.point.hoverRadius = 4;
  d.elements.point.hoverBorderWidth = 2;
  d.elements.point.pointStyle = 'circle';
  d.elements.bar.borderRadius = 4;
  d.elements.bar.borderSkipped = 'start';
  d.elements.arc.borderWidth = 2;
  d.elements.arc.borderColor = p.surface;
  d.elements.arc.hoverOffset = 6;

  // Slices: tooltip for the hovered slice only.
  for (const type of ['doughnut', 'pie', 'polarArea'] as const) {
    const o = ChartJs.overrides[type] as { interaction?: object };
    o.interaction = { mode: 'point', intersect: true };
  }

  // Legend: round markers in muted text.
  const legend = d.plugins.legend;
  legend.rtl = p.rtl;
  legend.textDirection = p.rtl ? 'rtl' : 'ltr';
  legend.labels.usePointStyle = true;
  legend.labels.pointStyle = 'circle';
  legend.labels.boxWidth = 8;
  legend.labels.boxHeight = 8;
  legend.labels.padding = 14;
  legend.labels.color = p.text;
  baseGenerateLabels ??= legend.labels.generateLabels;
  const generate = baseGenerateLabels;
  // Area series would otherwise show their gradient fill as the marker; use the stroke.
  legend.labels.generateLabels = (chart: Chart) =>
    generate(chart).map((item) => {
      if (item.datasetIndex === undefined) return item;
      const type = chart.getDatasetMeta(item.datasetIndex).type;
      return type === 'line' ? { ...item, fillStyle: item.strokeStyle } : item;
    });

  // Tooltip: Bootstrap's tooltip — inverted surface, rounded, small type.
  const tooltip = d.plugins.tooltip;
  tooltip.backgroundColor = withAlpha(p.emphasis, 0.92);
  tooltip.borderWidth = 0;
  tooltip.cornerRadius = 6;
  tooltip.padding = { top: 8, bottom: 8, left: 10, right: 10 };
  tooltip.caretSize = 5;
  tooltip.caretPadding = 6;
  tooltip.titleColor = p.background;
  tooltip.titleFont = { size: 12, weight: 600 };
  tooltip.titleMarginBottom = 6;
  tooltip.bodyColor = p.background;
  tooltip.bodyFont = { size: 12 };
  tooltip.bodySpacing = 4;
  tooltip.displayColors = true;
  tooltip.usePointStyle = true;
  tooltip.boxWidth = 8;
  tooltip.boxHeight = 8;
  tooltip.boxPadding = 6;
  tooltip.rtl = p.rtl;
  tooltip.textDirection = p.rtl ? 'rtl' : 'ltr';
  tooltip.callbacks.labelColor = (item: TooltipItem<ChartType>) => {
    const color = markerColor(
      item.chart,
      item.datasetIndex,
      (item.element as unknown as { options?: unknown }).options,
      p.colors.primary,
    );
    return { borderColor: p.background, backgroundColor: color, borderWidth: 1, borderRadius: 4 };
  };
}

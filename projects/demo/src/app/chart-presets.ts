import type { ChartDataset, ChartOptions } from 'chart.js';
import { verticalGradient, type ChartPalette } from '@adminlte/angular';

/** Month labels for the Jan–Jul 2023 sales series used by Dashboard v1 and v2. */
export const SALES_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const SALES_MONTHS_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

/** A smooth area series: `color` stroke over a fading gradient fill. */
export function areaDataset(p: ChartPalette, label: string, data: number[], color: string): ChartDataset<'line'> {
  return {
    label,
    data,
    borderColor: color,
    backgroundColor: verticalGradient(color, 0.45, 0.05),
    fill: 'origin',
    pointBackgroundColor: p.surface,
    pointBorderColor: color,
    pointHoverBackgroundColor: p.surface,
    pointHoverBorderColor: color,
  };
}

/** The "Digital Goods vs Electronics" sales area chart from the core index/index2 pages. */
export function salesAreaChart(p: ChartPalette) {
  return {
    data: {
      labels: SALES_MONTHS,
      datasets: [
        areaDataset(p, 'Digital Goods', [28, 48, 40, 19, 86, 27, 90], p.colors.primary),
        areaDataset(p, 'Electronics', [65, 59, 80, 81, 56, 55, 40], p.colors.teal),
      ],
    },
    options: {
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { title: (items) => `${SALES_MONTHS_LONG[items[0]?.dataIndex ?? 0]} 2023` } },
      },
      scales: { y: { beginAtZero: true, suggestedMax: 100 } },
    } satisfies ChartOptions<'line'>,
  };
}

/** Tiny inline trend line: no axes, legend or tooltip. */
export function sparklineOptions(min?: number): ChartOptions<'line'> {
  return {
    animation: { duration: 400 },
    layout: { padding: { top: 2, bottom: 2 } },
    events: [],
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    elements: { line: { tension: 0, borderWidth: 2 }, point: { radius: 0, hoverRadius: 0 } },
    scales: { x: { display: false }, y: { display: false, min } },
  };
}

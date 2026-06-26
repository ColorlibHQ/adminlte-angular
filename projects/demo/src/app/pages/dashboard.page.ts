import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  AppContentComponent,
  CardComponent,
  SmallBoxComponent,
  InfoBoxComponent,
  ApexChartComponent,
  TimelineComponent,
  DescriptionBlockComponent,
  ColorModeService,
  type TimelineItem,
} from '@adminlte/angular';

/**
 * Demo dashboard page. Showcases small boxes, info boxes, a card-wrapped
 * ApexCharts area chart (theme-aware), description blocks and a timeline — all
 * from the @adminlte/angular library.
 */
@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AppContentComponent,
    CardComponent,
    SmallBoxComponent,
    InfoBoxComponent,
    ApexChartComponent,
    TimelineComponent,
    DescriptionBlockComponent,
  ],
  template: `
    <lte-app-content
      title="Dashboard"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Dashboard' }]"
    >
      <!-- Small boxes -->
      <div class="row">
        <div class="col-lg-3 col-6">
          <lte-small-box title="150" text="New Orders" icon="bi-bag" theme="primary" url="#" />
        </div>
        <div class="col-lg-3 col-6">
          <lte-small-box title="53%" text="Bounce Rate" icon="bi-graph-up" theme="success" url="#" />
        </div>
        <div class="col-lg-3 col-6">
          <lte-small-box title="44" text="User Registrations" icon="bi-person-plus" theme="warning" url="#" />
        </div>
        <div class="col-lg-3 col-6">
          <lte-small-box title="65" text="Unique Visitors" icon="bi-pie-chart" theme="danger" url="#" />
        </div>
      </div>

      <!-- Info boxes -->
      <div class="row">
        <div class="col-md-6 col-lg-3">
          <lte-info-box title="1,410" text="Bookmarks" icon="bi-bookmark" theme="info" />
        </div>
        <div class="col-md-6 col-lg-3">
          <lte-info-box title="410" text="Likes" icon="bi-heart" theme="danger" />
        </div>
        <div class="col-md-6 col-lg-3">
          <lte-info-box title="13,648" text="Events" icon="bi-calendar3" theme="success" [progress]="70" progressText="70% increase in 30 days" />
        </div>
        <div class="col-md-6 col-lg-3">
          <lte-info-box title="93,139" text="Comments" icon="bi-chat" theme="warning" variant="solid" />
        </div>
      </div>

      <!-- Chart + footer description blocks -->
      <div class="row">
        <div class="col-lg-8">
          <lte-card title="Sales Overview" icon="bi-bar-chart-line" [maximizable]="true" [collapsible]="true" [hasFooter]="true">
            <lte-apex-chart [options]="chartOptions()" />
            <div footer class="row">
              <div class="col-sm-3 col-6">
                <lte-description-block header="$35,210.43" text="TOTAL REVENUE" icon="bi-cash" iconTheme="success" [percentage]="17" />
              </div>
              <div class="col-sm-3 col-6">
                <lte-description-block header="$10,390.90" text="TOTAL COST" icon="bi-wallet2" iconTheme="danger" [percentage]="-2" />
              </div>
              <div class="col-sm-3 col-6">
                <lte-description-block header="$24,813.53" text="TOTAL PROFIT" icon="bi-graph-up-arrow" iconTheme="info" [percentage]="35" />
              </div>
              <div class="col-sm-3 col-6">
                <lte-description-block header="1200" text="GOAL COMPLETIONS" icon="bi-flag" iconTheme="warning" [percentage]="5" />
              </div>
            </div>
          </lte-card>
        </div>

        <div class="col-lg-4">
          <lte-card title="Recent Activity" icon="bi-clock-history" theme="primary" variant="outline">
            <lte-timeline [items]="timeline" />
          </lte-card>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class DashboardPage {
  private readonly colorMode = inject(ColorModeService);

  readonly timeline: TimelineItem[] = [
    { time: '12:05', title: 'New order #1410 placed', icon: 'bi-bag', iconTheme: 'primary', body: 'A customer placed a new order for <b>3 items</b>.' },
    { time: '11:32', title: 'Server backup completed', icon: 'bi-hdd', iconTheme: 'success' },
    { time: '10:18', title: 'Comment flagged for review', icon: 'bi-flag', iconTheme: 'warning', body: 'Awaiting moderation.' },
    { time: '09:00', title: 'New user registered', icon: 'bi-person-plus', iconTheme: 'info' },
  ];

  /** Chart options recompute when the color mode changes so it matches the theme. */
  readonly chartOptions = computed<Record<string, unknown>>(() => ({
    chart: { type: 'area', height: 300, toolbar: { show: false } },
    series: [
      { name: 'Revenue', data: [31, 40, 28, 51, 42, 109, 100] },
      { name: 'Cost', data: [11, 32, 45, 32, 34, 52, 41] },
    ],
    colors: ['#0d6efd', '#dc3545'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    theme: { mode: this.colorMode.resolvedMode() },
    legend: { position: 'top' },
    tooltip: { theme: this.colorMode.resolvedMode() },
  }));
}

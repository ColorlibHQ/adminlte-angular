import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppContentComponent, ApexChartComponent } from '@adminlte/angular';

/**
 * Dashboard v3 — 1:1 replica of the core AdminLTE 4 `index3.html`: an Online
 * Store Visitors line chart, a Products table, a Sales bar chart, and an Online
 * Store Overview metrics card. Charts use `<lte-apex-chart>` with the exact
 * ApexCharts option objects from the core page's `<script>` block.
 */
@Component({
  selector: 'app-dashboard3',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, ApexChartComponent],
  template: `
    <lte-app-content
      title="Dashboard v3"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Dashboard v3' }]"
    >
      <div class="row">
        <div class="col-lg-6">
          <!-- Online Store Visitors -->
          <div class="card mb-4">
            <div class="card-header border-0">
              <div class="d-flex justify-content-between">
                <h3 class="card-title">Online Store Visitors</h3>
                <a href="#" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">View Report</a>
              </div>
            </div>
            <div class="card-body">
              <div class="d-flex">
                <p class="d-flex flex-column">
                  <span class="fw-bold fs-5">820</span>
                  <span>Visitors Over Time</span>
                </p>
                <p class="ms-auto d-flex flex-column text-end">
                  <span class="text-success"><i class="bi bi-arrow-up"></i> 12.5%</span>
                  <span class="text-secondary">Since last week</span>
                </p>
              </div>
              <div class="position-relative mb-4">
                <lte-apex-chart [options]="visitorsOptions" />
              </div>
              <div class="d-flex flex-row justify-content-end">
                <span class="me-2"><i class="bi bi-square-fill text-primary"></i> This Week</span>
                <span><i class="bi bi-square-fill text-secondary"></i> Last Week</span>
              </div>
            </div>
          </div>

          <!-- Products -->
          <div class="card mb-4">
            <div class="card-header border-0">
              <h3 class="card-title">Products</h3>
              <div class="card-tools">
                <a href="#" class="btn btn-tool btn-sm"><i class="bi bi-download"></i></a>
                <a href="#" class="btn btn-tool btn-sm"><i class="bi bi-list"></i></a>
              </div>
            </div>
            <div class="card-body table-responsive p-0">
              <table class="table table-striped align-middle">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Sales</th>
                    <th>More</th>
                  </tr>
                </thead>
                <tbody>
                  @for (p of products; track $index) {
                    <tr>
                      <td>
                        <img [src]="avatar" alt="Product" class="rounded-circle img-size-32 me-2" />
                        {{ p.name }}
                        @if (p.isNew) {<span class="badge text-bg-danger">NEW</span>}
                      </td>
                      <td>{{ p.price }}</td>
                      <td>
                        <small [class]="'me-1 text-' + p.trendTheme">
                          <i [class]="'bi ' + p.trendIcon"></i>
                          {{ p.trend }}
                        </small>
                        {{ p.sold }}
                      </td>
                      <td>
                        <a href="#" class="text-secondary"><i class="bi bi-search"></i></a>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <!-- Sales -->
          <div class="card mb-4">
            <div class="card-header border-0">
              <div class="d-flex justify-content-between">
                <h3 class="card-title">Sales</h3>
                <a href="#" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">View Report</a>
              </div>
            </div>
            <div class="card-body">
              <div class="d-flex">
                <p class="d-flex flex-column">
                  <span class="fw-bold fs-5">$18,230.00</span>
                  <span>Sales Over Time</span>
                </p>
                <p class="ms-auto d-flex flex-column text-end">
                  <span class="text-success"><i class="bi bi-arrow-up"></i> 33.1%</span>
                  <span class="text-secondary">Since Past Year</span>
                </p>
              </div>
              <div class="position-relative mb-4">
                <lte-apex-chart [options]="salesOptions" />
              </div>
              <div class="d-flex flex-row justify-content-end">
                <span class="me-2"><i class="bi bi-square-fill text-primary"></i> This year</span>
                <span><i class="bi bi-square-fill text-secondary"></i> Last year</span>
              </div>
            </div>
          </div>

          <!-- Online Store Overview -->
          <div class="card">
            <div class="card-header border-0">
              <h3 class="card-title">Online Store Overview</h3>
              <div class="card-tools">
                <a href="#" class="btn btn-sm btn-tool"><i class="bi bi-download"></i></a>
                <a href="#" class="btn btn-sm btn-tool"><i class="bi bi-list"></i></a>
              </div>
            </div>
            <div class="card-body">
              @for (o of overview; track $index; let last = $last) {
                <div class="d-flex justify-content-between align-items-center" [class.border-bottom]="!last" [class.mb-3]="!last" [class.mb-0]="last">
                  <p [class]="'fs-2 text-' + o.theme">
                    <i [class]="'bi ' + o.icon" style="font-size: 32px"></i>
                  </p>
                  <p class="d-flex flex-column text-end">
                    <span class="fw-bold">
                      <i [class]="'bi ' + o.trendIcon + ' text-' + o.theme"></i> {{ o.value }}
                    </span>
                    <span class="text-secondary">{{ o.label }}</span>
                  </p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class Dashboard3Page {
  /** Gravatar mystery-person placeholder used for product thumbnails. */
  readonly avatar = 'https://www.gravatar.com/avatar/?d=mp&s=64';

  readonly products = [
    { name: 'Some Product', price: '$13 USD', trend: '12%', trendTheme: 'success', trendIcon: 'bi-arrow-up', sold: '12,000 Sold', isNew: false },
    { name: 'Another Product', price: '$29 USD', trend: '0.5%', trendTheme: 'info', trendIcon: 'bi-arrow-down', sold: '123,234 Sold', isNew: false },
    { name: 'Amazing Product', price: '$1,230 USD', trend: '3%', trendTheme: 'danger', trendIcon: 'bi-arrow-down', sold: '198 Sold', isNew: false },
    { name: 'Perfect Item', price: '$199 USD', trend: '63%', trendTheme: 'success', trendIcon: 'bi-arrow-up', sold: '87 Sold', isNew: true },
  ];

  readonly overview = [
    { theme: 'success', icon: 'bi-arrow-repeat', trendIcon: 'bi-graph-up-arrow', value: '12%', label: 'CONVERSION RATE' },
    { theme: 'info', icon: 'bi-cart3', trendIcon: 'bi-graph-up-arrow', value: '0.8%', label: 'SALES RATE' },
    { theme: 'danger', icon: 'bi-people', trendIcon: 'bi-graph-down-arrow', value: '1%', label: 'REGISTRATION RATE' },
  ];

  /** Visitors line chart — identical to `visitors_chart_options` in index3.html. */
  readonly visitorsOptions: Record<string, unknown> = {
    series: [
      { name: 'High - 2023', data: [100, 120, 170, 167, 180, 177, 160] },
      { name: 'Low - 2023', data: [60, 80, 70, 67, 80, 77, 100] },
    ],
    chart: { height: 200, type: 'line', toolbar: { show: false } },
    colors: ['#0d6efd', '#adb5bd'],
    stroke: { curve: 'smooth' },
    grid: {
      borderColor: '#e7e7e7',
      row: { colors: ['#f3f3f3', 'transparent'], opacity: 0.5 },
    },
    legend: { show: false },
    markers: { size: 1 },
    xaxis: { categories: ['22th', '23th', '24th', '25th', '26th', '27th', '28th'] },
  };

  /** Sales bar chart — identical to `sales_chart_options` in index3.html. */
  readonly salesOptions: Record<string, unknown> = {
    series: [
      { name: 'Net Profit', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
      { name: 'Revenue', data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
      { name: 'Free Cash Flow', data: [35, 41, 36, 26, 45, 48, 52, 53, 41] },
    ],
    chart: { type: 'bar', height: 200 },
    plotOptions: { bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' } },
    legend: { show: false },
    colors: ['#0d6efd', '#20c997', '#ffc107'],
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: { categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'] },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: (val: number) => '$ ' + val + ' thousands' } },
  };
}

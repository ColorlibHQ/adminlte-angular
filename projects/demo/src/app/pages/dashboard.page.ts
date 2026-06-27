import { ChangeDetectionStrategy, Component, afterNextRender } from '@angular/core';
import { AppContentComponent, SmallBoxComponent, ApexChartComponent } from '@adminlte/angular';

/**
 * Dashboard — a 1:1 replica of the core AdminLTE 4 index page: four small-boxes,
 * the Sales Value area chart, a Direct Chat card, and a primary-gradient card
 * with a jsvectormap world map and three sparklines.
 */
@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, SmallBoxComponent, ApexChartComponent],
  template: `
    <lte-app-content title="Dashboard" [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Dashboard' }]">
      <!-- Small boxes -->
      <div class="row">
        <div class="col-lg-3 col-6"><lte-small-box title="150" text="New Orders" theme="primary" icon="bi-bag" url="#" /></div>
        <div class="col-lg-3 col-6"><lte-small-box title="53%" text="Bounce Rate" theme="success" icon="bi-graph-up" url="#" /></div>
        <div class="col-lg-3 col-6"><lte-small-box title="44" text="User Registrations" theme="warning" icon="bi-person-plus" url="#" /></div>
        <div class="col-lg-3 col-6"><lte-small-box title="65" text="Unique Visitors" theme="danger" icon="bi-pie-chart" url="#" /></div>
      </div>

      <!-- Main row -->
      <div class="row">
        <!-- Left col -->
        <div class="col-lg-7">
          <div class="card mb-4">
            <div class="card-header"><h3 class="card-title">Sales Value</h3></div>
            <div class="card-body">
              <lte-apex-chart [options]="salesOptions" />
            </div>
          </div>

          <!-- Direct Chat -->
          <div class="card direct-chat direct-chat-primary mb-4">
            <div class="card-header">
              <h3 class="card-title">Direct Chat</h3>
              <div class="card-tools">
                <span title="3 New Messages" class="badge text-bg-primary">3</span>
                <button type="button" class="btn btn-tool" data-lte-toggle="card-collapse">
                  <i data-lte-icon="expand" class="bi bi-plus-lg"></i>
                  <i data-lte-icon="collapse" class="bi bi-dash-lg"></i>
                </button>
                <button type="button" class="btn btn-tool" title="Contacts" data-lte-toggle="chat-pane"><i class="bi bi-chat-text-fill"></i></button>
                <button type="button" class="btn btn-tool" data-lte-toggle="card-remove"><i class="bi bi-x-lg"></i></button>
              </div>
            </div>
            <div class="card-body">
              <div class="direct-chat-messages">
                @for (m of messages; track $index) {
                  <div class="direct-chat-msg" [class.end]="m.end">
                    <div class="direct-chat-infos clearfix">
                      <span class="direct-chat-name" [class.float-start]="!m.end" [class.float-end]="m.end">{{ m.name }}</span>
                      <span class="direct-chat-timestamp" [class.float-end]="!m.end" [class.float-start]="m.end">{{ m.time }}</span>
                    </div>
                    <img class="direct-chat-img" [src]="m.img" alt="message user image" />
                    <div class="direct-chat-text">{{ m.text }}</div>
                  </div>
                }
              </div>
            </div>
            <div class="card-footer">
              <form action="#" method="post">
                <div class="input-group">
                  <input type="text" name="message" placeholder="Type Message ..." class="form-control" />
                  <span class="input-group-append"><button type="button" class="btn btn-primary">Send</button></span>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Right col -->
        <div class="col-lg-5">
          <div class="card text-white bg-primary bg-gradient border-primary mb-4">
            <div class="card-header border-0"><h3 class="card-title">Sales Value</h3></div>
            <div class="card-body">
              <div id="dashboard-world-map" style="height: 220px"></div>
            </div>
            <div class="card-footer border-0">
              <div class="row">
                <div class="col-4 text-center"><lte-apex-chart [options]="spark1" /><div class="text-white">Visitors</div></div>
                <div class="col-4 text-center"><lte-apex-chart [options]="spark2" /><div class="text-white">Online</div></div>
                <div class="col-4 text-center"><lte-apex-chart [options]="spark3" /><div class="text-white">Sales</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class DashboardPage {
  private readonly avatar = 'https://www.gravatar.com/avatar/?d=mp&s=128';

  readonly messages = [
    { end: false, name: 'Alexander Pierce', time: '23 Jan 2:00 pm', img: this.avatar, text: "Is this template really for free? That's unbelievable!" },
    { end: true, name: 'Sarah Bullock', time: '23 Jan 2:05 pm', img: this.avatar, text: 'You better believe it!' },
    { end: false, name: 'Alexander Pierce', time: '23 Jan 5:37 pm', img: this.avatar, text: 'Working with AdminLTE on a great new app! Wanna join?' },
    { end: true, name: 'Sarah Bullock', time: '23 Jan 6:10 pm', img: this.avatar, text: 'I would love to.' },
  ];

  readonly salesOptions: Record<string, unknown> = {
    series: [
      { name: 'Digital Goods', data: [28, 48, 40, 19, 86, 27, 90] },
      { name: 'Electronics', data: [65, 59, 80, 81, 56, 55, 40] },
    ],
    chart: { height: 300, type: 'area', toolbar: { show: false } },
    legend: { show: false },
    colors: ['#0d6efd', '#20c997'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    xaxis: {
      type: 'datetime',
      categories: ['2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01', '2023-06-01', '2023-07-01'],
    },
    tooltip: { x: { format: 'MMMM yyyy' } },
  };

  readonly spark1 = this.sparkline([1000, 1200, 920, 927, 931, 1027, 819, 930, 1021]);
  readonly spark2 = this.sparkline([515, 519, 520, 522, 652, 810, 370, 627, 319, 630, 921]);
  readonly spark3 = this.sparkline([15, 19, 20, 22, 33, 27, 31, 27, 19, 30, 21]);

  constructor() {
    afterNextRender(async () => {
      const el = document.getElementById('dashboard-world-map');
      if (!el) return;
      try {
        const mod = await import('jsvectormap');
        const jsVectorMap = mod.default;
        (window as unknown as { jsVectorMap?: unknown }).jsVectorMap = jsVectorMap;
        await import('jsvectormap/dist/maps/world.js');
        new jsVectorMap({ selector: '#dashboard-world-map', map: 'world' });
      } catch {
        /* map is optional eye-candy; ignore if the lib fails to load */
      }
    });
  }

  private sparkline(data: number[]): Record<string, unknown> {
    return {
      series: [{ data }],
      chart: { type: 'area', height: 50, sparkline: { enabled: true } },
      stroke: { curve: 'straight' },
      fill: { opacity: 0.3 },
      yaxis: { min: 0 },
      colors: ['#DCE6EC'],
    };
  }
}

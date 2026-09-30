import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import type { ChartData, ChartOptions } from 'chart.js';
import { AppContentComponent, InfoBoxComponent, ChartComponent, ChartThemeService } from '@adminlte/angular';
import { salesAreaChart, sparklineOptions } from '../chart-presets';

/**
 * Dashboard v2 — 1:1 replica of the core AdminLTE 4 `index2.html`: four info
 * boxes, a Monthly Recap Report (sales area chart + goal-completion progress
 * groups), a Direct Chat card, a Latest Members grid, a Latest Orders table with
 * inline sparklines, four solid info boxes, a Browser Usage donut, and a
 * Recently Added Products list. Charts use `<lte-chart>` (Chart.js) with the
 * data, colours and chart types of the core page's `<script>` block.
 */
@Component({
  selector: 'app-dashboard2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, InfoBoxComponent, ChartComponent],
  template: `
    <lte-app-content
      title="Dashboard v2"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Dashboard v2' }]"
    >
      <!-- Info boxes -->
      <div class="row">
        <div class="col-12 col-sm-6 col-md-3">
          <lte-info-box text="CPU Traffic" [title]="10" unit="%" icon="bi-gear-fill" theme="primary" />
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <lte-info-box text="Likes" title="41,410" icon="bi-hand-thumbs-up-fill" theme="danger" />
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <lte-info-box text="Sales" title="760" icon="bi-cart-fill" theme="success" />
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <lte-info-box text="New Members" title="2,000" icon="bi-people-fill" theme="warning" />
        </div>
      </div>

      <!-- Monthly Recap Report -->
      <div class="row">
        <div class="col-md-12">
          <div class="card mb-4">
            <div class="card-header">
              <h5 class="card-title">Monthly Recap Report</h5>
              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-lte-toggle="card-collapse">
                  <i data-lte-icon="expand" class="bi bi-plus-lg"></i>
                  <i data-lte-icon="collapse" class="bi bi-dash-lg"></i>
                </button>
                <div class="btn-group">
                  <button type="button" class="btn btn-tool dropdown-toggle" data-bs-toggle="dropdown">
                    <i class="bi bi-wrench"></i>
                  </button>
                  <div class="dropdown-menu dropdown-menu-end" role="menu">
                    <a href="#" class="dropdown-item">Action</a>
                    <a href="#" class="dropdown-item">Another action</a>
                    <a href="#" class="dropdown-item">Something else here</a>
                    <a class="dropdown-divider"></a>
                    <a href="#" class="dropdown-item">Separated link</a>
                  </div>
                </div>
                <button type="button" class="btn btn-tool" data-lte-toggle="card-remove">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-8">
                  <p class="text-center"><strong>Sales: 1 Jan, 2023 - 30 Jul, 2023</strong></p>
                  <lte-chart type="line" [data]="sales().data" [options]="sales().options" [height]="180" label="Sales, January to July 2023" />
                </div>
                <div class="col-md-4">
                  <div class="progress-group">
                    Add Products to Cart
                    <span class="float-end"><b>160</b>/200</span>
                    <div class="progress progress-sm">
                      <div class="progress-bar text-bg-primary" style="width: 80%"></div>
                    </div>
                  </div>
                  <div class="progress-group">
                    Complete Purchase
                    <span class="float-end"><b>310</b>/400</span>
                    <div class="progress progress-sm">
                      <div class="progress-bar text-bg-danger" style="width: 75%"></div>
                    </div>
                  </div>
                  <div class="progress-group">
                    <span class="progress-text">Visit Premium Page</span>
                    <span class="float-end"><b>480</b>/800</span>
                    <div class="progress progress-sm">
                      <div class="progress-bar text-bg-success" style="width: 60%"></div>
                    </div>
                  </div>
                  <div class="progress-group">
                    Send Inquiries
                    <span class="float-end"><b>250</b>/500</span>
                    <div class="progress progress-sm">
                      <div class="progress-bar text-bg-warning" style="width: 50%"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-md-3 col-6">
                  <div class="text-center border-end">
                    <span class="text-success"><i class="bi bi-caret-up-fill"></i> 17%</span>
                    <h5 class="fw-bold mb-0">$35,210.43</h5>
                    <span class="text-uppercase">TOTAL REVENUE</span>
                  </div>
                </div>
                <div class="col-md-3 col-6">
                  <div class="text-center border-end">
                    <span class="text-info"><i class="bi bi-caret-left-fill"></i> 0%</span>
                    <h5 class="fw-bold mb-0">$10,390.90</h5>
                    <span class="text-uppercase">TOTAL COST</span>
                  </div>
                </div>
                <div class="col-md-3 col-6">
                  <div class="text-center border-end">
                    <span class="text-success"><i class="bi bi-caret-up-fill"></i> 20%</span>
                    <h5 class="fw-bold mb-0">$24,813.53</h5>
                    <span class="text-uppercase">TOTAL PROFIT</span>
                  </div>
                </div>
                <div class="col-md-3 col-6">
                  <div class="text-center">
                    <span class="text-danger"><i class="bi bi-caret-down-fill"></i> 18%</span>
                    <h5 class="fw-bold mb-0">1200</h5>
                    <span class="text-uppercase">GOAL COMPLETIONS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main row -->
      <div class="row">
        <div class="col-md-8">
          <div class="row g-4 mb-4">
            <!-- Direct Chat -->
            <div class="col-md-6">
              <div class="card direct-chat direct-chat-warning">
                <div class="card-header">
                  <h3 class="card-title">Direct Chat</h3>
                  <div class="card-tools">
                    <span title="3 New Messages" class="badge text-bg-warning">3</span>
                    <button type="button" class="btn btn-tool" data-lte-toggle="card-collapse">
                      <i data-lte-icon="expand" class="bi bi-plus-lg"></i>
                      <i data-lte-icon="collapse" class="bi bi-dash-lg"></i>
                    </button>
                    <button type="button" class="btn btn-tool" title="Contacts" data-lte-toggle="chat-pane">
                      <i class="bi bi-chat-text-fill"></i>
                    </button>
                    <button type="button" class="btn btn-tool" data-lte-toggle="card-remove">
                      <i class="bi bi-x-lg"></i>
                    </button>
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
                        <img class="direct-chat-img" [src]="avatar" alt="message user image" />
                        <div class="direct-chat-text">{{ m.text }}</div>
                      </div>
                    }
                  </div>
                  <div class="direct-chat-contacts">
                    <ul class="contacts-list">
                      @for (c of contacts; track $index) {
                        <li>
                          <a href="#">
                            <img class="contacts-list-img" [src]="avatar" alt="User Avatar" />
                            <div class="contacts-list-info">
                              <span class="contacts-list-name">
                                {{ c.name }}
                                <small class="contacts-list-date float-end">{{ c.date }}</small>
                              </span>
                              <span class="contacts-list-msg">{{ c.msg }}</span>
                            </div>
                          </a>
                        </li>
                      }
                    </ul>
                  </div>
                </div>
                <div class="card-footer">
                  <form action="#" method="post">
                    <div class="input-group">
                      <input type="text" name="message" placeholder="Type Message ..." class="form-control" />
                      <span class="input-group-append"><button type="button" class="btn btn-warning">Send</button></span>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Latest Members -->
            <div class="col-md-6">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">Latest Members</h3>
                  <div class="card-tools">
                    <span class="badge text-bg-danger">8 New Members</span>
                    <button type="button" class="btn btn-tool" data-lte-toggle="card-collapse">
                      <i data-lte-icon="expand" class="bi bi-plus-lg"></i>
                      <i data-lte-icon="collapse" class="bi bi-dash-lg"></i>
                    </button>
                    <button type="button" class="btn btn-tool" data-lte-toggle="card-remove">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                </div>
                <div class="card-body p-0">
                  <div class="row text-center m-1">
                    @for (mem of members; track $index) {
                      <div class="col-3 p-2">
                        <img class="img-fluid rounded-circle" [src]="avatar" alt="User Image" />
                        <a class="btn fw-bold fs-7 text-secondary text-truncate w-100 p-0" href="#">{{ mem.name }}</a>
                        <div class="fs-8">{{ mem.when }}</div>
                      </div>
                    }
                  </div>
                </div>
                <div class="card-footer text-center">
                  <a href="#" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">View All Users</a>
                </div>
              </div>
            </div>
          </div>

          <!-- Latest Orders -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Latest Orders</h3>
              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-lte-toggle="card-collapse">
                  <i data-lte-icon="expand" class="bi bi-plus-lg"></i>
                  <i data-lte-icon="collapse" class="bi bi-dash-lg"></i>
                </button>
                <button type="button" class="btn btn-tool" data-lte-toggle="card-remove">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table m-0">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Item</th>
                      <th>Status</th>
                      <th>Popularity</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (o of orders; track $index; let i = $index) {
                      <tr>
                        <td>
                          <a href="#" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">{{ o.id }}</a>
                        </td>
                        <td>{{ o.item }}</td>
                        <td><span [class]="'badge text-bg-' + o.statusTheme">{{ o.status }}</span></td>
                        <td><lte-chart type="line" [data]="orderSparklines()[i]" [options]="sparkOptions" [width]="150" [height]="30" [label]="'Popularity of ' + o.item" /></td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
            <div class="card-footer clearfix">
              <a href="#" class="btn btn-sm btn-primary float-start">Place New Order</a>
              <a href="#" class="btn btn-sm btn-secondary float-end">View All Orders</a>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <!-- Solid info boxes -->
          <lte-info-box text="Inventory" title="5,200" icon="bi-tag-fill" theme="warning" variant="solid" boxClassExtra="mb-3" />
          <lte-info-box text="Mentions" title="92,050" icon="bi-heart-fill" theme="success" variant="solid" boxClassExtra="mb-3" />
          <lte-info-box text="Downloads" title="114,381" icon="bi-cloud-download" theme="danger" variant="solid" boxClassExtra="mb-3" />
          <lte-info-box text="Direct Messages" title="163,921" icon="bi-chat-fill" theme="info" variant="solid" boxClassExtra="mb-3" />

          <!-- Browser Usage -->
          <div class="card mb-4">
            <div class="card-header">
              <h3 class="card-title">Browser Usage</h3>
              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-lte-toggle="card-collapse">
                  <i data-lte-icon="expand" class="bi bi-plus-lg"></i>
                  <i data-lte-icon="collapse" class="bi bi-dash-lg"></i>
                </button>
                <button type="button" class="btn btn-tool" data-lte-toggle="card-remove">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <lte-chart type="doughnut" [data]="browserUsage()" [options]="browserUsageOptions" [height]="260" label="Browser usage" />
                </div>
              </div>
            </div>
            <div class="card-footer p-0">
              <ul class="nav nav-pills flex-column">
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    United States of America
                    <span class="float-end text-danger"><i class="bi bi-arrow-down fs-7"></i> 12%</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    India
                    <span class="float-end text-success"><i class="bi bi-arrow-up fs-7"></i> 4%</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    China
                    <span class="float-end text-info"><i class="bi bi-arrow-left fs-7"></i> 0%</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Recently Added Products -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Recently Added Products</h3>
              <div class="card-tools">
                <button type="button" class="btn btn-tool" data-lte-toggle="card-collapse">
                  <i data-lte-icon="expand" class="bi bi-plus-lg"></i>
                  <i data-lte-icon="collapse" class="bi bi-dash-lg"></i>
                </button>
                <button type="button" class="btn btn-tool" data-lte-toggle="card-remove">
                  <i class="bi bi-x-lg"></i>
                </button>
              </div>
            </div>
            <div class="card-body p-0">
              <div class="px-2">
                @for (p of products; track $index) {
                  <div class="d-flex border-top py-2 px-1">
                    <div class="col-2">
                      <img [src]="avatar" alt="Product Image" class="img-size-50" />
                    </div>
                    <div class="col-10">
                      <a href="#" class="fw-bold">
                        {{ p.name }}
                        <span [class]="'badge text-bg-' + p.priceTheme + ' float-end'">{{ p.price }}</span>
                      </a>
                      <div class="text-truncate">{{ p.desc }}</div>
                    </div>
                  </div>
                }
              </div>
            </div>
            <div class="card-footer text-center">
              <a href="#" class="uppercase">View All Products</a>
            </div>
          </div>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class Dashboard2Page {
  /** Gravatar mystery-person placeholder used for all avatars/thumbnails. */
  readonly avatar = 'https://www.gravatar.com/avatar/?d=mp&s=128';

  readonly messages = [
    { end: false, name: 'Alexander Pierce', time: '23 Jan 2:00 pm', text: "Is this template really for free? That's unbelievable!" },
    { end: true, name: 'Sarah Bullock', time: '23 Jan 2:05 pm', text: 'You better believe it!' },
    { end: false, name: 'Alexander Pierce', time: '23 Jan 5:37 pm', text: 'Working with AdminLTE on a great new app! Wanna join?' },
    { end: true, name: 'Sarah Bullock', time: '23 Jan 6:10 pm', text: 'I would love to.' },
  ];

  readonly contacts = [
    { name: 'Count Dracula', date: '2/28/2023', msg: 'How have you been? I was...' },
    { name: 'Sarah Doe', date: '2/23/2023', msg: 'I will be waiting for...' },
    { name: 'Nadia Jolie', date: '2/20/2023', msg: "I'll call you back at..." },
    { name: 'Nora S. Vans', date: '2/10/2023', msg: 'Where is your new...' },
    { name: 'John K.', date: '1/27/2023', msg: 'Can I take a look at...' },
    { name: 'Kenneth M.', date: '1/4/2023', msg: 'Never mind I found...' },
  ];

  readonly members = [
    { name: 'Alexander Pierce', when: 'Today' },
    { name: 'Norman', when: 'Yesterday' },
    { name: 'Jane', when: '12 Jan' },
    { name: 'John', when: '12 Jan' },
    { name: 'Alexander', when: '13 Jan' },
    { name: 'Sarah', when: '14 Jan' },
    { name: 'Nora', when: '15 Jan' },
    { name: 'Nadia', when: '15 Jan' },
  ];

  readonly orders = [
    { id: 'OR9842', item: 'Call of Duty IV', status: 'Shipped', statusTheme: 'success', spark: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54] },
    { id: 'OR1848', item: 'Samsung Smart TV', status: 'Pending', statusTheme: 'warning', spark: [12, 56, 21, 39, 73, 45, 64, 52, 36, 59, 44] },
    { id: 'OR7429', item: 'iPhone 6 Plus', status: 'Delivered', statusTheme: 'danger', spark: [15, 46, 21, 59, 33, 15, 34, 42, 56, 19, 64] },
    { id: 'OR7429', item: 'Samsung Smart TV', status: 'Processing', statusTheme: 'info', spark: [30, 56, 31, 69, 43, 35, 24, 32, 46, 29, 64] },
    { id: 'OR1848', item: 'Samsung Smart TV', status: 'Pending', statusTheme: 'warning', spark: [20, 76, 51, 79, 53, 35, 54, 22, 36, 49, 64] },
    { id: 'OR7429', item: 'iPhone 6 Plus', status: 'Delivered', statusTheme: 'danger', spark: [5, 36, 11, 69, 23, 15, 14, 42, 26, 19, 44] },
    { id: 'OR9842', item: 'Call of Duty IV', status: 'Shipped', statusTheme: 'success', spark: [12, 56, 21, 39, 73, 45, 64, 52, 36, 59, 74] },
  ];

  readonly products = [
    { name: 'Samsung TV', price: '$1800', priceTheme: 'warning', desc: 'Samsung 32" 1080p 60Hz LED Smart HDTV.' },
    { name: 'Bicycle', price: '$700', priceTheme: 'info', desc: `26" Mongoose Dolomite Men's 7-speed, Navy Blue.` },
    { name: 'Xbox One', price: '$350', priceTheme: 'danger', desc: 'Xbox One Console Bundle with Halo Master Chief Collection.' },
    { name: 'PlayStation 4', price: '$399', priceTheme: 'success', desc: 'PlayStation 4 500GB Console (PS4)' },
  ];

  private readonly theme = inject(ChartThemeService);

  /** Monthly Sales area chart — `sales_chart_options` in index2.html. */
  readonly sales = computed(() => salesAreaChart(this.theme.palette()));

  /** Browser Usage donut — `pie_chart_options` in index2.html. */
  readonly browserUsage = computed<ChartData<'doughnut'>>(() => {
    const c = this.theme.palette().colors;
    return {
      labels: ['Chrome', 'Edge', 'FireFox', 'Safari', 'Opera', 'IE'],
      datasets: [
        {
          label: 'Browser Usage',
          data: [700, 500, 400, 600, 300, 100],
          backgroundColor: [c.primary, c.teal, c.warning, c.pink, c.purple, c.gray],
        },
      ],
    };
  });

  readonly browserUsageOptions: ChartOptions<'doughnut'> = {
    cutout: '62%',
    layout: { padding: 6 },
    plugins: { legend: { position: 'right' } },
  };

  /** Inline table sparklines — `createSparklineChart` in index2.html. */
  readonly sparkOptions = sparklineOptions();
  readonly orderSparklines = computed<ChartData<'line'>[]>(() => {
    const color = this.theme.palette().colors.primary;
    return this.orders.map((o) => ({
      labels: o.spark.map((_, i) => i + 1),
      datasets: [{ data: o.spark, borderColor: color, fill: false }],
    }));
  });
}

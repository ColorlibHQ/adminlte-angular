import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppContentComponent } from '@adminlte/angular';

interface TableRow {
  id: string;
  task: string;
  progress: number;
  /** Bootstrap contextual theme used for the progress bar + label badge. */
  theme: 'danger' | 'warning' | 'primary' | 'success';
  /** Whether the bar uses the striped/animated treatment. */
  striped: boolean;
}

/**
 * Simple Tables — 1:1 port of `tables/simple.html`. Four cards showing the
 * Bootstrap table variants: bordered, condensed (`table-sm`), plain full-width
 * and striped. Each renders the same task list with a contextual progress bar
 * and label badge.
 */
@Component({
  selector: 'app-tables-simple',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent],
  template: `
    <lte-app-content
      title="Simple Tables"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Simple Tables' }]"
    >
      <div class="row">
        <!--begin::Col-->
        <div class="col-md-6">
          <!--begin::Bordered Table-->
          <div class="card mb-4">
            <div class="card-header">
              <h3 class="card-title">Bordered Table</h3>
            </div>
            <div class="card-body">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th style="width: 10px">#</th>
                    <th>Task</th>
                    <th>Progress</th>
                    <th style="width: 40px">Label</th>
                  </tr>
                </thead>
                <tbody>
                  @for (row of rows; track row.id) {
                    <tr class="align-middle">
                      <td>{{ row.id }}</td>
                      <td>{{ row.task }}</td>
                      <td>
                        <div class="progress progress-xs" [class.progress-striped]="row.striped" [class.active]="row.striped">
                          <div class="progress-bar text-bg-{{ row.theme }}" [style.width.%]="row.progress"></div>
                        </div>
                      </td>
                      <td><span class="badge text-bg-{{ row.theme }}">{{ row.progress }}%</span></td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
            <div class="card-footer clearfix">
              <ul class="pagination pagination-sm m-0 float-end">
                <li class="page-item"><a class="page-link" href="#">&laquo;</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">&raquo;</a></li>
              </ul>
            </div>
          </div>
          <!--end::Bordered Table-->

          <!--begin::Condensed Full Width Table-->
          <div class="card mb-4">
            <div class="card-header">
              <h3 class="card-title">Condensed Full Width Table</h3>
            </div>
            <div class="card-body p-0">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th style="width: 10px">#</th>
                    <th>Task</th>
                    <th>Progress</th>
                    <th style="width: 40px">Label</th>
                  </tr>
                </thead>
                <tbody>
                  @for (row of rows; track row.id) {
                    <tr class="align-middle">
                      <td>{{ row.id }}</td>
                      <td>{{ row.task }}</td>
                      <td>
                        <div class="progress progress-xs" [class.progress-striped]="row.striped" [class.active]="row.striped">
                          <div class="progress-bar text-bg-{{ row.theme }}" [style.width.%]="row.progress"></div>
                        </div>
                      </td>
                      <td><span class="badge text-bg-{{ row.theme }}">{{ row.progress }}%</span></td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
          <!--end::Condensed Full Width Table-->
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-md-6">
          <!--begin::Simple Full Width Table-->
          <div class="card mb-4">
            <div class="card-header">
              <h3 class="card-title">Simple Full Width Table</h3>
              <div class="card-tools">
                <ul class="pagination pagination-sm float-end">
                  <li class="page-item"><a class="page-link" href="#">&laquo;</a></li>
                  <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item"><a class="page-link" href="#">2</a></li>
                  <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item"><a class="page-link" href="#">&raquo;</a></li>
                </ul>
              </div>
            </div>
            <div class="card-body p-0">
              <table class="table">
                <thead>
                  <tr>
                    <th style="width: 10px">#</th>
                    <th>Task</th>
                    <th>Progress</th>
                    <th style="width: 40px">Label</th>
                  </tr>
                </thead>
                <tbody>
                  @for (row of rows; track row.id) {
                    <tr class="align-middle">
                      <td>{{ row.id }}</td>
                      <td>{{ row.task }}</td>
                      <td>
                        <div class="progress progress-xs" [class.progress-striped]="row.striped" [class.active]="row.striped">
                          <div class="progress-bar text-bg-{{ row.theme }}" [style.width.%]="row.progress"></div>
                        </div>
                      </td>
                      <td><span class="badge text-bg-{{ row.theme }}">{{ row.progress }}%</span></td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
          <!--end::Simple Full Width Table-->

          <!--begin::Striped Full Width Table-->
          <div class="card mb-4">
            <div class="card-header">
              <h3 class="card-title">Striped Full Width Table</h3>
            </div>
            <div class="card-body p-0">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th style="width: 10px">#</th>
                    <th>Task</th>
                    <th>Progress</th>
                    <th style="width: 40px">Label</th>
                  </tr>
                </thead>
                <tbody>
                  @for (row of rows; track row.id) {
                    <tr class="align-middle">
                      <td>{{ row.id }}</td>
                      <td>{{ row.task }}</td>
                      <td>
                        <div class="progress progress-xs" [class.progress-striped]="row.striped" [class.active]="row.striped">
                          <div class="progress-bar text-bg-{{ row.theme }}" [style.width.%]="row.progress"></div>
                        </div>
                      </td>
                      <td><span class="badge text-bg-{{ row.theme }}">{{ row.progress }}%</span></td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
          <!--end::Striped Full Width Table-->
        </div>
        <!--end::Col-->
      </div>

      <!--begin::Contextual Rows Table-->
      <div class="card mb-4">
        <div class="card-header">
          <h3 class="card-title">Contextual Rows &amp; Responsive Table</h3>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Plan</th>
                  <th>Renews</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                @for (row of contextual; track row.id) {
                  <tr [class]="'table-' + row.context">
                    <td>{{ row.id }}</td>
                    <td>{{ row.customer }}</td>
                    <td>{{ row.plan }}</td>
                    <td>{{ row.renews }}</td>
                    <td>{{ row.amount }}</td>
                    <td><span class="badge text-bg-{{ row.context }}">{{ row.status }}</span></td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--end::Contextual Rows Table-->
    </lte-app-content>
  `,
})
export class TablesSimplePage {
  readonly rows: TableRow[] = [
    { id: '1.', task: 'Update software', progress: 55, theme: 'danger', striped: false },
    { id: '2.', task: 'Clean database', progress: 70, theme: 'warning', striped: false },
    { id: '3.', task: 'Cron job running', progress: 30, theme: 'primary', striped: true },
    { id: '4.', task: 'Fix and squish bugs', progress: 90, theme: 'success', striped: true },
  ];

  readonly contextual: Array<{
    id: number;
    customer: string;
    plan: string;
    renews: string;
    amount: string;
    status: string;
    context: 'success' | 'info' | 'warning' | 'danger';
  }> = [
    { id: 1, customer: 'Acme Corp', plan: 'Enterprise', renews: 'Jul 14', amount: '$1,200', status: 'Active', context: 'success' },
    { id: 2, customer: 'Globex', plan: 'Team', renews: 'Jul 22', amount: '$480', status: 'Trial', context: 'info' },
    { id: 3, customer: 'Initech', plan: 'Starter', renews: 'Jul 03', amount: '$120', status: 'Past due', context: 'warning' },
    { id: 4, customer: 'Umbrella', plan: 'Team', renews: '—', amount: '$0', status: 'Cancelled', context: 'danger' },
  ];
}

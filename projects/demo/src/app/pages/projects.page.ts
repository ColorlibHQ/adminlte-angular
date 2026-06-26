import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppContentComponent } from '@adminlte/angular';

interface Project {
  id: number;
  name: string;
  due: string;
  team: string;
  progress: number;
  color: string;
  status: string;
  statusColor: string;
}

/** Projects page — table with progress bars and status badges. */
@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent],
  template: `
    <lte-app-content title="Projects" [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Projects' }]">
      <div class="card">
        <div class="card-header"><h3 class="card-title">All projects</h3></div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-striped align-middle mb-0">
              <thead>
                <tr><th style="width: 10px">#</th><th>Project</th><th>Team</th><th style="width: 30%">Progress</th><th class="text-center">Status</th></tr>
              </thead>
              <tbody>
                @for (p of projects; track p.id) {
                  <tr>
                    <td>{{ p.id }}</td>
                    <td><strong>{{ p.name }}</strong><br /><small class="text-body-secondary">Due {{ p.due }}</small></td>
                    <td>{{ p.team }}</td>
                    <td>
                      <div class="progress" style="height: 8px">
                        <div class="progress-bar bg-{{ p.color }}" [style.width.%]="p.progress"></div>
                      </div>
                      <small class="text-body-secondary">{{ p.progress }}%</small>
                    </td>
                    <td class="text-center"><span class="badge text-bg-{{ p.statusColor }}">{{ p.status }}</span></td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class ProjectsPage {
  readonly projects: Project[] = [
    { id: 1, name: 'AdminLTE Angular port', due: 'Jun 30', team: 'Frontend', progress: 90, color: 'success', status: 'On track', statusColor: 'success' },
    { id: 2, name: 'Component parity', due: 'Jul 12', team: 'Frontend', progress: 65, color: 'info', status: 'In progress', statusColor: 'info' },
    { id: 3, name: 'Docs site', due: 'Jul 20', team: 'DevRel', progress: 35, color: 'warning', status: 'At risk', statusColor: 'warning' },
    { id: 4, name: 'v1.0 release', due: 'Aug 01', team: 'Core', progress: 10, color: 'danger', status: 'Blocked', statusColor: 'danger' },
  ];
}

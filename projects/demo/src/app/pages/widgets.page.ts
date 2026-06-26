import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  AppContentComponent,
  CardComponent,
  AlertComponent,
  CalloutComponent,
  ProgressComponent,
  ProfileCardComponent,
  ModalComponent,
  ButtonComponent,
} from '@adminlte/angular';

/** Showcases assorted widgets: alerts, callouts, progress bars, a profile card and a modal. */
@Component({
  selector: 'app-widgets',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AppContentComponent,
    CardComponent,
    AlertComponent,
    CalloutComponent,
    ProgressComponent,
    ProfileCardComponent,
    ModalComponent,
    ButtonComponent,
  ],
  template: `
    <lte-app-content title="Widgets" [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Widgets' }]">
      <div class="row">
        <div class="col-lg-6">
          <lte-card title="Alerts" icon="bi-bell">
            <lte-alert theme="success" icon="bi-check-circle" title="Success">Your changes were saved.</lte-alert>
            <lte-alert theme="warning" icon="bi-exclamation-triangle" title="Heads up" [dismissible]="true">
              This alert can be dismissed.
            </lte-alert>
            <lte-callout theme="info" title="Callout">A callout draws attention to a passage.</lte-callout>
          </lte-card>

          <lte-card title="Progress" icon="bi-bar-chart-steps">
            <lte-progress [value]="70" theme="primary" [showLabel]="true" />
            <div class="mt-2"></div>
            <lte-progress [value]="45" theme="success" [striped]="true" [animated]="true" />
            <div class="mt-2"></div>
            <lte-progress [value]="85" theme="danger" size="sm" />
          </lte-card>
        </div>

        <div class="col-lg-3">
          <lte-profile-card
            name="Nina Mcintire"
            role="Software Engineer"
            image="https://www.gravatar.com/avatar/?d=mp&s=160"
            [stats]="[
              { label: 'Followers', value: '1,322' },
              { label: 'Following', value: 543 },
              { label: 'Friends', value: '13,287' }
            ]"
          >
            <lte-button theme="primary" [block]="true" icon="bi-person-plus">Follow</lte-button>
          </lte-profile-card>
        </div>

        <div class="col-lg-3">
          <lte-card title="Modal demo" icon="bi-window">
            <p>Open a self-contained modal (no Bootstrap JS required).</p>
            <lte-button theme="info" icon="bi-box-arrow-up-right" (click)="open.set(true)">Open modal</lte-button>
          </lte-card>
        </div>
      </div>

      <lte-modal title="Hello from AdminLTE Angular" [(open)]="open">
        <p>This modal is driven entirely by a signal model — <code>[(open)]</code>.</p>
        <div modal-footer>
          <lte-button theme="secondary" (click)="open.set(false)">Close</lte-button>
        </div>
      </lte-modal>
    </lte-app-content>
  `,
})
export class WidgetsPage {
  readonly open = signal(false);
}

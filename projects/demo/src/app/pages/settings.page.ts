import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  AppContentComponent,
  CardComponent,
  InputComponent,
  SelectComponent,
  TextareaComponent,
  InputSwitchComponent,
  ButtonComponent,
  type SelectOption,
} from '@adminlte/angular';

/** Account settings page — profile form + danger zone. */
@Component({
  selector: 'app-settings',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AppContentComponent,
    CardComponent,
    InputComponent,
    SelectComponent,
    TextareaComponent,
    InputSwitchComponent,
    ButtonComponent,
  ],
  template: `
    <lte-app-content title="Settings" [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Settings' }]">
      <div class="row">
        <div class="col-lg-8">
          <lte-card title="Account settings" icon="bi-gear" [hasFooter]="true">
            <div class="mb-3"><lte-input label="Display name" icon="bi-person" [(value)]="name" /></div>
            <div class="mb-3"><lte-input label="Email" type="email" icon="bi-envelope" [(value)]="email" /></div>
            <div class="mb-3"><lte-select label="Timezone" [options]="timezones" [(value)]="timezone" /></div>
            <div class="mb-3"><lte-textarea label="Bio" [rows]="3" [(value)]="bio" /></div>
            <lte-input-switch label="Email notifications" [(checked)]="emailNotif" />
            <lte-input-switch label="Two-factor authentication" [(checked)]="twoFactor" />
            <div footer>
              <lte-button theme="primary" icon="bi-check2">Save changes</lte-button>
            </div>
          </lte-card>
        </div>

        <div class="col-lg-4">
          <lte-card title="Danger zone" icon="bi-exclamation-triangle" theme="danger" variant="outline">
            <p class="text-body-secondary">Deleting your account is permanent and cannot be undone.</p>
            <lte-button theme="danger" icon="bi-trash">Delete account</lte-button>
          </lte-card>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class SettingsPage {
  readonly name = signal('Nina Mcintire');
  readonly email = signal('nina@example.com');
  readonly timezone = signal<string | number>('pst');
  readonly bio = signal('Software engineer who loves building admin tools.');
  readonly emailNotif = signal(true);
  readonly twoFactor = signal(false);

  readonly timezones: SelectOption[] = [
    { label: 'Pacific (PST)', value: 'pst' },
    { label: 'Eastern (EST)', value: 'est' },
    { label: 'UTC', value: 'utc' },
  ];
}

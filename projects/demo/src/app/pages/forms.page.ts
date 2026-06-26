import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  AppContentComponent,
  CardComponent,
  InputComponent,
  TextareaComponent,
  SelectComponent,
  InputSwitchComponent,
  ButtonComponent,
  type SelectOption,
} from '@adminlte/angular';

/**
 * Demonstrates the form components with signal two-way binding via each
 * component's `model()` input (`[(value)]` / `[(checked)]`). The components also
 * implement ControlValueAccessor, so `[(ngModel)]` and reactive/Signal Forms
 * work too — this page uses the signal models for the most idiomatic flow.
 */
@Component({
  selector: 'app-forms',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AppContentComponent,
    CardComponent,
    InputComponent,
    TextareaComponent,
    SelectComponent,
    InputSwitchComponent,
    ButtonComponent,
  ],
  template: `
    <lte-app-content title="Forms" [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Forms' }]">
      <div class="row">
        <div class="col-lg-6">
          <lte-card title="Contact form" icon="bi-input-cursor-text" [hasFooter]="true">
            <div class="mb-3">
              <lte-input label="Full name" placeholder="Jane Developer" icon="bi-person" [(value)]="name" />
            </div>
            <div class="mb-3">
              <lte-input label="Email" type="email" placeholder="jane@example.com" icon="bi-envelope" [(value)]="email" />
            </div>
            <div class="mb-3">
              <lte-select label="Department" [options]="departments" placeholder="Choose…" [(value)]="department" />
            </div>
            <div class="mb-3">
              <lte-textarea label="Message" placeholder="How can we help?" [rows]="4" [(value)]="message" />
            </div>
            <lte-input-switch label="Subscribe to the newsletter" [(checked)]="subscribe" />
            <div footer>
              <lte-button theme="primary" type="submit" icon="bi-send">Submit</lte-button>
            </div>
          </lte-card>
        </div>

        <div class="col-lg-6">
          <lte-card title="Live model" icon="bi-braces" theme="secondary" variant="outline">
            <pre class="mb-0">{{ snapshot() }}</pre>
          </lte-card>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class FormsPage {
  readonly name = signal('');
  readonly email = signal('');
  readonly department = signal<string | number>('');
  readonly message = signal('');
  readonly subscribe = signal(true);

  readonly departments: SelectOption[] = [
    { label: 'Engineering', value: 'eng' },
    { label: 'Design', value: 'design' },
    { label: 'Support', value: 'support' },
  ];

  snapshot(): string {
    return JSON.stringify(
      {
        name: this.name(),
        email: this.email(),
        department: this.department(),
        message: this.message(),
        subscribe: this.subscribe(),
      },
      null,
      2,
    );
  }
}

import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppContentComponent } from '@adminlte/angular';

interface WizardModel {
  email: string;
  username: string;
  password: string;
  password2: string;
  firstName: string;
  lastName: string;
  company: string;
  role: string;
  notifProduct: boolean;
  notifSecurity: boolean;
  notifMarketing: boolean;
  frequency: string;
  terms: boolean;
}

/**
 * Form Wizard — an Angular-native replica of the core AdminLTE
 * `forms/wizard.html` multi-step form. The current step is held in a `signal`
 * (no third-party wizard plugin); step tabs, the progress connector, Next /
 * Previous / Finish buttons and the review summary are all derived from it.
 */
@Component({
  selector: 'app-forms-wizard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, FormsModule],
  template: `
    <lte-app-content
      title="Form Wizard"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Forms' }, { label: 'Wizard' }]"
    >
      <div class="row justify-content-center">
        <div class="col-lg-10 col-xl-8">
          <div class="card">
            <div class="card-body p-4">
              <!-- Step indicators -->
              <ol class="wizard-steps mb-4">
                @for (label of stepLabels; track $index) {
                  <li [class.active]="step() === $index" [class.completed]="step() > $index">
                    {{ label }}
                  </li>
                }
              </ol>

              @if (submitted()) {
                <div class="text-center py-4">
                  <i class="bi bi-check-circle-fill text-success display-4 mb-3 d-block" aria-hidden="true"></i>
                  <h2 class="h4">All set, {{ model().firstName || model().username || 'there' }}!</h2>
                  <p class="text-secondary mb-3">Your account has been created.</p>
                  <button type="button" class="btn btn-outline-primary" (click)="reset()">
                    <i class="bi bi-arrow-counterclockwise me-1" aria-hidden="true"></i>
                    Start over
                  </button>
                </div>
              } @else {
                <form (ngSubmit)="finish()" novalidate>
                  <!-- Step 1: Account -->
                  @if (step() === 0) {
                    <fieldset>
                      <h2 class="h5 mb-3">Create your account</h2>
                      <div class="row g-3">
                        <div class="col-md-6">
                          <label class="form-label" for="wz-email">Email</label>
                          <input type="email" class="form-control" id="wz-email" name="email" [(ngModel)]="email" />
                        </div>
                        <div class="col-md-6">
                          <label class="form-label" for="wz-username">Username</label>
                          <input type="text" class="form-control" id="wz-username" name="username" [(ngModel)]="username" />
                        </div>
                        <div class="col-md-6">
                          <label class="form-label" for="wz-password">Password</label>
                          <input type="password" class="form-control" id="wz-password" name="password" [(ngModel)]="password" />
                        </div>
                        <div class="col-md-6">
                          <label class="form-label" for="wz-password2">Confirm password</label>
                          <input type="password" class="form-control" id="wz-password2" name="password2" [(ngModel)]="password2" />
                        </div>
                      </div>
                    </fieldset>
                  }

                  <!-- Step 2: Profile -->
                  @if (step() === 1) {
                    <fieldset>
                      <h2 class="h5 mb-3">Tell us about yourself</h2>
                      <div class="row g-3">
                        <div class="col-md-6">
                          <label class="form-label" for="wz-first">First name</label>
                          <input type="text" class="form-control" id="wz-first" name="firstName" [(ngModel)]="firstName" />
                        </div>
                        <div class="col-md-6">
                          <label class="form-label" for="wz-last">Last name</label>
                          <input type="text" class="form-control" id="wz-last" name="lastName" [(ngModel)]="lastName" />
                        </div>
                        <div class="col-md-6">
                          <label class="form-label" for="wz-company">Company</label>
                          <input type="text" class="form-control" id="wz-company" name="company" [(ngModel)]="company" />
                        </div>
                        <div class="col-md-6">
                          <label class="form-label" for="wz-role">Role</label>
                          <select class="form-select" id="wz-role" name="role" [(ngModel)]="role">
                            <option value="">Choose&hellip;</option>
                            <option>Founder / CEO</option>
                            <option>Engineering</option>
                            <option>Design</option>
                            <option>Marketing</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                    </fieldset>
                  }

                  <!-- Step 3: Preferences -->
                  @if (step() === 2) {
                    <fieldset>
                      <h2 class="h5 mb-3">Notification preferences</h2>
                      <div class="form-check form-switch mb-2">
                        <input class="form-check-input" type="checkbox" role="switch" id="wz-notif-product" name="notifProduct" [(ngModel)]="notifProduct" />
                        <label class="form-check-label" for="wz-notif-product">Product updates &amp; releases</label>
                      </div>
                      <div class="form-check form-switch mb-2">
                        <input class="form-check-input" type="checkbox" role="switch" id="wz-notif-security" name="notifSecurity" [(ngModel)]="notifSecurity" />
                        <label class="form-check-label" for="wz-notif-security">Security alerts</label>
                      </div>
                      <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" role="switch" id="wz-notif-marketing" name="notifMarketing" [(ngModel)]="notifMarketing" />
                        <label class="form-check-label" for="wz-notif-marketing">Marketing &amp; tips</label>
                      </div>
                      <label class="form-label" for="wz-frequency">Digest frequency</label>
                      <select class="form-select" id="wz-frequency" name="frequency" [(ngModel)]="frequency">
                        <option>Real time</option>
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Never</option>
                      </select>
                    </fieldset>
                  }

                  <!-- Step 4: Review -->
                  @if (step() === 3) {
                    <fieldset>
                      <h2 class="h5 mb-3">Review &amp; confirm</h2>
                      <dl class="row mb-3">
                        @for (row of summary(); track row.label) {
                          <dt class="col-sm-4 text-secondary fw-normal">{{ row.label }}</dt>
                          <dd class="col-sm-8">{{ row.value }}</dd>
                        }
                      </dl>
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="wz-terms" name="terms" [(ngModel)]="terms" />
                        <label class="form-check-label" for="wz-terms">
                          I agree to the <a href="#" (click)="$event.preventDefault()">terms of service</a>.
                        </label>
                      </div>
                    </fieldset>
                  }

                  <!-- Navigation -->
                  <div class="d-flex justify-content-between mt-4">
                    <button type="button" class="btn btn-outline-secondary" [disabled]="step() === 0" (click)="previous()">
                      <i class="bi bi-arrow-left me-1" aria-hidden="true"></i>
                      Previous
                    </button>
                    @if (!isLastStep()) {
                      <button type="button" class="btn btn-primary" (click)="next()">
                        Next
                        <i class="bi bi-arrow-right ms-1" aria-hidden="true"></i>
                      </button>
                    } @else {
                      <button type="submit" class="btn btn-success" [disabled]="!terms()">
                        <i class="bi bi-check-lg me-1" aria-hidden="true"></i>
                        Submit
                      </button>
                    }
                  </div>
                </form>
              }
            </div>
          </div>
        </div>
      </div>
    </lte-app-content>
  `,
  styles: `
    .wizard-steps {
      counter-reset: step;
      list-style: none;
      padding: 0;
      display: flex;
      justify-content: space-between;
      position: relative;
    }
    .wizard-steps::before {
      content: '';
      position: absolute;
      top: 1rem;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--bs-border-color);
      z-index: 0;
    }
    .wizard-steps li {
      position: relative;
      z-index: 1;
      background: var(--bs-body-bg);
      padding: 0 0.75rem;
      text-align: center;
      color: var(--bs-secondary-color);
      font-size: 0.875rem;
    }
    .wizard-steps li::before {
      counter-increment: step;
      content: counter(step);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      margin: 0 auto 0.5rem;
      border-radius: 50%;
      background: var(--bs-body-tertiary-bg);
      border: 2px solid var(--bs-border-color);
      color: var(--bs-secondary-color);
      font-weight: 600;
    }
    .wizard-steps li.active {
      color: var(--bs-primary);
      font-weight: 600;
    }
    .wizard-steps li.active::before {
      background: var(--bs-primary);
      border-color: var(--bs-primary);
      color: #fff;
    }
    .wizard-steps li.completed::before {
      background: var(--bs-success);
      border-color: var(--bs-success);
      color: #fff;
      content: '\\f633';
      font-family: 'bootstrap-icons';
    }
  `,
})
export class FormsWizardPage {
  readonly stepLabels = ['Account', 'Profile', 'Preferences', 'Review'];

  readonly step = signal(0);
  readonly submitted = signal(false);

  // One signal per field keeps the two-way [(ngModel)] bindings simple.
  readonly email = signal('');
  readonly username = signal('');
  readonly password = signal('');
  readonly password2 = signal('');
  readonly firstName = signal('');
  readonly lastName = signal('');
  readonly company = signal('');
  readonly role = signal('');
  readonly notifProduct = signal(true);
  readonly notifSecurity = signal(true);
  readonly notifMarketing = signal(false);
  readonly frequency = signal('Daily');
  readonly terms = signal(false);

  readonly isLastStep = computed(() => this.step() === this.stepLabels.length - 1);

  readonly model = computed<WizardModel>(() => ({
    email: this.email(),
    username: this.username(),
    password: this.password(),
    password2: this.password2(),
    firstName: this.firstName(),
    lastName: this.lastName(),
    company: this.company(),
    role: this.role(),
    notifProduct: this.notifProduct(),
    notifSecurity: this.notifSecurity(),
    notifMarketing: this.notifMarketing(),
    frequency: this.frequency(),
    terms: this.terms(),
  }));

  readonly summary = computed(() => {
    const m = this.model();
    const channels = [
      m.notifProduct && 'Product',
      m.notifSecurity && 'Security',
      m.notifMarketing && 'Marketing',
    ].filter(Boolean);
    return [
      { label: 'Email', value: m.email || '—' },
      { label: 'Username', value: m.username || '—' },
      { label: 'Name', value: [m.firstName, m.lastName].filter(Boolean).join(' ') || '—' },
      { label: 'Company', value: m.company || '—' },
      { label: 'Role', value: m.role || '—' },
      { label: 'Notifications', value: channels.length ? channels.join(', ') : 'None' },
      { label: 'Digest', value: m.frequency },
    ];
  });

  next(): void {
    if (!this.isLastStep()) this.step.update((s) => s + 1);
  }

  previous(): void {
    if (this.step() > 0) this.step.update((s) => s - 1);
  }

  finish(): void {
    if (!this.terms()) return;
    this.submitted.set(true);
  }

  reset(): void {
    this.submitted.set(false);
    this.step.set(0);
    this.email.set('');
    this.username.set('');
    this.password.set('');
    this.password2.set('');
    this.firstName.set('');
    this.lastName.set('');
    this.company.set('');
    this.role.set('');
    this.notifProduct.set(true);
    this.notifSecurity.set(true);
    this.notifMarketing.set(false);
    this.frequency.set('Daily');
    this.terms.set(false);
  }
}

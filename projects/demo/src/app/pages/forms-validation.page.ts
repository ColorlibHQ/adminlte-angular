import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AppContentComponent, CardComponent, CalloutComponent } from '@adminlte/angular';

/**
 * Form Validation — 1:1 replica of the core AdminLTE `forms/validation.html`
 * page. Demonstrates Bootstrap's native client-side validation states
 * (`is-valid`/`is-invalid`, `valid-feedback`/`invalid-feedback`,
 * `valid-tooltip`/`invalid-tooltip` and the `was-validated` toggle).
 *
 * The core page wires this with a vanilla `submit` listener that calls
 * `checkValidity()` and adds `was-validated`; here that behaviour is replicated
 * idiomatically with an Angular submit handler that flips a signal-driven class.
 */
@Component({
  selector: 'app-forms-validation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, CardComponent, CalloutComponent],
  template: `
    <lte-app-content
      title="Form Validation"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Forms' }, { label: 'Validation' }]"
    >
      <div class="row g-4">
        <div class="col-12">
          <lte-callout theme="info">
            Built on
            <a
              href="https://getbootstrap.com/docs/5.3/forms/validation/"
              target="_blank"
              rel="noopener noreferrer"
              class="callout-link"
              >Bootstrap's native form validation</a
            >
            — submit each form to see the feedback.
          </lte-callout>
        </div>

        <!-- Custom validation -->
        <div class="col-lg-6">
          <lte-card title="Custom Validation" theme="info" variant="outline" [hasFooter]="true">
            <form
              class="needs-validation"
              [class.was-validated]="customValidated()"
              novalidate
              (submit)="onSubmit($event, customValidated)"
            >
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="validationCustom01" class="form-label">First name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom01"
                    value="Mark"
                    required
                  />
                  <div class="valid-feedback">Looks good!</div>
                </div>
                <div class="col-md-6">
                  <label for="validationCustom02" class="form-label">Last name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="validationCustom02"
                    value="Otto"
                    required
                  />
                  <div class="valid-feedback">Looks good!</div>
                </div>
                <div class="col-md-6">
                  <label for="validationCustomUsername" class="form-label">Username</label>
                  <div class="input-group has-validation">
                    <span class="input-group-text" id="inputGroupPrepend">&#64;</span>
                    <input
                      type="text"
                      class="form-control"
                      id="validationCustomUsername"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <div class="invalid-feedback">Please choose a username.</div>
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="validationCustom03" class="form-label">City</label>
                  <input type="text" class="form-control" id="validationCustom03" required />
                  <div class="invalid-feedback">Please provide a valid city.</div>
                </div>
                <div class="col-md-6">
                  <label for="validationCustom04" class="form-label">State</label>
                  <select class="form-select" id="validationCustom04" required>
                    <option selected disabled value="">Choose&hellip;</option>
                    <option>California</option>
                    <option>Washington</option>
                    <option>Tennessee</option>
                  </select>
                  <div class="invalid-feedback">Please select a valid state.</div>
                </div>
                <div class="col-md-6">
                  <label for="validationCustom05" class="form-label">Zip</label>
                  <input type="text" class="form-control" id="validationCustom05" required />
                  <div class="invalid-feedback">Please provide a valid zip.</div>
                </div>
                <div class="col-12">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="invalidCheck"
                      required
                    />
                    <label class="form-check-label" for="invalidCheck">
                      Agree to terms and conditions
                    </label>
                    <div class="invalid-feedback">You must agree before submitting.</div>
                  </div>
                </div>
              </div>
              <div class="mt-3">
                <button class="btn btn-info" type="submit">Submit form</button>
              </div>
            </form>
          </lte-card>
        </div>

        <!-- Browser-default validation + tooltips -->
        <div class="col-lg-6">
          <lte-card title="Browser Defaults & Tooltips" theme="success" variant="outline">
            <p class="text-secondary small">
              For browser-native validation feedback, omit <code>novalidate</code> and the
              <code>.needs-validation</code> class.
            </p>
            <form>
              <div class="mb-3">
                <label class="form-label" for="defaultEmail">Email</label>
                <input type="email" class="form-control" id="defaultEmail" required />
              </div>
              <div class="mb-3">
                <label class="form-label" for="defaultUrl">URL</label>
                <input type="url" class="form-control" id="defaultUrl" required />
              </div>
              <button class="btn btn-success" type="submit">Submit (browser default)</button>
            </form>

            <hr class="my-4" />

            <p class="text-secondary small">
              Add <code>.needs-validation-tooltip</code> in place of <code>.needs-validation</code>
              to swap inline feedback for floating tooltips.
            </p>
            <form
              class="needs-validation-tooltip position-relative"
              [class.was-validated]="tooltipValidated()"
              novalidate
              (submit)="onSubmit($event, tooltipValidated)"
            >
              <div class="row g-3">
                <div class="col-md-6">
                  <label for="vt-first" class="form-label">First name</label>
                  <input type="text" class="form-control" id="vt-first" value="Jane" required />
                  <div class="valid-tooltip">Looks good!</div>
                </div>
                <div class="col-md-6">
                  <label for="vt-username" class="form-label">Username</label>
                  <input type="text" class="form-control" id="vt-username" required />
                  <div class="invalid-tooltip">Please choose a username.</div>
                </div>
                <div class="col-12">
                  <button class="btn btn-success" type="submit">Submit (tooltip)</button>
                </div>
              </div>
            </form>
          </lte-card>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class FormsValidationPage {
  readonly customValidated = signal(false);
  readonly tooltipValidated = signal(false);

  /**
   * Mirrors AdminLTE's vanilla validation script: block submission when the form
   * is invalid, then add `was-validated` so Bootstrap reveals the feedback.
   */
  onSubmit(event: Event, validated: { set: (v: boolean) => void }): void {
    const form = event.target as HTMLFormElement;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    validated.set(true);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppContentComponent, CardComponent, CalloutComponent } from '@adminlte/angular';

/**
 * Form Layout — 1:1 replica of the core AdminLTE `forms/layout.html` page:
 * horizontal form, inline form, and different-height / different-width grids.
 * These layouts are pure Bootstrap grid + form-layout utilities, so the markup
 * is plain Bootstrap 5.3 inside `lte-card` shells.
 */
@Component({
  selector: 'app-forms-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, CardComponent, CalloutComponent],
  template: `
    <lte-app-content
      title="Form Layout"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Forms' }, { label: 'Layout' }]"
    >
      <div class="row g-4">
        <div class="col-12">
          <lte-callout theme="info">
            Layout patterns built on Bootstrap's grid +
            <a
              href="https://getbootstrap.com/docs/5.3/forms/layout/"
              target="_blank"
              rel="noopener noreferrer"
              class="callout-link"
              >form layout</a
            >
            utilities.
          </lte-callout>
        </div>

        <!-- Horizontal Form -->
        <div class="col-md-6">
          <lte-card title="Horizontal Form" theme="warning" variant="outline" [hasFooter]="true">
            <div class="row mb-3">
              <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
              <div class="col-sm-10">
                <input type="email" class="form-control" id="inputEmail3" />
              </div>
            </div>
            <div class="row mb-3">
              <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword3" />
              </div>
            </div>
            <fieldset class="row mb-3">
              <legend class="col-form-label col-sm-2 pt-0">Radios</legend>
              <div class="col-sm-10">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios1"
                    value="option1"
                    checked
                  />
                  <label class="form-check-label" for="gridRadios1">First radio</label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios2"
                    value="option2"
                  />
                  <label class="form-check-label" for="gridRadios2">Second radio</label>
                </div>
                <div class="form-check disabled">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios3"
                    value="option3"
                    disabled
                  />
                  <label class="form-check-label" for="gridRadios3">Third disabled radio</label>
                </div>
              </div>
            </fieldset>
            <div class="row mb-3">
              <div class="col-sm-10 offset-sm-2">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="gridCheck1" />
                  <label class="form-check-label" for="gridCheck1">Example checkbox</label>
                </div>
              </div>
            </div>
            <div footer>
              <button type="submit" class="btn btn-warning">Sign in</button>
              <button type="submit" class="btn float-end">Cancel</button>
            </div>
          </lte-card>
        </div>

        <!-- Inline Form -->
        <div class="col-md-6">
          <lte-card title="Inline Form" theme="primary" variant="outline">
            <form class="row row-cols-lg-auto g-3 align-items-center">
              <div class="col-12">
                <label class="visually-hidden" for="inlineUser">Username</label>
                <div class="input-group">
                  <div class="input-group-text">&#64;</div>
                  <input type="text" class="form-control" id="inlineUser" placeholder="Username" />
                </div>
              </div>
              <div class="col-12">
                <label class="visually-hidden" for="inlineSelect">Preference</label>
                <select class="form-select" id="inlineSelect">
                  <option selected>Choose&hellip;</option>
                  <option>One</option>
                  <option>Two</option>
                </select>
              </div>
              <div class="col-12">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="inlineCheck" />
                  <label class="form-check-label" for="inlineCheck">Remember me</label>
                </div>
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
          </lte-card>
        </div>

        <!-- Different Height -->
        <div class="col-md-6">
          <lte-card title="Different Height" theme="secondary" variant="outline">
            <input
              class="form-control form-control-lg mb-3"
              type="text"
              placeholder=".form-control-lg"
              aria-label=".form-control-lg example"
            />
            <input
              class="form-control mb-3"
              type="text"
              placeholder="Default input"
              aria-label="default input example"
            />
            <input
              class="form-control form-control-sm"
              type="text"
              placeholder=".form-control-sm"
              aria-label=".form-control-sm example"
            />
          </lte-card>
        </div>

        <!-- Different Width -->
        <div class="col-md-6">
          <lte-card title="Different Width" theme="danger" variant="outline">
            <div class="row g-2">
              <div class="col-3">
                <input type="text" class="form-control" placeholder=".col-3" />
              </div>
              <div class="col-4">
                <input type="text" class="form-control" placeholder=".col-4" />
              </div>
              <div class="col-5">
                <input type="text" class="form-control" placeholder=".col-5" />
              </div>
            </div>
          </lte-card>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class FormsLayoutPage {}

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  AppContentComponent,
  CardComponent,
  CalloutComponent,
  InputComponent,
  SelectComponent,
  InputSwitchComponent,
  type SelectOption,
} from '@adminlte/angular';

/**
 * Form Elements — 1:1 replica of the core AdminLTE `forms/elements.html` page.
 * Uses the library form components (`lte-input`, `lte-select`, `lte-textarea`,
 * `lte-input-switch`) where they map cleanly, and plain Bootstrap 5.3 markup for
 * the controls the library does not wrap (input groups, ranges, file/color
 * inputs, floating labels, checks/radios).
 */
@Component({
  selector: 'app-forms-elements',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AppContentComponent,
    CardComponent,
    CalloutComponent,
    InputComponent,
    SelectComponent,
    InputSwitchComponent,
  ],
  template: `
    <lte-app-content
      title="Form Elements"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Forms' }, { label: 'Elements' }]"
    >
      <div class="row g-4">
        <div class="col-12">
          <lte-callout theme="info">
            For detailed documentation visit
            <a
              href="https://getbootstrap.com/docs/5.3/forms/overview/"
              target="_blank"
              rel="noopener noreferrer"
              class="callout-link"
              >Bootstrap Forms</a
            >.
          </lte-callout>
        </div>

        <!-- Quick Example -->
        <div class="col-md-6">
          <lte-card title="Quick Example" theme="primary" variant="outline" [hasFooter]="true">
            <lte-input
              label="Email address"
              type="email"
              [(value)]="email"
              hint="We'll never share your email with anyone else."
            />
            <div class="mb-3"></div>
            <lte-input label="Password" type="password" [(value)]="password" />
            <div class="input-group mb-3">
              <input type="file" class="form-control" id="inputGroupFile02" />
              <label class="input-group-text" for="inputGroupFile02">Upload</label>
            </div>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <div footer>
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </lte-card>
        </div>

        <!-- Input Group -->
        <div class="col-md-6">
          <lte-card title="Input Group" theme="success" variant="outline">
            <div class="input-group mb-3">
              <span class="input-group-text" id="basic-addon1">&#64;</span>
              <input
                type="text"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <span class="input-group-text" id="basic-addon2">&#64;example.com</span>
            </div>
            <div class="mb-3">
              <label for="basic-url" class="form-label">Your vanity URL</label>
              <div class="input-group">
                <span class="input-group-text" id="basic-addon3">https://example.com/users/</span>
                <input
                  type="text"
                  class="form-control"
                  id="basic-url"
                  aria-describedby="basic-addon3 basic-addon4"
                />
              </div>
              <div class="form-text" id="basic-addon4">
                Example help text goes outside the input group.
              </div>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">$</span>
              <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" />
              <span class="input-group-text">.00</span>
            </div>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Username" aria-label="Username" />
              <span class="input-group-text">&#64;</span>
              <input type="text" class="form-control" placeholder="Server" aria-label="Server" />
            </div>
            <div class="input-group">
              <span class="input-group-text">With textarea</span>
              <textarea class="form-control" aria-label="With textarea"></textarea>
            </div>
          </lte-card>
        </div>

        <!-- Checks & Radios -->
        <div class="col-md-6">
          <lte-card title="Checks & Radios" theme="info" variant="outline">
            <h6 class="text-secondary small text-uppercase mb-2">Checkboxes</h6>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="check-default" />
              <label class="form-check-label" for="check-default">Default</label>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="check-checked" checked />
              <label class="form-check-label" for="check-checked">Pre-checked</label>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="checkbox" id="check-disabled" disabled />
              <label class="form-check-label" for="check-disabled">Disabled</label>
            </div>

            <h6 class="text-secondary small text-uppercase mb-2 mt-3">Radios</h6>
            <div class="form-check mb-2">
              <input class="form-check-input" type="radio" name="radioGroup" id="radio-1" checked />
              <label class="form-check-label" for="radio-1">Option one</label>
            </div>
            <div class="form-check mb-3">
              <input class="form-check-input" type="radio" name="radioGroup" id="radio-2" />
              <label class="form-check-label" for="radio-2">Option two</label>
            </div>

            <h6 class="text-secondary small text-uppercase mb-2 mt-3">Switches</h6>
            <lte-input-switch label="Notifications" [(checked)]="notifications" />
            <lte-input-switch label="Auto-save" [(checked)]="autoSave" />
          </lte-card>
        </div>

        <!-- Select / Range / File -->
        <div class="col-md-6">
          <lte-card title="Selects, Ranges & File" theme="warning" variant="outline">
            <div class="mb-3">
              <lte-select label="Select" [options]="selectOptions" [(value)]="selectValue" />
            </div>
            <div class="mb-3">
              <label class="form-label" for="select-multiple">Multi-select</label>
              <select class="form-select" id="select-multiple" multiple size="3">
                <option>Apple</option>
                <option selected>Orange</option>
                <option>Pear</option>
                <option>Mango</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label" for="range-1">Range</label>
              <input type="range" class="form-range" id="range-1" min="0" max="100" value="35" />
            </div>
            <div class="mb-3">
              <label class="form-label" for="form-file-multi">Multiple files</label>
              <input class="form-control" type="file" id="form-file-multi" multiple />
            </div>
            <div>
              <label class="form-label" for="form-color">Color</label>
              <input
                type="color"
                class="form-control form-control-color"
                id="form-color"
                value="#0d6efd"
                title="Choose your color"
              />
            </div>
          </lte-card>
        </div>

        <!-- Floating labels -->
        <div class="col-md-6">
          <lte-card title="Floating Labels" theme="secondary" variant="outline">
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="floatingEmail"
                placeholder="name@example.com"
              />
              <label for="floatingEmail">Email address</label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" class="form-control" id="floatingPwd" placeholder="Password" />
              <label for="floatingPwd">Password</label>
            </div>
            <div class="form-floating">
              <textarea
                class="form-control"
                id="floatingTextarea"
                placeholder="Leave a comment here"
                style="height: 6rem"
              ></textarea>
              <label for="floatingTextarea">Comments</label>
            </div>
          </lte-card>
        </div>

        <!-- Disabled / Readonly -->
        <div class="col-md-6">
          <lte-card title="Disabled & Readonly" theme="danger" variant="outline">
            <div class="mb-3">
              <label class="form-label" for="dis-text">Disabled text</label>
              <input
                type="text"
                class="form-control"
                id="dis-text"
                value="Can't touch this"
                disabled
              />
            </div>
            <div class="mb-3">
              <label class="form-label" for="ro-text">Readonly text</label>
              <input
                type="text"
                class="form-control"
                id="ro-text"
                value="Read me, but don't write me"
                readonly
              />
            </div>
            <div class="mb-3">
              <label class="form-label" for="dis-select">Disabled select</label>
              <select id="dis-select" class="form-select" disabled>
                <option>Locked option</option>
              </select>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="dis-check" disabled />
              <label class="form-check-label" for="dis-check">Can't check this</label>
            </div>
          </lte-card>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class FormsElementsPage {
  readonly email = signal('');
  readonly password = signal('');
  readonly notifications = signal(false);
  readonly autoSave = signal(true);
  readonly selectValue = signal<string | number>('one');

  readonly selectOptions: SelectOption[] = [
    { label: 'One', value: 'one' },
    { label: 'Two', value: 'two' },
    { label: 'Three', value: 'three' },
  ];
}

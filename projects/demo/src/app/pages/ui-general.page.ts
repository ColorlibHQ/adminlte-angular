import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppContentComponent, CardComponent, CalloutComponent } from '@adminlte/angular';

/**
 * General UI Elements — port of `UI/general.html`. A two-column grid of
 * outlined cards demonstrating Bootstrap components: accordion, alerts, badges,
 * buttons, button groups, collapse, dropdowns, list groups, a navbar,
 * pagination, placeholders, progress bars and spinners. The interactive
 * Bootstrap behaviours (collapse, dropdowns) are wired by the demo shell's
 * Bootstrap bundle via `data-bs-*` attributes.
 */
@Component({
  selector: 'app-ui-general',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, CardComponent, CalloutComponent],
  template: `
    <lte-app-content
      title="General UI Elements"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'General UI Elements' }]"
    >
      <div class="row g-4">
        <div class="col-12">
          <lte-callout theme="info">
            For detailed documentation of Components visit
            <a
              href="https://getbootstrap.com/docs/5.3/components/"
              target="_blank"
              rel="noopener noreferrer"
              class="callout-link"
            >
              Bootstrap Components
            </a>
          </lte-callout>
        </div>

        <!--begin::Left Col-->
        <div class="col-md-6">
          <!--begin::Accordion-->
          <lte-card title="Accordion" theme="primary" variant="outline" bodyClass="">
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Accordion Item #1
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <strong>This is the first item's accordion body.</strong> It is shown by default,
                    until the collapse plugin adds the appropriate classes that we use to style each
                    element. It's also worth noting that just about any HTML can go within the
                    <code>.accordion-body</code>, though the transition does limit overflow.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Accordion Item #2
                  </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <strong>This is the second item's accordion body.</strong> It is hidden by default,
                    until the collapse plugin adds the appropriate classes that we use to style each
                    element.
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Accordion Item #3
                  </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <strong>This is the third item's accordion body.</strong> It is hidden by default,
                    until the collapse plugin adds the appropriate classes that we use to style each
                    element.
                  </div>
                </div>
              </div>
            </div>
          </lte-card>
          <!--end::Accordion-->

          <!--begin::Alert-->
          <lte-card title="Alert" theme="success" variant="outline">
            @for (a of alerts; track a.theme) {
              <div class="alert alert-{{ a.theme }}" role="alert">
                A simple {{ a.theme }} alert with
                <a href="#" class="alert-link">an example link</a>. Give it a click if you like.
              </div>
            }
          </lte-card>
          <!--end::Alert-->

          <!--begin::Badge-->
          <lte-card title="Badge" theme="warning" variant="outline">
            <h1>Example heading <span class="badge bg-secondary">New</span></h1>
            <h4>Example heading <span class="badge bg-secondary">New</span></h4>
            <h6>Example heading <span class="badge bg-secondary">New</span></h6>
            <hr />
            <button type="button" class="btn btn-primary">
              Notifications <span class="badge text-bg-secondary">4</span>
            </button>
            <hr />
            <button type="button" class="btn btn-primary position-relative">
              Inbox
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                99+
                <span class="visually-hidden">unread messages</span>
              </span>
            </button>
            <hr />
            @for (t of themes; track t) {
              <span class="badge text-bg-{{ t }} me-1">{{ label(t) }}</span>
            }
            <hr />
            @for (t of themes; track t) {
              <span class="badge rounded-pill text-bg-{{ t }} me-1">{{ label(t) }}</span>
            }
          </lte-card>
          <!--end::Badge-->

          <!--begin::Button-->
          <lte-card title="Button" theme="danger" variant="outline">
            @for (t of buttonThemes; track t) {
              <button type="button" class="btn btn-{{ t }} mb-2 me-1">{{ label(t) }}</button>
            }
            <button type="button" class="btn btn-link mb-2 me-1">Link</button>
            <hr />
            @for (t of themes; track t) {
              <button type="button" class="btn btn-outline-{{ t }} mb-2 me-1">{{ label(t) }}</button>
            }
            <hr />
            <button type="button" class="btn btn-primary btn-lg me-1">Large button</button>
            <button type="button" class="btn btn-warning btn-sm">Small button</button>
          </lte-card>
          <!--end::Button-->
        </div>
        <!--end::Left Col-->

        <!--begin::Right Col-->
        <div class="col-md-6">
          <!--begin::Button Group-->
          <lte-card title="Button Group" theme="info" variant="outline">
            <div class="btn-group mb-2" role="group" aria-label="Basic example">
              <button type="button" class="btn btn-primary">Left</button>
              <button type="button" class="btn btn-primary">Middle</button>
              <button type="button" class="btn btn-primary">Right</button>
            </div>
            <br />
            <div class="btn-group mb-2" role="group" aria-label="Basic mixed styles example">
              <button type="button" class="btn btn-danger">Left</button>
              <button type="button" class="btn btn-warning">Middle</button>
              <button type="button" class="btn btn-success">Right</button>
            </div>
            <hr />
            <div class="btn-group mb-2" role="group" aria-label="Basic radio toggle button group">
              <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked />
              <label class="btn btn-outline-primary" for="btnradio1">Radio 1</label>
              <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
              <label class="btn btn-outline-primary" for="btnradio2">Radio 2</label>
              <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off" />
              <label class="btn btn-outline-primary" for="btnradio3">Radio 3</label>
            </div>
          </lte-card>
          <!--end::Button Group-->

          <!--begin::Collapse-->
          <lte-card title="Collapse" theme="primary" variant="outline">
            <p class="d-inline-flex gap-1">
              <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                Link with href
              </a>
              <button class="btn btn-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Button with data-bs-target
              </button>
            </p>
            <div class="collapse" id="collapseExample">
              <div class="card card-body">
                Some placeholder content for the collapse component. This panel is hidden by default
                but revealed when the user activates the relevant trigger.
              </div>
            </div>
          </lte-card>
          <!--end::Collapse-->

          <!--begin::Dropdowns-->
          <lte-card title="Dropdowns" theme="success" variant="outline">
            <div class="btn-group">
              <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Primary
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#">Separated link</a></li>
              </ul>
            </div>
            <div class="btn-group ms-1">
              <button type="button" class="btn btn-danger">Danger Split</button>
              <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><hr class="dropdown-divider" /></li>
                <li><a class="dropdown-item" href="#">Separated link</a></li>
              </ul>
            </div>
          </lte-card>
          <!--end::Dropdowns-->

          <!--begin::List Group-->
          <lte-card title="List Group" theme="warning" variant="outline">
            <div class="list-group">
              <a href="#" class="list-group-item list-group-item-action active" aria-current="true">The current link item</a>
              <a href="#" class="list-group-item list-group-item-action">A second link item</a>
              <a href="#" class="list-group-item list-group-item-action">A third link item</a>
              <a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
              <a class="list-group-item list-group-item-action disabled" aria-disabled="true">A disabled link item</a>
            </div>
          </lte-card>
          <!--end::List Group-->

          <!--begin::Pagination-->
          <lte-card title="Pagination" theme="info" variant="outline">
            <nav aria-label="Page navigation example">
              <ul class="pagination">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
              </ul>
            </nav>
            <hr />
            <nav aria-label="Disabled / active example">
              <ul class="pagination">
                <li class="page-item disabled"><a class="page-link">Previous</a></li>
                <li class="page-item active" aria-current="page"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
              </ul>
            </nav>
          </lte-card>
          <!--end::Pagination-->

          <!--begin::Placeholder-->
          <lte-card title="Placeholder" theme="secondary" variant="outline">
            <div class="card" aria-hidden="true">
              <div class="card-body">
                <h5 class="card-title placeholder-glow"><span class="placeholder col-6"></span></h5>
                <p class="card-text placeholder-glow">
                  <span class="placeholder col-7"></span>
                  <span class="placeholder col-4"></span>
                  <span class="placeholder col-4"></span>
                  <span class="placeholder col-6"></span>
                  <span class="placeholder col-8"></span>
                </p>
              </div>
            </div>
          </lte-card>
          <!--end::Placeholder-->

          <!--begin::Progress-->
          <lte-card title="Progress" theme="primary" variant="outline">
            <div class="progress mb-2" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar bg-success" style="width: 25%"></div>
            </div>
            <div class="progress mb-2" role="progressbar" aria-label="Info striped example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar progress-bar-striped bg-info" style="width: 50%"></div>
            </div>
            <div class="progress mb-2" role="progressbar" aria-label="Warning animated example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-warning" style="width: 75%"></div>
            </div>
            <div class="progress mb-2" role="progressbar" aria-label="Danger animated example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" style="width: 100%"></div>
            </div>
          </lte-card>
          <!--end::Progress-->

          <!--begin::Spinner-->
          <lte-card title="Spinner" theme="success" variant="outline">
            @for (t of themes; track t) {
              <div class="spinner-border text-{{ t }} me-1" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            }
          </lte-card>
          <!--end::Spinner-->
        </div>
        <!--end::Right Col-->
      </div>
    </lte-app-content>
  `,
})
export class UiGeneralPage {
  readonly themes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'] as const;
  readonly buttonThemes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'] as const;
  readonly alerts = [
    { theme: 'primary' },
    { theme: 'secondary' },
    { theme: 'success' },
    { theme: 'danger' },
    { theme: 'warning' },
    { theme: 'info' },
  ];

  label(theme: string): string {
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  }
}

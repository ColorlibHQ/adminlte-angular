import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppContentComponent, SmallBoxComponent } from '@adminlte/angular';

/**
 * Small Box — replica of the core AdminLTE `widgets/small-box.html` page. The
 * first row mirrors the core four stat boxes (primary / success / warning /
 * danger); a second row extends the demo across the remaining theme colors so
 * every `lte-small-box` variant (with icon + "More info" footer) is shown.
 */
@Component({
  selector: 'app-widgets-small-box',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, SmallBoxComponent],
  template: `
    <lte-app-content
      title="Small Box"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Small Box' }]"
    >
      <h5 class="mb-2">Small Box</h5>
      <div class="row">
        <div class="col-lg-3 col-6">
          <lte-small-box title="150" text="New Orders" theme="primary" icon="bi-bag" url="#" />
        </div>
        <div class="col-lg-3 col-6">
          <lte-small-box title="53%" text="Bounce Rate" theme="success" icon="bi-graph-up" url="#" />
        </div>
        <div class="col-lg-3 col-6">
          <lte-small-box
            title="44"
            text="User Registrations"
            theme="warning"
            icon="bi-person-plus"
            url="#"
          />
        </div>
        <div class="col-lg-3 col-6">
          <lte-small-box
            title="65"
            text="Unique Visitors"
            theme="danger"
            icon="bi-pie-chart"
            url="#"
          />
        </div>
      </div>

      <h5 class="mt-4 mb-2">All Theme Colors</h5>
      <div class="row">
        <div class="col-lg-3 col-6">
          <lte-small-box title="320" text="Messages" theme="info" icon="bi-chat-dots" url="#" />
        </div>
        <div class="col-lg-3 col-6">
          <lte-small-box title="78" text="Tickets" theme="secondary" icon="bi-ticket" url="#" />
        </div>
        <div class="col-lg-3 col-6">
          <lte-small-box title="512" text="Downloads" theme="dark" icon="bi-download" url="#" />
        </div>
        <div class="col-lg-3 col-6">
          <lte-small-box title="96" text="Reviews" theme="light" icon="bi-star" url="#" />
        </div>
      </div>
    </lte-app-content>
  `,
})
export class WidgetsSmallBoxPage {}

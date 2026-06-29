import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppContentComponent, InfoBoxComponent } from '@adminlte/angular';

/**
 * Info Box — 1:1 replica of the core AdminLTE `widgets/info-box.html` page.
 * Demonstrates `lte-info-box` in its default treatment (colored icon chip),
 * with Bootstrap shadow utilities, as a solid colored box (`text-bg-*`) with a
 * progress bar, and the same solid box with `bg-gradient`.
 */
@Component({
  selector: 'app-widgets-info-box',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, InfoBoxComponent],
  template: `
    <lte-app-content
      title="Info Box"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Info Box' }]"
    >
      <h5 class="mb-2">Info Box</h5>
      <div class="row">
        <div class="col-12 col-sm-6 col-md-3">
          <lte-info-box text="CPU Traffic" [title]="10" unit="%" icon="bi-gear-fill" theme="primary" />
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <lte-info-box text="Sales" [title]="760" icon="bi-cart-fill" theme="success" />
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <lte-info-box text="New Members" title="2,000" icon="bi-people-fill" theme="warning" />
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <lte-info-box text="Likes" title="41,410" icon="bi-hand-thumbs-up-fill" theme="danger" />
        </div>
      </div>

      <h5 class="mb-2">
        Info Box With Custom Shadows
        <small><i>Using Bootstrap's Shadow Utility</i></small>
      </h5>
      <div class="row">
        <div class="col-12 col-sm-6 col-md-3">
          <lte-info-box
            text="CPU Traffic"
            [title]="10"
            unit="%"
            icon="bi-gear-fill"
            theme="primary"
            boxClassExtra="shadow-none"
          />
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <lte-info-box
            text="Sales"
            [title]="760"
            icon="bi-cart-fill"
            theme="success"
            boxClassExtra="shadow-sm"
          />
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <lte-info-box
            text="New Members"
            title="2,000"
            icon="bi-people-fill"
            theme="warning"
            boxClassExtra="shadow"
          />
        </div>
        <div class="col-12 col-sm-6 col-md-3">
          <lte-info-box
            text="Likes"
            title="41,410"
            icon="bi-hand-thumbs-up-fill"
            theme="danger"
            boxClassExtra="shadow-lg"
          />
        </div>
      </div>

      <h5 class="mt-4 mb-2">Info Box With <code>bg-*</code></h5>
      <div class="row">
        <div class="col-md-3 col-sm-6 col-12">
          <lte-info-box
            text="Bookmarks"
            title="41,410"
            icon="bi-bookmark-fill"
            theme="primary"
            variant="solid"
            [progress]="70"
            progressText="70% Increase in 30 Days"
          />
        </div>
        <div class="col-md-3 col-sm-6 col-12">
          <lte-info-box
            text="Likes"
            title="41,410"
            icon="bi-hand-thumbs-up"
            theme="success"
            variant="solid"
            [progress]="70"
            progressText="70% Increase in 30 Days"
          />
        </div>
        <div class="col-md-3 col-sm-6 col-12">
          <lte-info-box
            text="Events"
            title="41,410"
            icon="bi-calendar3"
            theme="warning"
            variant="solid"
            [progress]="70"
            progressText="70% Increase in 30 Days"
          />
        </div>
        <div class="col-md-3 col-sm-6 col-12">
          <lte-info-box
            text="Comments"
            title="41,410"
            icon="bi-chat-text-fill"
            theme="danger"
            variant="solid"
            [progress]="70"
            progressText="70% Increase in 30 Days"
          />
        </div>
      </div>

      <h5 class="mt-4 mb-2">Info Box With <code>bg-gradient</code></h5>
      <div class="row">
        <div class="col-md-3 col-sm-6 col-12">
          <lte-info-box
            text="Bookmarks"
            title="41,410"
            icon="bi-bookmark-fill"
            theme="primary"
            variant="solid"
            [gradient]="true"
            [progress]="70"
            progressText="70% Increase in 30 Days"
          />
        </div>
        <div class="col-md-3 col-sm-6 col-12">
          <lte-info-box
            text="Likes"
            title="41,410"
            icon="bi-hand-thumbs-up"
            theme="success"
            variant="solid"
            [gradient]="true"
            [progress]="70"
            progressText="70% Increase in 30 Days"
          />
        </div>
        <div class="col-md-3 col-sm-6 col-12">
          <lte-info-box
            text="Events"
            title="41,410"
            icon="bi-calendar3"
            theme="warning"
            variant="solid"
            [gradient]="true"
            [progress]="70"
            progressText="70% Increase in 30 Days"
          />
        </div>
        <div class="col-md-3 col-sm-6 col-12">
          <lte-info-box
            text="Comments"
            title="41,410"
            icon="bi-chat-text-fill"
            theme="danger"
            variant="solid"
            [gradient]="true"
            [progress]="70"
            progressText="70% Increase in 30 Days"
          />
        </div>
      </div>
    </lte-app-content>
  `,
})
export class WidgetsInfoBoxPage {}

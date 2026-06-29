import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppContentComponent, CardComponent } from '@adminlte/angular';

/**
 * Cards — 1:1 replica of the core AdminLTE `widgets/cards.html` page. Showcases
 * the card tools (collapse/expand, remove, maximize) across the three colour
 * treatments offered by `lte-card`: default (`card-{theme}`), outline
 * (`card-outline card-{theme}`) and solid (`text-bg-{theme}`).
 */
@Component({
  selector: 'app-widgets-cards',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, CardComponent],
  template: `
    <lte-app-content
      title="Cards"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Cards' }]"
    >
      <h4 class="mb-2">Cards</h4>

      <h5 class="mb-2">Abilities</h5>
      <div class="row g-4 mb-4">
        <div class="col-md-3">
          <lte-card title="Expandable" theme="primary" [collapsible]="true" [defaultCollapsed]="true">
            The body of the card
          </lte-card>
        </div>
        <div class="col-md-3">
          <lte-card title="Collapsable" theme="success" [collapsible]="true">
            The body of the card
          </lte-card>
        </div>
        <div class="col-md-3">
          <lte-card title="Removable" theme="warning" [removable]="true">
            The body of the card
          </lte-card>
        </div>
        <div class="col-md-3">
          <lte-card title="Maximizable" theme="danger" [maximizable]="true">
            The body of the card
          </lte-card>
        </div>
      </div>

      <h5 class="mb-2">Card Outlined</h5>
      <div class="row g-4 mb-4">
        <div class="col-md-3">
          <lte-card
            title="Expandable"
            theme="primary"
            variant="outline"
            [collapsible]="true"
            [defaultCollapsed]="true"
          >
            The body of the card
          </lte-card>
        </div>
        <div class="col-md-3">
          <lte-card title="Collapsable" theme="success" variant="outline" [collapsible]="true">
            The body of the card
          </lte-card>
        </div>
        <div class="col-md-3">
          <lte-card title="Removable" theme="warning" variant="outline" [removable]="true">
            The body of the card
          </lte-card>
        </div>
        <div class="col-md-3">
          <lte-card title="Maximizable" theme="danger" variant="outline" [maximizable]="true">
            The body of the card
          </lte-card>
        </div>
      </div>

      <h5 class="mb-2">Card with <code>.text-bg-*</code></h5>
      <div class="row g-4 mb-4">
        <div class="col-md-3">
          <lte-card
            title="Expandable"
            theme="primary"
            variant="solid"
            [collapsible]="true"
            [defaultCollapsed]="true"
          >
            The body of the card
          </lte-card>
        </div>
        <div class="col-md-3">
          <lte-card title="Collapsable" theme="success" variant="solid" [collapsible]="true">
            The body of the card
          </lte-card>
        </div>
        <div class="col-md-3">
          <lte-card title="Removable" theme="warning" variant="solid" [removable]="true">
            The body of the card
          </lte-card>
        </div>
        <div class="col-md-3">
          <lte-card title="Maximizable" theme="danger" variant="solid" [maximizable]="true">
            The body of the card
          </lte-card>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class WidgetsCardsPage {}

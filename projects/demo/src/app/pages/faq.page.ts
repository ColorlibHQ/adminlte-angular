import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppContentComponent, AccordionComponent, AccordionItemComponent } from '@adminlte/angular';

/** FAQ page — accordion of common questions. */
@Component({
  selector: 'app-faq',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, AccordionComponent, AccordionItemComponent],
  template: `
    <lte-app-content title="FAQ" [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'FAQ' }]">
      <div class="row justify-content-center">
        <div class="col-lg-9">
          <p class="text-body-secondary mb-4">Frequently asked questions about the AdminLTE Angular port.</p>
          <lte-accordion active="q1">
            @for (item of faqs; track item.id) {
              <lte-accordion-item [itemId]="item.id" [title]="item.q">{{ item.a }}</lte-accordion-item>
            }
          </lte-accordion>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class FaqPage {
  readonly faqs = [
    { id: 'q1', q: 'How do I install the package?', a: 'Run "npm install @adminlte/angular", import the standalone components you need, and add the AdminLTE CSS to your styles.' },
    { id: 'q2', q: 'Does it support dark mode?', a: 'Yes. The ColorMode service toggles Bootstrap 5.3 data-bs-theme and persists the choice to localStorage (the lte-theme key, shared across all AdminLTE ports).' },
    { id: 'q3', q: 'Is the sidebar menu config-driven?', a: 'Yes. Pass a typed MenuNode[] to the sidebar; headers, items, groups, badges and permission-based visibility are all supported.' },
    { id: 'q4', q: 'Which Angular version is required?', a: 'Angular 22+. The library uses standalone components, signals, and the new control flow.' },
    { id: 'q5', q: 'Can I use it with SSR?', a: 'Yes — the components are SSR-safe and the color mode applies before first paint to avoid a flash.' },
  ];
}

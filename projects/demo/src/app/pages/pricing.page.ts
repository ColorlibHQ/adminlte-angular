import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppContentComponent } from '@adminlte/angular';

interface Plan {
  name: string;
  price: string;
  featured: boolean;
  cta: string;
  features: string[];
}

/** Pricing page — three plan cards with a highlighted "featured" tier. */
@Component({
  selector: 'app-pricing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent],
  template: `
    <lte-app-content title="Pricing" [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Pricing' }]">
      <div class="row g-4 justify-content-center">
        @for (plan of plans; track plan.name) {
          <div class="col-lg-4 col-md-6">
            <div class="card h-100 shadow-sm" [class.border-primary]="plan.featured">
              <div class="card-header py-3 text-center" [class.text-bg-primary]="plan.featured">
                <h4 class="my-0 fw-normal">{{ plan.name }}</h4>
              </div>
              <div class="card-body d-flex flex-column text-center">
                <h1 class="card-title mb-3">
                  {{ plan.price }}<small class="text-body-secondary fs-6 fw-normal">/mo</small>
                </h1>
                <ul class="list-unstyled mb-4">
                  @for (f of plan.features; track f) {
                    <li class="mb-2"><i class="bi bi-check2-circle text-success me-2"></i>{{ f }}</li>
                  }
                </ul>
                <button
                  type="button"
                  class="btn w-100 mt-auto"
                  [class.btn-primary]="plan.featured"
                  [class.btn-outline-primary]="!plan.featured"
                >
                  {{ plan.cta }}
                </button>
              </div>
            </div>
          </div>
        }
      </div>
    </lte-app-content>
  `,
})
export class PricingPage {
  readonly plans: Plan[] = [
    { name: 'Free', price: '$0', featured: false, cta: 'Sign up for free', features: ['10 users included', '2 GB of storage', 'Email support', 'Community access'] },
    { name: 'Pro', price: '$15', featured: true, cta: 'Get started', features: ['20 users included', '10 GB of storage', 'Priority email support', 'Advanced analytics'] },
    { name: 'Enterprise', price: '$29', featured: false, cta: 'Contact us', features: ['Unlimited users', '30 GB of storage', 'Phone & email support', 'Dedicated manager'] },
  ];
}

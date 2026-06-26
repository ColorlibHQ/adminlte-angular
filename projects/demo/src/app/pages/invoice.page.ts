import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppContentComponent } from '@adminlte/angular';

interface LineItem {
  qty: number;
  product: string;
  description: string;
  subtotal: string;
}

/** Invoice page — billing header, line-item table, totals, print/pay actions. */
@Component({
  selector: 'app-invoice',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent],
  template: `
    <lte-app-content title="Invoice" [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Invoice' }]">
      <div class="card">
        <div class="card-body">
          <div class="row mb-4">
            <div class="col-6"><h4 class="mb-0"><i class="bi bi-globe2 me-2"></i>AdminLTE, Inc.</h4></div>
            <div class="col-6 text-end"><h5 class="text-body-secondary mb-0">Invoice #007612</h5></div>
          </div>

          <div class="row mb-4">
            <div class="col-sm-4 text-body-secondary">
              From
              <address class="mb-0 text-body"><strong>AdminLTE, Inc.</strong><br />795 Folsom Ave, Suite 600<br />San Francisco, CA 94107</address>
            </div>
            <div class="col-sm-4 text-body-secondary">
              To
              <address class="mb-0 text-body"><strong>John Doe</strong><br />123 Main Street<br />Anytown, CA 90210</address>
            </div>
            <div class="col-sm-4 text-body-secondary">
              <b class="text-body">Invoice #007612</b><br />Date: 02/05/2026<br />Account: 968-34567
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr><th>Qty</th><th>Product</th><th>Description</th><th class="text-end">Subtotal</th></tr>
              </thead>
              <tbody>
                @for (it of items; track it.product) {
                  <tr><td>{{ it.qty }}</td><td>{{ it.product }}</td><td>{{ it.description }}</td><td class="text-end">{{ it.subtotal }}</td></tr>
                }
              </tbody>
            </table>
          </div>

          <div class="row">
            <div class="col-6"><p class="text-body-secondary">Payment is due within 30 days. Thank you for your business.</p></div>
            <div class="col-6">
              <table class="table mb-0">
                <tbody>
                  <tr><th class="text-end">Subtotal:</th><td class="text-end">$250.30</td></tr>
                  <tr><th class="text-end">Tax (9.3%):</th><td class="text-end">$23.28</td></tr>
                  <tr><th class="text-end">Total:</th><td class="text-end fw-bold">$273.58</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="text-end mt-3">
            <button type="button" class="btn btn-outline-secondary me-2"><i class="bi bi-printer me-1"></i>Print</button>
            <button type="button" class="btn btn-success"><i class="bi bi-credit-card me-1"></i>Submit Payment</button>
          </div>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class InvoicePage {
  readonly items: LineItem[] = [
    { qty: 1, product: 'Pro subscription', description: 'Annual plan — 20 seats', subtotal: '$180.00' },
    { qty: 2, product: 'Extra storage', description: '10 GB add-on', subtotal: '$40.00' },
    { qty: 1, product: 'Priority support', description: 'One month', subtotal: '$30.30' },
  ];
}

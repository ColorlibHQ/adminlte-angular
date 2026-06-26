import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Maintenance mode (standalone, full-viewport). */
@Component({
  selector: 'app-maintenance',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="d-flex flex-column min-vh-100 align-items-center justify-content-center text-center bg-body-tertiary p-4">
      <h1 class="display-1 fw-bold text-info mb-2"><i class="bi bi-cone-striped"></i></h1>
      <h2 class="mb-2">We&rsquo;ll be back soon!</h2>
      <p class="text-body-secondary mb-4">
        The site is under scheduled maintenance and will be back shortly.<br />Thank you for your patience.
      </p>
      <a routerLink="/" class="btn btn-primary"><i class="bi bi-house me-1"></i>Back to Dashboard</a>
    </div>
  `,
})
export class MaintenancePage {}

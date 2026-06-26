import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** 404 — page not found (standalone, full-viewport). */
@Component({
  selector: 'app-notfound',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="d-flex flex-column min-vh-100 align-items-center justify-content-center text-center bg-body-tertiary p-4">
      <h1 class="display-1 fw-bold text-warning mb-2"><i class="bi bi-exclamation-triangle-fill"></i> 404</h1>
      <h2 class="mb-2">Oops! Page not found.</h2>
      <p class="text-body-secondary mb-4">
        We could not find the page you were looking for.<br />Meanwhile, you may return to the dashboard.
      </p>
      <a routerLink="/" class="btn btn-primary"><i class="bi bi-house me-1"></i>Back to Dashboard</a>
    </div>
  `,
})
export class NotFoundPage {}

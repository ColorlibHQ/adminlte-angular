import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthLayoutComponent } from '@adminlte/angular';

/** Register page rendered with the AuthLayout (outside the dashboard shell). */
@Component({
  selector: 'app-register',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AuthLayoutComponent],
  template: `
    <lte-auth-layout authType="register">
      <p class="register-box-msg">Register a new membership</p>

      <form (ngSubmit)="register()">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Full Name" />
          <div class="input-group-text"><span class="bi bi-person"></span></div>
        </div>
        <div class="input-group mb-3">
          <input type="email" class="form-control" placeholder="Email" />
          <div class="input-group-text"><span class="bi bi-envelope"></span></div>
        </div>
        <div class="input-group mb-3">
          <input type="password" class="form-control" placeholder="Password" />
          <div class="input-group-text"><span class="bi bi-lock-fill"></span></div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="agreeTerms" />
              <label class="form-check-label" for="agreeTerms">I agree to the <a href="#">terms</a></label>
            </div>
          </div>
          <div class="col-4">
            <div class="d-grid gap-2">
              <button type="submit" class="btn btn-primary">Sign In</button>
            </div>
          </div>
        </div>
      </form>

      <div class="social-auth-links text-center mb-3 d-grid gap-2">
        <p>- OR -</p>
        <a href="#" class="btn btn-primary"><i class="bi bi-facebook me-2"></i> Sign in using Facebook</a>
        <a href="#" class="btn btn-danger"><i class="bi bi-google me-2"></i> Sign in using Google+</a>
      </div>

      <p class="mb-0">
        <a routerLink="/login" class="text-center">I already have a membership</a>
      </p>
    </lte-auth-layout>
  `,
})
export class RegisterPage {
  private readonly router = inject(Router);

  register(): void {
    void this.router.navigateByUrl('/');
  }
}

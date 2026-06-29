import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthLayoutComponent } from '@adminlte/angular';

/**
 * Register page (v2) — the boxed card-outline variant with floating labels,
 * rendered with the AuthLayout (outside the dashboard shell).
 */
@Component({
  selector: 'app-register-v2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AuthLayoutComponent],
  template: `
    <lte-auth-layout authType="register" variant="v2">
      <p class="register-box-msg">Register a new membership</p>

      <form (ngSubmit)="register()">
        <div class="input-group mb-1">
          <div class="form-floating">
            <input id="registerFullName" type="text" class="form-control" placeholder="" />
            <label for="registerFullName">Full Name</label>
          </div>
          <div class="input-group-text"><span class="bi bi-person"></span></div>
        </div>
        <div class="input-group mb-1">
          <div class="form-floating">
            <input id="registerEmail" type="email" class="form-control" placeholder="" />
            <label for="registerEmail">Email</label>
          </div>
          <div class="input-group-text"><span class="bi bi-envelope"></span></div>
        </div>
        <div class="input-group mb-1">
          <div class="form-floating">
            <input id="registerPassword" type="password" class="form-control" placeholder="" />
            <label for="registerPassword">Password</label>
          </div>
          <div class="input-group-text"><span class="bi bi-lock-fill"></span></div>
        </div>
        <div class="row">
          <div class="col-8 d-inline-flex align-items-center">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="agreeTermsV2" />
              <label class="form-check-label" for="agreeTermsV2">I agree to the <a href="#">terms</a></label>
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
        <a routerLink="/login" class="link-primary text-center">I already have a membership</a>
      </p>
    </lte-auth-layout>
  `,
})
export class RegisterV2Page {
  private readonly router = inject(Router);

  register(): void {
    void this.router.navigateByUrl('/');
  }
}

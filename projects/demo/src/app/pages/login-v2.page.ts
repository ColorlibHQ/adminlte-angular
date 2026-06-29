import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthLayoutComponent } from '@adminlte/angular';

/**
 * Login page (v2) — the boxed card-outline variant with floating labels,
 * rendered with the AuthLayout (outside the dashboard shell).
 */
@Component({
  selector: 'app-login-v2',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AuthLayoutComponent],
  template: `
    <lte-auth-layout authType="login" variant="v2">
      <p class="login-box-msg">Sign in to start your session</p>

      <form (ngSubmit)="signIn()">
        <div class="input-group mb-1">
          <div class="form-floating">
            <input id="loginEmail" type="email" class="form-control" value="" placeholder="" />
            <label for="loginEmail">Email</label>
          </div>
          <div class="input-group-text"><span class="bi bi-envelope"></span></div>
        </div>
        <div class="input-group mb-1">
          <div class="form-floating">
            <input id="loginPassword" type="password" class="form-control" placeholder="" />
            <label for="loginPassword">Password</label>
          </div>
          <div class="input-group-text"><span class="bi bi-lock-fill"></span></div>
        </div>
        <div class="row">
          <div class="col-8 d-inline-flex align-items-center">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="rememberMeV2" />
              <label class="form-check-label" for="rememberMeV2">Remember Me</label>
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

      <p class="mb-1">
        <a href="#">I forgot my password</a>
      </p>
      <p class="mb-0">
        <a routerLink="/register" class="text-center">Register a new membership</a>
      </p>
    </lte-auth-layout>
  `,
})
export class LoginV2Page {
  private readonly router = inject(Router);

  signIn(): void {
    void this.router.navigateByUrl('/');
  }
}

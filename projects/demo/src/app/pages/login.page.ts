import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  AuthLayoutComponent,
  InputComponent,
  InputSwitchComponent,
  ButtonComponent,
} from '@adminlte/angular';

/** Login page rendered with the AuthLayout (outside the dashboard shell). */
@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, AuthLayoutComponent, InputComponent, InputSwitchComponent, ButtonComponent],
  template: `
    <lte-auth-layout authType="login" variant="v2">
      <p class="login-box-msg">Sign in to start your session</p>
      <div class="mb-3">
        <lte-input placeholder="Email" type="email" icon="bi-envelope" [(value)]="email" />
      </div>
      <div class="mb-3">
        <lte-input placeholder="Password" type="password" icon="bi-lock" [(value)]="password" />
      </div>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <lte-input-switch label="Remember me" [(checked)]="remember" />
      </div>
      <lte-button theme="primary" [block]="true" icon="bi-box-arrow-in-right" (click)="signIn()">Sign in</lte-button>
      <p class="mt-3 mb-0 text-center">
        <a routerLink="/">Back to the dashboard</a>
      </p>
    </lte-auth-layout>
  `,
})
export class LoginPage {
  private readonly router = inject(Router);

  readonly email = signal('');
  readonly password = signal('');
  readonly remember = signal(false);

  signIn(): void {
    void this.router.navigateByUrl('/');
  }
}

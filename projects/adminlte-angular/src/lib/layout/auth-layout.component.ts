import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Inject,
  PLATFORM_ID,
  computed,
  effect,
  input,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * Centered card layout for login / register pages. Applies the page-level body
 * classes (`login-page` / `register-page` + `bg-body-secondary`) while mounted
 * and removes them on destroy. Project the form into the default slot, and
 * optionally a custom brand into `[logo]`.
 */
@Component({
  selector: 'lte-auth-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div [class]="authType() + '-box'">
      @if (variant() === 'v2') {
        <div class="card card-outline card-primary">
          <div class="card-header">
            <a [routerLink]="logoHref()" class="link-dark text-center link-offset-2 link-opacity-100 link-opacity-50-hover">
              @if (logo()) {
                <img [src]="logo()" alt="Logo" height="48" />
              } @else {
                <h1 class="mb-0"><b>Admin</b>LTE</h1>
              }
              <ng-content select="[logo]" />
            </a>
          </div>
          <div [class]="'card-body ' + authType() + '-card-body'">
            <ng-content />
          </div>
        </div>
      } @else {
        <div [class]="authType() + '-logo'">
          <a [routerLink]="logoHref()">
            @if (logo()) {
              <img [src]="logo()" alt="Logo" height="48" />
            } @else {
              <b>Admin</b>LTE
            }
            <ng-content select="[logo]" />
          </a>
        </div>
        <div class="card">
          <div [class]="'card-body ' + authType() + '-card-body'">
            <ng-content />
          </div>
        </div>
      }
    </div>
  `,
})
export class AuthLayoutComponent {
  private readonly isBrowser: boolean;
  private appliedClasses: string[] = [];

  readonly authType = input<'login' | 'register'>('login');
  readonly variant = input<'default' | 'v2'>('default');
  readonly logo = input<string>();
  readonly logoHref = input<string>('/');

  private readonly bodyClasses = computed(() => [`${this.authType()}-page`, 'bg-body-secondary']);

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private readonly doc: Document,
    destroyRef: DestroyRef,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    effect(() => {
      if (!this.isBrowser) return;
      const next = this.bodyClasses();
      for (const c of this.appliedClasses) this.doc.body.classList.remove(c);
      for (const c of next) this.doc.body.classList.add(c);
      this.appliedClasses = next;
    });

    destroyRef.onDestroy(() => {
      if (!this.isBrowser) return;
      for (const c of this.appliedClasses) this.doc.body.classList.remove(c);
      this.appliedClasses = [];
    });
  }
}

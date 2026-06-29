import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Inject,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

/**
 * Lockscreen — 1:1 replica of the core `examples/lockscreen.html`. Uses the
 * distinct `.lockscreen-wrapper` layout (not the centered card AuthLayout), so it
 * manages the `lockscreen bg-body-secondary` body classes itself while mounted.
 */
@Component({
  selector: 'app-lockscreen',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <div class="lockscreen-wrapper">
      <div class="lockscreen-logo">
        <a routerLink="/"><b>Admin</b>LTE</a>
      </div>

      <div class="lockscreen-name">John Doe</div>

      <div class="lockscreen-item">
        <div class="lockscreen-image">
          <img [src]="avatar" alt="User Image" />
        </div>

        <form class="lockscreen-credentials" (ngSubmit)="unlock()">
          <div class="input-group">
            <input type="password" class="form-control shadow-none" placeholder="password" />
            <div class="input-group-text border-0 bg-transparent px-1">
              <button type="submit" class="btn shadow-none">
                <i class="bi bi-box-arrow-right text-body-secondary"></i>
              </button>
            </div>
          </div>
        </form>
      </div>

      <div class="help-block text-center">Enter your password to retrieve your session</div>
      <div class="text-center">
        <a routerLink="/login" class="text-decoration-none">Or sign in as a different user</a>
      </div>
      <div class="lockscreen-footer text-center">
        Copyright &copy; 2014-2026 &nbsp;
        <b>
          <a
            href="https://adminlte.io"
            class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
            >AdminLTE.io</a
          >
        </b>
        <br />
        All rights reserved
      </div>
    </div>
  `,
})
export class LockscreenPage {
  private readonly isBrowser: boolean;
  private readonly bodyClasses = ['lockscreen', 'bg-body-secondary'];

  /** Gravatar mystery-person placeholder. */
  readonly avatar = 'https://www.gravatar.com/avatar/?d=mp&s=128';

  private readonly router = inject(Router);

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private readonly doc: Document,
    destroyRef: DestroyRef,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      for (const c of this.bodyClasses) this.doc.body.classList.add(c);
    }
    destroyRef.onDestroy(() => {
      if (!this.isBrowser) return;
      for (const c of this.bodyClasses) this.doc.body.classList.remove(c);
    });
  }

  unlock(): void {
    void this.router.navigateByUrl('/');
  }
}

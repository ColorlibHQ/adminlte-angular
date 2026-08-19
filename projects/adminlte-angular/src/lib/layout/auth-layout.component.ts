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
import { DOCUMENT, NgTemplateOutlet, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * Centered card layout for login / register pages. Applies the page-level body
 * classes (`login-page` / `register-page` + `bg-body-secondary`) while mounted
 * and removes them on destroy. Project the form into the default slot, and
 * optionally a custom brand into `[logo]`.
 *
 * IMPORTANT — this template must declare each projection slot exactly ONCE.
 * Angular distributes the projected nodes into a single slot when the component
 * is created; a second `<ng-content />` with the same selector (e.g. one per
 * `@if` branch) never receives anything, so whichever branch holds the losing
 * copy renders an empty card. That is what happened to every `variant="v2"`
 * page before this was fixed. The brand block therefore lives in a
 * `<ng-template>` that both variants stamp with `ngTemplateOutlet`, and the
 * default slot lives in the `.card-body`, which both variants share.
 */
@Component({
  selector: 'lte-auth-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, NgTemplateOutlet],
  template: `
    <ng-template #brand>
      <a [routerLink]="logoHref()" [class]="brandLinkClass()">
        @if (logo()) {
          <img [src]="logo()" alt="Logo" height="48" />
        } @else if (variant() === 'v2') {
          <h1 class="mb-0"><b>Admin</b>LTE</h1>
        } @else {
          <b>Admin</b>LTE
        }
        <ng-content select="[logo]" />
      </a>
    </ng-template>

    <div [class]="authType() + '-box'">
      @if (variant() !== 'v2') {
        <div [class]="authType() + '-logo'">
          <ng-container [ngTemplateOutlet]="brand" />
        </div>
      }

      <div [class]="cardClass()">
        @if (variant() === 'v2') {
          <div class="card-header">
            <ng-container [ngTemplateOutlet]="brand" />
          </div>
        }
        <div [class]="cardBodyClass()">
          <ng-content />
        </div>
      </div>
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

  /** `.card` chrome: v2 is the outlined primary card, default is the plain one. */
  readonly cardClass = computed(() =>
    this.variant() === 'v2' ? 'card card-outline card-primary' : 'card',
  );

  readonly cardBodyClass = computed(() => `card-body ${this.authType()}-card-body`);

  /** v2 renders the brand inside `.card-header`, so it needs the muted link styles. */
  readonly brandLinkClass = computed(() =>
    this.variant() === 'v2'
      ? 'link-dark text-center link-offset-2 link-opacity-100 link-opacity-50-hover'
      : '',
  );

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

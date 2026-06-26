import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Sidebar brand/logo header. Shows an image logo with brand text, or the
 * default `<b>Admin</b>LTE` mark when no logo is supplied.
 */
@Component({
  selector: 'lte-sidebar-brand',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  host: { class: 'sidebar-brand' },
  template: `
    <a [routerLink]="href()" class="brand-link">
      @if (logo()) {
        <img [src]="logo()" alt="Logo" class="brand-image opacity-75 shadow" />
        <span class="brand-text fw-light">{{ brandText() }}</span>
      } @else {
        <span class="brand-image opacity-75 shadow"></span>
        <span class="brand-text fw-light"><b>Admin</b>LTE</span>
      }
    </a>
  `,
})
export class SidebarBrandComponent {
  /** Logo image src. When omitted, the default AdminLTE text mark is shown. */
  readonly logo = input<string>();
  readonly href = input<string>('/');
  /** Brand text shown next to the logo image. */
  readonly brandText = input<string>('AdminLTE 4');
}

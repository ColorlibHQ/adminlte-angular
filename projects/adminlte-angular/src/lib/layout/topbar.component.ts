import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { ColorModeToggleComponent } from './color-mode-toggle.component';
import { FullscreenToggleComponent } from './fullscreen-toggle.component';
import { SidebarService } from '../services/sidebar.service';
import { CommandPaletteService } from '../services/command-palette.service';
import { cn } from '../util/class-name';
import type { TopbarUser } from '../types/layout';

/**
 * Application header (navbar): sidebar toggle, search trigger (⌘K), fullscreen +
 * color-mode toggles, and a user dropdown. Project extra items into the
 * `[topbar-start]` / `[topbar-end]` slots.
 */
@Component({
  selector: 'lte-topbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ColorModeToggleComponent, FullscreenToggleComponent],
  template: `
    <nav [class]="navClass()">
      <div class="container-fluid">
        <ul class="navbar-nav">
          <li class="nav-item">
            <button type="button" class="nav-link" title="Toggle sidebar" (click)="sidebar.toggle()">
              <i class="bi bi-list"></i>
            </button>
          </li>
          <ng-content select="[topbar-start]" />
        </ul>

        <ul class="navbar-nav ms-auto">
          @if (search()) {
            <li class="nav-item">
              <a class="nav-link" href="#" role="button" title="Search (⌘K)" (click)="openSearch($event)">
                <i class="bi bi-search"></i>
              </a>
            </li>
          }

          <ng-content select="[topbar-end]" />

          @if (fullscreen()) {
            <li lte-fullscreen-toggle></li>
          }
          @if (colorModeToggle()) {
            <li lte-color-mode-toggle></li>
          }

          <li class="nav-item dropdown user-menu">
            <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" (click)="$event.preventDefault()">
              <img [src]="resolvedUser().image" class="user-image rounded-circle shadow" [alt]="resolvedUser().name" />
              <span class="d-none d-md-inline">{{ resolvedUser().name }}</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-lg dropdown-menu-end">
              <li class="user-header text-bg-primary">
                <img [src]="resolvedUser().image" class="rounded-circle shadow" [alt]="resolvedUser().name" />
                <p>
                  {{ resolvedUser().name }}@if (resolvedUser().role) { - {{ resolvedUser().role }} }
                  @if (resolvedUser().memberSince) {
                    <small>Member since {{ resolvedUser().memberSince }}</small>
                  }
                </p>
              </li>
              <li class="user-body">
                <div class="row">
                  <div class="col-4 text-center"><a href="#">Followers</a></div>
                  <div class="col-4 text-center"><a href="#">Sales</a></div>
                  <div class="col-4 text-center"><a href="#">Friends</a></div>
                </div>
              </li>
              <li class="user-footer">
                <a href="#" class="btn btn-outline-secondary" (click)="emitProfile($event)">Profile</a>
                <a href="#" class="btn btn-outline-danger float-end" (click)="emitLogout($event)">Sign out</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  `,
})
export class TopbarComponent {
  readonly sidebar = inject(SidebarService);
  private readonly palette = inject(CommandPaletteService);

  readonly user = input<TopbarUser>();
  readonly colorModeToggle = input<boolean>(true);
  readonly search = input<boolean>(true);
  readonly fullscreen = input<boolean>(true);
  readonly navbarClass = input<string>('');

  readonly logout = output<void>();
  readonly profile = output<void>();

  readonly navClass = computed(() =>
    cn('app-header navbar navbar-expand bg-body', this.navbarClass()),
  );

  readonly resolvedUser = computed<TopbarUser>(
    () =>
      this.user() ?? {
        name: 'Alexander Pierce',
        image: 'https://www.gravatar.com/avatar/?d=mp&s=160',
        role: 'Web Developer',
        memberSince: 'Nov. 2023',
      },
  );

  openSearch(e: Event): void {
    e.preventDefault();
    this.palette.open();
  }

  emitProfile(e: Event): void {
    e.preventDefault();
    this.profile.emit();
  }

  emitLogout(e: Event): void {
    e.preventDefault();
    this.logout.emit();
  }
}

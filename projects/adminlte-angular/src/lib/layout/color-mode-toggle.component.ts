import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ColorModeService } from '../services/color-mode.service';
import type { ColorMode } from '../types/theme';

interface ModeOption {
  value: ColorMode;
  icon: string;
  label: string;
}

/**
 * Topbar dropdown to switch between Light / Dark / Auto color modes.
 * The host element is the navbar `<li>` (selector matches `li[lte-color-mode-toggle]`),
 * so it slots cleanly into the topbar's `<ul class="navbar-nav">`.
 */
@Component({
  selector: 'li[lte-color-mode-toggle]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'nav-item dropdown' },
  template: `
    <button
      id="bd-theme"
      class="nav-link"
      type="button"
      aria-label="Toggle color scheme"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class="bi {{ triggerIcon() }}"></i>
    </button>
    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="bd-theme">
      @for (mode of modes; track mode.value) {
        <li>
          <button
            type="button"
            class="dropdown-item d-flex align-items-center"
            [class.active]="colorMode() === mode.value"
            (click)="select(mode.value)"
          >
            <i class="bi {{ mode.icon }} me-2"></i>
            {{ mode.label }}
            @if (colorMode() === mode.value) {
              <i class="bi bi-check-lg ms-auto"></i>
            }
          </button>
        </li>
      }
    </ul>
  `,
})
export class ColorModeToggleComponent {
  private readonly colorModeService = inject(ColorModeService);

  readonly colorMode = this.colorModeService.colorMode;

  readonly triggerIcon = computed(() => {
    switch (this.colorMode()) {
      case 'light':
        return 'bi-sun-fill';
      case 'dark':
        return 'bi-moon-fill';
      default:
        return 'bi-circle-half';
    }
  });

  readonly modes: ModeOption[] = [
    { value: 'light', icon: 'bi-sun-fill', label: 'Light' },
    { value: 'dark', icon: 'bi-moon-fill', label: 'Dark' },
    { value: 'auto', icon: 'bi-circle-half', label: 'Auto' },
  ];

  select(mode: ColorMode): void {
    this.colorModeService.setColorMode(mode);
  }
}

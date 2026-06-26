import {
  Injectable,
  Inject,
  PLATFORM_ID,
  signal,
  type WritableSignal,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

/**
 * Signal-based wrapper around the Fullscreen API. Drives `isFullscreen` from the
 * `fullscreenchange` event so the UI stays in sync even when the user exits with
 * Esc. Ports AdminLTE's `fullscreen.ts`. SSR-safe.
 */
@Injectable({ providedIn: 'root' })
export class FullscreenService {
  readonly isFullscreen: WritableSignal<boolean> = signal(false);

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private readonly doc: Document,
  ) {
    if (isPlatformBrowser(platformId)) {
      this.doc.addEventListener('fullscreenchange', this.onChange);
    }
  }

  async enter(): Promise<void> {
    try {
      await this.doc.documentElement.requestFullscreen();
    } catch (err) {
      console.error('[adminlte-angular] failed to enter fullscreen:', err);
    }
  }

  async exit(): Promise<void> {
    try {
      if (this.doc.fullscreenElement) await this.doc.exitFullscreen();
    } catch (err) {
      console.error('[adminlte-angular] failed to exit fullscreen:', err);
    }
  }

  async toggle(): Promise<void> {
    if (this.isFullscreen()) await this.exit();
    else await this.enter();
  }

  private readonly onChange = (): void => {
    this.isFullscreen.set(!!this.doc.fullscreenElement);
  };
}

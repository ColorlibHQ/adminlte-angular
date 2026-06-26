import {
  Injectable,
  Inject,
  PLATFORM_ID,
  signal,
  type WritableSignal,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

/**
 * Signal-based command palette (⌘K) state. Registers a global keydown listener:
 * ⌘K / Ctrl+K toggles the palette, Escape closes it. SSR-safe.
 */
@Injectable({ providedIn: 'root' })
export class CommandPaletteService {
  readonly isOpen: WritableSignal<boolean> = signal(false);

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(DOCUMENT) private readonly doc: Document,
  ) {
    if (isPlatformBrowser(platformId)) {
      this.doc.addEventListener('keydown', this.onKeydown);
    }
  }

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  toggle(): void {
    this.isOpen.update((v) => !v);
  }

  private readonly onKeydown = (e: KeyboardEvent): void => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      this.toggle();
    } else if (e.key === 'Escape' && this.isOpen()) {
      this.close();
    }
  };
}

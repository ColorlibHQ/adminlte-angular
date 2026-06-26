import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { CommandPaletteService } from '../services/command-palette.service';
import { flattenMenuToCommands } from '../util/flatten-menu';
import { biClass } from '../util/class-name';
import type { MenuNode } from '../types/menu';
import type { CommandItem } from '../types/widgets';

/**
 * ⌘K command palette. Flattens the sidebar menu into navigable commands, filters
 * them by a substring query, and supports full keyboard navigation
 * (↑/↓/Enter/Esc). Navigation goes through the Angular Router by default; pass a
 * `(navigate)` handler to override.
 */
@Component({
  selector: 'lte-command-palette',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (palette.isOpen()) {
      <div class="lte-cmd-overlay" (mousedown)="onBackdrop($event)">
        <div class="card shadow-lg lte-cmd-panel" role="dialog" aria-modal="true" aria-label="Command palette">
          <div class="input-group input-group-lg border-bottom">
            <span class="input-group-text bg-body border-0"><i class="bi bi-search"></i></span>
            <input
              #searchInput
              class="form-control border-0 shadow-none"
              [placeholder]="placeholder()"
              aria-label="Search"
              role="combobox"
              aria-expanded="true"
              aria-autocomplete="list"
              [attr.aria-controls]="listboxId"
              [attr.aria-activedescendant]="results().length ? optionId(active()) : null"
              [value]="query()"
              (input)="onQuery($event)"
              (keydown)="onKeydown($event)"
            />
          </div>

          <div [id]="listboxId" role="listbox" class="list-group list-group-flush lte-cmd-list">
            @if (results().length === 0) {
              <div class="text-secondary text-center py-4 small">No results for "{{ query() }}"</div>
            }
            @for (item of results(); track item.href; let idx = $index) {
              <button
                [id]="optionId(idx)"
                type="button"
                role="option"
                [attr.aria-selected]="idx === active()"
                class="list-group-item list-group-item-action d-flex align-items-center gap-2"
                [class.active]="idx === active()"
                (mouseenter)="active.set(idx)"
                (click)="go(item)"
              >
                <i class="bi {{ icon(item.icon) }}"></i>
                <span class="flex-grow-1 text-start">{{ item.label }}</span>
                @if (item.group) {
                  <span class="badge fw-normal" [class.text-bg-light]="idx === active()" [class.text-bg-secondary]="idx !== active()">{{ item.group }}</span>
                }
              </button>
            }
          </div>

          <div class="card-footer d-flex justify-content-between align-items-center text-secondary small py-2">
            <span><kbd>&uarr;</kbd> <kbd>&darr;</kbd> navigate</span>
            <span><kbd>&crarr;</kbd> open &middot; <kbd>esc</kbd> close</span>
          </div>
        </div>
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: contents;
      }
      .lte-cmd-overlay {
        position: fixed;
        inset: 0;
        z-index: 1080;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 12vh;
        background: rgba(0, 0, 0, 0.5);
      }
      .lte-cmd-panel {
        width: min(640px, 92vw);
        max-height: 70vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      .lte-cmd-list {
        overflow-y: auto;
      }
    `,
  ],
})
export class CommandPaletteComponent {
  readonly palette = inject(CommandPaletteService);
  private readonly router = inject(Router, { optional: true });

  /** Explicit command list. Takes precedence over `menuItems`. */
  readonly items = input<CommandItem[]>();
  /** Menu tree to flatten into commands when `items` is not given. */
  readonly menuItems = input<MenuNode[]>([]);
  readonly placeholder = input<string>('Search pages…');
  /**
   * Optional navigation override. When provided it fully takes over routing
   * (e.g. a custom router push or analytics-wrapped navigation); otherwise the
   * palette uses the Angular Router (or `window.location` for external/`http` links).
   */
  readonly navigate = input<(href: string) => void>();

  private readonly searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  readonly query = signal('');
  readonly active = signal(0);

  readonly listboxId = 'lte-cmd-listbox';

  private readonly allItems = computed<CommandItem[]>(
    () => this.items() ?? flattenMenuToCommands(this.menuItems()),
  );

  readonly results = computed<CommandItem[]>(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.allItems();
    return this.allItems().filter(
      (i) => i.label.toLowerCase().includes(q) || (i.group?.toLowerCase().includes(q) ?? false),
    );
  });

  constructor() {
    // Reset + focus when the palette opens; reset active on query change.
    effect(() => {
      if (!this.palette.isOpen()) return;
      this.query.set('');
      this.active.set(0);
      queueMicrotask(() => setTimeout(() => this.searchInput()?.nativeElement.focus(), 20));
    });
    effect(() => {
      this.query();
      this.active.set(0);
    });
  }

  optionId(idx: number): string {
    return `${this.listboxId}-opt-${idx}`;
  }

  icon(value: string | undefined): string {
    return biClass(value) || 'bi-arrow-return-right';
  }

  onQuery(e: Event): void {
    this.query.set((e.target as HTMLInputElement).value);
  }

  onBackdrop(e: MouseEvent): void {
    if (e.target === e.currentTarget) this.palette.close();
  }

  onKeydown(e: KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this.active.update((i) => Math.min(i + 1, this.results().length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.active.update((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        this.go();
        break;
      case 'Escape':
        e.preventDefault();
        this.palette.close();
        break;
    }
  }

  go(item?: CommandItem): void {
    const target = item ?? this.results()[this.active()];
    if (!target) return;
    this.palette.close();
    const override = this.navigate();
    if (override) {
      override(target.href);
    } else if (target.href.startsWith('http')) {
      if (typeof window !== 'undefined') window.location.assign(target.href);
    } else if (this.router) {
      void this.router.navigateByUrl(target.href);
    } else if (typeof window !== 'undefined') {
      window.location.assign(target.href);
    }
  }
}

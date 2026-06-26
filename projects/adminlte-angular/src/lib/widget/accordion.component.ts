import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  signal,
} from '@angular/core';

/**
 * Bootstrap accordion container. Project `<lte-accordion-item>` children into the
 * default slot. By default only one item is open at a time; set `[alwaysOpen]` to
 * allow multiple. `[(active)]` two-way binds the open id(s): a single string when
 * `alwaysOpen` is false, a string array when true.
 */
@Component({
  selector: 'lte-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="accordion" [class.accordion-flush]="flush()">
      <ng-content />
    </div>
  `,
})
export class AccordionComponent {
  readonly flush = input<boolean>(false);
  readonly alwaysOpen = input<boolean>(false);
  /** Two-way bound open id(s). */
  readonly active = model<string | string[]>();

  private readonly openIds = signal<Set<string>>(new Set());

  readonly openList = computed(() => [...this.openIds()]);

  constructor() {
    // Sync the external model -> internal set.
    effect(() => {
      const value = this.active();
      const ids = value == null ? [] : Array.isArray(value) ? value : [value];
      this.openIds.set(new Set(ids));
    });
  }

  isOpen(id: string): boolean {
    return this.openIds().has(id);
  }

  /** Called by a child whose `defaultOpen` is set, before any user interaction. */
  openInitial(id: string): void {
    if (this.openIds().has(id)) return;
    this.openIds.update((set) => {
      const next = this.alwaysOpen() ? new Set(set) : new Set<string>();
      next.add(id);
      return next;
    });
    this.emit();
  }

  toggle(id: string): void {
    this.openIds.update((set) => {
      const next = new Set(set);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!this.alwaysOpen()) next.clear();
        next.add(id);
      }
      return next;
    });
    this.emit();
  }

  private emit(): void {
    const ids = [...this.openIds()];
    this.active.set(this.alwaysOpen() ? ids : (ids[0] ?? ''));
  }
}

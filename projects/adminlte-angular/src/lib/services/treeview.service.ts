import { Injectable, signal } from '@angular/core';

/**
 * Tracks open/closed state of sidebar treeview groups. In `accordion` mode only
 * one group per parent stays open at a time. Provided at the SidebarNav level so
 * each sidebar instance gets its own registry.
 */
@Injectable()
export class TreeviewService {
  /** When true, only one child group per parent may be open. */
  readonly accordion = signal(false);

  /** Maps `parentKey` -> the id of the currently open child group (or null). */
  private readonly openByParent = signal<Record<string, string | null>>({});

  /** Animation duration (ms) for the slide-down/up transition. */
  readonly animationSpeed = signal(300);

  setAccordion(value: boolean): void {
    this.accordion.set(value);
  }

  isOpen(parentKey: string, id: string): boolean {
    return this.openByParent()[parentKey] === id;
  }

  setOpen(parentKey: string, id: string, open: boolean): void {
    this.openByParent.update((map) => ({
      ...map,
      [parentKey]: open ? id : map[parentKey] === id ? null : map[parentKey] ?? null,
    }));
  }
}

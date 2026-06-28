import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { AccordionComponent } from './accordion.component';

/**
 * A single collapsible panel inside an {@link AccordionComponent}. The host
 * element carries the `.accordion-item` class directly so it is a real sibling
 * of the other items under `.accordion` — Bootstrap rounds the group via
 * `.accordion-item:first-of-type` / `:last-of-type` and `.accordion-flush >
 * .accordion-item`, which only work when the items are direct siblings (an
 * extra wrapper makes every item both first- and last-of-type). Project the
 * body into the default slot.
 */
@Component({
  selector: 'lte-accordion-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'accordion-item' },
  styles: ':host { display: block; }',
  template: `
    <h2 class="accordion-header">
      <button
        type="button"
        class="accordion-button"
        [class.collapsed]="!open()"
        [attr.aria-expanded]="open()"
        (click)="parent.toggle(itemId())"
      >
        {{ title() }}
      </button>
    </h2>
    <div class="accordion-collapse collapse" [class.show]="open()">
      <div class="accordion-body">
        <ng-content />
      </div>
    </div>
  `,
})
export class AccordionItemComponent {
  protected readonly parent = inject(AccordionComponent);

  /** Unique id used to address this item. */
  readonly itemId = input.required<string>();
  readonly title = input.required<string>();
  /** Whether the item starts open. */
  readonly defaultOpen = input<boolean>(false);

  readonly open = computed(() => this.parent.isOpen(this.itemId()));

  constructor() {
    queueMicrotask(() => {
      if (this.defaultOpen()) this.parent.openInitial(this.itemId());
    });
  }
}

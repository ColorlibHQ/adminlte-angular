import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { AccordionComponent } from './accordion.component';

/**
 * A single collapsible panel inside an {@link AccordionComponent}. The host carries
 * the panel data (`itemId`, `title`, `defaultOpen`); project the body into its
 * default slot. Open state is read from the parent accordion.
 */
@Component({
  selector: 'lte-accordion-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="accordion-item">
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

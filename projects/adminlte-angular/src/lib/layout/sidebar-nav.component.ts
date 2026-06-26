import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { SidebarNavItemComponent } from './sidebar-nav-item.component';
import { TreeviewService } from '../services/treeview.service';
import type { MenuNode } from '../types/menu';

/**
 * Renders the config-driven sidebar menu from a `MenuNode[]`. Owns a
 * {@link TreeviewService} registry so each sidebar instance manages its own
 * accordion state.
 */
@Component({
  selector: 'lte-sidebar-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SidebarNavItemComponent],
  providers: [TreeviewService],
  template: `
    <nav class="mt-2" aria-label="Main navigation">
      <ul
        id="navigation"
        class="nav sidebar-menu flex-column"
        data-lte-toggle="treeview"
        [attr.data-accordion]="accordion() ? 'true' : 'false'"
      >
        @for (item of visibleItems(); track trackItem($index, item)) {
          <lte-sidebar-nav-item [item]="item" [currentPath]="currentPath()" [depth]="0" parentKey="root" />
        }
      </ul>
    </nav>
  `,
})
export class SidebarNavComponent {
  private readonly registry = inject(TreeviewService);

  readonly items = input<MenuNode[]>([]);
  readonly currentPath = input<string>('/');
  /** Accordion treeview — one open group per parent at a time. */
  readonly accordion = input<boolean>(false);
  readonly animationSpeed = input<number>(300);

  readonly visibleItems = computed(() =>
    this.items().filter((i) => i.type === 'header' || i.visible !== false),
  );

  constructor() {
    effect(() => this.registry.setAccordion(this.accordion()));
    effect(() => this.registry.animationSpeed.set(this.animationSpeed()));
  }

  trackItem(index: number, item: MenuNode): string {
    return item.type === 'item'
      ? (item.route ?? item.href ?? item.text)
      : `${item.type}:${item.text}:${index}`;
  }
}

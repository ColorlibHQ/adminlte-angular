import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TreeviewService } from '../services/treeview.service';
import { biClass } from '../util/class-name';
import type { MenuGroup, MenuItem, MenuNode } from '../types/menu';

let uid = 0;

/**
 * Renders a single sidebar node — a header, a leaf link, or a collapsible group
 * (treeview) that recurses into its children. Active-link detection compares the
 * item's route/href to `currentPath`. Groups auto-open when a descendant is
 * active. The submenu slides open via a CSS `grid-template-rows` transition (no
 * fixed heights, no animations package).
 */
@Component({
  selector: 'lte-sidebar-nav-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  styles: [
    `
      .treeview-wrap {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--lte-treeview-speed, 300ms) ease;
      }
      .treeview-wrap.open {
        grid-template-rows: 1fr;
      }
      .treeview-wrap > .nav-treeview {
        overflow: hidden;
        min-height: 0;
      }
    `,
  ],
  template: `
    @switch (item().type) {
      @case ('header') {
        <li class="nav-header">{{ header().text }}</li>
      }
      @case ('item') {
        <li class="nav-item" [class.active]="isItemActive()">
          @if (leaf().route) {
            <a [routerLink]="leaf().route" [attr.target]="leaf().target ?? null" class="nav-link" [class.active]="isItemActive()">
              @if (leaf().icon) {
                <i class="nav-icon {{ icon(leaf().icon) }}" [class]="leaf().iconColor ? 'text-' + leaf().iconColor : ''"></i>
              }
              <p>
                {{ leaf().text }}
                @if (leaf().badge != null) {
                  <span class="nav-badge badge text-bg-{{ leaf().badgeColor || 'secondary' }} ms-auto">{{ leaf().badge }}</span>
                }
              </p>
            </a>
          } @else {
            <a [href]="leaf().href ?? '#'" [attr.target]="leaf().target ?? null" class="nav-link" [class.active]="isItemActive()">
              @if (leaf().icon) {
                <i class="nav-icon {{ icon(leaf().icon) }}" [class]="leaf().iconColor ? 'text-' + leaf().iconColor : ''"></i>
              }
              <p>
                {{ leaf().text }}
                @if (leaf().badge != null) {
                  <span class="nav-badge badge text-bg-{{ leaf().badgeColor || 'secondary' }} ms-auto">{{ leaf().badge }}</span>
                }
              </p>
            </a>
          }
        </li>
      }
      @default {
        <li class="nav-item" [class.menu-open]="isOpen()">
          <button type="button" class="nav-link" [attr.aria-expanded]="isOpen()" (click)="toggle()">
            @if (group().icon) {
              <i class="nav-icon {{ icon(group().icon) }}"></i>
            }
            <p>
              {{ group().text }}
              <i class="nav-arrow bi bi-chevron-right"></i>
              @if (group().badge != null) {
                <span class="nav-badge badge text-bg-{{ group().badgeColor || 'secondary' }} ms-auto me-3">{{ group().badge }}</span>
              }
            </p>
          </button>

          <div class="treeview-wrap" [class.open]="isOpen()" [style.--lte-treeview-speed.ms]="animationSpeed()">
            <ul class="nav nav-treeview">
              @for (child of visibleChildren(); track trackChild($index, child)) {
                <lte-sidebar-nav-item
                  [item]="child"
                  [currentPath]="currentPath()"
                  [depth]="depth() + 1"
                  [parentKey]="id"
                />
              }
            </ul>
          </div>
        </li>
      }
    }
  `,
})
export class SidebarNavItemComponent {
  private readonly registry = inject(TreeviewService);

  readonly item = input.required<MenuNode>();
  readonly currentPath = input<string>('/');
  readonly depth = input<number>(0);
  readonly parentKey = input<string>('root');

  readonly id = `tv-${uid++}`;

  /** Discriminated accessors so the template stays strongly typed. */
  readonly header = computed(() => this.item() as Extract<MenuNode, { type: 'header' }>);
  readonly leaf = computed(() => this.item() as MenuItem);
  readonly group = computed(() => this.item() as MenuGroup);

  readonly animationSpeed = this.registry.animationSpeed;

  private readonly localOpen = signal(false);

  readonly visibleChildren = computed(() =>
    this.item().type === 'group'
      ? (this.item() as MenuGroup).children.filter(
          (c) => c.type === 'header' || c.visible !== false,
        )
      : [],
  );

  readonly isItemActive = computed(() => {
    const node = this.item();
    if (node.type !== 'item') return false;
    const target = node.route ?? node.href;
    return target ? this.matches(target) : false;
  });

  private readonly groupActive = computed(
    () => this.item().type === 'group' && this.hasActiveDescendant(this.item()),
  );

  readonly isOpen = computed(() => {
    if (this.registry.accordion()) return this.registry.isOpen(this.parentKey(), this.id);
    return this.localOpen();
  });

  constructor() {
    // Open the group when a descendant becomes active (e.g. on route change).
    effect(() => {
      if (!this.groupActive()) return;
      if (this.registry.accordion()) this.registry.setOpen(this.parentKey(), this.id, true);
      else this.localOpen.set(true);
    });
  }

  icon(value: string | undefined): string {
    return biClass(value);
  }

  toggle(): void {
    if (this.registry.accordion()) {
      this.registry.setOpen(this.parentKey(), this.id, !this.isOpen());
    } else {
      this.localOpen.update((v) => !v);
    }
  }

  trackChild(index: number, child: MenuNode): string {
    return child.type === 'item'
      ? (child.route ?? child.href ?? child.text)
      : `${child.type}:${child.text}:${index}`;
  }

  private matches(target: string): boolean {
    const path = this.currentPath();
    if (target.startsWith('http')) return false;
    if (target === '/') return path === '/';
    return path === target || path.startsWith(target + '/');
  }

  private hasActiveDescendant(node: MenuNode): boolean {
    if (node.type === 'item') {
      const target = node.route ?? node.href;
      return target ? this.matches(target) : false;
    }
    if (node.type === 'group') return node.children.some((c) => this.hasActiveDescendant(c));
    return false;
  }
}

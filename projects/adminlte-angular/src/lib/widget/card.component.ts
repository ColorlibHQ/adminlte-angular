import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { biClass, cn } from '../util/class-name';
import type { BootstrapTheme } from '../types/theme';

/**
 * AdminLTE card with optional collapse / maximize / remove tools. `variant`
 * controls the color treatment: `default` (colored header), `outline` (colored
 * top border) or `solid` (fully colored). Project the body into the default
 * slot, an optional footer into `[footer]`, and extra tools into `[tools]`.
 */
@Component({
  selector: 'lte-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (!isRemoved()) {
      <div [class]="cardClass()">
        @if (title() || icon() || hasTools()) {
          <div [class]="cn('card-header', headerClass())">
            <h3 class="card-title">
              @if (icon()) {
                <i class="{{ biClass(icon()) }} me-1"></i>
              }
              {{ title() }}
            </h3>
            <div class="card-tools">
              <ng-content select="[tools]" />
              @if (collapsible()) {
                <button type="button" class="btn btn-tool" [title]="isCollapsed() ? 'Expand' : 'Collapse'" (click)="toggleCollapse()">
                  <i class="bi" [class.bi-plus-lg]="isCollapsed()" [class.bi-dash-lg]="!isCollapsed()"></i>
                </button>
              }
              @if (maximizable()) {
                <button type="button" class="btn btn-tool" title="Maximize" (click)="toggleMaximize()">
                  <i class="bi" [class.bi-fullscreen-exit]="isMaximized()" [class.bi-fullscreen]="!isMaximized()"></i>
                </button>
              }
              @if (removable()) {
                <button type="button" class="btn btn-tool" title="Remove" (click)="remove()">
                  <i class="bi bi-x-lg"></i>
                </button>
              }
            </div>
          </div>
        }

        @if (!isCollapsed()) {
          <div [class]="cn('card-body', bodyClass())">
            <ng-content />
          </div>
          <div [class]="cn('card-footer', footerClass())" [hidden]="!hasFooter()">
            <ng-content select="[footer]" />
          </div>
        }
      </div>
    }
  `,
})
export class CardComponent {
  private readonly doc = inject(DOCUMENT);

  readonly title = input<string>();
  readonly icon = input<string>();
  readonly theme = input<BootstrapTheme>();
  readonly variant = input<'default' | 'outline' | 'solid'>('default');
  readonly gradient = input<boolean>(false);
  readonly collapsible = input<boolean>(false);
  readonly defaultCollapsed = input<boolean>(false);
  readonly removable = input<boolean>(false);
  readonly maximizable = input<boolean>(false);
  readonly hasFooter = input<boolean>(false);
  readonly bodyClass = input<string>('');
  readonly headerClass = input<string>('');
  readonly footerClass = input<string>('');

  readonly isCollapsed = signal(false);
  readonly isMaximized = signal(false);
  readonly isRemoved = signal(false);

  readonly biClass = biClass;
  readonly cn = cn;

  readonly hasTools = computed(
    () => this.collapsible() || this.removable() || this.maximizable(),
  );

  readonly cardClass = computed(() => {
    let base = 'card';
    const theme = this.theme();
    if (theme) {
      if (this.variant() === 'outline') base = `card card-outline card-${theme}`;
      else if (this.variant() === 'solid') base = `card text-bg-${theme}`;
      else base = `card card-${theme}`;
    }
    return cn(
      base,
      this.gradient() && theme && 'bg-gradient',
      this.isCollapsed() && 'collapsed-card',
      this.isMaximized() && 'maximized-card',
    );
  });

  constructor() {
    queueMicrotask(() => {
      if (this.defaultCollapsed()) this.isCollapsed.set(true);
    });
  }

  toggleCollapse(): void {
    this.isCollapsed.update((v) => !v);
  }

  toggleMaximize(): void {
    this.isMaximized.update((v) => {
      const next = !v;
      this.doc.documentElement.classList.toggle('maximized-card', next);
      return next;
    });
  }

  remove(): void {
    this.isRemoved.set(true);
  }
}

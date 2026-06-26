import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import type { ComponentSize } from '../types/theme';

/**
 * A self-contained Bootstrap modal that doesn't require Bootstrap's JS. Visibility
 * is driven by the `[(open)]` model; project the body into the default slot and a
 * footer into `[modal-footer]`.
 */
@Component({
  selector: 'lte-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (open()) {
      <div class="modal fade show d-block" tabindex="-1" role="dialog" (click)="onBackdrop($event)">
        <div [class]="dialogClass()" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ title() }}</h5>
              <button type="button" class="btn-close" aria-label="Close" (click)="close()"></button>
            </div>
            <div class="modal-body">
              <ng-content />
            </div>
            <div class="modal-footer">
              <ng-content select="[modal-footer]" />
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show"></div>
    }
  `,
})
export class ModalComponent {
  readonly title = input<string>('');
  readonly size = input<ComponentSize>();
  readonly open = model<boolean>(false);
  readonly closed = output<void>();

  readonly dialogClass = computed(() =>
    this.size() ? `modal-dialog modal-${this.size()}` : 'modal-dialog',
  );

  onBackdrop(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('modal')) this.close();
  }

  close(): void {
    this.open.set(false);
    this.closed.emit();
  }
}

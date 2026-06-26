import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  Inject,
  PLATFORM_ID,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { DatatableColumn } from '../types/widgets';

// `simple-datatables` is an optional peer dependency — typed loosely.
interface DataTableInstance {
  destroy: () => void;
}

/**
 * Sortable / searchable / paginated table. Renders a plain Bootstrap `<table>`
 * from `columns` + `data`, then progressively enhances it with
 * {@link https://github.com/fiduswriter/simple-datatables simple-datatables} (an
 * optional peer dep, lazily imported on the browser only). Without the library it
 * degrades to a static styled table.
 */
@Component({
  selector: 'lte-datatable',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <table #host class="table table-striped" [class.table-hover]="hover()">
      <thead>
        <tr>
          @for (col of columns(); track col.key) {
            <th [attr.data-sortable]="col.sortable === false ? 'false' : null">{{ col.label ?? col.key }}</th>
          }
        </tr>
      </thead>
      <tbody>
        @for (row of data(); track $index) {
          <tr>
            @for (col of columns(); track col.key) {
              <td>{{ cell(row, col.key) }}</td>
            }
          </tr>
        }
      </tbody>
    </table>
  `,
})
export class DatatableComponent {
  private readonly host = viewChild.required<ElementRef<HTMLTableElement>>('host');
  private readonly isBrowser: boolean;
  private table: DataTableInstance | null = null;

  readonly columns = input.required<DatatableColumn[]>();
  readonly data = input.required<Array<Record<string, unknown>>>();
  readonly hover = input<boolean>(true);
  /** Extra simple-datatables options merged over the defaults. */
  readonly options = input<Record<string, unknown>>({});

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Enhance once, after the rows have rendered. Tracks `data`/`columns` so a
    // fresh dataset rebuilds the instance.
    effect(() => {
      this.columns();
      this.data();
      if (!this.isBrowser) return;
      void this.rebuild();
    });

    inject(DestroyRef).onDestroy(() => {
      this.table?.destroy();
      this.table = null;
    });
  }

  cell(row: Record<string, unknown>, key: string): unknown {
    return row[key];
  }

  private async rebuild(): Promise<void> {
    try {
      const mod = await import('simple-datatables');
      const DataTable = (mod as { DataTable?: unknown }).DataTable as unknown as new (
        el: Element,
        opts: Record<string, unknown>,
      ) => DataTableInstance;
      if (!DataTable) return;
      this.table?.destroy();
      // Re-read the freshly rendered DOM on the next microtask so the new rows
      // are present before enhancement.
      queueMicrotask(() => {
        this.table = new DataTable(this.host().nativeElement, {
          searchable: true,
          perPage: 10,
          ...this.options(),
        });
      });
    } catch {
      console.warn('[adminlte-angular] simple-datatables is not installed — <lte-datatable> is a static table.');
    }
  }
}

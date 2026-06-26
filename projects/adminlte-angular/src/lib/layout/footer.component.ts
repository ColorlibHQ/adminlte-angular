import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';

/**
 * App footer. Projects custom content via the default slot; when none is
 * provided it falls back to the default AdminLTE copyright line. The host
 * element is the `<footer class="app-footer">`.
 */
@Component({
  selector: 'lte-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-footer' },
  template: `
    @if (rightText()) {
      <div class="float-end d-none d-sm-inline">{{ rightText() }}</div>
    }
    <span #projected><ng-content /></span>
    @if (showDefault()) {
      <strong>
        Copyright &copy; 2014-{{ year() }}&nbsp;
        <a href="https://adminlte.io" class="text-decoration-none">AdminLTE.io</a>.
      </strong>
      All rights reserved.
    }
  `,
})
export class FooterComponent {
  private readonly el = inject(ElementRef<HTMLElement>);

  /** Right-aligned text. Hidden on extra-small screens. */
  readonly rightText = input<string>('');
  readonly year = input<number | string>(new Date().getFullYear());

  /** True when no content was projected — render the default copyright. */
  protected readonly showDefault = signal(false);

  constructor() {
    afterNextRender(() => {
      const projected = this.el.nativeElement.querySelector('span');
      this.showDefault.set(!projected || projected.textContent?.trim() === '');
    });
  }
}

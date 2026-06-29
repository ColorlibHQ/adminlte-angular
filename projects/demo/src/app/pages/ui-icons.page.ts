import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppContentComponent, CardComponent } from '@adminlte/angular';

/**
 * Icons — port of `UI/icons.html`. Keeps the core page's "use any font library"
 * recommendation card, then adds a browsable grid of Bootstrap Icons (the icon
 * set the Angular port ships with) so the page is a useful icon reference.
 */
@Component({
  selector: 'app-ui-icons',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, CardComponent],
  template: `
    <lte-app-content
      title="Icons"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Icons' }]"
    >
      <lte-card title="Icons" theme="primary" variant="outline">
        <p>You can use any font library you like with AdminLTE 4.</p>
        <strong>Recommendations</strong>
        <ul class="mt-1 mb-0">
          <li><a href="https://icons.getbootstrap.com/" target="_blank" rel="noopener">Bootstrap Icons</a> (bundled)</li>
          <li><a href="https://fontawesome.com/" target="_blank" rel="noopener">Font Awesome</a></li>
          <li><a href="https://useiconic.com/open/" target="_blank" rel="noopener">Iconic Icons</a></li>
          <li><a href="https://ionicons.com/" target="_blank" rel="noopener">Ion Icons</a></li>
        </ul>
      </lte-card>

      <lte-card title="Bootstrap Icons" icon="bi-grid-3x3-gap">
        <div class="row g-3 text-center">
          @for (icon of icons; track icon) {
            <div class="col-6 col-sm-4 col-md-3 col-lg-2">
              <div class="border rounded p-3 h-100 d-flex flex-column align-items-center justify-content-center">
                <i class="bi {{ icon }} fs-3 mb-2" aria-hidden="true"></i>
                <code class="small text-truncate w-100">{{ icon }}</code>
              </div>
            </div>
          }
        </div>
      </lte-card>
    </lte-app-content>
  `,
})
export class UiIconsPage {
  /** A representative sample of the bundled Bootstrap Icons set. */
  readonly icons: string[] = [
    'bi-house', 'bi-speedometer', 'bi-grid-1x2', 'bi-table', 'bi-bar-chart',
    'bi-pie-chart', 'bi-graph-up', 'bi-calendar', 'bi-clock', 'bi-bell',
    'bi-chat-text', 'bi-envelope', 'bi-person', 'bi-people', 'bi-gear',
    'bi-tools', 'bi-wrench', 'bi-search', 'bi-funnel', 'bi-filter',
    'bi-star', 'bi-heart', 'bi-bookmark', 'bi-flag', 'bi-tag',
    'bi-cart', 'bi-bag', 'bi-credit-card', 'bi-wallet', 'bi-cash',
    'bi-folder', 'bi-file-earmark', 'bi-file-earmark-text', 'bi-cloud', 'bi-cloud-upload',
    'bi-cloud-download', 'bi-download', 'bi-upload', 'bi-trash', 'bi-pencil',
    'bi-pencil-square', 'bi-plus-lg', 'bi-dash-lg', 'bi-check-lg', 'bi-x-lg',
    'bi-arrow-up', 'bi-arrow-down', 'bi-arrow-left', 'bi-arrow-right', 'bi-arrow-repeat',
    'bi-chevron-up', 'bi-chevron-down', 'bi-chevron-left', 'bi-chevron-right', 'bi-three-dots',
    'bi-list', 'bi-grid', 'bi-columns', 'bi-layout-sidebar', 'bi-window',
    'bi-image', 'bi-camera', 'bi-camera-video', 'bi-mic', 'bi-music-note',
    'bi-sun', 'bi-moon', 'bi-lightning', 'bi-shield-check', 'bi-lock',
    'bi-unlock', 'bi-key', 'bi-eye', 'bi-eye-slash', 'bi-geo-alt',
    'bi-map', 'bi-globe', 'bi-link-45deg', 'bi-share', 'bi-printer',
    'bi-phone', 'bi-laptop', 'bi-display', 'bi-tablet', 'bi-hdd',
    'bi-database', 'bi-server', 'bi-cpu', 'bi-bug', 'bi-code-slash',
    'bi-terminal', 'bi-braces', 'bi-git', 'bi-github', 'bi-question-circle',
    'bi-info-circle', 'bi-exclamation-triangle', 'bi-check-circle', 'bi-x-circle', 'bi-emoji-smile',
  ];
}

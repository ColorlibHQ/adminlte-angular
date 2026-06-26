import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { AppContentComponent, CardComponent, CalloutComponent } from '@adminlte/angular';

/** Generic placeholder page used by the demo's secondary routes. */
@Component({
  selector: 'app-placeholder',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, CardComponent, CalloutComponent],
  template: `
    <lte-app-content [title]="title()" [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: title() }]">
      <lte-card [title]="title()" icon="bi-file-earmark">
        <lte-callout theme="info" title="Placeholder">
          This is a demo placeholder for the <strong>{{ title() }}</strong> route. Build your page here.
        </lte-callout>
      </lte-card>
    </lte-app-content>
  `,
})
export class PlaceholderPage {
  private readonly route = inject(ActivatedRoute);

  readonly title = toSignal(
    this.route.data.pipe(map((d) => (d['title'] as string) ?? 'Page')),
    { initialValue: 'Page' },
  );
}

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  viewChild,
} from '@angular/core';
import { AppContentComponent, CalloutComponent, CardComponent } from '@adminlte/angular';

/**
 * Text Editors — showcases a Quill (snow theme) rich-text editor inside an
 * `<lte-card>`. Quill is browser-only, so it is imported dynamically inside
 * {@link afterNextRender} (SSR/prerender safe) and the whole init is wrapped in
 * try/catch so a load failure degrades to the plain editor container.
 */
@Component({
  selector: 'app-forms-editor',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, CardComponent, CalloutComponent],
  template: `
    <lte-app-content
      title="Text Editors"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Forms' }, { label: 'Editor' }]"
    >
      <div class="row g-4">
        <div class="col-12">
          <lte-callout theme="info">
            A WYSIWYG rich-text editor powered by
            <a
              href="https://quilljs.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="callout-link"
              >Quill</a
            >. Use the toolbar to format your content — bold, italic, links, images and lists.
          </lte-callout>
        </div>

        <div class="col-12">
          <lte-card title="Compose" theme="primary" variant="outline" [hasFooter]="true">
            <div #editor style="min-height: 18rem">
              <p>Hello — this is a <strong>Quill</strong> editor.</p>
              <p>
                Format text with the toolbar above, drop in
                <a href="https://adminlte.io" target="_blank" rel="noopener noreferrer">links</a>,
                or build a list:
              </p>
              <ul>
                <li>Standalone Angular component</li>
                <li>Quill v2, snow theme</li>
                <li>Initialised in <code>afterNextRender</code></li>
              </ul>
            </div>
            <div footer class="d-flex gap-2">
              <button type="button" class="btn btn-primary">
                <i class="bi bi-send me-1" aria-hidden="true"></i>
                Publish
              </button>
              <button type="button" class="btn btn-outline-secondary">Save draft</button>
            </div>
          </lte-card>
        </div>

        <div class="col-12">
          <p class="text-secondary small mb-0">
            <i class="bi bi-info-circle me-1" aria-hidden="true"></i>
            The editor stores its value as HTML. In a real app, bind
            <code>quill.root.innerHTML</code> (or the Delta from
            <code>quill.getContents()</code>) to your form model.
          </p>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class FormsEditorPage {
  private readonly editorEl = viewChild.required<ElementRef<HTMLDivElement>>('editor');

  constructor() {
    afterNextRender(async () => {
      try {
        const Quill = (await import('quill')).default;
        new Quill(this.editorEl().nativeElement, {
          theme: 'snow',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline'],
              ['link', 'image'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['clean'],
            ],
          },
        });
      } catch {
        // Quill is browser-only; ignore failures during SSR/prerender or if the
        // chunk fails to load — the editor container remains usable as plain HTML.
      }
    });
  }
}

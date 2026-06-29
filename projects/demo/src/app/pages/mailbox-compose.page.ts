import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppContentComponent } from '@adminlte/angular';
import { MailboxSidebarComponent } from './mailbox-sidebar.component';

/** Mailbox compose — folder/labels sidebar + a new-message form. */
@Component({
  selector: 'app-mailbox-compose',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, MailboxSidebarComponent],
  template: `
    <lte-app-content
      title="Compose Message"
      [breadcrumbs]="[
        { label: 'Home', route: '/' },
        { label: 'Mailbox', route: '/mailbox/inbox' },
        { label: 'Compose' },
      ]"
    >
      <div class="row g-3">
        <!-- Folder sidebar -->
        <div class="col-lg-3">
          <app-mailbox-sidebar active="Inbox" />
        </div>

        <!-- Compose form -->
        <div class="col-lg-9">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">New Message</h3>
            </div>
            <div class="card-body">
              <form class="row g-3">
                <div class="col-12">
                  <label class="form-label" for="mail-to">To</label>
                  <input
                    type="email"
                    class="form-control"
                    id="mail-to"
                    placeholder="recipient@example.com"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label" for="mail-cc">Cc</label>
                  <input type="text" class="form-control" id="mail-cc" />
                </div>
                <div class="col-md-6">
                  <label class="form-label" for="mail-bcc">Bcc</label>
                  <input type="text" class="form-control" id="mail-bcc" />
                </div>
                <div class="col-12">
                  <label class="form-label" for="mail-subject">Subject</label>
                  <input type="text" class="form-control" id="mail-subject" />
                </div>
                <div class="col-12">
                  <label class="form-label" for="mail-body">Message</label>
                  <textarea
                    id="mail-body"
                    class="form-control"
                    rows="12"
                    placeholder="Write your message…"
                    style="min-height: 16rem"
                  ></textarea>
                  <small class="text-secondary">
                    Hook up a rich-text editor such as
                    <a href="https://quilljs.com/" target="_blank" rel="noopener">Quill</a>
                    or
                    <a
                      href="https://github.com/Ionaru/easy-markdown-editor"
                      target="_blank"
                      rel="noopener"
                      >EasyMDE</a
                    >
                    to upgrade this textarea.
                  </small>
                </div>
                <div class="col-12">
                  <label class="form-label" for="mail-attach">Attachments</label>
                  <input type="file" class="form-control" id="mail-attach" multiple />
                </div>
              </form>
            </div>
            <div class="card-footer d-flex gap-2">
              <button class="btn btn-primary" type="button">
                <i class="bi bi-send me-1" aria-hidden="true"></i>Send
              </button>
              <button class="btn btn-outline-secondary" type="button">
                <i class="bi bi-file-earmark me-1" aria-hidden="true"></i>
                Save draft
              </button>
              <button class="btn btn-outline-danger ms-auto" type="button">
                <i class="bi bi-x-lg me-1" aria-hidden="true"></i>Discard
              </button>
            </div>
          </div>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class MailboxComposePage {}

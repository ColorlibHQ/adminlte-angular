import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppContentComponent } from '@adminlte/angular';
import { MailboxSidebarComponent } from './mailbox-sidebar.component';

interface Attachment {
  name: string;
  size: string;
  icon: string;
  iconClass: string;
}

/** Mailbox read — folder/labels sidebar + a single-message read view. */
@Component({
  selector: 'app-mailbox-read',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, RouterLink, MailboxSidebarComponent],
  template: `
    <lte-app-content
      title="Read Message"
      [breadcrumbs]="[
        { label: 'Home', route: '/' },
        { label: 'Mailbox', route: '/mailbox/inbox' },
        { label: 'Read' },
      ]"
    >
      <div class="row g-3">
        <!-- Folder sidebar -->
        <div class="col-lg-3">
          <app-mailbox-sidebar active="Inbox" />
        </div>

        <!-- Read view -->
        <div class="col-lg-9">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h3 class="card-title">Re: design system v2.4 sign-off</h3>
              <div class="btn-group btn-group-sm">
                <a routerLink="/mailbox/inbox" class="btn btn-outline-secondary" title="Back to inbox">
                  <i class="bi bi-arrow-left" aria-hidden="true"></i>
                </a>
                <button class="btn btn-outline-secondary" type="button" title="Previous">
                  <i class="bi bi-chevron-up" aria-hidden="true"></i>
                </button>
                <button class="btn btn-outline-secondary" type="button" title="Next">
                  <i class="bi bi-chevron-down" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <div class="card-body">
              <!-- Sender meta -->
              <div class="d-flex gap-3 align-items-start mb-4">
                <img
                  class="flex-shrink-0 rounded-circle"
                  src="https://www.gravatar.com/avatar/?d=mp&s=50"
                  alt=""
                  width="48"
                  height="48"
                />
                <div class="flex-grow-1">
                  <div class="d-flex justify-content-between">
                    <div>
                      <p class="mb-0 fw-semibold">Olivia Bennett</p>
                      <small class="text-secondary">olivia&#64;example.com &mdash; to me</small>
                    </div>
                    <small class="text-secondary">10:42 AM &middot; 2 hours ago</small>
                  </div>
                </div>
              </div>

              <!-- Body -->
              <div class="mb-4">
                <p>Hey Jane,</p>
                <p>
                  Reviewed the v2.4 candidate this morning. Overall: looks great, ready to ship
                  pending two small notes:
                </p>
                <ol>
                  <li>
                    Success state on form inputs feels a touch light against
                    <code>bg-body-tertiary</code>. Can we bump the border contrast by ~10%?
                  </li>
                  <li>
                    The new focus ring is lovely on light theme but barely visible on dark. Worth a
                    quick a11y pass before we cut the release.
                  </li>
                </ol>
                <p>Otherwise, big +1. Customers are going to love the motion primitives.</p>
                <p class="mb-0">
                  Olivia<br />
                  <small class="text-secondary">Sent from my laptop</small>
                </p>
              </div>

              <!-- Attachments -->
              <h6 class="fw-semibold">Attachments ({{ attachments.length }})</h6>
              <div class="row g-2 mb-3 mailbox-attachments">
                @for (file of attachments; track file.name) {
                  <div class="col-md-6">
                    <div class="card mailbox-attachment">
                      <div class="card-body py-2 px-3 d-flex align-items-center gap-2">
                        <i class="bi {{ file.icon }} {{ file.iconClass }} fs-3" aria-hidden="true"></i>
                        <div class="flex-grow-1">
                          <p class="mb-0 small fw-semibold">{{ file.name }}</p>
                          <small class="text-secondary">{{ file.size }}</small>
                        </div>
                        <a href="#" class="btn btn-sm btn-outline-secondary" title="Download {{ file.name }}">
                          <i class="bi bi-download" aria-hidden="true"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
            <div class="card-footer d-flex gap-2">
              <a routerLink="/mailbox/compose" class="btn btn-primary">
                <i class="bi bi-reply me-1" aria-hidden="true"></i>Reply
              </a>
              <button class="btn btn-outline-secondary" type="button">
                <i class="bi bi-arrow-90deg-right me-1" aria-hidden="true"></i>
                Forward
              </button>
              <button class="btn btn-outline-secondary ms-auto" type="button">
                <i class="bi bi-archive me-1" aria-hidden="true"></i>Archive
              </button>
              <button class="btn btn-outline-danger" type="button">
                <i class="bi bi-trash me-1" aria-hidden="true"></i>Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class MailboxReadPage {
  readonly attachments: Attachment[] = [
    {
      name: 'design-review.pdf',
      size: '1.4 MB',
      icon: 'bi-file-earmark-pdf-fill',
      iconClass: 'text-danger',
    },
    {
      name: 'focus-ring-dark.png',
      size: '320 KB',
      icon: 'bi-file-earmark-image-fill',
      iconClass: 'text-primary',
    },
  ];
}

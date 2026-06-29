import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppContentComponent } from '@adminlte/angular';
import { MailboxSidebarComponent } from './mailbox-sidebar.component';

interface MailMessage {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  starred: boolean;
  unread: boolean;
  labelTheme: string;
  attachment?: boolean;
}

/** Mailbox inbox — folder/labels sidebar + a list of messages with controls. */
@Component({
  selector: 'app-mailbox-inbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, RouterLink, MailboxSidebarComponent],
  template: `
    <lte-app-content
      title="Mailbox"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Mailbox' }, { label: 'Inbox' }]"
    >
      <div class="row g-3">
        <!-- Folder sidebar -->
        <div class="col-lg-3">
          <app-mailbox-sidebar active="Inbox" />
        </div>

        <!-- Inbox list -->
        <div class="col-lg-9">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Inbox</h3>
              <div class="card-tools">
                <div class="input-group input-group-sm" style="width: 16rem">
                  <span class="input-group-text">
                    <i class="bi bi-search" aria-hidden="true"></i>
                  </span>
                  <input
                    type="search"
                    class="form-control"
                    placeholder="Search mail…"
                    aria-label="Search mail"
                  />
                </div>
              </div>
            </div>
            <div class="card-body p-0">
              <!-- Mailbox controls -->
              <div class="d-flex align-items-center px-3 py-2 border-bottom">
                <div class="form-check mb-0">
                  <input class="form-check-input" type="checkbox" id="select-all" />
                  <label class="form-check-label visually-hidden" for="select-all">Select all</label>
                </div>
                <div class="btn-group btn-group-sm ms-3">
                  <button class="btn btn-outline-secondary" type="button" title="Refresh">
                    <i class="bi bi-arrow-clockwise" aria-hidden="true"></i>
                  </button>
                  <button class="btn btn-outline-secondary" type="button" title="Archive">
                    <i class="bi bi-archive" aria-hidden="true"></i>
                  </button>
                  <button class="btn btn-outline-secondary" type="button" title="Mark as spam">
                    <i class="bi bi-exclamation-octagon" aria-hidden="true"></i>
                  </button>
                  <button class="btn btn-outline-secondary" type="button" title="Delete">
                    <i class="bi bi-trash" aria-hidden="true"></i>
                  </button>
                </div>
                <span class="ms-auto text-secondary small">1&ndash;8 of 8</span>
              </div>

              <!-- Messages -->
              <ul class="list-group list-group-flush mb-0 mailbox-messages">
                @for (msg of messages; track msg.id) {
                  <li
                    class="list-group-item d-flex align-items-center gap-2"
                    [class.fw-semibold]="msg.unread"
                    [class.bg-body-secondary]="msg.unread"
                  >
                    <div class="form-check mb-0">
                      <input class="form-check-input" type="checkbox" [id]="msg.id" />
                      <label class="form-check-label visually-hidden" [for]="msg.id">
                        Select message from {{ msg.sender }}
                      </label>
                    </div>
                    <button
                      class="btn btn-link p-0 text-warning lh-1"
                      type="button"
                      [title]="msg.starred ? 'Starred' : 'Star'"
                      [attr.aria-label]="msg.starred ? 'Starred' : 'Star'"
                    >
                      <i class="bi" [class.bi-star-fill]="msg.starred" [class.bi-star]="!msg.starred" aria-hidden="true"></i>
                    </button>
                    <a
                      routerLink="/mailbox/read"
                      class="flex-grow-1 d-flex flex-column flex-md-row gap-md-3 text-decoration-none text-body"
                      style="min-width: 0"
                    >
                      <span class="text-truncate" style="min-width: 9rem">{{ msg.sender }}</span>
                      <span class="flex-grow-1 text-truncate" style="min-width: 0">
                        <span class="badge text-bg-{{ msg.labelTheme }} me-2">&middot;</span>
                        {{ msg.subject }}
                        <span class="fw-normal text-secondary">&nbsp;&mdash; {{ msg.preview }}</span>
                      </span>
                      <span class="d-flex align-items-center gap-2 text-secondary small text-md-end" style="min-width: 5rem">
                        @if (msg.attachment) {
                          <i class="bi bi-paperclip" title="Has attachment" aria-label="Has attachment"></i>
                        }
                        {{ msg.time }}
                      </span>
                    </a>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class MailboxInboxPage {
  readonly messages: MailMessage[] = [
    {
      id: 'msg-0',
      sender: 'Olivia Bennett',
      subject: 'Re: design system v2.4 sign-off',
      preview: 'Approved — a few small notes on the success state for forms.',
      time: '10:42 AM',
      starred: true,
      unread: true,
      labelTheme: 'primary',
      attachment: true,
    },
    {
      id: 'msg-1',
      sender: 'GitHub',
      subject: '[fullcalendar/fullcalendar] PR #6912 merged',
      preview: 'Allow custom render hooks for time grid axis labels.',
      time: '9:08 AM',
      starred: false,
      unread: true,
      labelTheme: 'secondary',
    },
    {
      id: 'msg-2',
      sender: 'Stripe',
      subject: 'Your May invoice is ready',
      preview: 'Invoice INV-2026-00428 totaling $108.31 has been issued.',
      time: '8:15 AM',
      starred: false,
      unread: true,
      labelTheme: 'success',
    },
    {
      id: 'msg-3',
      sender: 'Marcus Reyes',
      subject: 'Lunch on Thursday?',
      preview: 'Free around 1pm at the usual place. Let me know.',
      time: 'Yesterday',
      starred: true,
      unread: false,
      labelTheme: 'info',
    },
    {
      id: 'msg-4',
      sender: 'Linear',
      subject: '[ADM-441] Calendar drag-and-drop not working on Safari iOS',
      preview: 'Reproduces consistently on iOS 18.4 in Safari and Chrome.',
      time: 'Yesterday',
      starred: false,
      unread: false,
      labelTheme: 'warning',
      attachment: true,
    },
    {
      id: 'msg-5',
      sender: 'Vercel',
      subject: 'Deployment succeeded — production',
      preview: 'main@a3c91fb deployed to production in 47s.',
      time: 'May 16',
      starred: false,
      unread: false,
      labelTheme: 'success',
    },
    {
      id: 'msg-6',
      sender: 'Sara Khan',
      subject: 'Customer interview notes — Acme Corp',
      preview: 'Three big themes: onboarding friction, billing visibility, mobile.',
      time: 'May 15',
      starred: false,
      unread: false,
      labelTheme: 'primary',
      attachment: true,
    },
    {
      id: 'msg-7',
      sender: 'AWS',
      subject: 'Your monthly bill summary',
      preview: 'Total charges for April 2026: $312.94. View in console.',
      time: 'May 14',
      starred: false,
      unread: false,
      labelTheme: 'danger',
    },
  ];
}

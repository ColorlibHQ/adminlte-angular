import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

interface MailFolder {
  label: string;
  icon: string;
  route?: string;
  badge?: string;
  badgeTheme?: string;
}

interface MailLabel {
  label: string;
  color: string;
}

/**
 * Shared left column for the mailbox pages: a "Compose" button, a Folders card
 * (Inbox / Sent / Drafts / Junk / Trash with counts) and a Labels card.
 * Local to the demo `pages/` directory — intentionally not part of the library.
 */
@Component({
  selector: 'app-mailbox-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <a routerLink="/mailbox/compose" class="btn btn-primary w-100 mb-3">
      <i class="bi bi-pencil-square me-1" aria-hidden="true"></i>
      Compose
    </a>

    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Folders</h3>
      </div>
      <div class="card-body p-0">
        <ul class="nav nav-pills flex-column mb-0">
          @for (folder of folders; track folder.label) {
            <li class="nav-item">
              <a
                [routerLink]="folder.route ?? null"
                [href]="folder.route ? null : '#'"
                class="nav-link rounded-0"
                [class.active]="folder.label === active()"
                [class.d-flex]="!!folder.badge"
                [class.justify-content-between]="!!folder.badge"
              >
                <span>
                  <i class="bi {{ folder.icon }} me-2" aria-hidden="true"></i>{{ folder.label }}
                </span>
                @if (folder.badge) {
                  <span class="badge text-bg-{{ folder.badgeTheme }}">{{ folder.badge }}</span>
                }
              </a>
            </li>
          }
        </ul>
      </div>
    </div>

    <div class="card mt-3">
      <div class="card-header">
        <h3 class="card-title">Labels</h3>
      </div>
      <div class="card-body p-0">
        <ul class="nav flex-column mb-0">
          @for (label of labels; track label.label) {
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i
                  class="bi bi-circle-fill text-{{ label.color }} me-2"
                  style="font-size: 0.6rem"
                  aria-hidden="true"
                ></i>
                {{ label.label }}
              </a>
            </li>
          }
        </ul>
      </div>
    </div>
  `,
})
export class MailboxSidebarComponent {
  /** Label of the folder to mark active (e.g. "Inbox"). */
  readonly active = input<string>('Inbox');

  readonly folders: MailFolder[] = [
    { label: 'Inbox', icon: 'bi-inbox', route: '/mailbox/inbox', badge: '3', badgeTheme: 'primary' },
    { label: 'Sent', icon: 'bi-send' },
    { label: 'Drafts', icon: 'bi-file-earmark', badge: '2', badgeTheme: 'secondary' },
    { label: 'Junk', icon: 'bi-exclamation-octagon', badge: '14', badgeTheme: 'secondary' },
    { label: 'Trash', icon: 'bi-trash' },
  ];

  readonly labels: MailLabel[] = [
    { label: 'Customers', color: 'primary' },
    { label: 'Billing', color: 'success' },
    { label: 'Internal', color: 'warning' },
  ];
}

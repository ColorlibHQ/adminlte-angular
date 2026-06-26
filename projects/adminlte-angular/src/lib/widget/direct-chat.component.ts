import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { cn } from '../util/class-name';
import type { BootstrapTheme } from '../types/theme';
import type { DirectChatContact, DirectChatMessage } from '../types/widgets';

/**
 * AdminLTE direct-chat card: a scrollable message thread with a slide-in contacts
 * pane. Pass `messages`/`contacts` data, or project your own markup into the
 * `[messages]` / `[contacts]` / `[footer]` slots.
 */
@Component({
  selector: 'lte-direct-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="rootClass()">
      <div class="card-header">
        <h3 class="card-title">{{ title() }}</h3>
        <div class="card-tools">
          <button type="button" class="btn btn-tool" title="Contacts" (click)="toggleContacts()">
            <i class="bi bi-person-lines-fill"></i>
          </button>
        </div>
      </div>

      <div class="card-body">
        <div class="direct-chat-messages">
          <ng-content select="[messages]" />
          @for (msg of messages(); track $index) {
            <div class="direct-chat-msg" [class.end]="msg.isOwn">
              <div class="direct-chat-infos clearfix">
                <span class="direct-chat-name" [class.float-end]="msg.isOwn" [class.float-start]="!msg.isOwn">{{ msg.from }}</span>
                <span class="direct-chat-timestamp" [class.float-start]="msg.isOwn" [class.float-end]="!msg.isOwn">{{ msg.timestamp }}</span>
              </div>
              <img class="direct-chat-img" [src]="msg.image" [alt]="msg.from" />
              <div class="direct-chat-text">{{ msg.text }}</div>
            </div>
          }
        </div>

        <div class="direct-chat-contacts">
          <ng-content select="[contacts]" />
          @if (contacts().length) {
            <ul class="contacts-list">
              @for (c of contacts(); track $index) {
                <li>
                  <a href="#">
                    <img class="contacts-list-img" [src]="c.image" [alt]="c.name" />
                    <div class="contacts-list-info">
                      <span class="contacts-list-name">
                        {{ c.name }}
                        <small class="contacts-list-date float-end">{{ c.date }}</small>
                      </span>
                      <span class="contacts-list-msg">{{ c.preview }}</span>
                    </div>
                  </a>
                </li>
              }
            </ul>
          }
        </div>
      </div>

      @if (hasFooter()) {
        <div class="card-footer">
          <ng-content select="[footer]" />
        </div>
      }
    </div>
  `,
})
export class DirectChatComponent {
  readonly title = input<string>('');
  readonly theme = input<BootstrapTheme>('primary');
  readonly messages = input<DirectChatMessage[]>([]);
  readonly contacts = input<DirectChatContact[]>([]);
  /** Render the `[footer]` slot wrapper. */
  readonly hasFooter = input<boolean>(false);

  protected readonly contactsOpen = signal(false);

  readonly rootClass = computed(() =>
    cn(
      'card direct-chat',
      `direct-chat-${this.theme()}`,
      this.contactsOpen() && 'direct-chat-contacts-open',
    ),
  );

  toggleContacts(): void {
    this.contactsOpen.update((v) => !v);
  }
}

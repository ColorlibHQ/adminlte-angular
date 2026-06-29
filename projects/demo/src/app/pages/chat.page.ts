import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterNextRender,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppContentComponent } from '@adminlte/angular';

interface ChatContact {
  id: string;
  name: string;
  initials: string;
  theme: string;
  online: boolean;
  active: boolean;
  time: string;
  preview: string;
  unread?: number;
}

interface ChatBubble {
  from: 'me' | 'them';
  text: string;
  time: string;
}

/**
 * Chat — 1:1 replica of the core AdminLTE `pages/chat.html` page: a contacts
 * column alongside an active conversation (header, scrollable message bubbles and
 * a composer). The composer appends locally to the message list, mirroring the
 * vanilla-JS behaviour of the core page.
 */
@Component({
  selector: 'app-chat',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, FormsModule],
  template: `
    <lte-app-content
      title="Chat"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Chat' }]"
    >
      <div class="chat-app">
        <!-- Contacts -->
        <aside class="chat-contacts">
          <div class="p-3 border-bottom">
            <div class="input-group input-group-sm">
              <span class="input-group-text bg-body">
                <i class="bi bi-search" aria-hidden="true"></i>
              </span>
              <input
                type="search"
                class="form-control"
                placeholder="Search contacts…"
                aria-label="Search contacts"
              />
            </div>
          </div>
          <div class="flex-grow-1 overflow-auto">
            @for (contact of contacts; track contact.id) {
              <a href="#" class="chat-contact" [class.active]="contact.active" (click)="$event.preventDefault()">
                <span class="chat-avatar bg-{{ contact.theme }}-subtle text-{{ contact.theme }}" [class.online]="contact.online">
                  {{ contact.initials }}
                </span>
                <div class="flex-grow-1 overflow-hidden">
                  <div class="d-flex justify-content-between">
                    <p class="mb-0 text-truncate" [class.fw-semibold]="contact.unread">{{ contact.name }}</p>
                    <small class="text-secondary flex-shrink-0 ms-2">{{ contact.time }}</small>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <small class="text-truncate" [class.fw-semibold]="contact.unread" [class.text-secondary]="!contact.unread">
                      {{ contact.preview }}
                    </small>
                    @if (contact.unread) {
                      <span class="badge text-bg-primary rounded-pill ms-2">{{ contact.unread }}</span>
                    }
                  </div>
                </div>
              </a>
            }
          </div>
        </aside>

        <!-- Conversation -->
        <section class="chat-conversation">
          <header class="chat-header">
            <span class="chat-avatar bg-primary-subtle text-primary online">OB</span>
            <div class="flex-grow-1">
              <p class="mb-0 fw-semibold">Olivia Bennett</p>
              <small class="text-success">
                <i class="bi bi-circle-fill" style="font-size: 0.5rem" aria-hidden="true"></i>
                Online &middot; typing&hellip;
              </small>
            </div>
            <div class="btn-group btn-group-sm">
              <button class="btn btn-outline-secondary" type="button" title="Call">
                <i class="bi bi-telephone" aria-hidden="true"></i>
              </button>
              <button class="btn btn-outline-secondary" type="button" title="Video call">
                <i class="bi bi-camera-video" aria-hidden="true"></i>
              </button>
              <button class="btn btn-outline-secondary" type="button" title="More">
                <i class="bi bi-three-dots-vertical" aria-hidden="true"></i>
              </button>
            </div>
          </header>

          <div #messagesEl class="chat-messages">
            @for (msg of messages(); track $index) {
              <div class="chat-message" [class.me]="msg.from === 'me'" [class.them]="msg.from === 'them'">
                <div class="chat-bubble">
                  {{ msg.text }}
                  <span class="chat-time">{{ msg.time }}</span>
                </div>
              </div>
            }
          </div>

          <form class="chat-composer" (ngSubmit)="send()">
            <div class="input-group">
              <button class="btn btn-outline-secondary" type="button" title="Attach">
                <i class="bi bi-paperclip" aria-hidden="true"></i>
              </button>
              <input
                type="text"
                class="form-control"
                placeholder="Type a message…"
                aria-label="Type a message"
                [(ngModel)]="draft"
                name="draft"
              />
              <button class="btn btn-outline-secondary" type="button" title="Emoji">
                <i class="bi bi-emoji-smile" aria-hidden="true"></i>
              </button>
              <button class="btn btn-primary" type="submit">
                <i class="bi bi-send" aria-hidden="true"></i>
              </button>
            </div>
          </form>
        </section>
      </div>
    </lte-app-content>
  `,
  styles: `
    .chat-app {
      display: grid;
      grid-template-columns: 320px 1fr;
      gap: 0;
      height: calc(100vh - 14rem);
      min-height: 32rem;
      border-radius: var(--bs-border-radius);
      overflow: hidden;
      background: var(--bs-body-bg);
      border: 1px solid var(--bs-border-color);
    }
    @media (max-width: 768px) {
      .chat-app {
        grid-template-columns: 1fr;
      }
      .chat-app .chat-contacts {
        display: none;
      }
    }
    .chat-contacts {
      background: var(--bs-tertiary-bg);
      border-right: 1px solid var(--bs-border-color);
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .chat-contact {
      display: flex;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      cursor: pointer;
      border-bottom: 1px solid var(--bs-border-color);
      text-decoration: none;
      color: inherit;
    }
    .chat-contact:hover {
      background: var(--bs-body-bg);
    }
    .chat-contact.active {
      background: var(--bs-body-bg);
      border-left: 3px solid var(--bs-primary);
      padding-left: calc(1rem - 3px);
    }
    .chat-avatar {
      position: relative;
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.8rem;
    }
    .chat-avatar.online::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      background: var(--bs-success);
      border: 2px solid var(--bs-body-bg);
      border-radius: 50%;
    }
    .chat-conversation {
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .chat-header {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--bs-border-color);
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
      background: var(--bs-tertiary-bg);
    }
    .chat-message {
      display: flex;
      margin-bottom: 0.75rem;
    }
    .chat-message.me {
      justify-content: flex-end;
    }
    .chat-bubble {
      max-width: 70%;
      padding: 0.5rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.9rem;
      line-height: 1.4;
    }
    .chat-message.them .chat-bubble {
      background: var(--bs-body-bg);
      border: 1px solid var(--bs-border-color);
      border-bottom-left-radius: 0.25rem;
    }
    .chat-message.me .chat-bubble {
      background: var(--bs-primary);
      color: #fff;
      border-bottom-right-radius: 0.25rem;
    }
    .chat-time {
      font-size: 0.7rem;
      opacity: 0.7;
      display: block;
      margin-top: 0.15rem;
    }
    .chat-composer {
      padding: 0.75rem;
      border-top: 1px solid var(--bs-border-color);
    }
  `,
})
export class ChatPage {
  private readonly messagesEl = viewChild.required<ElementRef<HTMLDivElement>>('messagesEl');

  readonly draft = signal('');

  readonly contacts: ChatContact[] = [
    {
      id: 'ob',
      name: 'Olivia Bennett',
      initials: 'OB',
      theme: 'primary',
      online: true,
      active: true,
      time: '2m',
      preview: 'Approved — a few small notes…',
      unread: 2,
    },
    { id: 'mr', name: 'Marcus Reyes', initials: 'MR', theme: 'success', online: true, active: false, time: '1h', preview: 'Lunch Thursday?' },
    { id: 'sk', name: 'Sara Khan', initials: 'SK', theme: 'info', online: false, active: false, time: '3h', preview: 'Customer interview notes are up.' },
    {
      id: 'ds',
      name: 'Diego Smania',
      initials: 'DS',
      theme: 'warning',
      online: false,
      active: false,
      time: 'Yesterday',
      preview: 'PR is ready for review.',
      unread: 1,
    },
    { id: 'ed', name: 'Emma Dawson', initials: 'ED', theme: 'danger', online: false, active: false, time: 'Yesterday', preview: 'Heading out, see you Mon.' },
    { id: 'lc', name: 'Liam Carter', initials: 'LC', theme: 'primary', online: true, active: false, time: 'May 16', preview: 'Pushed the calendar fix.' },
    { id: 'af', name: 'Ava Foster', initials: 'AF', theme: 'secondary', online: false, active: false, time: 'May 15', preview: 'Adding you to the design crit.' },
  ];

  readonly messages = signal<ChatBubble[]>([
    { from: 'them', text: 'Hey Jane! Did you get a chance to look at the v2.4 candidate?', time: '10:38 AM' },
    { from: 'me', text: 'Just finished going through it. Overall really solid — the new motion primitives are great.', time: '10:40 AM' },
    { from: 'them', text: 'Glad you like them. Any concerns?', time: '10:40 AM' },
    {
      from: 'me',
      text: 'Two small things: the success state on form inputs feels light, and the focus ring is barely visible on dark theme.',
      time: '10:41 AM',
    },
    {
      from: 'them',
      text: 'Yeah, that focus ring issue has been bugging me too. I’ll bump the contrast and ping you for another look.',
      time: '10:42 AM',
    },
    { from: 'me', text: 'Sounds good. Otherwise, ship it!', time: '10:42 AM' },
  ]);

  constructor() {
    // Pin the message list to the latest message on first paint.
    afterNextRender(() => this.scrollToBottom());
  }

  send(): void {
    const text = this.draft().trim();
    if (!text) return;
    this.messages.update((list) => [...list, { from: 'me', text, time: this.now() }]);
    this.draft.set('');
    queueMicrotask(() => this.scrollToBottom());
  }

  private scrollToBottom(): void {
    const el = this.messagesEl().nativeElement;
    el.scrollTop = el.scrollHeight;
  }

  private now(): string {
    return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  }
}

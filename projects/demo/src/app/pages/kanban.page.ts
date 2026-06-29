import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { AppContentComponent } from '@adminlte/angular';

interface KanbanCard {
  label?: string;
  labelTheme?: string;
  title: string;
  description?: string;
  assignees: string[];
  due?: string;
}

interface KanbanLane {
  id: string;
  title: string;
  countTheme: string;
  cards: KanbanCard[];
}

interface SortableInstance {
  destroy: () => void;
}

/**
 * Kanban — a 1:1 replica of the core AdminLTE 4 `pages/kanban.html`. A responsive
 * grid of lanes (Backlog / To do / In progress / Done), each a card list whose
 * items can be dragged within and between lanes via SortableJS (one shared
 * `group`). Lane count badges update after every drop, and an "Add card" button
 * per lane appends a new card.
 *
 * SortableJS is loaded with a dynamic import inside {@link afterNextRender} so
 * SSR/prerender never touches the browser-only library, and init is wrapped in
 * try/catch so a failed load leaves a static (non-draggable) board.
 */
@Component({
  selector: 'app-kanban',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent],
  styles: `
    .kanban-board {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1rem;
      align-items: start;
    }
    .kanban-lane {
      background: var(--bs-tertiary-bg);
      border-radius: var(--bs-border-radius);
      padding: 0.75rem;
      min-height: 8rem;
    }
    .kanban-lane-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.75rem;
      padding: 0 0.25rem;
    }
    .kanban-cards {
      min-height: 4rem;
    }
    .kanban-card {
      background: var(--bs-body-bg);
      border: 1px solid var(--bs-border-color);
      border-radius: var(--bs-border-radius);
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      cursor: grab;
      transition: box-shadow 0.15s ease;
    }
    .kanban-card:hover {
      box-shadow: var(--bs-box-shadow-sm);
    }
    .kanban-card.sortable-ghost {
      opacity: 0.4;
      background: var(--bs-primary-bg-subtle);
      border-style: dashed;
    }
    .kanban-card.sortable-drag {
      cursor: grabbing;
      box-shadow: var(--bs-box-shadow);
      transform: rotate(2deg);
    }
    .kanban-assignees {
      display: inline-flex;
    }
    .kanban-assignee {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 50%;
      background: var(--bs-secondary-bg);
      color: var(--bs-secondary-color);
      font-size: 0.7rem;
      font-weight: 600;
      border: 2px solid var(--bs-body-bg);
      margin-left: -0.5rem;
    }
    .kanban-assignee:first-child {
      margin-left: 0;
    }
    .kanban-add-card {
      background: transparent;
      border: 1px dashed var(--bs-border-color);
      color: var(--bs-secondary-color);
      width: 100%;
      padding: 0.5rem;
      border-radius: var(--bs-border-radius);
      font-size: 0.875rem;
    }
    .kanban-add-card:hover {
      background: var(--bs-body-bg);
      color: var(--bs-body-color);
    }
  `,
  template: `
    <lte-app-content
      title="Kanban Board"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Kanban' }]"
    >
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <p class="text-secondary mb-0 small">
            Drag cards between lanes. Try dropping &ldquo;In progress&rdquo; items into
            &ldquo;Done&rdquo;.
          </p>
        </div>
        <div class="btn-group btn-group-sm">
          <button class="btn btn-outline-secondary" type="button">
            <i class="bi bi-funnel me-1" aria-hidden="true"></i>Filter
          </button>
          <button class="btn btn-outline-secondary" type="button">
            <i class="bi bi-sort-down me-1" aria-hidden="true"></i>Sort
          </button>
          <button class="btn btn-primary" type="button">
            <i class="bi bi-plus-lg me-1" aria-hidden="true"></i>Add lane
          </button>
        </div>
      </div>

      <div class="kanban-board">
        @for (lane of lanes(); track lane.id) {
          <div class="kanban-lane" [attr.data-lane-id]="lane.id">
            <div class="kanban-lane-header">
              <h2 class="h6 mb-0 d-flex align-items-center gap-2">
                <span class="badge text-bg-{{ lane.countTheme }}" style="font-size: 0.65rem">
                  {{ lane.cards.length }}
                </span>
                {{ lane.title }}
              </h2>
              <button
                class="btn btn-sm btn-link text-secondary p-0"
                type="button"
                title="Lane actions"
                aria-label="Lane actions"
              >
                <i class="bi bi-three-dots" aria-hidden="true"></i>
              </button>
            </div>
            <div class="kanban-cards" [attr.data-lane-id]="lane.id">
              @for (card of lane.cards; track $index) {
                <article class="kanban-card">
                  @if (card.label) {
                    <span class="badge text-bg-{{ card.labelTheme }} mb-2">{{ card.label }}</span>
                  }
                  <p class="fw-semibold mb-1 small">{{ card.title }}</p>
                  @if (card.description) {
                    <p class="text-secondary small mb-2">{{ card.description }}</p>
                  }
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="kanban-assignees">
                      @for (assignee of card.assignees; track $index) {
                        <span class="kanban-assignee" [title]="assignee">{{ assignee }}</span>
                      }
                    </div>
                    @if (card.due) {
                      <small class="text-secondary">
                        <i class="bi bi-calendar-event me-1" aria-hidden="true"></i>
                        {{ card.due }}
                      </small>
                    }
                  </div>
                </article>
              }
            </div>
            <button
              class="kanban-add-card mt-2"
              type="button"
              (click)="addCard(lane.id)"
            >
              <i class="bi bi-plus-lg me-1" aria-hidden="true"></i>
              Add card
            </button>
          </div>
        }
      </div>
    </lte-app-content>
  `,
})
export class KanbanPage {
  private readonly sortables: SortableInstance[] = [];

  readonly lanes = signal<KanbanLane[]>([
    {
      id: 'backlog',
      title: 'Backlog',
      countTheme: 'secondary',
      cards: [
        {
          label: 'tech debt',
          labelTheme: 'secondary',
          title: 'Audit unused SCSS variables',
          description: 'Identify deprecated Bootstrap 5.3.4 variables and add comments.',
          assignees: ['DM'],
        },
        { label: 'docs', labelTheme: 'info', title: 'Document hreflang setup', assignees: ['JD'] },
        {
          label: 'bug',
          labelTheme: 'danger',
          title: 'Investigate Safari iOS calendar drag bug',
          assignees: ['OB', 'MK'],
          due: 'May 28',
        },
      ],
    },
    {
      id: 'todo',
      title: 'To do',
      countTheme: 'primary',
      cards: [
        {
          label: 'feature',
          labelTheme: 'primary',
          title: 'Add Tom Select recommended-integration doc',
          description: 'Cover install, theming, single + multi select examples.',
          assignees: ['JD'],
          due: 'May 24',
        },
        {
          label: 'feature',
          labelTheme: 'primary',
          title: 'Wire up profile page avatar upload',
          assignees: ['EM'],
        },
      ],
    },
    {
      id: 'in-progress',
      title: 'In progress',
      countTheme: 'warning',
      cards: [
        {
          label: 'feature',
          labelTheme: 'primary',
          title: 'Build kanban board demo',
          description: 'SortableJS, draggable between lanes, MIT license.',
          assignees: ['JD'],
          due: 'Today',
        },
        {
          label: 'qa',
          labelTheme: 'warning',
          title: 'Tabulator + FullCalendar integration QA',
          assignees: ['OB'],
        },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      countTheme: 'success',
      cards: [
        {
          label: 'feature',
          labelTheme: 'primary',
          title: 'Upgrade to Bootstrap 5.3.8',
          assignees: ['DM'],
        },
        {
          label: 'feature',
          labelTheme: 'primary',
          title: 'Ship 8 Tier-1 page templates',
          description: 'Profile, settings, invoice, pricing, FAQ, 404/500/maintenance.',
          assignees: ['JD', 'OB'],
        },
        {
          label: 'tech debt',
          labelTheme: 'secondary',
          title: 'Drop dead eslint-config-xo deps',
          assignees: ['DM'],
        },
      ],
    },
  ]);

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      for (const s of this.sortables) s.destroy();
      this.sortables.length = 0;
    });

    afterNextRender(async () => {
      try {
        const Sortable = (await import('sortablejs')).default;
        const lists = document.querySelectorAll<HTMLElement>('.kanban-cards');
        for (const el of lists) {
          this.sortables.push(
            new Sortable(el, {
              group: 'kanban',
              animation: 150,
              ghostClass: 'sortable-ghost',
              dragClass: 'sortable-drag',
              onEnd: (evt) => this.syncLanes(evt.from, evt.to),
            }) as unknown as SortableInstance,
          );
        }
      } catch {
        // SortableJS is optional progressive enhancement; without it the board
        // renders as a static (non-draggable) set of lanes.
      }
    });
  }

  /** Append a new card to a lane in response to the "Add card" button. */
  addCard(laneId: string): void {
    const title = prompt('Card title:');
    if (!title) return;
    this.lanes.update((lanes) =>
      lanes.map((lane) =>
        lane.id === laneId
          ? {
              ...lane,
              cards: [...lane.cards, { title, assignees: ['YO'], due: 'just now' }],
            }
          : lane,
      ),
    );
  }

  /**
   * After a drag, read the resulting card order straight from the DOM (Sortable
   * mutated it imperatively) and write it back into the lane signals so the count
   * badges and Angular's model stay in sync.
   */
  private syncLanes(from: HTMLElement, to: HTMLElement): void {
    const titlesFor = (el: HTMLElement): string[] =>
      [...el.querySelectorAll<HTMLElement>('.kanban-card .fw-semibold')].map(
        (n) => n.textContent?.trim() ?? '',
      );

    const fromId = from.dataset['laneId'];
    const toId = to.dataset['laneId'];

    // Snapshot current card objects keyed by title so we can reorder/move them.
    const byTitle = new Map<string, KanbanCard>();
    for (const lane of this.lanes()) {
      for (const card of lane.cards) byTitle.set(card.title, card);
    }

    const desired = new Map<string, string[]>();
    desired.set(fromId ?? '', titlesFor(from));
    if (fromId !== toId) desired.set(toId ?? '', titlesFor(to));

    this.lanes.update((lanes) =>
      lanes.map((lane) => {
        const order = desired.get(lane.id);
        if (!order) return lane;
        return {
          ...lane,
          cards: order.map((title) => byTitle.get(title)).filter((c): c is KanbanCard => !!c),
        };
      }),
    );
  }
}

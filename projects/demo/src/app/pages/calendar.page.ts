import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { AppContentComponent, CardComponent } from '@adminlte/angular';

interface DraggableEvent {
  title: string;
  color: string;
  theme: string;
}

// FullCalendar's `Calendar` instance is typed by the lib, but we keep a loose
// local shape so this file does not have to import its types eagerly.
interface CalendarInstance {
  render: () => void;
  destroy: () => void;
  addEvent: (event: Record<string, unknown>) => void;
}

/**
 * Calendar — a 1:1 replica of the core AdminLTE 4 `pages/calendar.html`: a left
 * "Draggable events" card whose chips can be dragged onto the calendar, plus a
 * main card holding a FullCalendar 6 month/week/day/list view. Clicking a date
 * prompts to add an event; clicking an event prompts to remove it.
 *
 * FullCalendar (core + dayGrid/timeGrid/list/interaction plugins) is loaded with
 * dynamic imports inside {@link afterNextRender} so SSR/prerender never touches
 * the browser-only library, and the whole init is wrapped in try/catch so a
 * failed load degrades to an empty card instead of breaking the page.
 */
@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, CardComponent],
  styles: `
    .fc-event {
      cursor: pointer;
    }
    .draggable-event {
      cursor: grab;
      user-select: none;
    }
  `,
  template: `
    <lte-app-content
      title="Calendar"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Calendar' }]"
    >
      <div class="row g-3">
        <!-- Sidebar: draggable events -->
        <div class="col-lg-3">
          <lte-card title="Draggable events">
            <p class="text-secondary small mb-3">Drag an event to the calendar to schedule it.</p>
            <div #external id="external-events">
              @for (event of draggableEvents; track event.title) {
                <div
                  class="draggable-event badge text-bg-{{ event.theme }} p-2 mb-2 d-block text-start"
                  [attr.data-color]="event.color"
                >
                  <i class="bi bi-grip-vertical me-1" aria-hidden="true"></i>
                  {{ event.title }}
                </div>
              }
            </div>
            <hr />
            <div class="form-check form-switch">
              <input
                #removeAfterDrop
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="remove-after-drop"
              />
              <label class="form-check-label small" for="remove-after-drop">
                Remove from list after dropping
              </label>
            </div>
          </lte-card>
        </div>

        <!-- Calendar -->
        <div class="col-lg-9">
          <lte-card [hasFooter]="true">
            <div #calendar id="calendar"></div>
            <div footer class="text-secondary small">
              Powered by
              <a href="https://fullcalendar.io/" target="_blank" rel="noopener">FullCalendar 6</a>
              &mdash; MIT licensed, jQuery-free.
            </div>
          </lte-card>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class CalendarPage {
  private readonly calendarEl = viewChild.required<ElementRef<HTMLDivElement>>('calendar');
  private readonly externalEl = viewChild.required<ElementRef<HTMLDivElement>>('external');
  private readonly removeAfterDropEl =
    viewChild.required<ElementRef<HTMLInputElement>>('removeAfterDrop');

  private calendar: CalendarInstance | null = null;

  readonly draggableEvents: DraggableEvent[] = [
    { title: 'Team standup', color: '#0d6efd', theme: 'primary' },
    { title: 'Customer call', color: '#198754', theme: 'success' },
    { title: 'Design review', color: '#ffc107', theme: 'warning' },
    { title: '1:1 with manager', color: '#0dcaf0', theme: 'info' },
    { title: 'Release window', color: '#dc3545', theme: 'danger' },
  ];

  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.calendar?.destroy();
      this.calendar = null;
    });

    afterNextRender(async () => {
      try {
        const { Calendar, Draggable } = await this.loadFullCalendar();

        const externalEl = this.externalEl().nativeElement;
        const removeAfterDrop = this.removeAfterDropEl().nativeElement;

        // eslint-disable-next-line no-new -- Draggable registers its own listeners.
        new Draggable(externalEl, {
          itemSelector: '.draggable-event',
          eventData: (el: HTMLElement) => ({
            title: el.textContent?.trim() ?? '',
            backgroundColor: el.dataset['color'],
            borderColor: el.dataset['color'],
          }),
        });

        const calendar: CalendarInstance = new Calendar(this.calendarEl().nativeElement, {
          plugins: await this.loadPlugins(),
          initialView: 'dayGridMonth',
          headerToolbar: {
            start: 'prev,next today',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
          },
          height: 700,
          editable: true,
          droppable: true,
          dayMaxEvents: 3,
          drop: (info: { draggedEl: HTMLElement }) => {
            if (removeAfterDrop.checked) info.draggedEl.remove();
          },
          dateClick: (info: { dateStr: string; allDay: boolean }) => {
            const title = prompt('Event title:');
            if (title) calendar.addEvent({ title, start: info.dateStr, allDay: info.allDay });
          },
          eventClick: (info: { event: { title: string; remove: () => void } }) => {
            if (confirm(`Delete "${info.event.title}"?`)) info.event.remove();
          },
          events: this.seedEvents(),
        });

        calendar.render();
        this.calendar = calendar;
      } catch {
        // FullCalendar is optional progressive enhancement; if it fails to load
        // we simply leave an empty card rather than break the page.
      }
    });
  }

  /** Lazily import the FullCalendar core (browser only). */
  private async loadFullCalendar() {
    const core = await import('@fullcalendar/core');
    const interaction = (await import('@fullcalendar/interaction')) as unknown as {
      Draggable: new (el: HTMLElement, opts: Record<string, unknown>) => unknown;
    };
    return {
      Calendar: core.Calendar as unknown as new (
        el: HTMLElement,
        opts: Record<string, unknown>,
      ) => CalendarInstance,
      Draggable: interaction.Draggable,
    };
  }

  /** Lazily import the view + interaction plugins. */
  private async loadPlugins(): Promise<unknown[]> {
    const [dayGrid, timeGrid, list, interaction] = await Promise.all([
      import('@fullcalendar/daygrid'),
      import('@fullcalendar/timegrid'),
      import('@fullcalendar/list'),
      import('@fullcalendar/interaction'),
    ]);
    return [dayGrid.default, timeGrid.default, list.default, interaction.default];
  }

  /** Seed events anchored around today so the demo always shows something. */
  private seedEvents(): Array<Record<string, unknown>> {
    const today = new Date();
    const offsetDay = (n: number): string => {
      const d = new Date(today);
      d.setDate(today.getDate() + n);
      return d.toISOString().slice(0, 10);
    };

    return [
      { title: 'Quarterly planning', start: offsetDay(-2), backgroundColor: '#0d6efd', borderColor: '#0d6efd' },
      { title: 'Onboarding session', start: offsetDay(1), backgroundColor: '#198754', borderColor: '#198754' },
      { title: 'Design review', start: offsetDay(3), end: offsetDay(4), backgroundColor: '#ffc107', borderColor: '#ffc107', textColor: '#000' },
      { title: 'Release v2.5', start: offsetDay(7), backgroundColor: '#dc3545', borderColor: '#dc3545' },
      { title: 'All-hands', start: offsetDay(10), backgroundColor: '#6f42c1', borderColor: '#6f42c1' },
    ];
  }
}

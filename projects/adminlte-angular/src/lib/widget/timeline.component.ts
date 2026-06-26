import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { biClass } from '../util/class-name';
import type { TimelineItem } from '../types/widgets';

/**
 * Vertical timeline of events. `body`/`footer` accept HTML strings, rendered via
 * `[innerHTML]` (Angular sanitizes them before insertion).
 */
@Component({
  selector: 'lte-timeline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="timeline">
      @for (item of items(); track $index) {
        <div>
          <i class="bi {{ icon(item.icon) }} bg-{{ item.iconTheme || 'primary' }}" aria-hidden="true"></i>
          <div class="timeline-item">
            <span class="time"><i class="bi bi-clock"></i> {{ item.time }}</span>
            <h3 class="timeline-header">
              @if (item.url) {
                <a [href]="item.url">{{ item.title }}</a>
              } @else {
                {{ item.title }}
              }
            </h3>
            @if (item.body) {
              <div class="timeline-body" [innerHTML]="item.body"></div>
            }
            @if (item.footer) {
              <div class="timeline-footer" [innerHTML]="item.footer"></div>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class TimelineComponent {
  readonly items = input.required<TimelineItem[]>();

  icon(value: string | undefined): string {
    return biClass(value || 'bi-circle-fill');
  }
}

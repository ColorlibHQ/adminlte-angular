import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AppContentComponent, TimelineComponent, type TimelineItem } from '@adminlte/angular';

/**
 * Timeline — port of `UI/timeline.html`. The core page groups events under dated
 * `.time-label` separators. We reproduce that structure with plain `.time-label`
 * markup, and render each group's events through the library's
 * {@link TimelineComponent} (`<lte-timeline>`), whose `body`/`footer` fields
 * accept (Angular-sanitized) HTML strings.
 */
@Component({
  selector: 'app-ui-timeline',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, TimelineComponent],
  template: `
    <lte-app-content
      title="Timeline"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Timeline' }]"
    >
      <div class="row">
        <div class="col-md-12">
          <div class="timeline">
            <!--begin::Time Label-->
            <div class="time-label">
              <span class="text-bg-danger">10 Feb. 2023</span>
            </div>
            <!--end::Time Label-->
          </div>

          <lte-timeline [items]="firstGroup" />

          <div class="timeline">
            <!--begin::Time Label-->
            <div class="time-label">
              <span class="text-bg-success">3 Jan. 2023</span>
            </div>
            <!--end::Time Label-->
          </div>

          <lte-timeline [items]="secondGroup" />

          <div class="timeline">
            <div>
              <i class="timeline-icon bi bi-clock-fill text-bg-secondary"></i>
            </div>
          </div>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class UiTimelinePage {
  readonly firstGroup: TimelineItem[] = [
    {
      icon: 'bi-envelope',
      iconTheme: 'primary',
      time: '12:05',
      title: 'Support Team sent you an email',
      body:
        'Etsy doostang zoodles disqus groupon greplin oooj voxy zoodles, weebly ning heekya ' +
        'handango imeem plugg dopplr jibjab, movity jajah plickers sifteo edmodo ifttt zimbra. ' +
        'Babblely odeo kaboodle quora plaxo ideeli hulu weebly balihoo...',
      footer:
        '<a class="btn btn-primary btn-sm me-1">Read more</a>' +
        '<a class="btn btn-danger btn-sm">Delete</a>',
    },
    {
      icon: 'bi-person',
      iconTheme: 'success',
      time: '5 mins ago',
      title: 'Sarah Young accepted your friend request',
    },
    {
      icon: 'bi-chat-text-fill',
      iconTheme: 'warning',
      time: '27 mins ago',
      title: 'Jay White commented on your post',
      body:
        'Take me to your leader! Switzerland is small and neutral! We are more like Germany, ' +
        'ambitious and misunderstood!',
      footer: '<a class="btn btn-warning btn-sm">View comment</a>',
    },
  ];

  readonly secondGroup: TimelineItem[] = [
    {
      icon: 'bi-camera',
      iconTheme: 'primary',
      time: '2 days ago',
      title: 'Mina Lee uploaded new photos',
      body:
        '<img src="https://www.gravatar.com/avatar/?d=mp&s=128" alt="..." class="me-1" />' +
        '<img src="https://www.gravatar.com/avatar/?d=mp&s=128" alt="..." class="me-1" />' +
        '<img src="https://www.gravatar.com/avatar/?d=mp&s=128" alt="..." class="me-1" />' +
        '<img src="https://www.gravatar.com/avatar/?d=mp&s=128" alt="..." />',
    },
    {
      icon: 'bi-camera-film',
      iconTheme: 'info',
      time: '5 days ago',
      title: 'Mr. Doe shared a video',
      body:
        '<div class="ratio ratio-16x9">' +
        '<iframe src="https://www.youtube.com/embed/tMWkeBIohBs" allowfullscreen></iframe>' +
        '</div>',
      footer: '<a href="#" class="btn btn-sm text-bg-warning">See comments</a>',
    },
  ];
}

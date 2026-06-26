import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { ProfileStat } from '../types/widgets';

/**
 * User profile card: avatar, name, role, optional cover image and a list of
 * stats. Project extra content (e.g. a "Follow" button) into the default slot.
 */
@Component({
  selector: 'lte-profile-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card card-primary card-outline">
      <div class="card-body box-profile">
        @if (coverImage()) {
          <div class="rounded-top mb-3" [style.height.px]="120" [style.background]="'center/cover url(' + coverImage() + ')'"></div>
        }
        <div class="text-center">
          <img
            [src]="image()"
            [alt]="name()"
            class="profile-user-img img-fluid img-circle rounded-circle shadow"
            width="100"
            height="100"
          />
        </div>
        <h3 class="profile-username text-center">{{ name() }}</h3>
        @if (role()) {
          <p class="text-body-secondary text-center">{{ role() }}</p>
        }
        @if (stats().length) {
          <ul class="list-group list-group-unbordered mb-3">
            @for (stat of stats(); track $index) {
              <li class="list-group-item">
                <b>{{ stat.label }}</b> <span class="float-end">{{ stat.value }}</span>
              </li>
            }
          </ul>
        }
        <ng-content />
      </div>
    </div>
  `,
})
export class ProfileCardComponent {
  readonly name = input.required<string>();
  readonly image = input.required<string>();
  readonly role = input<string>();
  readonly coverImage = input<string>();
  readonly stats = input<ProfileStat[]>([]);
}

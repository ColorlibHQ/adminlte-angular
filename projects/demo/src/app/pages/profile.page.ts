import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AppContentComponent,
  CardComponent,
  ProfileCardComponent,
  TabsComponent,
  TabComponent,
} from '@adminlte/angular';

/** User profile page — profile card + about panel + activity/timeline/settings tabs. */
@Component({
  selector: 'app-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, CardComponent, ProfileCardComponent, TabsComponent, TabComponent],
  template: `
    <lte-app-content title="Profile" [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Profile' }]">
      <div class="row">
        <div class="col-md-3">
          <lte-profile-card
            name="Nina Mcintire"
            role="Software Engineer"
            image="https://www.gravatar.com/avatar/?d=mp&s=160"
            [stats]="stats"
          />

          <lte-card title="About Me" icon="bi-person-vcard">
            <strong><i class="bi bi-book me-1"></i> Education</strong>
            <p class="text-body-secondary">B.S. in Computer Science from the University of Tennessee</p>
            <hr />
            <strong><i class="bi bi-geo-alt me-1"></i> Location</strong>
            <p class="text-body-secondary">Malibu, California</p>
            <hr />
            <strong><i class="bi bi-pencil me-1"></i> Skills</strong>
            <p class="mb-0">
              <span class="badge text-bg-secondary me-1">UI Design</span>
              <span class="badge text-bg-secondary me-1">Angular</span>
              <span class="badge text-bg-secondary me-1">TypeScript</span>
              <span class="badge text-bg-secondary">CSS</span>
            </p>
          </lte-card>
        </div>

        <div class="col-md-9">
          <lte-card>
            <lte-tabs active="activity">
              <lte-tab tabId="activity" title="Activity">
                @for (post of activity; track post.id) {
                  <div class="d-flex mb-4">
                    <img
                      class="rounded-circle me-3"
                      src="https://www.gravatar.com/avatar/?d=mp&s=48"
                      alt=""
                      width="48"
                      height="48"
                    />
                    <div>
                      <h6 class="mb-0">{{ post.name }} <small class="text-body-secondary fw-normal">— {{ post.time }}</small></h6>
                      <p class="mb-0">{{ post.text }}</p>
                    </div>
                  </div>
                }
              </lte-tab>

              <lte-tab tabId="timeline" title="Timeline">
                <ul class="list-group list-group-flush">
                  @for (post of activity; track post.id) {
                    <li class="list-group-item d-flex justify-content-between">
                      <span><i class="bi bi-clock me-2 text-body-secondary"></i>{{ post.text }}</span>
                      <small class="text-body-secondary">{{ post.time }}</small>
                    </li>
                  }
                </ul>
              </lte-tab>

              <lte-tab tabId="settings" title="Settings">
                <form class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" value="Nina Mcintire" />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" value="nina@example.com" />
                  </div>
                  <div class="col-12">
                    <label class="form-label">Bio</label>
                    <textarea class="form-control" rows="3">Software engineer who loves building admin tools.</textarea>
                  </div>
                  <div class="col-12">
                    <button type="submit" class="btn btn-primary"><i class="bi bi-check2 me-1"></i>Save changes</button>
                  </div>
                </form>
              </lte-tab>
            </lte-tabs>
          </lte-card>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class ProfilePage {
  readonly stats = [
    { label: 'Followers', value: '1,322' },
    { label: 'Following', value: '543' },
    { label: 'Friends', value: '13,287' },
  ];

  readonly activity = [
    { id: 1, name: 'Jonathan Burke Jr.', time: '5 mins ago', text: 'Shipped the new dashboard widgets to production.' },
    { id: 2, name: 'Sarah Ross', time: '27 mins ago', text: 'Reviewed the Q3 design system updates.' },
    { id: 3, name: 'Adam Jones', time: '2 hours ago', text: 'Closed 6 issues in the component library.' },
  ];
}

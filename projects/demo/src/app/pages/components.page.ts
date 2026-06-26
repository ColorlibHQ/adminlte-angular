import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  AppContentComponent,
  CardComponent,
  ProgressGroupComponent,
  RatingsComponent,
  DirectChatComponent,
  TabsComponent,
  TabComponent,
  AccordionComponent,
  AccordionItemComponent,
  DatatableComponent,
  InputFlatpickrComponent,
  InputTomSelectComponent,
  type DirectChatMessage,
  type DirectChatContact,
  type DatatableColumn,
  type TomSelectOption,
} from '@adminlte/angular';

/**
 * Showcases the stretch-set components added for parity with the Vue/React ports:
 * progress groups, ratings, a direct-chat card, tabs, an accordion, plugin-backed
 * form inputs (flatpickr, Tom Select) and a sortable datatable.
 */
@Component({
  selector: 'app-components',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AppContentComponent,
    CardComponent,
    ProgressGroupComponent,
    RatingsComponent,
    DirectChatComponent,
    TabsComponent,
    TabComponent,
    AccordionComponent,
    AccordionItemComponent,
    DatatableComponent,
    InputFlatpickrComponent,
    InputTomSelectComponent,
  ],
  template: `
    <lte-app-content title="Components" [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'Components' }]">
      <div class="row">
        <div class="col-lg-4">
          <lte-card title="Progress groups" icon="bi-bar-chart-steps">
            <lte-progress-group label="Add Products to Cart" [value]="160" [max]="200" theme="primary" />
            <lte-progress-group label="Complete Purchase" [value]="310" [max]="400" theme="danger" />
            <lte-progress-group label="Visit Premium Page" [value]="480" [max]="800" theme="success" />
            <lte-progress-group label="Send Inquiries" [value]="250" [max]="500" theme="warning" />
          </lte-card>

          <lte-card title="Ratings" icon="bi-star">
            <p class="mb-1"><lte-ratings [value]="5" [showText]="true" /></p>
            <p class="mb-1"><lte-ratings [value]="3.5" [showText]="true" /></p>
            <p class="mb-0"><lte-ratings [value]="2" theme="info" [showText]="true" /></p>
          </lte-card>
        </div>

        <div class="col-lg-4">
          <lte-direct-chat title="Chat" theme="primary" [messages]="chatMessages" [contacts]="chatContacts" />
        </div>

        <div class="col-lg-4">
          <lte-card title="Tabs" icon="bi-segmented-nav">
            <lte-tabs [(active)]="activeTab">
              <lte-tab tabId="home" title="Home" icon="bi-house">
                <p>This is the <b>home</b> tab. Active id: <code>{{ activeTab() }}</code>.</p>
              </lte-tab>
              <lte-tab tabId="profile" title="Profile" icon="bi-person">
                <p>The <b>profile</b> tab content.</p>
              </lte-tab>
              <lte-tab tabId="disabled" title="Disabled" [disabled]="true">
                <p>You should not be able to see this.</p>
              </lte-tab>
            </lte-tabs>
          </lte-card>

          <lte-card title="Accordion" icon="bi-list-nested">
            <lte-accordion [(active)]="openAccordion">
              <lte-accordion-item itemId="a1" title="What is AdminLTE?" [defaultOpen]="true">
                A free, open-source admin dashboard template built on Bootstrap.
              </lte-accordion-item>
              <lte-accordion-item itemId="a2" title="Is the Angular port signal-first?">
                Yes — it uses <code>input()</code>, <code>output()</code> and <code>model()</code> throughout.
              </lte-accordion-item>
              <lte-accordion-item itemId="a3" title="Does it need jQuery?">
                No. The components are standalone and jQuery-free.
              </lte-accordion-item>
            </lte-accordion>
          </lte-card>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-6">
          <lte-card title="Plugin form inputs" icon="bi-input-cursor-text">
            <lte-input-flatpickr label="Pick a date" placeholder="Select a date…" [(value)]="date" />
            <lte-input-tom-select label="Favourite frameworks" [multiple]="true" [options]="frameworkOptions" [(value)]="frameworks" />
            <p class="mb-0 text-secondary">
              Date: <code>{{ date() || '—' }}</code> · Frameworks: <code>{{ frameworksLabel() }}</code>
            </p>
          </lte-card>
        </div>

        <div class="col-lg-6">
          <lte-card title="Datatable" icon="bi-table">
            <lte-datatable [columns]="columns" [data]="rows" />
          </lte-card>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class ComponentsPage {
  readonly activeTab = signal('home');
  readonly openAccordion = signal<string | string[]>('');
  readonly date = signal('');
  readonly frameworks = signal<string | string[]>([]);

  readonly chatMessages: DirectChatMessage[] = [
    { from: 'Alexander Pierce', image: 'https://www.gravatar.com/avatar/?d=mp&s=50', timestamp: '23 Jan 2:00 pm', text: 'Is this template really for free? That’s unbelievable!' },
    { from: 'Sarah Bullock', image: 'https://www.gravatar.com/avatar/?d=mp&s=50', timestamp: '23 Jan 2:05 pm', text: 'You better believe it!', isOwn: true },
  ];
  readonly chatContacts: DirectChatContact[] = [
    { name: 'Count Dracula', image: 'https://www.gravatar.com/avatar/?d=mp&s=50', date: '2/28/2015', preview: 'How have you been?' },
    { name: 'Sarah Doe', image: 'https://www.gravatar.com/avatar/?d=mp&s=50', date: '2/23/2015', preview: 'I will be a bit late tomorrow.' },
  ];

  readonly frameworkOptions: TomSelectOption[] = [
    { value: 'angular', text: 'Angular' },
    { value: 'react', text: 'React' },
    { value: 'vue', text: 'Vue' },
    { value: 'svelte', text: 'Svelte' },
  ];

  readonly columns: DatatableColumn[] = [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'team', label: 'Team' },
    { key: 'status', label: 'Status' },
  ];
  readonly rows: Array<Record<string, unknown>> = [
    { name: 'Ada Lovelace', role: 'Engineer', team: 'Platform', status: 'Active' },
    { name: 'Alan Turing', role: 'Architect', team: 'Core', status: 'Active' },
    { name: 'Grace Hopper', role: 'Engineer', team: 'Tooling', status: 'Away' },
    { name: 'Linus Torvalds', role: 'Maintainer', team: 'Kernel', status: 'Active' },
    { name: 'Margaret Hamilton', role: 'Lead', team: 'Flight', status: 'Active' },
    { name: 'Dennis Ritchie', role: 'Engineer', team: 'Systems', status: 'Away' },
    { name: 'Barbara Liskov', role: 'Researcher', team: 'Languages', status: 'Active' },
    { name: 'Tim Berners-Lee', role: 'Inventor', team: 'Web', status: 'Active' },
    { name: 'Donald Knuth', role: 'Author', team: 'Algorithms', status: 'Away' },
    { name: 'Katherine Johnson', role: 'Mathematician', team: 'Orbital', status: 'Active' },
    { name: 'Edsger Dijkstra', role: 'Theorist', team: 'Graphs', status: 'Active' },
    { name: 'John von Neumann', role: 'Polymath', team: 'Architecture', status: 'Active' },
  ];

  frameworksLabel(): string {
    const v = this.frameworks();
    return Array.isArray(v) ? (v.length ? v.join(', ') : '—') : v || '—';
  }
}

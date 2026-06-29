import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AppContentComponent,
  CardComponent,
  DatatableComponent,
  type DatatableColumn,
} from '@adminlte/angular';

/**
 * Data Tables — port of `tables/data.html`. The core page enhances a "Users"
 * table with Tabulator (vanilla JS); here we use the library's
 * {@link DatatableComponent} (`<lte-datatable>`), which renders a plain Bootstrap
 * table and progressively enhances it with `simple-datatables` for search,
 * sorting and pagination.
 */
@Component({
  selector: 'app-tables-data',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent, CardComponent, DatatableComponent],
  template: `
    <lte-app-content
      title="Data Tables"
      [breadcrumbs]="[
        { label: 'Home', route: '/' },
        { label: 'Tables', route: '/tables/simple' },
        { label: 'Data' }
      ]"
    >
      <lte-card title="Users" icon="bi-table" bodyClass="table-responsive">
        <lte-datatable [columns]="columns" [data]="users" />
        <div footer class="text-secondary small">
          Searchable, sortable and paginated &mdash; powered by
          <a href="https://github.com/fiduswriter/simple-datatables" target="_blank" rel="noopener">simple-datatables</a>,
          vanilla JS, no jQuery required.
        </div>
      </lte-card>
    </lte-app-content>
  `,
})
export class TablesDataPage {
  readonly columns: DatatableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'city', label: 'City' },
    { key: 'joined', label: 'Joined' },
  ];

  readonly users: Array<Record<string, unknown>> = [
    { id: 1, name: 'Olivia Bennett', email: 'olivia.bennett@example.com', role: 'Administrator', city: 'New York', joined: '2023-01-12' },
    { id: 2, name: 'Liam Carter', email: 'liam.carter@example.com', role: 'Editor', city: 'London', joined: '2023-02-03' },
    { id: 3, name: 'Emma Davies', email: 'emma.davies@example.com', role: 'Author', city: 'Sydney', joined: '2023-02-28' },
    { id: 4, name: 'Noah Evans', email: 'noah.evans@example.com', role: 'Subscriber', city: 'Toronto', joined: '2023-03-15' },
    { id: 5, name: 'Ava Foster', email: 'ava.foster@example.com', role: 'Editor', city: 'Berlin', joined: '2023-04-01' },
    { id: 6, name: 'William Grant', email: 'william.grant@example.com', role: 'Author', city: 'Madrid', joined: '2023-04-19' },
    { id: 7, name: 'Sophia Hayes', email: 'sophia.hayes@example.com', role: 'Administrator', city: 'Paris', joined: '2023-05-07' },
    { id: 8, name: 'James Irving', email: 'james.irving@example.com', role: 'Subscriber', city: 'Rome', joined: '2023-05-22' },
    { id: 9, name: 'Isabella Jones', email: 'isabella.jones@example.com', role: 'Editor', city: 'Amsterdam', joined: '2023-06-04' },
    { id: 10, name: 'Benjamin King', email: 'benjamin.king@example.com', role: 'Author', city: 'Vienna', joined: '2023-06-18' },
    { id: 11, name: 'Mia Lewis', email: 'mia.lewis@example.com', role: 'Subscriber', city: 'Oslo', joined: '2023-07-02' },
    { id: 12, name: 'Lucas Morgan', email: 'lucas.morgan@example.com', role: 'Editor', city: 'Dublin', joined: '2023-07-21' },
    { id: 13, name: 'Charlotte Nash', email: 'charlotte.nash@example.com', role: 'Administrator', city: 'Lisbon', joined: '2023-08-09' },
    { id: 14, name: 'Henry Owen', email: 'henry.owen@example.com', role: 'Author', city: 'Prague', joined: '2023-08-30' },
    { id: 15, name: 'Amelia Price', email: 'amelia.price@example.com', role: 'Subscriber', city: 'Helsinki', joined: '2023-09-14' },
    { id: 16, name: 'Alexander Reed', email: 'alexander.reed@example.com', role: 'Editor', city: 'Stockholm', joined: '2023-09-27' },
    { id: 17, name: 'Harper Scott', email: 'harper.scott@example.com', role: 'Author', city: 'Copenhagen', joined: '2023-10-11' },
    { id: 18, name: 'Daniel Turner', email: 'daniel.turner@example.com', role: 'Administrator', city: 'Zurich', joined: '2023-10-29' },
    { id: 19, name: 'Evelyn Walsh', email: 'evelyn.walsh@example.com', role: 'Subscriber', city: 'Brussels', joined: '2023-11-16' },
    { id: 20, name: 'Michael Young', email: 'michael.young@example.com', role: 'Editor', city: 'Warsaw', joined: '2023-12-01' },
  ];
}

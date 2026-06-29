import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AppContentComponent } from '@adminlte/angular';

interface FolderNode {
  label: string;
  icon: string;
  count?: string;
  active?: boolean;
  /** Indentation level (0 = root). */
  indent?: number;
}

interface FileEntry {
  name: string;
  /** Bootstrap icon class for the file/folder glyph. */
  icon: string;
  /** Theme colour for the glyph (text-{theme}). */
  theme: string;
  /** Whether this row is a folder (no size). */
  folder?: boolean;
  size: string;
  modified: string;
  shared?: boolean;
}

/**
 * File Manager — 1:1 replica of the core AdminLTE `pages/file-manager.html`
 * page: a folder-tree sidebar with upload/new-folder actions and a storage
 * meter, alongside a file browser that toggles between a card grid and a list
 * table. The view toggle is driven by a signal (no jQuery / DOM toggling).
 */
@Component({
  selector: 'app-file-manager',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AppContentComponent],
  template: `
    <lte-app-content
      title="File Manager"
      [breadcrumbs]="[{ label: 'Home', route: '/' }, { label: 'File Manager' }]"
    >
      <div class="row g-3">
        <!-- Folder tree -->
        <div class="col-lg-3">
          <div class="d-grid gap-2 mb-3">
            <button class="btn btn-primary" type="button">
              <i class="bi bi-cloud-upload me-1" aria-hidden="true"></i>
              Upload files
            </button>
            <button class="btn btn-outline-secondary" type="button">
              <i class="bi bi-folder-plus me-1" aria-hidden="true"></i>
              New folder
            </button>
          </div>
          <div class="card">
            <div class="list-group list-group-flush">
              @for (folder of folders; track $index) {
                <a
                  href="#"
                  class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  [class.active]="folder.active"
                  [class.ps-4]="folder.indent === 1"
                  [class.ps-5]="folder.indent === 2"
                  (click)="$event.preventDefault()"
                >
                  <span>
                    <i class="bi {{ folder.icon }} me-2" aria-hidden="true"></i>
                    {{ folder.label }}
                  </span>
                  @if (folder.count) {
                    <small class="opacity-75">{{ folder.count }}</small>
                  }
                </a>
              }
            </div>
          </div>
          <div class="card mt-3">
            <div class="card-body">
              <p class="fw-semibold mb-2 small">
                <i class="bi bi-cloud me-1" aria-hidden="true"></i>
                Storage
              </p>
              <div class="progress mb-2" style="height: 8px">
                <div
                  class="progress-bar"
                  role="progressbar"
                  style="width: 62%"
                  aria-valuenow="62"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <small class="text-secondary">6.2 GB of 10 GB used</small>
            </div>
          </div>
        </div>

        <!-- File browser -->
        <div class="col-lg-9">
          <div class="card">
            <div class="card-header d-flex flex-wrap gap-2 align-items-center">
              <nav aria-label="breadcrumb" class="flex-grow-1">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <a href="#" (click)="$event.preventDefault()">
                      <i class="bi bi-house" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#" (click)="$event.preventDefault()">My Drive</a>
                  </li>
                  <li class="breadcrumb-item active" aria-current="page">Design</li>
                </ol>
              </nav>
              <div class="input-group input-group-sm" style="width: 14rem">
                <span class="input-group-text">
                  <i class="bi bi-search" aria-hidden="true"></i>
                </span>
                <input
                  type="search"
                  class="form-control"
                  placeholder="Search files…"
                  aria-label="Search files"
                />
              </div>
              <div class="btn-group btn-group-sm" role="group" aria-label="View">
                <input
                  type="radio"
                  class="btn-check"
                  name="view"
                  id="view-grid"
                  [checked]="view() === 'grid'"
                  (change)="view.set('grid')"
                />
                <label class="btn btn-outline-secondary" for="view-grid">
                  <i class="bi bi-grid-3x3-gap" aria-hidden="true"></i>
                </label>
                <input
                  type="radio"
                  class="btn-check"
                  name="view"
                  id="view-list"
                  [checked]="view() === 'list'"
                  (change)="view.set('list')"
                />
                <label class="btn btn-outline-secondary" for="view-list">
                  <i class="bi bi-list-ul" aria-hidden="true"></i>
                </label>
              </div>
            </div>
            <div class="card-body">
              @if (view() === 'grid') {
                <!-- Grid view -->
                <div class="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-3">
                  @for (file of files; track file.name) {
                    <div class="col">
                      <a
                        href="#"
                        class="card text-center text-decoration-none text-body h-100 position-relative"
                        (click)="$event.preventDefault()"
                      >
                        @if (file.shared) {
                          <span class="badge text-bg-info position-absolute top-0 end-0 m-2">
                            <i class="bi bi-people-fill me-1" aria-hidden="true"></i>
                            Shared
                          </span>
                        }
                        <div class="card-body d-flex flex-column justify-content-center pb-2">
                          <i class="bi {{ file.icon }} text-{{ file.theme }} display-5 mb-3" aria-hidden="true"></i>
                          <p class="card-title fw-medium small text-break mb-0">{{ file.name }}</p>
                        </div>
                        <div class="card-footer bg-transparent small text-secondary py-2">
                          <div class="d-flex justify-content-between align-items-center gap-2">
                            <span class="text-truncate" [title]="file.folder ? '—' : file.size">
                              @if (file.folder) {
                                <i class="bi bi-folder me-1" aria-hidden="true"></i>
                                Folder
                              } @else {
                                {{ file.size }}
                              }
                            </span>
                            <span class="text-truncate" [title]="file.modified">{{ file.modified }}</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  }
                </div>
              } @else {
                <!-- List view -->
                <div class="table-responsive">
                  <table class="table align-middle mb-0">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Modified</th>
                        <th class="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      @for (file of files; track file.name) {
                        <tr>
                          <td>
                            <i class="bi {{ file.icon }} text-{{ file.theme }} me-2" aria-hidden="true"></i>
                            {{ file.name }}
                            @if (file.shared) {
                              <span class="badge text-bg-info ms-2">Shared</span>
                            }
                          </td>
                          <td>{{ file.folder ? '—' : file.size }}</td>
                          <td>{{ file.modified }}</td>
                          <td class="text-end">
                            <div class="btn-group btn-group-sm">
                              <button class="btn btn-outline-secondary" type="button" title="Download">
                                <i class="bi bi-download" aria-hidden="true"></i>
                              </button>
                              <button class="btn btn-outline-secondary" type="button" title="Share">
                                <i class="bi bi-share" aria-hidden="true"></i>
                              </button>
                              <button class="btn btn-outline-danger" type="button" title="Delete">
                                <i class="bi bi-trash" aria-hidden="true"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              }
            </div>
            <div class="card-footer text-secondary small">{{ files.length }} items</div>
          </div>
        </div>
      </div>
    </lte-app-content>
  `,
})
export class FileManagerPage {
  readonly view = signal<'grid' | 'list'>('grid');

  readonly folders: FolderNode[] = [
    { label: 'My Drive', icon: 'bi-house', count: '24', active: true, indent: 0 },
    { label: 'Documents', icon: 'bi-folder', count: '12', indent: 1 },
    { label: 'Design', icon: 'bi-folder', count: '8', active: true, indent: 1 },
    { label: 'v2.4 candidates', icon: 'bi-folder', count: '4', indent: 2 },
    { label: 'Archive', icon: 'bi-folder', count: '28', indent: 2 },
    { label: 'Invoices', icon: 'bi-folder', count: '41', indent: 1 },
    { label: 'Shared with me', icon: 'bi-people', count: '9', indent: 0 },
    { label: 'Starred', icon: 'bi-star', count: '6', indent: 0 },
    { label: 'Recent', icon: 'bi-clock-history', indent: 0 },
    { label: 'Trash', icon: 'bi-trash', count: '3', indent: 0 },
  ];

  readonly files: FileEntry[] = [
    { name: 'Customer interviews', icon: 'bi-folder-fill', theme: 'warning', folder: true, size: '—', modified: 'Today' },
    { name: 'Q2 planning', icon: 'bi-folder-fill', theme: 'warning', folder: true, size: '—', modified: 'Yesterday', shared: true },
    { name: 'design-review.pdf', icon: 'bi-file-earmark-pdf-fill', theme: 'danger', size: '1.4 MB', modified: '10:42 AM' },
    { name: 'focus-ring-dark.png', icon: 'bi-file-earmark-image-fill', theme: 'primary', size: '320 KB', modified: '10:38 AM' },
    { name: 'INV-2026-00428.pdf', icon: 'bi-file-earmark-pdf-fill', theme: 'danger', size: '184 KB', modified: 'Yesterday' },
    { name: 'roadmap.docx', icon: 'bi-file-earmark-word-fill', theme: 'info', size: '47 KB', modified: 'Yesterday', shared: true },
    { name: 'analytics-may.xlsx', icon: 'bi-file-earmark-spreadsheet-fill', theme: 'success', size: '92 KB', modified: 'May 16' },
    { name: 'site-export-2026-05.zip', icon: 'bi-file-earmark-zip-fill', theme: 'secondary', size: '12.3 MB', modified: 'May 14' },
    { name: 'main.tsx', icon: 'bi-file-earmark-code-fill', theme: 'primary', size: '8 KB', modified: 'May 12' },
  ];
}

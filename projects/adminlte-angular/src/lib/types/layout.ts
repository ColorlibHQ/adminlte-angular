import type { TimelineIcon } from './widgets';

/**
 * The signed-in user shown in the topbar user menu.
 */
export interface TopbarUser {
  name: string;
  image: string;
  role?: string;
  memberSince?: string;
}

/**
 * A single breadcrumb entry.
 */
export interface Breadcrumb {
  label: string;
  /** Angular route. Rendered with RouterLink when present and not the last crumb. */
  route?: string;
  /** External URL alternative to `route`. */
  href?: string;
}

/** Re-exported for convenience alongside layout types. */
export type { TimelineIcon };

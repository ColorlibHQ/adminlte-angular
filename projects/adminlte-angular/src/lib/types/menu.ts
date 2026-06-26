import type { BootstrapTheme } from './theme';

/**
 * Menu header item (non-interactive section label).
 */
export interface MenuHeader {
  type: 'header';
  text: string;
}

/**
 * Menu link item (clickable leaf).
 *
 * `route` drives the Angular RouterLink; `href` is used for external links.
 * `visible` (or a falsy `permission`) hides the item without removing it from
 * the config — wire it to your auth/role logic.
 */
export interface MenuItem {
  type: 'item';
  text: string;
  /** Angular route, e.g. '/dashboard'. Rendered with RouterLink. */
  route?: string;
  /** External URL, e.g. 'https://adminlte.io'. Rendered as a plain anchor. */
  href?: string;
  /** Bootstrap Icons class, e.g. 'bi-speedometer' (with or without `bi`). */
  icon?: string;
  iconColor?: BootstrapTheme;
  badge?: string | number;
  badgeColor?: BootstrapTheme;
  target?: '_blank' | '_self';
  /** When `false`, the item is not rendered. Defaults to `true`. */
  visible?: boolean;
}

/**
 * Menu group item (collapsible submenu / treeview).
 */
export interface MenuGroup {
  type: 'group';
  text: string;
  icon?: string;
  iconColor?: BootstrapTheme;
  badge?: string | number;
  badgeColor?: BootstrapTheme;
  children: MenuNode[];
  /** When `false`, the group is not rendered. Defaults to `true`. */
  visible?: boolean;
}

/**
 * Discriminated union of all menu node types.
 */
export type MenuNode = MenuHeader | MenuItem | MenuGroup;

/** Bootstrap color theme variants. */
export type BootstrapTheme =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark';

/** Component size variants. */
export type ComponentSize = 'sm' | 'lg';

/** Color mode for light/dark theme support. */
export type ColorMode = 'light' | 'dark' | 'auto';

/** The resolved (concrete) color mode after `auto` is evaluated. */
export type ResolvedColorMode = 'light' | 'dark';

/** Bootstrap responsive breakpoint sizes. */
export type BreakpointSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/** Sidebar color theme (independent of the global color mode). */
export type SidebarTheme = 'light' | 'dark';

/** Text direction. */
export type Direction = 'ltr' | 'rtl';

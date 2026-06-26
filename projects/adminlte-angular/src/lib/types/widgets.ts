import type { BootstrapTheme } from './theme';

/** Marker type kept for symmetry with the other ports' icon fields. */
export type TimelineIcon = string;

/**
 * A single timeline entry for {@link TimelineComponent}.
 */
export interface TimelineItem {
  time: string;
  icon?: string;
  iconTheme?: BootstrapTheme;
  title: string;
  /** Inner HTML for the body. Sanitized by Angular before render. */
  body?: string;
  /** Inner HTML for the footer. Sanitized by Angular before render. */
  footer?: string;
  url?: string;
}

/** A stat row shown in {@link ProfileCardComponent}. */
export interface ProfileStat {
  label: string;
  value: string | number;
}

/** An entry in the command palette. */
export interface CommandItem {
  label: string;
  href: string;
  icon?: string;
  group?: string;
}

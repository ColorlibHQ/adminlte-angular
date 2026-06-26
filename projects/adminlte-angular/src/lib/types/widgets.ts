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

/** A message row in the topbar {@link NavMessagesComponent} dropdown. */
export interface NavMessage {
  from: string;
  text: string;
  image?: string;
  url?: string;
  time?: string;
  star?: BootstrapTheme;
}

/** A notification row in the topbar {@link NavNotificationsComponent} dropdown. */
export interface NavNotification {
  text: string;
  icon?: string;
  iconTheme?: BootstrapTheme;
  time?: string;
  url?: string;
}

/** A task row in the topbar {@link NavTasksComponent} dropdown. */
export interface NavTask {
  text: string;
  progress: number;
  theme?: BootstrapTheme;
  url?: string;
}

/** A contact row in the {@link DirectChatComponent} contacts pane. */
export interface DirectChatContact {
  name: string;
  image: string;
  date: string;
  preview: string;
}

/** A message bubble in the {@link DirectChatComponent}. */
export interface DirectChatMessage {
  from: string;
  image: string;
  timestamp: string;
  text: string;
  isOwn?: boolean;
}

/** A column definition for {@link DatatableComponent}. */
export interface DatatableColumn {
  /** Property key on each row object. */
  key: string;
  /** Header label (defaults to the key). */
  label?: string;
  /** Whether this column is sortable (default: true). */
  sortable?: boolean;
}

/** An option for {@link InputTomSelectComponent}. */
export interface TomSelectOption {
  value: string;
  text: string;
}

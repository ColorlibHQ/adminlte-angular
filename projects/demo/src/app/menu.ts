import type { MenuNode } from '@adminlte/angular';

/** Config-driven sidebar menu — mirrors the core AdminLTE 4 sidebar structure. */
export const MENU: MenuNode[] = [
  { type: 'header', text: 'MAIN NAVIGATION' },
  { type: 'item', text: 'Dashboard', route: '/', icon: 'bi-speedometer' },
  {
    type: 'group',
    text: 'Widgets',
    icon: 'bi-grid-1x2',
    children: [
      { type: 'item', text: 'Small Box', route: '/widgets/small-box', icon: 'bi-circle' },
      { type: 'item', text: 'Info Box', route: '/widgets/info-box', icon: 'bi-circle' },
      { type: 'item', text: 'Cards', route: '/widgets/cards', icon: 'bi-circle' },
    ],
  },
  {
    type: 'group',
    text: 'UI Elements',
    icon: 'bi-tree-fill',
    children: [
      { type: 'item', text: 'General', route: '/ui/general', icon: 'bi-circle' },
      { type: 'item', text: 'Icons', route: '/ui/icons', icon: 'bi-circle' },
      { type: 'item', text: 'Timeline', route: '/ui/timeline', icon: 'bi-circle' },
    ],
  },
  {
    type: 'group',
    text: 'Forms',
    icon: 'bi-input-cursor-text',
    children: [
      { type: 'item', text: 'Elements', route: '/forms/elements', icon: 'bi-circle' },
      { type: 'item', text: 'Layout', route: '/forms/layout', icon: 'bi-circle' },
      { type: 'item', text: 'Validation', route: '/forms/validation', icon: 'bi-circle' },
    ],
  },
  {
    type: 'group',
    text: 'Tables',
    icon: 'bi-table',
    children: [
      { type: 'item', text: 'Simple Tables', route: '/tables/simple', icon: 'bi-circle' },
      { type: 'item', text: 'Data Tables', route: '/tables/data', icon: 'bi-circle' },
    ],
  },
  { type: 'item', text: 'Components', route: '/components', icon: 'bi-puzzle', badge: 'New', badgeColor: 'info' },
  { type: 'header', text: 'EXAMPLES' },
  { type: 'item', text: 'Profile', route: '/profile', icon: 'bi-person-badge' },
  { type: 'item', text: 'Projects', route: '/projects', icon: 'bi-kanban' },
  { type: 'item', text: 'Invoice', route: '/invoice', icon: 'bi-receipt' },
  { type: 'item', text: 'Pricing', route: '/pricing', icon: 'bi-tag' },
  { type: 'item', text: 'Settings', route: '/settings', icon: 'bi-gear' },
  { type: 'item', text: 'FAQ', route: '/faq', icon: 'bi-question-circle' },
  {
    type: 'group',
    text: 'Error pages',
    icon: 'bi-exclamation-octagon',
    children: [
      { type: 'item', text: '404', route: '/404', icon: 'bi-circle' },
      { type: 'item', text: '500', route: '/500', icon: 'bi-circle' },
      { type: 'item', text: 'Maintenance', route: '/maintenance', icon: 'bi-circle' },
    ],
  },
  { type: 'header', text: 'ACCOUNT' },
  { type: 'item', text: 'Login', route: '/login', icon: 'bi-box-arrow-in-right' },
  { type: 'item', text: 'AdminLTE.io', href: 'https://adminlte.io', icon: 'bi-globe', target: '_blank' },
];

import type { MenuNode } from '@adminlte/angular';

/** Config-driven sidebar menu shared across the demo. */
export const MENU: MenuNode[] = [
  { type: 'header', text: 'MAIN NAVIGATION' },
  { type: 'item', text: 'Dashboard', route: '/', icon: 'bi-speedometer' },
  { type: 'item', text: 'Widgets', route: '/widgets', icon: 'bi-grid-1x2', badge: 'New', badgeColor: 'success' },
  {
    type: 'group',
    text: 'UI Elements',
    icon: 'bi-collection',
    children: [
      { type: 'item', text: 'Forms', route: '/forms', icon: 'bi-input-cursor-text' },
      { type: 'item', text: 'Tables', route: '/tables', icon: 'bi-table' },
      {
        type: 'group',
        text: 'Nested',
        icon: 'bi-diagram-3',
        children: [
          { type: 'item', text: 'Level 2.1', route: '/nested/one', icon: 'bi-dot' },
          { type: 'item', text: 'Level 2.2', route: '/nested/two', icon: 'bi-dot' },
        ],
      },
    ],
  },
  { type: 'header', text: 'ACCOUNT' },
  { type: 'item', text: 'Login', route: '/login', icon: 'bi-box-arrow-in-right' },
  { type: 'item', text: 'Hidden (permission)', route: '/secret', icon: 'bi-lock', visible: false },
  { type: 'item', text: 'AdminLTE.io', href: 'https://adminlte.io', icon: 'bi-globe', target: '_blank' },
];

import type { MenuNode } from '../types/menu';
import type { CommandItem } from '../types/widgets';

/**
 * Resolve the navigable target of a menu item — prefers an Angular `route`,
 * falls back to an external `href`.
 */
function targetOf(node: Extract<MenuNode, { type: 'item' }>): string | undefined {
  return node.route ?? node.href;
}

/**
 * Flatten a MenuNode tree into navigable commands for the command palette.
 * Skips hidden items and placeholder links (`#`), and de-duplicates by target.
 */
export function flattenMenuToCommands(nodes: MenuNode[]): CommandItem[] {
  const out: CommandItem[] = [];
  const walk = (list: MenuNode[], group?: string): void => {
    for (const node of list) {
      if (node.type === 'header') {
        group = node.text;
      } else if (node.type === 'item') {
        if (node.visible === false) continue;
        const target = targetOf(node);
        if (target && target !== '#') {
          out.push({ label: node.text, href: target, icon: node.icon, group });
        }
      } else {
        if (node.visible === false) continue;
        walk(node.children, node.text);
      }
    }
  };
  walk(nodes);
  const seen = new Set<string>();
  return out.filter((c) => (seen.has(c.href) ? false : (seen.add(c.href), true)));
}

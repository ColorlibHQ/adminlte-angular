/**
 * Tiny className utility (alternative to clsx). Filters out falsy values and
 * joins the rest with a single space.
 */
export function cn(...classes: Array<string | undefined | null | false>): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Normalize a Bootstrap Icons class so callers may pass either `bi-speedometer`
 * or `bi bi-speedometer`. Returns a string that always includes the base `bi`.
 */
export function biClass(icon?: string): string {
  if (!icon) return '';
  return icon.includes('bi-') && !/\bbi\b/.test(icon) ? `bi ${icon}` : icon;
}

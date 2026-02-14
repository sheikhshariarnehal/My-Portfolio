/**
 * Helpers for transforming raw DB/default data into view-ready shapes.
 */

/** Social platform configuration keyed by seo field name. */
const SOCIAL_PLATFORMS = [
  { key: 'linkedin', icon: 'fab fa-linkedin', label: 'LinkedIn' },
  { key: 'github', icon: 'fab fa-github', label: 'GitHub' },
  { key: 'twitter', icon: 'fab fa-twitter', label: 'Twitter' },
  { key: 'telegram', icon: 'fab fa-telegram-plane', label: 'Telegram' },
  { key: 'instagram', icon: 'fab fa-instagram', label: 'Instagram' },
  { key: 'facebook', icon: 'fab fa-facebook', label: 'Facebook' },
] as const;

export interface SocialLink {
  href: string;
  icon: string;
  label: string;
  className: string;
}

/**
 * Builds an array of social links from the SEO data object.
 * Only includes links that have a truthy URL value.
 */
export function buildSocialLinks(seo: Record<string, string | undefined>): SocialLink[] {
  return SOCIAL_PLATFORMS
    .filter(({ key }) => seo[key])
    .map(({ key, icon, label }) => ({
      href: seo[key]!,
      icon,
      label,
      className: key,
    }));
}

/**
 * Formats a date range from raw start/end date strings.
 * Returns e.g. "Jan 2023 - Present" or "Jan 2023 - Dec 2024".
 */
export function formatDateRange(startDate: string, endDate?: string | null): string {
  const options: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric' };
  const start = new Date(startDate).toLocaleDateString('en-US', options);
  const end = endDate
    ? new Date(endDate).toLocaleDateString('en-US', options)
    : 'Present';
  return `${start} - ${end}`;
}

/**
 * Split a full name into { firstName, lastName } for display.
 */
export function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.split(' ');
  const lastName = parts.pop() ?? '';
  return { firstName: parts.join(' '), lastName };
}

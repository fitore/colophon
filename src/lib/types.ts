/** Legacy global mail helpers retained for the footer. */

export const CONTACT_EMAIL = "hello@colophon.press";

export function acquireMailto(title: string): string {
  const subject = encodeURIComponent(`Acquire: ${title}`);
  return `mailto:${CONTACT_EMAIL}?subject=${subject}`;
}

export function recordMailto(): string {
  const subject = encodeURIComponent("Keep the Record");
  return `mailto:${CONTACT_EMAIL}?subject=${subject}`;
}

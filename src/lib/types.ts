/**
 * Colophon — shared domain types and soft-commerce helpers.
 *
 * Soft commerce is mailto-only in Phase 1. No cart, no checkout.
 * All mailto subjects are encoded with encodeURIComponent.
 */

export const CONTACT_EMAIL = "hello@expressed.press";

/** Encoded mailto used by every "Acquire" action. */
export function acquireMailto(title: string): string {
  const subject = encodeURIComponent(`Acquire: ${title}`);
  return `mailto:${CONTACT_EMAIL}?subject=${subject}`;
}

/** Encoded mailto used by the newsletter / "Keep the Record" action. */
export function recordMailto(): string {
  const subject = encodeURIComponent("Keep the Record");
  return `mailto:${CONTACT_EMAIL}?subject=${subject}`;
}

/**
 * A curated external book on the concept shelf.
 * The bookstore links out / records interest; it is not an inventory system.
 */
export interface Book {
  slug: string;
  title: string;
  author: string;
  note: string;
  category: string;
  coverImage?: string; // undefined → CSS placeholder
  coverAlt?: string;
  acquireUrl?: string; // defaults to acquireMailto(title) when missing
}

/** An editorial post in The Press. */
export interface PressPost {
  slug: string;
  title: string;
  dek: string;
  date: string; // ISO 8601
  author: string;
  category: string;
  body: string[]; // paragraphs
  heroImage?: string;
  heroAlt?: string;
  thumbImage?: string;
  thumbAlt?: string;
}

export type VisionKind = "edition" | "print" | "object";

/**
 * A future-catalogue item (editions, prints, objects). Carries the
 * provenance / scarcity language reserved for /vision-catalogue.
 */
export interface VisionProduct {
  slug: string;
  title: string;
  kind: VisionKind;
  description: string;
  material?: string;
  dimensions?: string;
  edition?: string; // e.g. "Edition of 12"
  scarcityLabel?: string; // ruby status label, e.g. "3 remaining"
  provenance?: string;
  image?: string;
  imageAlt?: string;
  acquireUrl?: string; // defaults to acquireMailto(title) when missing
}

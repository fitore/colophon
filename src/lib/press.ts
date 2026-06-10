import type { PressPost } from "@/lib/types";

/**
 * Phase 1 editorial index — dummy data.
 * Thumb / hero images map to approved placeholder assets in public/images/press.
 */
export const pressPosts: PressPost[] = [
  {
    slug: "the-quiet-strength-of-paper",
    title: "The Quiet Strength of Paper",
    dek: "Why a well-chosen stock outlasts the trend that printed it.",
    date: "2026-05-18",
    author: "Colophon",
    category: "Materials",
    body: [
      "Paper is the part of a book most readers never name, and the part they remember longest in the hand. Its weight, its tooth, the way it takes ink — these decide how a page feels before a single word is read.",
      "We choose stock the way a builder chooses timber: for how it will age. A page should still turn cleanly in fifty years, the ink still sitting where it was set.",
      "This is the first of a short series on the materials of the press — what they are, why we pick them, and what it costs to pick well.",
    ],
    heroImage: "/images/press/article-paper-hero.png",
    heroAlt: "Article hero image: hand-bound paper stack.",
    thumbImage: "/images/press/the-quiet-strength-of-paper-thumb.png",
    thumbAlt: "Editorial thumbnail: book/paper detail.",
  },
  {
    slug: "designing-for-endurance",
    title: "Designing for Endurance",
    dek: "Notes on building objects meant to be kept, not consumed.",
    date: "2026-04-30",
    author: "Colophon",
    category: "Method",
    body: [
      "Endurance is a design constraint, not a marketing claim. It shows up in the choices nobody photographs: the sewing, the grain direction, the glue that stays flexible.",
      "An object built to endure asks a little more at the start and a great deal less over its life. That trade is the whole argument of the press.",
      "We would rather make one thing that lasts than ten that don't.",
    ],
    heroImage: "/images/press/designing-for-endurance-thumb.png",
    heroAlt: "Editorial thumbnail: stained-glass/radiance detail.",
    thumbImage: "/images/press/designing-for-endurance-thumb.png",
    thumbAlt: "Editorial thumbnail: stained-glass/radiance detail.",
  },
  {
    slug: "notes-from-the-press",
    title: "Notes from the Press",
    dek: "A first dispatch — where Colophon begins, and where it is going.",
    date: "2026-04-02",
    author: "Colophon",
    category: "Dispatch",
    body: [
      "Colophon begins online, quietly, as an experiment in publishing without a storefront. No cart, no countdown — only books worth recording an interest in.",
      "The Press is where we think out loud about that experiment: the editions we are planning, the makers we admire, the small decisions that add up to a house style.",
      "If something here resonates, keep the record. We'll write when there is something true to say.",
    ],
    heroImage: "/images/press/notes-from-the-press-thumb.png",
    heroAlt: "Editorial thumbnail: type block letter detail.",
    thumbImage: "/images/press/notes-from-the-press-thumb.png",
    thumbAlt: "Editorial thumbnail: type block letter detail.",
  },
];

export function getPressPost(slug: string): PressPost | undefined {
  return pressPosts.find((post) => post.slug === slug);
}

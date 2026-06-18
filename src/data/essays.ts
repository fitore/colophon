import type { Essay } from "@/types/catalog";
import { colophonEditors } from "./people";

export const essays: Essay[] = [
  {
    type: "essay",
    slug: "the-quiet-strength-of-paper",
    title: "The Quiet Strength of Paper",
    excerpt: "Why a well-chosen stock outlasts the trend that printed it.",
    publishedAt: "2026-05-18",
    status: "published",
    contributors: [{ person: colophonEditors, role: "editor" }],
    aboutBookSlug: "forms-of-permanence",
    body: [
      "Paper is the part of a book most readers never name, and the part they remember longest in the hand. Its weight, its tooth, the way it takes ink — these decide how a page feels before a single word is read.",
      "We choose stock the way a builder chooses timber: for how it will age. A page should still turn cleanly in fifty years, the ink still sitting where it was set.",
      "This is the first of a short series on the materials of the press — what they are, why we pick them, and what it costs to pick well.",
    ].join("\n\n"),
  },
  {
    type: "essay",
    slug: "designing-for-endurance",
    title: "Designing for Endurance",
    excerpt: "Notes on building objects meant to be kept, not consumed.",
    publishedAt: "2026-04-30",
    status: "published",
    contributors: [{ person: colophonEditors, role: "editor" }],
    aboutBookSlug: "on-making",
    body: [
      "Endurance is a design constraint, not a marketing claim. It shows up in the choices nobody photographs: the sewing, the grain direction, the glue that stays flexible.",
      "An object built to endure asks a little more at the start and a great deal less over its life. That trade is the whole argument of the press.",
      "We would rather make one thing that lasts than ten that don't.",
    ].join("\n\n"),
  },
  {
    type: "essay",
    slug: "notes-from-the-press",
    title: "Notes from the Press",
    excerpt: "A first dispatch — where Colophon begins, and where it is going.",
    publishedAt: "2026-04-02",
    status: "published",
    contributors: [{ person: colophonEditors, role: "editor" }],
    body: [
      "Colophon begins online, quietly, as an experiment in publishing without a storefront. No cart, no countdown — only books worth recording an interest in.",
      "The Press is where we publish books under the Colophon name and keep a wider record of the editions, materials, and makers around them.",
      "If something here resonates, keep the record. We'll write when there is something true to say.",
    ].join("\n\n"),
  },
  {
    type: "essay",
    slug: "working-notes-on-binding",
    title: "Working Notes on Binding",
    status: "draft",
    contributors: [{ person: colophonEditors, role: "editor" }],
  },
];

export const publishedEssays = essays.filter((essay) => essay.status === "published");

export function getEssay(slug: string): Essay | undefined {
  return publishedEssays.find((essay) => essay.slug === slug);
}

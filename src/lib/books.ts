import type { Book } from "@/lib/types";

/**
 * Phase 1 concept shelf — dummy data.
 * Cover images map to the approved placeholder assets in public/images/books.
 * acquireUrl is intentionally omitted; it defaults to an encoded mailto.
 */
export const books: Book[] = [
  {
    slug: "on-making",
    title: "On Making",
    author: "Aldous Fenn",
    note: "A meditation on the hand and the page — why slow making still matters in a fast catalogue.",
    category: "Craft",
    coverImage: "/images/books/on-making.png",
    coverAlt: "Blue placeholder book cover: On Making.",
  },
  {
    slug: "the-quiet-page",
    title: "The Quiet Page",
    author: "Mira Solenne",
    note: "Essays on white space, restraint, and the dignity of the unfilled margin.",
    category: "Design",
    coverImage: "/images/books/the-quiet-page.png",
    coverAlt: "Green placeholder book cover: The Quiet Page.",
  },
  {
    slug: "margins",
    title: "Margins",
    author: "Tomas Wren",
    note: "Marginalia as a form of thought — readers writing back to the books that shaped them.",
    category: "Essays",
    coverImage: "/images/books/margins.png",
    coverAlt: "Cream placeholder book cover: Margins.",
  },
  {
    slug: "the-art-of-hand-composition",
    title: "The Art of Hand Composition",
    author: "Edith Calloway",
    note: "A practical history of setting type by hand, from the composing stick to the proof.",
    category: "Letterpress",
    coverImage: "/images/books/the-art-of-hand-composition.png",
    coverAlt: "Ruby placeholder book cover: The Art of Hand Composition.",
  },
  {
    slug: "forms-of-permanence",
    title: "Forms of Permanence",
    author: "Idris Bowe",
    note: "What survives a century — paper, binding, and the quiet engineering of a book built to last.",
    category: "Bookbinding",
    coverImage: "/images/books/forms-of-permanence.png",
    coverAlt: "Black placeholder book cover: Forms of Permanence.",
  },
  {
    slug: "the-book-as-shelter",
    title: "The Book as Shelter",
    author: "Noor Adesina",
    note: "On reading as refuge — the book as a small, well-made room you can carry.",
    category: "Reflection",
    coverImage: "/images/books/the-book-as-shelter.png",
    coverAlt: "Amber placeholder book cover: The Book as Shelter.",
  },
];

export function getBook(slug: string): Book | undefined {
  return books.find((book) => book.slug === slug);
}

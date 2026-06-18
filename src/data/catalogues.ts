import type { Catalogue } from "@/types/catalog";
import { books } from "./books";
import { prints } from "./prints";

export const mainCatalogue: Catalogue = {
  name: "The Shop",
  slug: "shop",
  visibility: "public",
  features: [...books, ...prints],
};

export const visionCatalogue: Catalogue = {
  name: "Vision Catalogue",
  slug: "vision-catalogue",
  visibility: "hidden",
  features: [
    books.find((book) => book.slug === "a-field-guide-to-paper"),
    prints.find((print) => print.slug === "paper-study-one"),
    books.find((book) => book.slug === "the-quiet-page"),
  ].filter((item): item is NonNullable<typeof item> => Boolean(item)),
};

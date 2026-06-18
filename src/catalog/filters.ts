import type { Acquirable } from "@/types/catalog";

export const catalogueFilters = [
  "All",
  "Books",
  "Prints",
  "New",
  "Used",
  "Colophon / In-house",
  "Third-party",
  "Forthcoming",
  "For sale",
  "Sold out / Out of print",
] as const;

export type CatalogueFilter = (typeof catalogueFilters)[number];

export function matchesCatalogueFilter(item: Acquirable, filter: CatalogueFilter): boolean {
  if (filter === "Books") return item.type === "book";
  if (filter === "Prints") return item.type === "print";
  if (filter === "New") return item.condition === "new";
  if (filter === "Used") return item.condition === "used";
  if (filter === "Colophon / In-house") return item.source.kind !== "external";
  if (filter === "Third-party") return item.source.kind === "external";
  if (filter === "Forthcoming") return item.type === "book" && item.status === "forthcoming";
  if (filter === "For sale") return item.status === "for-sale";
  if (filter === "Sold out / Out of print") {
    return item.status === "sold-out" || item.status === "out-of-print";
  }
  return true;
}

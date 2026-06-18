import type { Acquirable, Book, Catalogue, Essay, Print } from "@/types/catalog";

export interface BookRepository {
  getBooks(): Promise<Book[]>;
  findBook(slug: string): Promise<Book | undefined>;
}

/**
 * Access to catalogue information, independent of how that information is stored.
 */
export interface CatalogRepository {
  getBooks(): Promise<Book[]>;
  getPrints(): Promise<Print[]>;
  getFutureCatalogue(): Promise<Catalogue>;
  getEssays(): Promise<Essay[]>;
  findAcquirable(slug: string): Promise<Acquirable | undefined>;
  findEssay(slug: string): Promise<Essay | undefined>;
}

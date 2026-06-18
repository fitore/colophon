import type { Acquirable, Catalogue, Essay } from "@/types/catalog";

/**
 * Access to catalogue information, independent of how that information is stored.
 */
export interface CatalogRepository {
  getMainCatalogue(): Promise<Catalogue>;
  getFutureCatalogue(): Promise<Catalogue>;
  getEssays(): Promise<Essay[]>;
  findAcquirable(slug: string): Promise<Acquirable | undefined>;
  findEssay(slug: string): Promise<Essay | undefined>;
}

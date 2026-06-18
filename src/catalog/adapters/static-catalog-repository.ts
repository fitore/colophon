import { mainCatalogue, visionCatalogue } from "@/data/catalogues";
import { books } from "@/data/books";
import { essays } from "@/data/essays";
import { prints } from "@/data/prints";
import type { CatalogRepository } from "@/catalog/repository";

/**
 * Boundary around repository-owned static records. In the hybrid composition,
 * Prints, Essays, and Future Catalogue use this adapter in every environment;
 * Books use it only for the documented local fallback.
 */
export const staticCatalogRepository: CatalogRepository = {
  getBooks: async () => books,
  getPrints: async () => prints,
  getFutureCatalogue: async () => visionCatalogue,
  getEssays: async () => essays,
  findAcquirable: async (slug) =>
    mainCatalogue.features.find((item) => item.slug === slug && item.status !== "draft"),
  findEssay: async (slug) =>
    essays.find((essay) => essay.slug === slug && essay.status === "published"),
};

import { mainCatalogue, visionCatalogue } from "@/data/catalogues";
import { essays } from "@/data/essays";
import type { CatalogRepository } from "@/catalog/repository";

/**
 * The current repository adapter. This is the production boundary around the
 * repository-owned static records in src/data.
 */
export const staticCatalogRepository: CatalogRepository = {
  getMainCatalogue: async () => mainCatalogue,
  getFutureCatalogue: async () => visionCatalogue,
  getEssays: async () => essays,
  findAcquirable: async (slug) =>
    mainCatalogue.features.find((item) => item.slug === slug && item.status !== "draft"),
  findEssay: async (slug) =>
    essays.find((essay) => essay.slug === slug && essay.status === "published"),
};

import type { Acquirable, Book, Essay, Print } from "@/types/catalog";
import type { CatalogRepository } from "./repository";
import { staticCatalogRepository } from "./adapters/static-catalog-repository";

export function createCatalogQueries(repository: CatalogRepository) {
  const getBookstoreItems = async (): Promise<Acquirable[]> =>
    (await repository.getMainCatalogue()).features.filter((item) => item.status !== "draft");

  const getPressItems = async (): Promise<Book[]> =>
    (await getBookstoreItems()).filter(
      (item): item is Book => item.type === "book" && item.source.kind === "imprint",
    );

  const getStudioItems = async (): Promise<Print[]> =>
    (await getBookstoreItems()).filter(
      (item): item is Print => item.type === "print" && item.source.kind === "studio",
    );

  const getFutureCatalogueItems = async (): Promise<Acquirable[]> =>
    (await repository.getFutureCatalogue()).features;

  const getPublishedEssays = async (): Promise<Essay[]> =>
    (await repository.getEssays()).filter((essay) => essay.status === "published");

  return {
    getBookstoreItems,
    getPressItems,
    getStudioItems,
    getFutureCatalogueItems,
    getPublishedEssays,
    getAcquirable: (slug: string) => repository.findAcquirable(slug),
    getEssay: (slug: string) => repository.findEssay(slug),
  };
}

export const {
  getBookstoreItems,
  getPressItems,
  getStudioItems,
  getFutureCatalogueItems,
  getPublishedEssays,
  getAcquirable,
  getEssay,
} = createCatalogQueries(staticCatalogRepository);

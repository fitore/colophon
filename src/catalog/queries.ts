import type { Acquirable, Book, Essay, Print } from "@/types/catalog";
import type { CatalogRepository } from "./repository";
import { catalogRepository } from "./catalog-repository";

export function createCatalogQueries(repository: CatalogRepository) {
  const getBookstoreItems = async (): Promise<Acquirable[]> =>
    [...(await repository.getBooks()), ...(await repository.getPrints())].filter(
      (item) => item.status !== "draft",
    );

  const getPressItems = async (): Promise<Book[]> =>
    (await repository.getBooks()).filter(
      (book) => book.status !== "draft" && book.source.kind === "imprint",
    );

  const getStudioItems = async (): Promise<Print[]> =>
    (await repository.getPrints()).filter(
      (print) => print.status !== "draft" && print.source.kind === "studio",
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
} = createCatalogQueries(catalogRepository);

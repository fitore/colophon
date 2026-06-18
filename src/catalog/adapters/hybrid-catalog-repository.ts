import type { BookRepository, CatalogRepository } from "@/catalog/repository";

export function createHybridCatalogRepository(
  bookRepository: BookRepository,
  staticRepository: CatalogRepository,
): CatalogRepository {
  return {
    getBooks: () => bookRepository.getBooks(),
    getPrints: () => staticRepository.getPrints(),
    getFutureCatalogue: () => staticRepository.getFutureCatalogue(),
    getEssays: () => staticRepository.getEssays(),
    findAcquirable: async (slug) => {
      const staticItem = await staticRepository.findAcquirable(slug);
      if (staticItem?.type === "print") return staticItem;

      const book = await bookRepository.findBook(slug);
      if (book && book.status !== "draft") return book;
      return undefined;
    },
    findEssay: (slug) => staticRepository.findEssay(slug),
  };
}

import { describe, expect, it, vi } from "vitest";
import { books } from "@/data/books";
import { essays } from "@/data/essays";
import { prints } from "@/data/prints";
import { visionCatalogue } from "@/data/catalogues";
import type { BookRepository, CatalogRepository } from "@/catalog/repository";
import { createCatalogQueries } from "@/catalog/queries";
import { createHybridCatalogRepository } from "./hybrid-catalog-repository";

function createStaticRepository(): CatalogRepository {
  return {
    getBooks: async () => {
      throw new Error("Hybrid composition must not request static Books");
    },
    getPrints: async () => prints,
    getFutureCatalogue: async () => visionCatalogue,
    getEssays: async () => essays,
    findAcquirable: async (slug) => prints.find((print) => print.slug === slug),
    findEssay: async (slug) => essays.find((essay) => essay.slug === slug),
  };
}

describe("hybrid catalogue repository", () => {
  it("composes Neon Books with static Prints, Essays, and Future Catalogue", async () => {
    const neonBook = { ...books[0], title: "Read from fake Neon" };
    const bookRepository: BookRepository = {
      getBooks: vi.fn().mockResolvedValue([neonBook]),
      findBook: vi.fn().mockResolvedValue(neonBook),
    };
    const queries = createCatalogQueries(
      createHybridCatalogRepository(bookRepository, createStaticRepository()),
    );

    expect(await queries.getBookstoreItems()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: "Read from fake Neon", type: "book" }),
        expect.objectContaining({ type: "print" }),
      ]),
    );
    expect(await queries.getPublishedEssays()).toEqual(
      expect.arrayContaining([expect.objectContaining({ type: "essay" })]),
    );
    expect(await queries.getFutureCatalogueItems()).toBe(visionCatalogue.features);
  });

  it("retrieves Studio Prints without invoking the Neon Book adapter", async () => {
    const bookRepository: BookRepository = {
      getBooks: vi.fn().mockRejectedValue(new Error("Neon should not be called")),
      findBook: vi.fn().mockRejectedValue(new Error("Neon should not be called")),
    };
    const queries = createCatalogQueries(
      createHybridCatalogRepository(bookRepository, createStaticRepository()),
    );

    await expect(queries.getStudioItems()).resolves.toEqual(
      prints.filter((print) => print.status !== "draft" && print.source.kind === "studio"),
    );
    expect(bookRepository.getBooks).not.toHaveBeenCalled();
  });

  it("resolves a static Print lookup without invoking Neon", async () => {
    const bookRepository: BookRepository = {
      getBooks: vi.fn().mockRejectedValue(new Error("Neon should not be called")),
      findBook: vi.fn().mockRejectedValue(new Error("Neon should not be called")),
    };
    const repository = createHybridCatalogRepository(
      bookRepository,
      createStaticRepository(),
    );

    await expect(repository.findAcquirable("first-light")).resolves.toMatchObject({
      type: "print",
      slug: "first-light",
    });
    expect(bookRepository.findBook).not.toHaveBeenCalled();
  });
});

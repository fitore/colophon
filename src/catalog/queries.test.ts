import { describe, expect, it } from "vitest";
import type { CatalogRepository } from "./repository";
import { createCatalogQueries } from "./queries";
import { mainCatalogue, visionCatalogue } from "@/data/catalogues";
import { essays } from "@/data/essays";

describe("catalogue query surface", () => {
  it("expresses page projections without exposing storage", async () => {
    const repository: CatalogRepository = {
      getMainCatalogue: async () => mainCatalogue,
      getFutureCatalogue: async () => visionCatalogue,
      getEssays: async () => essays,
      findAcquirable: async (slug) => mainCatalogue.features.find((item) => item.slug === slug),
      findEssay: async (slug) => essays.find((essay) => essay.slug === slug),
    };
    const queries = createCatalogQueries(repository);

    expect((await queries.getBookstoreItems()).every((item) => item.status !== "draft")).toBe(true);
    expect((await queries.getPressItems()).every((item) => item.source.kind === "imprint")).toBe(true);
    expect((await queries.getStudioItems()).every((item) => item.source.kind === "studio")).toBe(true);
    expect((await queries.getPublishedEssays()).every((essay) => essay.status === "published")).toBe(true);
  });
});

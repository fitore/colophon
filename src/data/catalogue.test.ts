import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import * as people from "@/data/people";
import * as sources from "@/data/sources";
import {
  books,
  essays,
  getCatalogueImage,
  mainCatalogue,
  prints,
  visionCatalogue,
} from "@/data";

describe("catalogue data invariants", () => {
  const acquirables = [...books, ...prints];

  it("uses unique route slugs", () => {
    expect(new Set(acquirables.map((item) => item.slug)).size).toBe(acquirables.length);
    expect(new Set(essays.map((essay) => essay.slug)).size).toBe(essays.length);
  });

  it("uses shared source and person records", () => {
    const knownSources = new Set(Object.values(sources));
    const knownPeople = new Set(Object.values(people));

    for (const item of [...acquirables, ...essays]) {
      expect(item.contributors.length).toBeGreaterThan(0);
      for (const contributor of item.contributors) {
        expect(knownPeople.has(contributor.person)).toBe(true);
      }
    }

    for (const item of acquirables) {
      expect(knownSources.has(item.source)).toBe(true);
    }
  });

  it("uses positive CAD prices", () => {
    for (const item of acquirables.filter((entry) => entry.price)) {
      expect(item.price?.currency).toBe("CAD");
      expect(item.price?.amount).toBeGreaterThan(0);
    }
  });

  it("resolves essay book references", () => {
    const bookSlugs = new Set(books.map((book) => book.slug));
    for (const essay of essays.filter((entry) => entry.aboutBookSlug)) {
      expect(bookSlugs.has(essay.aboutBookSlug!)).toBe(true);
    }
  });

  it("resolves every public catalogue image to a file", () => {
    for (const item of acquirables) {
      expect(existsSync(join(process.cwd(), "public", getCatalogueImage(item)))).toBe(true);
    }
  });

  it("catalogues reference canonical item objects", () => {
    for (const item of mainCatalogue.features) {
      expect(acquirables).toContain(item);
    }
    for (const item of visionCatalogue.features) {
      expect(acquirables).toContain(item);
    }
  });
});

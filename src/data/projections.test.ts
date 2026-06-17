import { describe, expect, it } from "vitest";
import {
  catalogueFilters,
  getPressBooks,
  getStudioPrints,
  matchesCatalogueFilter,
  publicAcquirables,
  publishedEssays,
  visionCatalogue,
} from "@/data";

describe("public projections", () => {
  it("excludes drafts from the public catalogue", () => {
    expect(publicAcquirables.every((item) => item.status !== "draft")).toBe(true);
    expect(publicAcquirables.map((item) => item.slug)).not.toContain("a-field-guide-to-paper");
    expect(publicAcquirables.map((item) => item.slug)).not.toContain("paper-study-one");
  });

  it("projects Press books from the imprint", () => {
    expect(getPressBooks().map((book) => book.slug))
      .toEqual(["on-making", "the-quiet-page", "forms-of-permanence"]);
  });

  it("projects Studio prints from the studio source", () => {
    expect(getStudioPrints().map((print) => print.slug))
      .toEqual(["first-light", "house-mark-broadside"]);
  });

  it("publishes only published essays", () => {
    expect(publishedEssays.every((essay) => essay.status === "published")).toBe(true);
    expect(publishedEssays.map((essay) => essay.slug)).not.toContain("working-notes-on-binding");
  });

  it("keeps the vision catalogue hidden", () => {
    expect(visionCatalogue.visibility).toBe("hidden");
  });

  it.each(catalogueFilters)("filters the catalogue by %s", (filter) => {
    const matches = publicAcquirables.filter((item) => matchesCatalogueFilter(item, filter));
    if (filter === "All") expect(matches).toEqual(publicAcquirables);
    if (filter === "Books") expect(matches.every((item) => item.type === "book")).toBe(true);
    if (filter === "Prints") expect(matches.every((item) => item.type === "print")).toBe(true);
    if (filter === "Third-party") {
      expect(matches.every((item) => item.source.kind === "external")).toBe(true);
    }
  });
});

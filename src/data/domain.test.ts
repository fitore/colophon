import { describe, expect, it } from "vitest";
import {
  books,
  colophonSource,
  externalArtistSource,
  externalPublisherSource,
  formatMoney,
  getAcquisitionCta,
  getCatalogueImage,
  getContributorLabel,
  getOriginLabel,
  getSourceLabel,
  getStatusLabel,
  prints,
  studioSource,
} from "@/data";
import { isInHouseSource } from "@/types/catalog";

describe("catalogue domain helpers", () => {
  it("formats CAD prices without cents", () => {
    expect(formatMoney({ amount: 32, currency: "CAD" })).toBe("$32");
    expect(formatMoney()).toBe("");
  });

  it("formats source, origin, contributor, and status labels", () => {
    expect(getSourceLabel(colophonSource)).toBe("Colophon · Bookstore & Press");
    expect(getSourceLabel(studioSource)).toBe("The Studio");
    expect(getOriginLabel(externalPublisherSource)).toBe("Selected from elsewhere");
    expect(getContributorLabel(books[0])).toBe("Written by Aldous Fenn");
    expect(getStatusLabel(prints.find((item) => item.slug === "house-mark-broadside")!)).toBe("Sold out");
  });

  it("identifies in-house sources", () => {
    expect(isInHouseSource(colophonSource)).toBe(true);
    expect(isInHouseSource(studioSource)).toBe(true);
    expect(isInHouseSource(externalArtistSource)).toBe(false);
  });

  it("selects placeholders by item type and source", () => {
    expect(getCatalogueImage(books.find((item) => item.slug === "on-making")!))
      .toBe("/images/books/placeholder-book.png");
    expect(getCatalogueImage(books.find((item) => item.slug === "margins")!))
      .toBe("/images/books/placeholder-external-book.png");
    expect(getCatalogueImage(prints.find((item) => item.slug === "first-light")!))
      .toBe("/images/books/print-placeholder.png");
    expect(getCatalogueImage(prints.find((item) => item.slug === "still-water")!))
      .toBe("/images/books/placeholder-external-print.png");
  });

  it("uses lifecycle-aware acquisition calls to action", () => {
    expect(getAcquisitionCta(books.find((item) => item.slug === "a-field-guide-to-paper")!))
      .toEqual({ label: "Not yet available", disabled: true });
    expect(getAcquisitionCta(books.find((item) => item.slug === "the-quiet-page")!))
      .toMatchObject({ label: "Join the list" });
    expect(getAcquisitionCta(books.find((item) => item.slug === "forms-of-permanence")!))
      .toEqual({ label: "View record", disabled: true });
    expect(getAcquisitionCta(prints.find((item) => item.slug === "house-mark-broadside")!))
      .toEqual({ label: "View record", disabled: true });
    expect(getAcquisitionCta(books.find((item) => item.slug === "on-making")!))
      .toMatchObject({ label: "Inquire / Acquire" });
    expect(getAcquisitionCta(books.find((item) => item.slug === "the-book-as-shelter")!))
      .toMatchObject({ label: "Inquire" });
  });

  it("encodes item titles in mailto subjects", () => {
    expect(getAcquisitionCta(books.find((item) => item.slug === "the-quiet-page")!).href)
      .toContain("Interest%20in%20The%20Quiet%20Page");
  });
});

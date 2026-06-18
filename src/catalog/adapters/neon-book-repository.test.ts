import { describe, expect, it, vi } from "vitest";
import { createNeonBookRepository, mapBookRow } from "./neon-book-repository";

const row = {
  slug: "database-book",
  title: "Database Book",
  condition: "new",
  status: "for-sale",
  source: {
    kind: "imprint",
    name: "Colophon",
    slug: "colophon",
    lockup: "Colophon · Bookstore & Press",
  },
  contributors: [
    {
      person: { name: "Mira Solenne", slug: "mira-solenne" },
      role: "author",
    },
  ],
  formats: ["Softcover"],
  isbn: "978-1-00000-003-5",
  description: "Read from Neon.",
  price: { amount: 36, currency: "CAD" },
  image: null,
};

describe("Neon Book repository", () => {
  it("maps database rows back into the existing Book domain shape", () => {
    expect(mapBookRow(row)).toEqual({
      type: "book",
      ...row,
      image: undefined,
    });
  });

  it("uses a parameterized lookup without exposing SQL to consumers", async () => {
    const query = vi.fn().mockResolvedValue([row]);
    const repository = createNeonBookRepository(query);

    await expect(repository.findBook("database-book")).resolves.toMatchObject({
      type: "book",
      slug: "database-book",
    });
    expect(query).toHaveBeenCalledWith(expect.stringContaining("where slug = $1"), [
      "database-book",
    ]);
  });

  it("rejects rows that do not satisfy the Book contract", () => {
    expect(() => mapBookRow({ ...row, status: "available" })).toThrow(
      "status is not a known lifecycle value",
    );
  });
});

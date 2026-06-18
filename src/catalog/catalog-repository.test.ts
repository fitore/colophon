import { describe, expect, it } from "vitest";
import { createConfiguredBookRepository } from "./catalog-repository";

describe("configured Book repository", () => {
  it("uses static Books when DATABASE_URL is absent outside Vercel", async () => {
    const repository = createConfiguredBookRepository({});

    await expect(repository.getBooks()).resolves.toEqual(
      expect.arrayContaining([expect.objectContaining({ type: "book" })]),
    );
  });

  it("rejects a Vercel configuration without DATABASE_URL", () => {
    expect(() => createConfiguredBookRepository({ VERCEL_ENV: "preview" })).toThrow(
      "DATABASE_URL is required on Vercel",
    );
  });

  it("constructs a Neon repository when DATABASE_URL is present", () => {
    expect(
      createConfiguredBookRepository({
        DATABASE_URL: "postgresql://user:password@example.test/database",
        VERCEL_ENV: "preview",
      }),
    ).toEqual({
      getBooks: expect.any(Function),
      findBook: expect.any(Function),
    });
  });
});

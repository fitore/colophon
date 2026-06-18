import type { BookRepository } from "./repository";
import { createHybridCatalogRepository } from "./adapters/hybrid-catalog-repository";
import { createNeonBookRepository } from "./adapters/neon-book-repository";
import { createNeonQuery } from "./adapters/neon-query";
import { staticCatalogRepository } from "./adapters/static-catalog-repository";

let warnedAboutLocalFallback = false;

type CatalogEnvironment = {
  DATABASE_URL?: string;
  VERCEL_ENV?: string;
};

function localStaticBookRepository(): BookRepository {
  if (!warnedAboutLocalFallback) {
    console.warn(
      "DATABASE_URL is not set; catalogue Book reads are using the documented local static fallback.",
    );
    warnedAboutLocalFallback = true;
  }

  return {
    getBooks: () => staticCatalogRepository.getBooks(),
    findBook: async (slug) => {
      const item = await staticCatalogRepository.findAcquirable(slug);
      return item?.type === "book" ? item : undefined;
    },
  };
}

export function createConfiguredBookRepository(
  environment?: CatalogEnvironment,
): BookRepository {
  const resolvedEnvironment = environment ?? {
    DATABASE_URL: process.env.DATABASE_URL,
    VERCEL_ENV: process.env.VERCEL_ENV,
  };
  const connectionString = resolvedEnvironment.DATABASE_URL;
  if (connectionString) {
    return createNeonBookRepository(createNeonQuery(connectionString));
  }

  if (resolvedEnvironment.VERCEL_ENV) {
    throw new Error(
      "DATABASE_URL is required on Vercel because main operational Books use Neon.",
    );
  }

  return localStaticBookRepository();
}

export const catalogRepository = createHybridCatalogRepository(
  createConfiguredBookRepository(),
  staticCatalogRepository,
);

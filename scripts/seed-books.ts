import { createNeonQuery } from "../src/catalog/adapters/neon-query";
import { mainCatalogue } from "../src/data/catalogues";
import type { Book } from "../src/types/catalog";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required to seed main operational Books.");
  }

  const query = createNeonQuery(connectionString);
  const books = mainCatalogue.features.filter(
    (item): item is Book => item.type === "book",
  );

  for (const book of books) {
    await query(
      `
      insert into books (
        slug,
        title,
        condition,
        status,
        source,
        contributors,
        formats,
        isbn,
        description,
        price,
        image,
        updated_at
      )
      values (
        $1,
        $2,
        $3,
        $4,
        $5::jsonb,
        $6::jsonb,
        $7::jsonb,
        $8,
        $9,
        $10::jsonb,
        $11,
        now()
      )
      on conflict (slug) do update set
        title = excluded.title,
        condition = excluded.condition,
        status = excluded.status,
        source = excluded.source,
        contributors = excluded.contributors,
        formats = excluded.formats,
        isbn = excluded.isbn,
        description = excluded.description,
        price = excluded.price,
        image = excluded.image,
        updated_at = now()
      `,
      [
        book.slug,
        book.title,
        book.condition,
        book.status,
        JSON.stringify(book.source),
        JSON.stringify(book.contributors),
        book.formats ? JSON.stringify(book.formats) : null,
        book.isbn ?? null,
        book.description ?? null,
        book.price ? JSON.stringify(book.price) : null,
        book.image ?? null,
      ],
    );
  }

  console.log(`Seeded ${books.length} main operational Books.`);
}

void main();

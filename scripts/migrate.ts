import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createNeonQuery } from "../src/catalog/adapters/neon-query";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required to apply database migrations.");
  }

  const migrationPath = fileURLToPath(
    new URL("../db/migrations/0001_main_books.sql", import.meta.url),
  );
  const statements = (await readFile(migrationPath, "utf8"))
    .split("-- statement-breakpoint")
    .map((statement) => statement.trim())
    .filter(Boolean);
  const query = createNeonQuery(connectionString);

  for (const statement of statements) {
    await query(statement);
  }

  console.log(`Applied ${statements.length} migration statements.`);
}

void main();

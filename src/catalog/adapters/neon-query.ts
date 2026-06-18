import { neon } from "@neondatabase/serverless";
import type { DatabaseQuery, DatabaseRow } from "./neon-book-repository";

export function createNeonQuery(connectionString: string): DatabaseQuery {
  const sql = neon(connectionString);

  return async (statement, parameters = []) => {
    const rows = await sql.query(statement, [...parameters]);
    return rows as DatabaseRow[];
  };
}

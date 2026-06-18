import type {
  Book,
  BookStatus,
  Condition,
  Money,
  PersonRoleLink,
  Source,
} from "@/types/catalog";
import type { BookRepository } from "@/catalog/repository";

export type DatabaseRow = Record<string, unknown>;
export type DatabaseQuery = (
  statement: string,
  parameters?: readonly unknown[],
) => Promise<DatabaseRow[]>;

const bookColumns = `
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
  image
`;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(value: unknown, field: string): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Invalid Book row: ${field} must be a non-empty string`);
  }
  return value;
}

function optionalString(value: unknown, field: string): string | undefined {
  if (value === null || value === undefined) return undefined;
  return requiredString(value, field);
}

function parseCondition(value: unknown): Condition {
  if (value === "new" || value === "used") return value;
  throw new Error("Invalid Book row: condition is not a known value");
}

function parseStatus(value: unknown): BookStatus {
  if (
    value === "draft" ||
    value === "forthcoming" ||
    value === "for-sale" ||
    value === "out-of-print"
  ) {
    return value;
  }
  throw new Error("Invalid Book row: status is not a known lifecycle value");
}

function parseSource(value: unknown): Source {
  if (!isRecord(value)) throw new Error("Invalid Book row: source must be an object");
  const kind = value.kind;
  if (kind !== "imprint" && kind !== "studio" && kind !== "external") {
    throw new Error("Invalid Book row: source.kind is not known");
  }
  return {
    kind,
    name: requiredString(value.name, "source.name"),
    slug: requiredString(value.slug, "source.slug"),
    lockup: optionalString(value.lockup, "source.lockup"),
  };
}

function parseContributors(value: unknown): PersonRoleLink[] {
  if (!Array.isArray(value)) {
    throw new Error("Invalid Book row: contributors must be an array");
  }

  return value.map((link, index) => {
    if (!isRecord(link) || !isRecord(link.person)) {
      throw new Error(`Invalid Book row: contributors[${index}] is malformed`);
    }
    const role = link.role;
    if (
      role !== "author" &&
      role !== "artist" &&
      role !== "editor" &&
      role !== "translator" &&
      role !== "illustrator" &&
      role !== "printer"
    ) {
      throw new Error(`Invalid Book row: contributors[${index}].role is not known`);
    }
    return {
      role,
      person: {
        name: requiredString(link.person.name, `contributors[${index}].person.name`),
        slug: requiredString(link.person.slug, `contributors[${index}].person.slug`),
        bio: optionalString(link.person.bio, `contributors[${index}].person.bio`),
        photo: optionalString(link.person.photo, `contributors[${index}].person.photo`),
      },
    };
  });
}

function parseFormats(value: unknown): string[] | undefined {
  if (value === null || value === undefined) return undefined;
  if (!Array.isArray(value) || !value.every((format) => typeof format === "string")) {
    throw new Error("Invalid Book row: formats must be an array of strings");
  }
  return value;
}

function parsePrice(value: unknown): Money | undefined {
  if (value === null || value === undefined) return undefined;
  if (
    !isRecord(value) ||
    typeof value.amount !== "number" ||
    !Number.isFinite(value.amount) ||
    value.currency !== "CAD"
  ) {
    throw new Error("Invalid Book row: price must be a CAD money object");
  }
  return { amount: value.amount, currency: "CAD" };
}

export function mapBookRow(row: DatabaseRow): Book {
  return {
    type: "book",
    slug: requiredString(row.slug, "slug"),
    title: requiredString(row.title, "title"),
    condition: parseCondition(row.condition),
    status: parseStatus(row.status),
    source: parseSource(row.source),
    contributors: parseContributors(row.contributors),
    formats: parseFormats(row.formats),
    isbn: optionalString(row.isbn, "isbn"),
    description: optionalString(row.description, "description"),
    price: parsePrice(row.price),
    image: optionalString(row.image, "image"),
  };
}

export function createNeonBookRepository(query: DatabaseQuery): BookRepository {
  return {
    getBooks: async () => {
      const rows = await query(`select ${bookColumns} from books order by slug`);
      return rows.map(mapBookRow);
    },
    findBook: async (slug) => {
      const rows = await query(
        `select ${bookColumns} from books where slug = $1 limit 1`,
        [slug],
      );
      return rows[0] ? mapBookRow(rows[0]) : undefined;
    },
  };
}

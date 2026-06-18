# Colophon

Colophon is an online-first publishing house, bookshop, and print studio based in Ontario, Canada. The site is a presence and soft-commerce experiment: it presents a shared catalogue of books and prints, records work produced through the Press and Studio, and handles acquisition interest through email rather than a cart or checkout.

## Scope

Phase 1 is deliberately small: presence, editorial context, a shared catalogue,
and email-based acquisition interest. It does not include a cart, checkout,
payment platform, inventory system, or public search.

The hidden `/future-catalogue` route is a catalogue-direction study rather than
a live commerce surface.

## Catalogue architecture

Colophon is also a small data-architecture proving ground. Catalogue consumers
are intentionally independent from storage:

```text
page or component
  → named catalogue query
    → CatalogRepository
      → hybrid repository
        → Neon adapter for main operational Books
        → static adapter for Prints, Essays, and Future Catalogue
```

Pages and components must not import `src/data` directly. Named projections for
the Bookstore, Press, Studio, and Future Catalogue live behind the asynchronous
query boundary in `src/catalog`.

Neon is the system of record for main operational Books. Repository-owned
static data remains the system of record for Prints, Essays, and the Future
Catalogue. Static Books remain as seed input, local fallback, and rollback
material. Page-level APIs do not know which backend supplies a record.

Architecture references:

- [Data architecture](docs/data-architecture.md)
- [Catalogue ontology](docs/ontology.md)
- [Projection map](docs/projection-map.md)
- [ADR-001: Repository as the current system of record](docs/adr/ADR-001-repo-as-system-of-record.md)
- [ADR-002: Neon for main operational Books](docs/adr/ADR-002-neon-as-system-of-record-for-main-books.md)
- [System-of-record registry](docs/system-of-record-registry.md)
- [Round 2 data flow](docs/data-flow-round-2.md)

## Routes

- `/` — Home
- `/bookstore` — Public catalogue of books and prints
- `/bookstore/[slug]` — Book or print detail
- `/the-press` — Colophon imprint books and supporting editorial
- `/the-press/[slug]` — Editorial post
- `/studio` — Studio prints, programme, and services
- `/about` — About Colophon
- `/future-catalogue` — Hidden future catalogue study

## Tech stack

- Next.js 16 with the App Router
- React 19
- TypeScript in strict mode
- CSS Modules and CSS custom properties
- `next/font` and `next/image`
- Vitest and Playwright
- pnpm
- Vercel

## Development

```bash
pnpm dev
pnpm typecheck
pnpm test
pnpm test:e2e
pnpm build
```

Node.js 20 or newer is required.

Local development uses the static Book fallback when `DATABASE_URL` is absent.
To prepare a configured Neon database:

```bash
DATABASE_URL=... pnpm db:migrate
DATABASE_URL=... pnpm db:seed:books
```

Vercel deployments require `DATABASE_URL`. A failed Neon query never silently
falls back to static Books.

## Deployment

Git branches and Neon database branches are separate. Confirm the selected Neon
project, branch, and database before applying either command:

```bash
export DATABASE_URL='postgresql://...'
pnpm db:migrate
pnpm db:seed:books
```

Both commands are safe to rerun: the migration uses `if not exists` and the
seed upserts Books by `slug`. Verify the target in Neon’s SQL Editor:

```sql
select count(*) from public.books;
select count(*) from public.book_acquirables;
```

Both counts should be `7`.

The Vercel Preview environment has been migrated, seeded, and verified. After
the Round 2 pull request merges, migrate and seed the Production Neon
branch/database, add its pooled connection string as `DATABASE_URL` in Vercel’s
Production environment, and deploy `main`.

Colophon was built in collaboration with [OpenAI Codex](https://openai.com/codex/).

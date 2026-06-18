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
      → static adapter
        → repository-owned records
```

Pages and components must not import `src/data` directly. Named projections for
the Bookstore, Press, Studio, and Future Catalogue live behind the asynchronous
query boundary in `src/catalog`.

The repository is the current system of record. A future storage adapter can
replace part of the static implementation without changing page-level APIs.

Architecture references:

- [Data architecture](docs/data-architecture.md)
- [Catalogue ontology](docs/ontology.md)
- [Projection map](docs/projection-map.md)
- [ADR-001: Repository as the current system of record](docs/adr/ADR-001-repo-as-system-of-record.md)

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

Colophon was built in collaboration with [OpenAI Codex](https://openai.com/codex/).

# CLAUDE.md — Colophon

> This is the canonical agent instruction file. `AGENTS.md` is a symlink (or byte-identical copy) of this file so that Codex and Claude Code read the same source of truth. If you edit one, `diff CLAUDE.md AGENTS.md` must return nothing.

## What this is

Colophon is an online-first publishing, press, and bookshop experiment based in Ontario, Canada.

Phase 1 is presence + soft commerce:
- Home
- Bookstore
- The Press
- The Studio
- About
- Hidden future catalogue taster at /future-catalogue

This is a PMF experiment without a paid platform. Do not build full ecommerce yet.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript strict
- pnpm
- CSS Modules
- CSS custom properties
- next/font
- next/image
- Vitest
- Playwright
- Vercel

## Next.js 16 specifics (read before writing any route)

- **Dynamic route `params` is async.** In `/bookstore/[slug]` and `/the-press/[slug]`, `params` is a `Promise` and must be awaited:
  ```ts
  export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    // ...
  }
  ```
- **`next lint` no longer exists.** Linting is run via the package.json `lint` script (ESLint flat config), not `next build`. The gates that must pass are `pnpm typecheck` and `pnpm build`; treat `pnpm lint` as advisory.
- **`next build` does not lint.** Don't rely on the build to catch lint issues.

## Hard rules

- TypeScript strict. No `any`.
- No Tailwind.
- No UI library.
- No inline styles.
- No hard-coded hex colours in components or CSS modules.
- All colors, spacing, and typography come from `src/styles/tokens.css`.
- No cart, no checkout, no Stripe, no Shopify, no Wix.
- No cart icon in Phase 1.
- No fake urgency, countdowns, popups, or email-capture gates.
- No “Studio Colophon” anywhere.
- Public brand is `Colophon`.
- Imprint lockup, where needed: `Colophon · Bookstore & Press`.
- Ruby is reserved for scarcity/status labels only. No ruby buttons.
- Primary CTAs use ink background and paper text.
- No text on top of glass artwork.
- Every meaningful image needs alt text.
- Dummy data may leave image fields undefined. Catalogue components select the appropriate placeholder asset by item type and source. Real item images always take precedence.
- Placeholder mappings:
  - Colophon/imprint book: `/images/books/placeholder-book.png`
  - External/third-party book: `/images/books/placeholder-external-book.png`
  - Studio print: `/images/books/print-placeholder.png`
  - External/third-party print: `/images/books/placeholder-external-print.png`
- Never reference an image path that doesn't exist on disk — `next/image` will error.
- **Encode mailto subjects** with `encodeURIComponent` so titles with spaces/punctuation don't mangle.
- **Glass artwork is user-managed.** Do not replace, regenerate, rename, or edit files in `public/images/glass/` unless explicitly requested.
- Glass artwork renders frameless, without CSS borders, and never has text overlaid.
- “Keep the Record” appears once in the global footer across the entire site. Do not add page-level or Studio-specific newsletter sections.
- The global footer has one ornament divider above it and no internal rules.

## Routes

- `/` Home
- `/bookstore` Public catalogue of books and prints
- `/bookstore/[slug]` Book or print detail
- `/the-press` Colophon imprint books with supporting editorial
- `/the-press/[slug]` Editorial post
- `/studio` Studio prints, programme, and services
- `/about` About
- `/future-catalogue` Hidden future catalogue taster, linked quietly from About
- `/vision-catalogue` Legacy redirect to `/future-catalogue`
- `not-found.tsx` Custom 404

## Main nav

`BOOKSTORE | THE PRESS | THE STUDIO | ABOUT`

No cart icon. No search in Phase 1 unless explicitly requested later.
`/future-catalogue` is NOT in the main nav — it is linked only from /about.

## Glass artwork

Current page mappings:

```txt
Home hero: hero-hand-mark.png
Bookstore: bookstore-pillar.png
The Press: press-pillar.png
The Studio: studio-panel.png
About: about-panel.png
```

When a user manually replaces an image while keeping the same filename, verify the actual file contents before changing code. If Next.js serves a stale version, clear `.next`, restart the development server, and rebuild. A checkerboard visibly embedded in the source image is part of the asset, not a cache issue.

## CTA language

Homepage:
- `BROWSE BOOKS`
- `THE PRESS`

Catalogue CTA labels are lifecycle-aware:
- Draft: `NOT YET AVAILABLE`
- Forthcoming book: `JOIN THE LIST`
- For-sale item with price: `INQUIRE / ACQUIRE`
- For-sale item without price: `INQUIRE`
- Out-of-print book or sold-out print: `VIEW RECORD`

## Soft commerce

Acquire actions use mailto (subject encoded):

`mailto:hello@colophon.press?subject=` + `encodeURIComponent('Acquire: ' + title)`

Newsletter/record interest uses:

`mailto:hello@colophon.press?subject=` + `encodeURIComponent('Keep the Record')`

The canonical contact address is `hello@colophon.press`. Do not introduce
legacy brand names or contact domains.

## Catalogue architecture

The shared typed domain layer lives in `src/types/catalog.ts`. Repository-owned
static records live in `src/data/`; pages and components must not import them
directly.

```txt
Catalog / Shop = system of record for what is sold
Production / Press & Studio = origin contexts for what Colophon makes
Commerce = action layer over anything Acquirable
```

Catalogue access follows this boundary:

```txt
page or component
  -> named query in src/catalog/queries.ts
      -> CatalogRepository port
          -> static adapter
              -> src/data
```

- `CatalogRepository` is asynchronous so consumers do not depend on the static
  adapter's execution model.
- `src/catalog/adapters/static-catalog-repository.ts` is the only production
  code allowed to read raw catalogue records.
- Pages consume named business projections such as `getBookstoreItems()`,
  `getPressItems()`, `getStudioItems()`, and `getFutureCatalogueItems()`.
- Presentation helpers and client-side catalogue filters live in `src/catalog/`;
  they do not define storage.
- Direct `@/data` imports from `src/app` and `src/components` are prohibited by
  ESLint and an architecture test.
- Keep the repository port intentionally small. Do not introduce an ORM, SDK
  framework, database, or storage-shaped methods without an explicit task.

Architecture decisions and meaning are documented in:

- `docs/data-architecture.md`
- `docs/ontology.md`
- `docs/projection-map.md`
- `docs/adr/ADR-001-repo-as-system-of-record.md`

Core entities:
- `Book`
- `Print`
- `Essay`
- `Person`
- `Source`
- `Catalogue`
- `Acquirable = Book | Print`

Books and prints are sibling sellable objects in the shared catalogue. Do not create independent page-specific arrays such as `bookstoreBooks`, `pressBooks`, or `studioPrints`.

Page projections:
- `/bookstore` consumes the Bookstore projection: public, non-draft `Acquirable` items from the main catalogue.
- `/the-press` consumes the Press and published-Essay projections: non-draft books whose source kind is `imprint`, plus published essays as supporting editorial.
- `/studio` consumes the Studio projection: non-draft prints whose source kind is `studio`, alongside programme and service content.
- `/future-catalogue` consumes the hidden Future Catalogue projection. It must remain absent from the main navigation.

Contributors use one shared `Person` model. Roles such as author, artist, editor, translator, illustrator, and printer live on the relationship.

Lifecycle rules:
- Draft books, prints, and essays do not appear publicly.
- Forthcoming books remain visible with a list-interest CTA.
- Out-of-print books and sold-out prints remain visible as records.
- Archived essays remain excluded unless an archive pattern is deliberately added.

## Agent behavior

- Read relevant files before editing.
- Make the smallest change that satisfies the task.
- Run `pnpm typecheck`, `pnpm test`, and `pnpm build` as the core gates. Run `pnpm lint` if a script exists.
- Run `pnpm test:e2e` for route, interaction, projection, or client-side filtering changes. Visual regression testing is not configured.
- If a script is missing, add it (`"typecheck": "tsc --noEmit"`).
- Stop and report what changed, what passed, and what remains.
- One task, one diff, one commit. Do not expand scope. Do not build multiple phases in one pass.
- After a pull request is merged, update `main` and create a new branch for the next isolated change. Do not continue adding commits to the merged branch.

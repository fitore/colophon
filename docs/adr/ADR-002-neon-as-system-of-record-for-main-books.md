# ADR-002: Neon as system of record for main operational Books

- Status: Accepted
- Date: 2026-06-18

## Context

Round 1 separated catalogue consumers from repository-owned static records.
Round 2 must prove that the system of record can change without changing pages,
routes, or the named query surface.

The original repository contract returned the combined main catalogue. That
shape would force Print and Studio queries to touch Neon when only Books moved.
The contract therefore needs a small domain-oriented refinement before the
storage split can be honest.

## Decision

Neon is the system of record for Books in the main operational catalogue.
Prints, Essays, Studio content, and the Future Catalogue remain
repository-owned static data.

The repository exposes independent Book and Print reads. A hybrid implementation
routes Book reads and Book lookups to Neon, while delegating non-Book reads to
the static adapter. Existing page-level query functions remain unchanged.

The `books` table preserves the current Book domain shape. Structured Source,
contributor links, formats, and price are represented as JSONB rather than
flattened or redesigned. The `book_acquirables` view is a serving projection of
the Neon-resident Book subset, not the complete `Acquirable` ontology.

Future Catalogue remains a static curated projection. It may contain static
Book snapshots whose slugs overlap Neon Books; that overlap does not transfer
its system of record to Neon.

## Why Books moved first

Books participate in both the Bookstore and Press projections, making them a
useful proof that one stored concept can serve multiple consumers. Moving
Prints or Essays as well would enlarge the migration without strengthening the
storage-invariance demonstration.

## Consequences

- Page-level consumers retain their existing query contracts.
- Bookstore composes Neon Books with static Prints.
- Press reads Neon Books.
- Studio reads static Prints and does not depend on Neon availability.
- Static Books remain seed input, local fallback, and rollback material.
- Missing `DATABASE_URL` is permitted only outside Vercel; Neon query failures
  never silently fall back.
- The application keeps its existing Next.js rendering behavior. This decision
  does not add dynamic rendering or revalidation.

## Derived information

Bookstore, Press, Studio, published-Essay, public lookup, and Future Catalogue
results are projections. `book_acquirables` is also a serving projection.
Neither page output nor the SQL view is an independent system of record.

## Rollback

Remove `DATABASE_URL` outside Vercel to activate the documented static Book
adapter. For a production rollback, explicitly configure the application to use
the static Book repository and redeploy; do not implement an automatic fallback
that could hide database failure or serve stale records.

# Colophon data architecture proving ground

![Colophon data-architecture development plan](./assets/colophon-dataarch-plan.png)

Colophon is a deliberately small system used to prove architectural judgement:
naming systems of record, separating ontology from storage, creating typed access
boundaries, and demonstrating storage invariance. The decision trail—the
ontology, ADRs, projection map, and diagrams—is the portfolio. Code exists to
earn the written decisions.

This is not a large commerce platform. Restraint is part of the demonstration:
knowing what not to build is a skill.

## Principles

- Meaning before shape.
- Consumers talk to the query surface, never to storage.
- Every round ends in written artifacts.

## Round 1 — establish the architectural seam

Round 1 is an architectural move, not feature work. The site should look and
behave the same afterward.

Scope:

- define the ontology and explain schema versus ontology;
- introduce the `CatalogRepository` port;
- place the existing static catalogue behind an adapter;
- expose a small, named catalogue query surface;
- name the Bookstore, Press, Studio, and Future Catalogue projections;
- record the repository system-of-record decision in ADR-001; and
- mechanically prohibit UI consumers from importing `src/data`.

The proof is that pages no longer import repository-owned static records.
Instead, they request business concepts through the catalogue query surface.

## Round 2 — Neon for main operational Books

Round 2 uses the Round 1 seam to move main operational Books behind a
Neon-backed adapter. Prints, Essays, Studio content, and the Future Catalogue
remain static. Static Books remain as seed input, a local-development fallback,
and rollback material.

```text
page or component
  → named catalogue query
    → hybrid CatalogRepository
      ├── Neon Book adapter → books
      └── static adapter → Prints, Essays, Future Catalogue
```

The proof is one ontology, two storage backends, and zero page-level consumer
changes. The repository contract is domain-oriented: Books and Prints can be
retrieved independently, so Studio retrieval does not acquire a false Neon
dependency.

`book_acquirables` is a SQL serving projection of the Neon-resident Book subset.
It is not the whole ontological `Acquirable` concept, which still includes
static Prints.

### Environment and failure behavior

- When `DATABASE_URL` exists, main operational Books come from Neon.
- Outside Vercel, a missing `DATABASE_URL` activates one documented static Book
  fallback and emits a warning.
- When `VERCEL_ENV` exists, a missing `DATABASE_URL` is a configuration error.
- A Neon query failure is surfaced; production never silently returns static
  Books.

No rendering mode was changed for Round 2. The verified Next.js build
prerenders the Home, Bookstore, Press, Studio, and Future Catalogue listings.
`/bookstore/[slug]` remains server-rendered on demand and reads through the same
repository when invoked. No revalidation or forced dynamic rendering was added.

## Sequencing rule

The repository port is a prerequisite for Neon. Adding a database while pages
still import static data would wire storage to consumers and defeat the central
demonstration.

## What the two rounds can teach

- system of record versus derived data;
- schema versus ontology;
- typed access boundaries;
- storage invariance; and
- one concept represented as an interface, serving projection, and query method.

Colophon cannot authentically demonstrate partitioning, sharding, distributed
consistency, high-throughput stream processing, or multi-region data-residency
conflict. Those are design extensions, not needs to manufacture.

Event sourcing is also out of scope. If lifecycle events become useful, begin
with a modest append-only audit table. Do not call a design event sourcing
unless current state is actually rebuilt by replaying events.

Future learning paths—including event sourcing, data-product specifications,
agent APIs, governance, and a full schema-evolution programme—remain parked
until a concrete need appears.

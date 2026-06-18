# ADR-001: Repository as the current system of record

- Status: Superseded in part by ADR-002
- Date: 2026-06-18

## Context

Colophon catalogue content currently lives as typed static records in the
repository. Pages previously imported those records and assembled public views
themselves. That made the current storage shape part of each consumer and left
no stable seam for a future storage change.

Round 1 must establish consumer independence without introducing a database or
changing the site experience.

ADR-002 later moves main operational Books to Neon. This decision remains in
force for Prints, Essays, Future Catalogue, and the repository/query seam.

## Decision

The source-controlled repository is the current system of record for catalogue
content.

UI consumers access catalogue information through:

```text
page → named query → CatalogRepository port → static adapter → static records
```

`CatalogRepository` describes asynchronous access to catalogue information, not
access to files, arrays, or a particular database. The asynchronous contract
avoids leaking the static adapter's execution model to consumers. The static
adapter is the production boundary around `src/data`. Named queries expose the
Bookstore, Press, Studio, Future Catalogue, public-item, and published-essay
projections.

Pages and components are prohibited from importing `src/data` directly. ESLint
and an architecture test enforce this boundary.

## Derived information

The following are projections, not systems of record:

- public Bookstore items;
- Press Books;
- Studio Prints;
- Future Catalogue items;
- published Essays; and
- route lookups constrained by public lifecycle rules.

Presentation labels, image fallback selection, CTA wording, and catalogue
filtering are also derived behavior. They live outside the static records and
do not define storage.

## Consequences

- Pages request business concepts instead of manipulating storage-owned data.
- Projection rules have one named, reusable home.
- The static records remain simple and source-controlled for Round 1.
- A future adapter can change storage without page-level changes.
- Repository methods are intentionally small; this is not a general SDK or ORM.
- Some compatibility exports remain available to non-UI tests while the
  consumer boundary is enforced at `src/app` and `src/components`.

## Rejected for this round

Neon, database schemas, migrations, event sourcing, audit infrastructure, MCP,
agent APIs, authentication, authorization, and governance features are not
required to prove this seam and are therefore excluded.

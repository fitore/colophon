# Catalogue projection map

Named projections derive the business views consumed by routes. Their records
now come from two systems of record behind one repository boundary.

```text
Main Books in Neon ──┐
                     ├──► Hybrid CatalogRepository
Static other data ───┘
        │
        ▼
Catalogue query surface
        ├── Bookstore projection ─────────► /bookstore
        ├── Press projection ─────────────► /the-press
        ├── Studio projection ────────────► /studio
        ├── Future Catalogue projection ─► /future-catalogue
        ├── Public item lookup ───────────► /bookstore/[slug]
        └── Published essay projection ──► / and /the-press/[slug]
```

## Projection definitions

- **Bookstore** — public, non-draft Acquirable items in the main catalogue.
- **Press** — non-draft Books whose Source kind is `imprint`.
- **Studio** — non-draft Prints whose Source kind is `studio`.
- **Future Catalogue** — items curated in the hidden future catalogue,
  including drafts by design.
- **Published Essays** — Essays in the `published` lifecycle state.

Projections are derived views, not independent systems of record. Pages may
compose presentation choices from a named projection, but they do not read or
filter repository-owned records directly.

The Bookstore projection composes Neon Books and static Prints. The Press
projection reads Neon Books. The Studio projection reads static Prints directly
and does not require Neon. The Future Catalogue remains a static curated
projection, including static Book snapshots whose slugs may overlap main Books.

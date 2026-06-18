# Catalogue projection map

The repository-owned catalogue is the source. Named projections derive the
business views consumed by routes.

```text
Static catalogue records
        │
        ▼
CatalogRepository
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

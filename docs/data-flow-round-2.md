# Round 2 data flow

```text
Static main Book seed data
          │
          ▼
        Neon
          │
          ▼
  Neon Book adapter ───────────────┐
                                   │
Static Prints / Essays / Future    │
Catalogue / Studio page content    │
          │                        │
          ▼                        ▼
    Static adapter ───────► Hybrid CatalogRepository
                                   │
                                   ▼
                         Catalogue query surface
                                   │
                                   ▼
                            Page projections
```

The hybrid repository is the storage swap point. Pages and named queries do not
select a backend. Studio reads only static Prints; Future Catalogue reads only
its static curated records.

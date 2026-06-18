# System-of-record registry

| Domain concept / scope | Current system of record | Derived views |
|---|---|---|
| Main operational Books | Neon | catalogue query surface, Bookstore and Press projections, public lookup, `book_acquirables` |
| Prints | Repository/static data | catalogue query surface, Bookstore and Studio projections, public lookup |
| Essays | Repository/static data | published-Essay projection and editorial routes |
| Studio programme and services | Repository/static page content | Studio page presentation |
| Future Catalogue | Repository/static data | hidden curated projection |

Static Book records remain in the repository as migration input, local fallback,
and rollback material. They are not the production system of record when
`DATABASE_URL` is configured.

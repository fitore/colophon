# Main operational Book migration to Neon

## Source and target

The seed source is every Book in the static main catalogue, including drafts.
The target is the `books` table created by
`db/migrations/0001_main_books.sql`. Structured Source, contributor links,
formats, and price remain structured JSONB values. The `book_acquirables` view
serves the Neon-resident Book subset of the broader `Acquirable` concept.

Future Catalogue is not migrated. Its static curated snapshots remain static
even when their slugs overlap main operational Books.

## Process

```bash
DATABASE_URL=... pnpm db:migrate
DATABASE_URL=... pnpm db:seed:books
```

The seed command upserts by `slug`, so it can be run repeatedly without creating
duplicates. It updates every stored Book field and the `updated_at` timestamp.

After seeding, verify:

```sql
select count(*) from books;
select * from books where slug = 'on-making';
select * from book_acquirables order by slug;
```

Then verify Bookstore, Press, Studio, Future Catalogue, and Book detail routes in
the deployed environment.

## Rollback

Static Books are retained. Local development automatically uses them when
`DATABASE_URL` is absent. Production rollback is an explicit repository
configuration and redeployment; database failures do not trigger an automatic
stale-data fallback.

## Operational status

Code, migration, and seed tooling are implemented. Live migration, seed count,
representative-row inspection, view inspection, and deployed-route verification
remain pending because this workspace did not expose `DATABASE_URL`.

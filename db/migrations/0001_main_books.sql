create table if not exists books (
  slug text primary key,
  title text not null,
  condition text not null check (condition in ('new', 'used')),
  status text not null check (status in ('draft', 'forthcoming', 'for-sale', 'out-of-print')),
  source jsonb not null,
  contributors jsonb not null default '[]'::jsonb,
  formats jsonb,
  isbn text,
  description text,
  price jsonb,
  image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- statement-breakpoint

create or replace view book_acquirables as
select
  slug,
  title,
  condition,
  status,
  source,
  contributors,
  formats,
  isbn,
  description,
  price,
  image,
  'book'::text as item_type
from books;

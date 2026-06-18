# Colophon — Project Brief

Version: 2.0  
Date: June 2026  
Purpose: Shared implementation brief for Claude Code and Codex.

---

## 1. Product intent

Colophon is an online-first publishing, press, and bookshop experiment based in Ontario, Canada.

Phase 1 is not a full commerce site. It is a **presence + soft-commerce PMF experiment**.

The goal is to test:
- Does the concept resonate?
- Does the visual system feel credible?
- Does a curated book shelf attract interest?
- Does the press/editorial layer give the project gravity?
- Does the future catalogue direction have pull before real inventory exists?

---

## 2. Launch cut

Build:
- `/` Home
- `/bookstore` Curated external-book concept shelf
- `/bookstore/[slug]` Optional book detail page
- `/the-press` Editorial index
- `/the-press/[slug]` Editorial article page
- `/about` About
- `/vision-catalogue` Hidden future catalogue taster
- `not-found.tsx`

Do not build:
- Cart
- Checkout
- Stripe
- Shopify
- Wix
- Paid CMS
- Inventory management
- Search
- Events/workshops
- Pickup/shipping logic
- International commerce

---

## 3. Current stack

Use:
- Next.js 16 App Router
- TypeScript strict
- pnpm
- CSS Modules
- CSS custom properties
- `next/font`
- `next/image`
- Vercel

Avoid:
- Tailwind
- UI kits
- Animation libraries
- CMS until there is content pressure

---

## 4. Tooling realities to account for

### Next.js 16 async params

Dynamic routes must await params:

```ts
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
}
```

### Linting

Do not assume `next lint`. In Next.js 16 it is removed.

Use `pnpm lint` only if the scaffold defines it. If missing, add:

```json
"lint": "eslint ."
```

For Phase 1, the hard gates are:

```bash
pnpm typecheck
pnpm build
```

### Agent instruction files

Codex uses `AGENTS.md`. Claude Code uses `CLAUDE.md`.

Keep them identical. Preferred:

```bash
ln -sf CLAUDE.md AGENTS.md
```

Fallback:

```bash
cp CLAUDE.md AGENTS.md
diff CLAUDE.md AGENTS.md
```

---

## 5. Navigation

Main nav:

```txt
BOOKSTORE | THE PRESS | ABOUT
```

No cart icon.  
No search icon in Phase 1.

---

## 6. Route map

```txt
/                  Home
/bookstore         Curated external-book concept shelf
/bookstore/[slug]  Optional book detail
/the-press         Editorial index
/the-press/[slug]  Editorial article
/about             About
/vision-catalogue  Hidden future catalogue taster, linked from About
```

---

## 7. Page requirements

### Home

Sections:
1. Header
2. Hero
3. Two pillar cards
4. Colophon Books row
5. From The Press row
6. Keep the Record / newsletter mailto
7. Footer

Hero poem:

```txt
Writing becomes print.
Print becomes object.
What is made here
stays in the hand.
```

CTAs:
- `BROWSE BOOKS` → `/bookstore`
- `THE PRESS` → `/the-press`

### Bookstore

Purpose: curated external-book concept shelf.

Content:
- Title: `Bookstore`
- Subtitle: `Curated books that shape how we read, make, and remember.`
- Note: `This shelf is experimental and will change as the catalogue takes shape.`
- Dummy books only
- No filters
- No inventory
- No cart

### Book detail

Optional but useful.

Content:
- Cover placeholder or image if provided
- Title
- Author
- Category
- Curatorial note
- CTA: `ACQUIRE`
- Mailto href with encoded subject

### The Press

Purpose: editorial gravity.

Index:
- Title: `The Press`
- Subtitle: `Essays, notes, and reflections on print, editions, and the work of making.`
- Dummy post list/cards

Article:
- Title
- Date
- Tag
- Body
- Max prose width around 680px
- No sidebar
- No comments

### About

Content:
- What Colophon is
- That Phase 1 is an experiment
- Ontario, Canada
- Quiet link to `/vision-catalogue`

Link text:

```txt
View the future catalogue study
```

### Vision Catalogue

Purpose: hidden taster of the fuller future catalogue.

Content:
- Title: `Future Catalogue`
- Subtitle: `A study for editions, prints, books, and objects made with care and intention.`
- Notice: `This is a preview study, not a live catalogue.`
- Placeholder products for editions, prints, books, objects
- CTA: `ACQUIRE`
- Ruby allowed only for scarcity/status

Not in main nav.

---

## 8. Visual direction

Use the mockups as art direction only.

Look:
- White background with subtle paper warmth where useful
- Ink rules and borders
- Art Deco geometry
- Stained-glass illustrations
- Editorial typography
- Spacious grids
- Quiet, not kitsch

Do not literally copy every spacing value from the mock.

---

## 9. Color rules

- Tokens only.
- No hard-coded hex outside `tokens.css`.
- Jewel tones live in artwork.
- Ruby is for scarcity/status only.
- Primary CTAs use ink.

---

## 10. Data discipline

Use separate models:
- `Book` for Phase 1 external curated shelf
- `VisionProduct` for future catalogue taster

Do not force edition/provenance fields onto `Book`.

In dummy data, leave image fields undefined unless the asset exists.

---

## 11. Work discipline

Run agents alternating, never at the same time.

Good loop:

```bash
git status
# run one agent task
git diff
pnpm typecheck
pnpm build
pnpm lint # if configured
pnpm dev
git add .
git commit -m "Describe the completed task"
```

One task, one review, one commit.

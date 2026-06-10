# CLAUDE.md — Colophon

> This is the canonical agent instruction file. `AGENTS.md` is a symlink (or byte-identical copy) of this file so that Codex and Claude Code read the same source of truth. If you edit one, `diff CLAUDE.md AGENTS.md` must return nothing.

## What this is

Colophon is an online-first publishing, press, and bookshop experiment based in Ontario, Canada.

Phase 1 is presence + soft commerce:
- Home
- Bookstore
- The Press
- About
- Hidden future catalogue taster at /vision-catalogue

This is a PMF experiment without a paid platform. Do not build full ecommerce yet.

## Stack

- Next.js 16 (App Router)
- TypeScript strict
- pnpm
- CSS Modules
- CSS custom properties
- next/font
- next/image
- Vercel

## Next.js 16 specifics (read before writing any route)

- **Dynamic route `params` is async.** In `/bookstore/[slug]` and `/the-press/[slug]`, `params` is a `Promise` and must be awaited:
  ```ts
  export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    // ...
  }
  ```
- **`next lint` no longer exists.** Linting is run via the package.json `lint` script (ESLint flat config), not `next build`. The gates that must pass are `pnpm typecheck` and `pnpm build`; treat `pnpm lint` as advisory.
- **`next build` does not lint.** Don't rely on the build to catch lint issues.

## Hard rules

- TypeScript strict. No `any`.
- No Tailwind.
- No UI library.
- No inline styles.
- No hard-coded hex colours in components or CSS modules.
- All colors, spacing, and typography come from `src/styles/tokens.css`.
- No cart, no checkout, no Stripe, no Shopify, no Wix.
- No cart icon in Phase 1.
- No fake urgency, countdowns, popups, or email-capture gates.
- No “Studio Colophon” anywhere.
- Public brand is `Colophon`.
- Imprint lockup, where needed: `Colophon · Bookstore & Press`.
- Ruby is reserved for scarcity/status labels only. No ruby buttons.
- Primary CTAs use ink background and paper text.
- No text on top of glass artwork.
- Every meaningful image needs alt text.
- **Dummy data leaves all image fields undefined.** Components render a CSS placeholder when `src` is missing. Never reference an image path that doesn't exist on disk — `next/image` will error.
- **Encode mailto subjects** with `encodeURIComponent` so titles with spaces/punctuation don't mangle.

## Routes

- `/` Home
- `/bookstore` Curated external-book concept shelf
- `/bookstore/[slug]` Optional book detail
- `/the-press` Editorial index
- `/the-press/[slug]` Editorial post
- `/about` About
- `/vision-catalogue` Hidden future catalogue taster, linked quietly from About
- `not-found.tsx` Custom 404

## Main nav

`BOOKSTORE | THE PRESS | ABOUT`

No cart icon. No search in Phase 1 unless explicitly requested later.
`/vision-catalogue` is NOT in the main nav — it is linked only from /about.

## CTA language

Homepage:
- `BROWSE BOOKS`
- `THE PRESS`

Book cards:
- `VIEW BOOK`

Book/future catalogue CTA:
- `ACQUIRE`

## Soft commerce

Acquire actions use mailto (subject encoded):

`mailto:hello@expressed.press?subject=` + `encodeURIComponent('Acquire: ' + title)`

Newsletter/record interest uses:

`mailto:hello@expressed.press?subject=` + `encodeURIComponent('Keep the Record')`

## Content

Bookstore is a curated concept shelf of external books. Start with dummy data.

```ts
export interface Book {
  slug: string;
  title: string;
  author: string;
  note: string;
  category: string;
  coverImage?: string;   // leave undefined in dummy data
  coverAlt?: string;
  acquireUrl?: string;   // defaults to encoded mailto if missing
}
```

The full future catalogue (editions, prints, objects, provenance, scarcity) belongs on `/vision-catalogue` via the `VisionProduct` model — NOT in the bookstore `Book` model.

## Agent behavior

- Read relevant files before editing.
- Make the smallest change that satisfies the task.
- Run `pnpm typecheck` and `pnpm build` (these are the gates). Run `pnpm lint` if a script exists.
- If a script is missing, add it (`"typecheck": "tsc --noEmit"`).
- Stop and report what changed, what passed, and what remains.
- One task, one diff, one commit. Do not expand scope. Do not build multiple phases in one pass.

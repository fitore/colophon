# Colophon catalogue ontology

Ontology describes what the Colophon domain means. Schema describes how a
particular storage system represents that meaning. This document deliberately
does not choose tables, columns, documents, or databases.

## Entities

- **Book** — a published or publishable work that may be offered through the
  catalogue.
- **Print** — a physical work on paper that may be offered through the
  catalogue.
- **Essay** — editorial writing published by the Press.
- **Person** — a contributor whose relationship to a work carries a role.
- **Source** — the origin context for a Book or Print.
- **Catalogue** — a curated set of Acquirable works with public or hidden
  visibility.

## Relationships

A Catalogue features Books and Prints. A Book or Print has one Source. Books,
Prints, and Essays relate to People through contributor links. An Essay may be
about a Book.

Contributor roles belong on the relationship, not on `Person`. The same person
may be an author on one work, an editor on another, and a printer on a third.
The link therefore carries roles such as author, artist, editor, translator,
illustrator, or printer.

## Source kinds

`Source.kind` is the discriminator that gives origin its business meaning:

- `imprint` — a Book published by Colophon;
- `studio` — a Print made in the Studio;
- `external` — a work originating elsewhere, including third-party and
  secondhand items.

This discriminator supports projections without inventing separate,
page-specific collections.

## Acquirable

`Acquirable` is the shared concept implemented by Book and Print. It identifies
objects that can participate in the catalogue and soft-commerce action layer.

**Acquirable is an ontological interface, not a table.**

It does not require Books and Prints to share every attribute. It states that
both have the identity, source, lifecycle, condition, contributor, and optional
price information needed to be projected into an acquisition context.

## Lifecycles

Books move through `draft`, `forthcoming`, `for-sale`, and `out-of-print`.
Prints move through `draft`, `for-sale`, and `sold-out`. Essays move through
`draft`, `published`, and `archived`.

Lifecycle has public consequences:

- drafts are excluded from public projections;
- forthcoming Books remain visible for list interest;
- out-of-print Books and sold-out Prints remain visible as records; and
- archived Essays remain excluded until an archive is deliberately designed.

These states describe domain meaning. They do not prescribe how transitions are
stored or audited.

## Systems and contexts

The Catalogue is the system of record for what is offered. The Press and Studio
are origin contexts for what Colophon makes. Commerce is an action layer over
anything Acquirable. These concepts overlap by relationship; none is a
page-specific duplicate of another.

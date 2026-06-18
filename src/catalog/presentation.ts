import type {
  Acquirable,
  AcquisitionCta,
  Book,
  Essay,
  Money,
  Print,
  Source,
} from "@/types/catalog";

export function formatMoney(price?: Money): string {
  if (!price) return "";
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: price.currency,
    maximumFractionDigits: 0,
  }).format(price.amount);
}

export function getSourceLabel(source: Source): string {
  if (source.kind === "imprint") return source.lockup ?? source.name;
  if (source.kind === "studio") return "The Studio";
  return source.name;
}

export function getOriginLabel(source: Source): string {
  if (source.kind === "imprint") return "Published by Colophon";
  if (source.kind === "studio") return "Made in the Studio";
  return "Selected from elsewhere";
}

export function getCatalogueImage(item: Acquirable): string {
  if (item.image) return item.image;
  if (item.source.kind === "external") {
    return item.type === "book"
      ? "/images/books/placeholder-external-book.png"
      : "/images/books/placeholder-external-print.png";
  }
  return item.type === "book"
    ? "/images/books/placeholder-book.png"
    : "/images/books/print-placeholder.png";
}

export function getContributorLabel(item: Book | Print | Essay): string {
  const primary = item.contributors[0];
  if (!primary) return "";

  const roleLabelMap = {
    author: "Written by",
    artist: "Created by",
    editor: "Edited by",
    translator: "Translated by",
    illustrator: "Illustrated by",
    printer: "Printed by",
  } as const;

  return `${roleLabelMap[primary.role]} ${primary.person.name}`;
}

export function getStatusLabel(item: Acquirable): string {
  const labels = {
    forthcoming: "Forthcoming",
    "for-sale": "For sale",
    "out-of-print": "Out of print",
    "sold-out": "Sold out",
    draft: "Not yet available",
  } as const;
  return labels[item.status];
}

export function getAcquisitionCta(item: Acquirable): AcquisitionCta {
  if (item.status === "draft") return { label: "Not yet available", disabled: true };
  if (item.type === "book" && item.status === "forthcoming") {
    return {
      label: "Join the list",
      href: mailto(`Interest in ${item.title}`),
    };
  }
  if (
    (item.type === "book" && item.status === "out-of-print") ||
    (item.type === "print" && item.status === "sold-out")
  ) {
    return { label: "View record", disabled: true };
  }
  if (!item.price) {
    return { label: "Inquire", href: mailto(`Inquiry about ${item.title}`) };
  }
  return {
    label: "Inquire / Acquire",
    href: mailto(`Inquiry about ${item.title}`),
  };
}

function mailto(subject: string): string {
  return `mailto:hello@colophon.press?subject=${encodeURIComponent(subject)}`;
}

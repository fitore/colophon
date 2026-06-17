"use client";

import { useState } from "react";
import type { Acquirable } from "@/types/catalog";
import CatalogCard from "./CatalogCard";
import styles from "./CatalogGrid.module.css";

const filters = [
  "All",
  "Books",
  "Prints",
  "New",
  "Used",
  "Colophon / In-house",
  "Third-party",
  "Forthcoming",
  "For sale",
  "Sold out / Out of print",
] as const;

type Filter = (typeof filters)[number];

function matchesFilter(item: Acquirable, filter: Filter): boolean {
  if (filter === "Books") return item.type === "book";
  if (filter === "Prints") return item.type === "print";
  if (filter === "New") return item.condition === "new";
  if (filter === "Used") return item.condition === "used";
  if (filter === "Colophon / In-house") return item.source.kind !== "external";
  if (filter === "Third-party") return item.source.kind === "external";
  if (filter === "Forthcoming") return item.type === "book" && item.status === "forthcoming";
  if (filter === "For sale") return item.status === "for-sale";
  if (filter === "Sold out / Out of print") {
    return item.status === "sold-out" || item.status === "out-of-print";
  }
  return true;
}

export default function CatalogGrid({ items }: { items: Acquirable[] }) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const visibleItems = items.filter((item) => matchesFilter(item, activeFilter));

  return (
    <>
      <div className={styles.filters} aria-label="Filter the catalogue">
        {filters.map((filter) => (
          <button
            className={filter === activeFilter ? styles.active : undefined}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>
      <div className={styles.grid}>
        {visibleItems.map((item) => <CatalogCard item={item} key={`${item.type}-${item.slug}`} />)}
      </div>
    </>
  );
}

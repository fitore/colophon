"use client";

import { useState } from "react";
import {
  catalogueFilters,
  matchesCatalogueFilter,
  type CatalogueFilter,
} from "@/catalog/filters";
import type { Acquirable } from "@/types/catalog";
import CatalogCard from "./CatalogCard";
import styles from "./CatalogGrid.module.css";

export default function CatalogGrid({ items }: { items: Acquirable[] }) {
  const [activeFilter, setActiveFilter] = useState<CatalogueFilter>("All");
  const visibleItems = items.filter((item) => matchesCatalogueFilter(item, activeFilter));

  return (
    <>
      <div className={styles.filters} aria-label="Filter the catalogue">
        {catalogueFilters.map((filter) => (
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

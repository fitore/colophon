import Image from "next/image";
import Link from "next/link";
import {
  formatMoney,
  getAcquisitionCta,
  getCatalogueImage,
  getContributorLabel,
  getOriginLabel,
  getStatusLabel,
} from "@/data";
import type { Acquirable } from "@/types/catalog";
import styles from "./CatalogCard.module.css";

export default function CatalogCard({ item }: { item: Acquirable }) {
  const href = `/bookstore/${item.slug}`;
  const cta = getAcquisitionCta(item);
  const image = getCatalogueImage(item);
  const details =
    item.type === "book"
      ? [item.formats?.join(", "), item.isbn ? `ISBN ${item.isbn}` : undefined]
      : [item.medium, item.dimensions, item.edition];

  return (
    <article className={styles.card}>
      <Link href={href} className={styles.coverLink} aria-label={`View ${item.title}`}>
        <div className={styles.cover}>
          {image ? (
            <Image
              src={image}
              alt={item.image
                ? `${item.type === "book" ? "Cover" : "Artwork"} of ${item.title}`
                : `Placeholder ${item.type === "book" ? "cover" : "artwork"} for ${item.title}`}
              fill
              sizes="(max-width: 48rem) 50vw, 16rem"
              className={styles.coverImage}
            />
          ) : (
            <span className={styles.placeholder} aria-hidden="true" />
          )}
        </div>
      </Link>
      <p className="eyebrow">{item.type === "book" ? "Book" : "Print"}</p>
      <h3 className={styles.title}>
        <Link href={href}>{item.title}</Link>
      </h3>
      <p className={styles.meta}>{getContributorLabel(item)}</p>
      <p className={styles.meta}>{getOriginLabel(item.source)}</p>
      <p className={styles.facts}>
        {[item.condition === "new" ? "New" : "Used", getStatusLabel(item), formatMoney(item.price)]
          .filter(Boolean)
          .join(" · ")}
      </p>
      {details.some(Boolean) ? <p className={styles.details}>{details.filter(Boolean).join(" · ")}</p> : null}
      {cta.href ? (
        <a className={styles.cta} href={cta.href}>
          {cta.label}
        </a>
      ) : (
        <span className={styles.disabled}>{cta.label}</span>
      )}
    </article>
  );
}

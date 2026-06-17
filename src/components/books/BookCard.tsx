import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/types";
import styles from "./BookCard.module.css";

/** Concept-shelf book card. Cover falls back to a CSS placeholder. */
export default function BookCard({ book }: { book: Book }) {
  const href = `/bookstore/${book.slug}`;

  return (
    <article className={styles.card}>
      <Link href={href} className={styles.coverLink} aria-label={`View ${book.title}`}>
        <div className={styles.cover}>
          {book.coverImage ? (
            <Image
              src={book.coverImage}
              alt={book.coverAlt ?? `Cover of ${book.title}`}
              fill
              sizes="(max-width: 48rem) 50vw, 16rem"
              className={styles.coverImage}
            />
          ) : (
            <span className={styles.placeholder} aria-hidden="true" />
          )}
        </div>
      </Link>
      <p className="eyebrow">{book.category}</p>
      <h3 className={styles.title}>
        <Link href={href}>{book.title}</Link>
      </h3>
      <p className={styles.author}>Author: {book.author}</p>
      <Link href={href} className={styles.view}>
        View Book
      </Link>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { PressPost } from "@/lib/types";
import styles from "./PressCard.module.css";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

/** Editorial card for The Press index and the homepage row. */
export default function PressCard({ post }: { post: PressPost }) {
  const href = `/the-press/${post.slug}`;

  return (
    <article className={styles.card}>
      <Link href={href} className={styles.thumbLink} aria-label={`Read ${post.title}`}>
        <div className={styles.thumb}>
          {post.thumbImage ? (
            <Image
              src={post.thumbImage}
              alt={post.thumbAlt ?? `Thumbnail for ${post.title}`}
              fill
              sizes="(max-width: 48rem) 100vw, 22rem"
              className={styles.thumbImage}
            />
          ) : (
            <span className={styles.placeholder} aria-hidden="true" />
          )}
        </div>
      </Link>
      <div className={styles.meta}>
        <span className="eyebrow">{post.category}</span>
        <time dateTime={post.date} className={styles.date}>
          {formatDate(post.date)}
        </time>
      </div>
      <h3 className={styles.title}>
        <Link href={href}>{post.title}</Link>
      </h3>
      <p className={styles.dek}>{post.dek}</p>
    </article>
  );
}

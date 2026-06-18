import Link from "next/link";
import { getContributorLabel } from "@/data";
import type { Essay } from "@/types/catalog";
import styles from "./PressCard.module.css";

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

export default function PressCard({ post }: { post: Essay }) {
  const href = `/the-press/${post.slug}`;
  return (
    <article className={styles.row}>
      <Link href={href} className={styles.thumb} aria-label={`Read ${post.title}`}>
        <span className={styles.placeholder} aria-hidden="true" />
      </Link>
      <div className={styles.copy}>
        <h3><Link href={href}>{post.title}</Link></h3>
        <p>{post.excerpt}</p>
        <p className={styles.meta}>
          {post.publishedAt ? formatDate(post.publishedAt) : null}
          {post.publishedAt ? " · " : null}
          {getContributorLabel(post)}
        </p>
      </div>
      <Link href={href} className={styles.read}>Read →</Link>
    </article>
  );
}

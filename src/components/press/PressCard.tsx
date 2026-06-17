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

export default function PressCard({ post }: { post: PressPost }) {
  const href = `/the-press/${post.slug}`;
  return (
    <article className={styles.row}>
      <Link href={href} className={styles.thumb} aria-label={`Read ${post.title}`}>
        {post.thumbImage ? (
          <Image src={post.thumbImage} alt={post.thumbAlt ?? ""} fill sizes="12rem" className={styles.image} />
        ) : <span className={styles.placeholder} aria-hidden="true" />}
      </Link>
      <div className={styles.copy}>
        <h3><Link href={href}>{post.title}</Link></h3>
        <p>{post.dek}</p>
        <p className={styles.meta}>{formatDate(post.date)} · {post.category}</p>
      </div>
      <Link href={href} className={styles.read}>Read →</Link>
    </article>
  );
}

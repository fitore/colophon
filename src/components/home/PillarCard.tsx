import Image from "next/image";
import Link from "next/link";
import styles from "./PillarCard.module.css";

interface PillarCardProps {
  href: string;
  kicker: string;
  title: string;
  description: string;
  cta: string;
  image?: string;
  imageAlt?: string;
}

/**
 * A linked pillar card with a glass illustration above editorial copy.
 * Text never sits on top of the artwork.
 */
export default function PillarCard({
  href,
  kicker,
  title,
  description,
  cta,
  image,
  imageAlt,
}: PillarCardProps) {
  return (
    <Link href={href} className={styles.card}>
      <div className={styles.media}>
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            sizes="(max-width: 48rem) 100vw, 36rem"
            className={styles.image}
          />
        ) : (
          <span className={styles.placeholder} aria-hidden="true" />
        )}
      </div>
      <div className={styles.body}>
        <p className="eyebrow">{kicker}</p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <span className={styles.cta}>{cta}</span>
      </div>
    </Link>
  );
}

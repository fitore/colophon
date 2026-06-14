import CtaLink from "@/components/ui/CtaLink";
import styles from "./editorial.module.css";

interface FeatureCellProps {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
}

export default function FeatureCell({ title, description, href, ctaLabel }: FeatureCellProps) {
  return (
    <article className={styles.featureCell}>
      <h3>{title}</h3>
      <p>{description}</p>
      <CtaLink href={href} external={href.startsWith("mailto:")} variant="text">{ctaLabel}</CtaLink>
    </article>
  );
}

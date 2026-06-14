import CtaLink from "@/components/ui/CtaLink";
import { recordMailto } from "@/lib/types";
import styles from "./editorial.module.css";

export default function NewsletterStrip({
  body = "Occasional notes from the shelf, press, and studio as the work takes shape.",
}: {
  body?: string;
}) {
  return (
    <section className={`${styles.section} ${styles.newsletter}`}>
      <div>
        <p className="eyebrow">Newsletter</p>
        <h2>Keep the Record</h2>
      </div>
      <p>{body}</p>
      <CtaLink href={recordMailto()} external>Join the list</CtaLink>
    </section>
  );
}

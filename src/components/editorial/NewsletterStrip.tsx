import CtaLink from "@/components/ui/CtaLink";
import { recordMailto } from "@/lib/types";
import styles from "./editorial.module.css";

export default function NewsletterStrip() {
  return (
    <section className={`${styles.section} ${styles.newsletter}`}>
      <div>
        <p className="eyebrow">Newsletter</p>
        <h2>Keep the Record</h2>
      </div>
      <p>Occasional notes from the shelf, press, and studio as the work takes shape.</p>
      <CtaLink href={recordMailto()} external>Join the list</CtaLink>
    </section>
  );
}

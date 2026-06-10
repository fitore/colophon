import Container from "@/components/layout/Container";
import CtaLink from "@/components/ui/CtaLink";
import { recordMailto } from "@/lib/types";
import styles from "./KeepTheRecord.module.css";

/** Newsletter / interest section — mailto only, no capture gate. */
export default function KeepTheRecord() {
  return (
    <section className={styles.section}>
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <p className="eyebrow">Newsletter</p>
          <h2 className={styles.title}>Keep the Record</h2>
          <p className={styles.text}>
            No urgency, no inbox noise — only a note when there is something true
            to say about the press and its editions.
          </p>
        </div>
        <CtaLink href={recordMailto()} variant="primary" external>
          Keep the Record
        </CtaLink>
      </Container>
    </section>
  );
}

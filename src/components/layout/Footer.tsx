import CtaLink from "@/components/ui/CtaLink";
import { recordMailto } from "@/lib/types";
import Container from "./Container";
import RuleWithMark from "./RuleWithMark";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <RuleWithMark />
        <div className={styles.newsletter}>
          <p className={styles.label}>Newsletter</p>
          <div className={styles.newsletterContent}>
            <h2>Keep the Record</h2>
            <p>Notes on print, studio openings, editions, workshops, and the work of making.</p>
            <CtaLink href={recordMailto()} external>Join the list</CtaLink>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <p>Ontario, Canada</p>
          <p>© Colophon</p>
          <p>
            <a href="https://instagram.com/expressed">Instagram</a>
            <span aria-hidden="true"> · </span>
            <a href="https://expressed.substack.com">Substack</a>
          </p>
        </div>
      </Container>
    </footer>
  );
}

import { CONTACT_EMAIL, recordMailto } from "@/lib/types";
import Container from "./Container";
import styles from "./Footer.module.css";

const SOCIAL_LINKS = [
  { href: "https://instagram.com/expressed", label: "Instagram" },
  { href: "https://expressed.substack.com", label: "Substack" },
];

/** Site footer: place, contact, social, and the imprint lockup. */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div className={styles.brand}>
          <p className={styles.imprint}>Colophon · Bookstore &amp; Press</p>
          <p className={styles.place}>Ontario, Canada</p>
        </div>

        <nav aria-label="Contact and social" className={styles.links}>
          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.link}>
            {CONTACT_EMAIL}
          </a>
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.link}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
          <a href={recordMailto()} className={styles.link}>
            Keep the Record
          </a>
        </nav>
      </Container>
    </footer>
  );
}

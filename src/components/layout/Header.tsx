import Link from "next/link";
import Container from "./Container";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/bookstore", label: "Bookstore" },
  { href: "/the-press", label: "The Press" },
  { href: "/about", label: "About" },
];

/** Site header: wordmark + primary nav. No cart, no search in Phase 1. */
export default function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link href="/" className={styles.wordmark} aria-label="Expressed — home">
          Expressed
        </Link>
        <nav aria-label="Primary">
          <ul className={styles.nav}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

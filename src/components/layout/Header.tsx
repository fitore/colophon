"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import RuleWithMark from "./RuleWithMark";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/bookstore", label: "Bookstore" },
  { href: "/the-press", label: "The Press" },
  { href: "/studio", label: "The Studio" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link href="/" className={styles.wordmark} aria-label="Colophon home">
          Colophon
        </Link>
        <nav aria-label="Primary">
          <ul className={styles.nav}>
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={styles.navLink}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
      <Container>
        <RuleWithMark />
      </Container>
    </header>
  );
}

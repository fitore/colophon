import Image from "next/image";
import Container from "@/components/layout/Container";
import CtaLink from "@/components/ui/CtaLink";
import styles from "./Hero.module.css";

const POEM = [
  "Writing becomes print.",
  "Print becomes object.",
  "What is made here",
  "stays in the hand.",
];

/** Homepage hero: the press poem alongside the stained-glass mark. */
export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={styles.inner}>
        <div className={styles.copy}>
          <p className="eyebrow">An Expressed Press · Ontario, Canada</p>
          <h1 className={styles.poem}>
            {POEM.map((line) => (
              <span key={line} className={styles.line}>
                {line}
              </span>
            ))}
          </h1>
          <p className={styles.intro}>
            An online-first publishing, press, and bookshop experiment — a
            curated shelf, an editorial press, and a future catalogue in the
            making.
          </p>
          <div className={styles.actions}>
            <CtaLink href="/bookstore" variant="primary">
              Browse Books
            </CtaLink>
            <CtaLink href="/the-press" variant="secondary">
              The Press
            </CtaLink>
          </div>
        </div>

        <div className={styles.art}>
          <Image
            src="/images/glass/hero-hand-mark.png"
            alt="Stained-glass panel of a hand holding paper, framed by leaves and a ruby mark."
            width={384}
            height={750}
            priority
            sizes="(max-width: 60rem) 60vw, 384px"
            className={styles.artImage}
          />
        </div>
      </Container>
    </section>
  );
}

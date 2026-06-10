import Link from "next/link";
import Container from "@/components/layout/Container";
import Hero from "@/components/home/Hero";
import PillarCard from "@/components/home/PillarCard";
import KeepTheRecord from "@/components/home/KeepTheRecord";
import BookCard from "@/components/books/BookCard";
import PressCard from "@/components/press/PressCard";
import { books } from "@/lib/books";
import { pressPosts } from "@/lib/press";
import styles from "./page.module.css";

export default function HomePage() {
  const featuredBooks = books.slice(0, 4);

  return (
    <>
      <Hero />

      <section className={styles.pillars} aria-label="What Expressed offers">
        <Container className={styles.pillarGrid}>
          <PillarCard
            href="/bookstore"
            kicker="The Shelf"
            title="Bookstore"
            description="A curated shelf of books that shape how we read, make, and remember."
            cta="Browse books"
            image="/images/glass/bookstore-pillar.png"
            imageAlt="Small stained-glass panel for the Bookstore."
          />
          <PillarCard
            href="/the-press"
            kicker="Editorial"
            title="The Press"
            description="Essays and notes on print, editions, and the work of making."
            cta="Read the press"
            image="/images/glass/press-pillar.png"
            imageAlt="Small stained-glass panel for The Press."
          />
        </Container>
      </section>

      <section className={styles.row} aria-labelledby="books-heading">
        <Container>
          <div className={styles.rowHead}>
            <div>
              <p className="eyebrow">Expressed Books</p>
              <h2 id="books-heading" className={styles.rowTitle}>
                From the shelf
              </h2>
            </div>
            <Link href="/bookstore" className={styles.rowLink}>
              All books
            </Link>
          </div>
          <div className={styles.bookGrid}>
            {featuredBooks.map((book) => (
              <BookCard key={book.slug} book={book} />
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.row} aria-labelledby="press-heading">
        <Container>
          <div className={styles.rowHead}>
            <div>
              <p className="eyebrow">From The Press</p>
              <h2 id="press-heading" className={styles.rowTitle}>
                Recent writing
              </h2>
            </div>
            <Link href="/the-press" className={styles.rowLink}>
              All writing
            </Link>
          </div>
          <div className={styles.pressGrid}>
            {pressPosts.map((post) => (
              <PressCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      </section>

      <KeepTheRecord />
    </>
  );
}

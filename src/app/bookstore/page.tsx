import BookCard from "@/components/books/BookCard";
import PageHeader from "@/components/editorial/PageHeader";
import SectionHeading from "@/components/editorial/SectionHeading";
import CtaLink from "@/components/ui/CtaLink";
import { books } from "@/lib/books";
import editorial from "@/components/editorial/editorial.module.css";
import styles from "./page.module.css";

export default function BookstorePage() {
  return (
    <>
      <PageHeader title="Bookstore" intro="New and previously loved books — Colophon’s own titles and books from other publishers — plus prints from the studio and beyond." image="/images/glass/bookstore-pillar.png" imageAlt="Stained-glass panel of pages, a leaf, and a ruby mark." imagePortrait />
      <section className={editorial.section}>
        <SectionHeading label="The Shelf" intro="A changing collection of our own titles, new books from other publishers, previously loved books, and selected art prints." />
        <div className={editorial.tabs}>{["All Books", "Poetry", "Essays", "Letterpress", "Craft", "Art"].map((item) => <span key={item}>{item}</span>)}</div>
        <div className={styles.grid}>{books.map((book) => <BookCard key={book.slug} book={book} />)}</div>
      </section>
      <section className={`${editorial.section} ${styles.inquiry}`}>
        <div><p className="eyebrow">Looking for something?</p><h2>Ask about the shelf.</h2></div>
        <p>Write to us about a title, subject, previously loved find, or future selection.</p>
        <CtaLink href={`mailto:hello@expressed.press?subject=${encodeURIComponent("Bookstore inquiry")}`} external>Make an inquiry</CtaLink>
      </section>
      <aside className={`${editorial.section} ${styles.cafeNote}`}>
        <div>
          <p>The café is coming.</p>
          <p>It will be next to the bookstore.</p>
          <p>A place to read what you&apos;ve just bought.</p>
        </div>
        <p className={styles.comingSoon}>Coming soon</p>
      </aside>
    </>
  );
}

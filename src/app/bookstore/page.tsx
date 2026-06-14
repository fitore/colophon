import BookCard from "@/components/books/BookCard";
import NewsletterStrip from "@/components/editorial/NewsletterStrip";
import PageHeader from "@/components/editorial/PageHeader";
import SectionHeading from "@/components/editorial/SectionHeading";
import CtaLink from "@/components/ui/CtaLink";
import { books } from "@/lib/books";
import editorial from "@/components/editorial/editorial.module.css";
import styles from "./page.module.css";

export default function BookstorePage() {
  return (
    <>
      <PageHeader title="Bookstore" intro="New titles from The Press. Vintage books, prints, and posters found and chosen carefully. Everything here was selected because it belongs." image="/images/glass/bookstore-pillar.png" imageAlt="Stained-glass panel of pages, a leaf, and a ruby mark." imagePortrait />
      <section className={editorial.section}>
        <SectionHeading label="The Shelf" intro="A changing collection of new and vintage books, prints, and posters. New titles from The Press sit alongside things we've found." />
        <div className={editorial.tabs}>{["All Books", "Poetry", "Essays", "Letterpress", "Craft", "Art"].map((item) => <span key={item}>{item}</span>)}</div>
        <div className={styles.grid}>{books.map((book) => <BookCard key={book.slug} book={book} />)}</div>
      </section>
      <section className={`${editorial.section} ${styles.inquiry}`}>
        <div><p className="eyebrow">Looking for something?</p><h2>Ask about the shelf.</h2></div>
        <p>The bookstore is a curated concept shelf. Write to us about a title, subject, or future selection.</p>
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
      <NewsletterStrip />
    </>
  );
}

import BookCard from "@/components/books/BookCard";
import NewsletterStrip from "@/components/editorial/NewsletterStrip";
import PageHeader from "@/components/editorial/PageHeader";
import CtaLink from "@/components/ui/CtaLink";
import { books } from "@/lib/books";
import editorial from "@/components/editorial/editorial.module.css";
import styles from "./page.module.css";

export default function BookstorePage() {
  return (
    <>
      <PageHeader title="Bookstore" intro="Curated books that shape how we read, think, and make." note="This shelf is experimental and will change as the catalogue takes shape." image="/images/glass/bookstore-pillar.png" imageAlt="Stained-glass panel of pages, a leaf, and a ruby mark." imagePortrait />
      <section className={editorial.section}>
        <div className={editorial.tabs}>{["All Books", "Poetry", "Essays", "Letterpress", "Craft", "Art"].map((item) => <span key={item}>{item}</span>)}</div>
        <div className={styles.grid}>{books.map((book) => <BookCard key={book.slug} book={book} />)}</div>
      </section>
      <section className={`${editorial.section} ${styles.inquiry}`}>
        <div><p className="eyebrow">Looking for something?</p><h2>Ask about the shelf.</h2></div>
        <p>The bookstore is a curated concept shelf. Write to us about a title, subject, or future selection.</p>
        <CtaLink href={`mailto:hello@expressed.press?subject=${encodeURIComponent("Bookstore inquiry")}`} external>Make an inquiry</CtaLink>
      </section>
      <NewsletterStrip />
    </>
  );
}

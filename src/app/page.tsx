import Link from "next/link";
import BookCard from "@/components/books/BookCard";
import FeatureCell from "@/components/editorial/FeatureCell";
import NewsletterStrip from "@/components/editorial/NewsletterStrip";
import SectionHeading from "@/components/editorial/SectionHeading";
import FramedPlateImage from "@/components/ui/FramedPlateImage";
import CtaLink from "@/components/ui/CtaLink";
import PressCard from "@/components/press/PressCard";
import { books } from "@/lib/books";
import { pressPosts } from "@/lib/press";
import editorial from "@/components/editorial/editorial.module.css";
import styles from "./page.module.css";

const features = [
  { title: "Bookstore", description: "Curated books that shape how we read, think, and make.", href: "/bookstore", ctaLabel: "Browse books" },
  { title: "The Press", description: "Notes, essays, and records of print, editions, and the work of making.", href: "/the-press", ctaLabel: "Read the press" },
  { title: "The Studio", description: "Workshops, open studio sessions, drawing, printmaking, and art printing.", href: "/studio", ctaLabel: "Visit the studio" },
];

export default function HomePage() {
  return (
    <>
      <section className={`${editorial.section} ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">A Colophon Press · Ontario, Canada</p>
          <h1>
            Writing becomes print.<br />
            Print becomes object.<br />
            What is made here<br />
            stays in the hand.
          </h1>
          <div className={styles.actions}>
            <CtaLink href="/bookstore">Browse books</CtaLink>
            <CtaLink href="/the-press" variant="secondary">The Press</CtaLink>
            <CtaLink href="/studio" variant="text">The Studio</CtaLink>
          </div>
        </div>
        <FramedPlateImage src="/images/glass/hero-hand-mark.png" alt="Stained-glass plate of a hand holding paper." portrait priority />
      </section>

      <section className={`${editorial.section} ${editorial.featureGrid}`} aria-label="Read, make, and record">
        {features.map((feature) => <FeatureCell key={feature.href} {...feature} />)}
      </section>

      <section className={editorial.section}>
        <SectionHeading label="Colophon Books" intro="A changing shelf for reading, thinking, and making." />
        <div className={styles.bookGrid}>{books.slice(0, 4).map((book) => <BookCard key={book.slug} book={book} />)}</div>
        <Link href="/bookstore" className={styles.allLink}>All books →</Link>
      </section>

      <section className={editorial.section}>
        <SectionHeading label="From The Press" intro="Recent notes and essays from the workbench." />
        {pressPosts.slice(0, 2).map((post) => <PressCard key={post.slug} post={post} />)}
      </section>

      <section className={editorial.section}>
        <SectionHeading label="Studio Notes" intro="A programme study while the workshop and print room take shape." />
        <div className={styles.studioNotes}>
          <p>Coming soon</p><h3>Friday Drawing Table</h3><p>Open Studio</p><Link href="/studio">Details →</Link>
          <p>Coming soon</p><h3>Paper &amp; Ink Clinic</h3><p>Printing</p><Link href="/studio">Details →</Link>
        </div>
      </section>
      <NewsletterStrip />
    </>
  );
}

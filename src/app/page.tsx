import Image from "next/image";
import Link from "next/link";
import BookCard from "@/components/books/BookCard";
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
  {
    title: "Bookstore",
    description: "Curated books that shape how we read, make, and remember.",
    href: "/bookstore",
    ctaLabel: "Browse books",
    image: "/images/glass/bookstore-pillar.png",
    imageAlt: "Small stained-glass panel with pages and a ruby mark.",
  },
  {
    title: "The Press",
    description: "Essays, notes, and reflections on print, editions, and the work of making.",
    href: "/the-press",
    ctaLabel: "Explore the press",
    image: "/images/glass/press-pillar.png",
    imageAlt: "Small stained-glass panel with pages, a sun, and a ruby mark.",
  },
  {
    title: "The Studio",
    description: "Workshops, open studio sessions, drawing, printmaking, and art printing.",
    href: "/studio",
    ctaLabel: "Visit the studio",
    image: "/images/glass/studio-panel.png",
    imageAlt: "Small stained-glass panel with a rising sun and radiating lines.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className={`${editorial.section} ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">A Colophon Press · Ontario, Canada</p>
          <Image className={styles.sunburst} src="/images/icons/sunburst.svg" alt="" width={56} height={56} aria-hidden="true" />
          <h1>Books, Press, Studio</h1>
          <p className={styles.heroStatement}>
            Writing becomes print.<br />
            Print becomes object.<br />
            What is made here<br />
            stays in the hand.
          </p>
          <div className={styles.actions}>
            <CtaLink href="/bookstore">Browse books</CtaLink>
            <CtaLink href="/the-press" variant="secondary">The Press</CtaLink>
          </div>
        </div>
        <div className={styles.heroArt}>
          <FramedPlateImage src="/images/glass/hero-hand-mark.png" alt="Stained-glass panel of a hand, pages, leaves, and a ruby mark." portrait priority />
        </div>
      </section>

      <section className={`${editorial.section} ${styles.featureGrid}`} aria-label="Explore Colophon">
        {features.map((feature) => (
          <article className={styles.featureCard} key={feature.href}>
            <div className={styles.featureImage}>
              <Image src={feature.image} alt={feature.imageAlt} fill sizes="(max-width: 48rem) 34vw, 14vw" />
            </div>
            <div className={styles.featureCopy}>
              <Image className={styles.cardSunburst} src="/images/icons/sunburst.svg" alt="" width={40} height={40} aria-hidden="true" />
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
              <CtaLink href={feature.href} variant="text">{feature.ctaLabel}</CtaLink>
            </div>
          </article>
        ))}
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

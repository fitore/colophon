import Image from "next/image";
import Link from "next/link";
import CatalogCard from "@/components/catalog/CatalogCard";
import SectionHeading from "@/components/editorial/SectionHeading";
import FramedPlateImage from "@/components/ui/FramedPlateImage";
import CtaLink from "@/components/ui/CtaLink";
import PressCard from "@/components/press/PressCard";
import { getBookstoreItems, getPublishedEssays } from "@/catalog/queries";
import editorial from "@/components/editorial/editorial.module.css";
import styles from "./page.module.css";

const features = [
  {
    title: "Bookstore",
    description: "New and previously loved books — our own titles and others’ — plus prints from the studio and beyond.",
    href: "/bookstore",
    ctaLabel: "Browse the collection",
    image: "/images/glass/bookstore-pillar.png",
    imageAlt: "Small stained-glass panel with pages and a ruby mark.",
    note: "Café coming soon — adjacent to the bookstore.",
  },
  {
    title: "The Press",
    description: "The Press publishes books under the Colophon name, with essays and editorial work as part of the wider record.",
    href: "/the-press",
    ctaLabel: "See what's in progress",
    image: "/images/glass/press-pillar.png",
    imageAlt: "Small stained-glass panel with pages, a sun, and a ruby mark.",
  },
  {
    title: "The Studio",
    description: "Adjacent to the bookstore.\nVisiting artists and restorers arrive here.\nWorkshops, open sessions, and conservation work.",
    href: "/studio",
    ctaLabel: "See the programme",
    image: "/images/glass/studio-panel.png",
    imageAlt: "Small stained-glass panel with a raised hand, arches, and radiating lines.",
  },
];

export default async function HomePage() {
  const [bookstoreItems, publishedEssays] = await Promise.all([
    getBookstoreItems(),
    getPublishedEssays(),
  ]);
  const featuredItems = [
    ...bookstoreItems.filter((item) => item.type === "book").slice(0, 3),
    ...bookstoreItems.filter((item) => item.type === "print").slice(0, 1),
  ];

  return (
    <>
      <section className={`${editorial.section} ${styles.hero}`}>
        <div className={styles.heroCopy}>
          <p className="eyebrow">Colophon · Ontario, Canada</p>
          <Image className={styles.sunburst} src="/images/icons/sunburst.svg" alt="" width={56} height={56} aria-hidden="true" />
          <h1>
            Bookstore,<br />
            Press,<br />
            Studio
          </h1>
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
          <FramedPlateImage src="/images/glass/hero-hand-mark.png" alt="Stained-glass panel of a hand, pages, leaves, and a ruby mark." portrait priority frameless />
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
              {feature.note ? <p className={styles.featureNote}>{feature.note}</p> : null}
            </div>
          </article>
        ))}
      </section>

      <section className={editorial.section}>
        <SectionHeading label="The Shelf" intro="New and previously loved books, Colophon titles, and prints from the studio and beyond." />
        <div className={styles.bookGrid}>
          {featuredItems.map((item) => (
            <CatalogCard key={`${item.type}-${item.slug}`} item={item} />
          ))}
        </div>
        <Link href="/bookstore" className={styles.allLink}>View the collection →</Link>
      </section>

      <section className={editorial.section}>
        <SectionHeading label="From the Press" intro="Books from Colophon, with essays and notes from the press." />
        {publishedEssays.slice(0, 2).map((post) => <PressCard key={post.slug} post={post} />)}
        <Link href="/the-press" className={styles.allLink}>Explore the Press →</Link>
      </section>
    </>
  );
}

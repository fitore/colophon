import Link from "next/link";
import NewsletterStrip from "@/components/editorial/NewsletterStrip";
import PageHeader from "@/components/editorial/PageHeader";
import editorial from "@/components/editorial/editorial.module.css";
import styles from "./page.module.css";

const links = [
  ["/bookstore", "Bookstore"],
  ["/the-press", "The Press"],
  ["/studio", "The Studio"],
  ["/future-catalogue", "Future Catalogue Study"],
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About" intro="Colophon is an imprint and press devoted to work made with care and intention." note="We publish books, essays, and objects that explore language, material, and the quiet authority of print. Based in Ontario, Canada." image="/images/glass/about-panel.png" imageAlt="Framed stained-glass plate for Colophon." />
      <section className={`${editorial.section} ${styles.links}`} aria-label="Explore Colophon">
        {links.map(([href, label]) => <Link href={href} key={href}>{label}<span>→</span></Link>)}
      </section>
      <NewsletterStrip />
    </>
  );
}

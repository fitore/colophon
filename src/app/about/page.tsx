import Link from "next/link";
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
      <PageHeader title="About" intro="Colophon is an imprint and press devoted to work made with care and intention." note="Colophon brings together a bookstore, press, studio, and a café that is coming soon. Based in Ontario, Canada." image="/images/glass/about-panel.png" imageAlt="Stained-glass panel of paper, a pen nib, leaves, and a ruby mark." imagePortrait />
      <section className={`${editorial.section} ${styles.links}`} aria-label="Explore Colophon">
        {links.map(([href, label]) => <Link href={href} key={href}>{label}<span>→</span></Link>)}
      </section>
    </>
  );
}

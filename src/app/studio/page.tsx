import FeatureCell from "@/components/editorial/FeatureCell";
import CatalogCard from "@/components/catalog/CatalogCard";
import PageHeader from "@/components/editorial/PageHeader";
import SectionHeading from "@/components/editorial/SectionHeading";
import CtaLink from "@/components/ui/CtaLink";
import { prints } from "@/data";
import editorial from "@/components/editorial/editorial.module.css";
import styles from "./page.module.css";

const waysIn = [
  { title: "Workshops", description: "Visiting instructors. Printmaking, drawing, relief, screen, and book arts.", href: "#programme", ctaLabel: "View the programme" },
  { title: "Open Studio", description: "Shared table time for independent projects. Bring your work; use the space.", href: "#open-studio", ctaLabel: "See open sessions" },
  { title: "Restoration & Printing", description: "Paper conservation and restoration for prints and posters. Fine-art archival printing for artists and small presses.", href: `mailto:hello@colophon.press?subject=${encodeURIComponent("Restoration and Printing Consultation")}`, ctaLabel: "Request a consultation" },
];

const events = [
  ["Intro to Linocut", "Workshop"],
  ["Friday Drawing Table", "Open Studio"],
  ["Zine Night", "Community"],
  ["Paper & Ink Clinic", "Printing"],
];

const services = ["Fine-art paper prints", "Small edition proofing", "Artwork documentation", "Paper selection", "File preparation", "Portfolio prints"];

export default function StudioPage() {
  return (
    <>
      <PageHeader title="The Studio" intro="A space for visiting artists, makers, and restorers. Workshops in printmaking, drawing, and book arts. Open sessions for independent work. Conservation and restoration for prints, posters, and works on paper. Fine-art printing services for artists and photographers." image="/images/glass/studio-panel.png" imageAlt="Stained-glass panel of a raised hand, arches, and radiating lines." imagePortrait />

      <section className={editorial.section}>
        <SectionHeading label="Ways In" />
        <div className={editorial.featureGrid}>{waysIn.map((item) => <FeatureCell key={item.title} {...item} />)}</div>
      </section>

      <section className={editorial.section}>
        <SectionHeading label="Studio Editions" intro="Prints made here and available through the shop when for sale." />
        <div className={styles.editions}>
          {prints
            .filter((print) => print.source.kind === "studio" && print.status !== "draft")
            .map((print) => <CatalogCard key={print.slug} item={print} />)}
        </div>
      </section>

      <section className={editorial.section} id="programme">
        <SectionHeading label="Programme Study" intro="Visiting instructors arrive weekly. Sessions are kept small." />
        <div className={styles.programme}>
          {events.map(([title, category]) => (
            <article className={styles.event} id={title === "Friday Drawing Table" ? "open-studio" : undefined} key={title}>
              <span className={styles.status}>Coming soon</span>
              <h3>{title}</h3>
              <span>{category}</span>
              <span>Details →</span>
            </article>
          ))}
        </div>
      </section>

      <section className={`${editorial.section} ${styles.printing}`} id="printing">
        <div className={styles.printCopy}>
          <p className="eyebrow">Printing Services</p>
          <h2>For artists, illustrators, photographers, and small presses.</h2>
          <p>Fine-art paper printing, proofing, small edition support, portfolio prints, and image preparation.</p>
          <CtaLink href="mailto:hello@colophon.press?subject=Print%20Consultation" external>Request a print consultation</CtaLink>
        </div>
        <ul className={styles.services}>{services.map((service) => <li key={service}>{service}</li>)}</ul>
      </section>

      <section className={`${editorial.section} ${styles.community}`}>
        <p className="eyebrow">Community Note</p>
        <p>The programme is a study, not a booking calendar. Visiting instructors arrive weekly. Sessions are kept small.<br /><br />Join the studio list to hear when classes, open sessions, and restoration services are ready to take bookings.</p>
        <CtaLink href={`mailto:hello@colophon.press?subject=${encodeURIComponent("Join the studio list")}`} external variant="secondary">Join the studio list</CtaLink>
      </section>
    </>
  );
}

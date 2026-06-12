import NewsletterStrip from "@/components/editorial/NewsletterStrip";
import FeatureCell from "@/components/editorial/FeatureCell";
import PageHeader from "@/components/editorial/PageHeader";
import SectionHeading from "@/components/editorial/SectionHeading";
import CtaLink from "@/components/ui/CtaLink";
import editorial from "@/components/editorial/editorial.module.css";
import styles from "./page.module.css";

const waysIn = [
  { title: "Workshops", description: "Learn by making: drawing, relief printmaking, zines, paper, and small editions.", href: "#programme", ctaLabel: "View classes" },
  { title: "Open Studio", description: "Shared table time for sketchbooks, slow projects, and print experiments.", href: "#programme", ctaLabel: "See open sessions" },
  { title: "Art Printing", description: "Fine-art paper prints, proofing, small editions, and object documentation.", href: "#printing", ctaLabel: "Print services" },
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
      <PageHeader title="The Studio" intro="A future workshop and print room for drawing, printmaking, open studio sessions, and fine-art printing." note="The Studio is a future community space for learning and making: part workshop, part print room, part quiet gathering place. Classes and events shown here are placeholders while the programme takes shape." image="/images/press/press-index-paper-stack.png" imageAlt="Framed plate of paper and tools." />

      <section className={editorial.section}>
        <SectionHeading label="Three Ways In" />
        <div className={editorial.featureGrid}>{waysIn.map((item) => <FeatureCell key={item.title} {...item} />)}</div>
      </section>

      <section className={editorial.section} id="programme">
        <SectionHeading label="Programme Study" intro="Placeholder classes and events while the studio takes shape." />
        <div className={styles.programme}>
          {events.map(([title, category]) => (
            <article className={styles.event} key={title}>
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
        <p>The programme is a study, not a booking calendar. Join the studio list to hear when the operating model, sessions, and access are ready to share.</p>
        <CtaLink href={`mailto:hello@colophon.press?subject=${encodeURIComponent("Join the studio list")}`} external variant="secondary">Join the studio list</CtaLink>
      </section>
      <NewsletterStrip />
    </>
  );
}

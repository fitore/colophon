import FeatureCell from "@/components/editorial/FeatureCell";
import PageHeader from "@/components/editorial/PageHeader";
import SectionHeading from "@/components/editorial/SectionHeading";
import CtaLink from "@/components/ui/CtaLink";
import { recordMailto } from "@/lib/types";
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

const studioNotes = [
  {
    title: "Friday Drawing Table",
    meta: "Coming soon · Open Studio",
    description: "A quiet shared table for sketchbooks, observational drawing, and low-pressure practice.",
  },
  {
    title: "Paper & Ink Clinic",
    meta: "Coming soon · Printing",
    description: "A guided session for choosing paper, proofing images, and preparing files for fine-art printing.",
  },
];

export default function StudioPage() {
  return (
    <>
      <PageHeader title="The Studio" intro="A space for visiting artists, makers, and restorers. Workshops in printmaking, drawing, and book arts. Open sessions for independent work. Conservation and restoration for prints, posters, and works on paper. Fine-art printing services for artists and photographers." image="/images/press/press-index-paper-stack.png" imageAlt="Framed plate of paper and tools." />

      <section className={editorial.section}>
        <SectionHeading label="Ways In" />
        <div className={editorial.featureGrid}>{waysIn.map((item) => <FeatureCell key={item.title} {...item} />)}</div>
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

      <section className={`${editorial.section} ${styles.studioRecord}`}>
        <div className={styles.notesColumn}>
          <div className={styles.recordHeading}>
            <p className="eyebrow">Studio Notes</p>
            <p>A programme study while the workshop and print room take shape.</p>
          </div>
          <div className={styles.notesList}>
            {studioNotes.map((note) => (
              <article className={styles.note} key={note.title}>
                <p className={styles.noteMeta}>{note.meta}</p>
                <h2>{note.title}</h2>
                <p>{note.description}</p>
                <CtaLink href="#programme" variant="text">Details</CtaLink>
              </article>
            ))}
          </div>
        </div>
        <div className={styles.recordColumn}>
          <div>
            <p className="eyebrow">Newsletter</p>
            <h2>Keep the Record</h2>
          </div>
          <p>Notes on print, studio openings, editions, workshops, and the work of making.</p>
          <CtaLink href={recordMailto()} external>Join the list</CtaLink>
        </div>
      </section>
    </>
  );
}

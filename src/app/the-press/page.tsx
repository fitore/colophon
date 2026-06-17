import PageHeader from "@/components/editorial/PageHeader";
import SectionHeading from "@/components/editorial/SectionHeading";
import PressCard from "@/components/press/PressCard";
import { pressPosts } from "@/lib/press";
import editorial from "@/components/editorial/editorial.module.css";

export default function PressPage() {
  return (
    <>
      <PageHeader title="The Press" intro="The Press publishes books under the Colophon name. Essays, notes, and editorial work form part of the wider record around those books." image="/images/glass/press-pillar.png" imageAlt="Stained-glass panel of pages, a sun, and a ruby mark." imagePortrait />
      <section className={editorial.section}>
        <SectionHeading label="From the Workbench" intro="Essays and notes on the books, materials, and work of the press." />
        <div className={editorial.tabs}>{["All", "Essays", "Notes", "Interviews", "Process", "Updates"].map((item) => <span key={item}>{item}</span>)}</div>
        {pressPosts.map((post) => <PressCard key={post.slug} post={post} />)}
      </section>
    </>
  );
}

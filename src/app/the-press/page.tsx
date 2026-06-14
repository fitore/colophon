import PageHeader from "@/components/editorial/PageHeader";
import SectionHeading from "@/components/editorial/SectionHeading";
import PressCard from "@/components/press/PressCard";
import { pressPosts } from "@/lib/press";
import editorial from "@/components/editorial/editorial.module.css";

export default function PressPage() {
  return (
    <>
      <PageHeader title="The Press" intro="We make books, prints, and posters under the Colophon name. Each title is designed and produced in the studio. What comes off the press goes into the shop." image="/images/glass/press-pillar.png" imageAlt="Stained-glass panel of pages, a sun, and a ruby mark." imagePortrait />
      <section className={editorial.section}>
        <SectionHeading label="From the Workbench" intro="Notes on what's being made, how, and why." />
        <div className={editorial.tabs}>{["All", "Essays", "Notes", "Interviews", "Process", "Updates"].map((item) => <span key={item}>{item}</span>)}</div>
        {pressPosts.map((post) => <PressCard key={post.slug} post={post} />)}
      </section>
    </>
  );
}

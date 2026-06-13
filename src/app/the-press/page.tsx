import NewsletterStrip from "@/components/editorial/NewsletterStrip";
import PageHeader from "@/components/editorial/PageHeader";
import PressCard from "@/components/press/PressCard";
import { pressPosts } from "@/lib/press";
import editorial from "@/components/editorial/editorial.module.css";

export default function PressPage() {
  return (
    <>
      <PageHeader title="The Press" intro="Notes, essays, and reflections on print, editions, and the work of making." image="/images/glass/press-pillar.png" imageAlt="Stained-glass panel of pages, a sun, and a ruby mark." imagePortrait />
      <section className={editorial.section}>
        <div className={editorial.tabs}>{["All", "Essays", "Notes", "Interviews", "Process", "Updates"].map((item) => <span key={item}>{item}</span>)}</div>
        {pressPosts.map((post) => <PressCard key={post.slug} post={post} />)}
      </section>
      <NewsletterStrip />
    </>
  );
}

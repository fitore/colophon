import PageHeader from "@/components/editorial/PageHeader";
import SectionHeading from "@/components/editorial/SectionHeading";
import CatalogCard from "@/components/catalog/CatalogCard";
import PressCard from "@/components/press/PressCard";
import { getPressBooks, publishedEssays } from "@/data";
import editorial from "@/components/editorial/editorial.module.css";
import styles from "@/app/bookstore/page.module.css";

export default function PressPage() {
  return (
    <>
      <PageHeader title="The Press" intro="The Press publishes books under the Colophon imprint. Essays and notes sit beside the books — as records of how they came to be." image="/images/glass/press-pillar.png" imageAlt="Stained-glass panel of pages, a sun, and a ruby mark." imagePortrait />
      <section className={editorial.section}>
        <SectionHeading label="Colophon Editions" intro="Books published under the Colophon imprint and available through the shop according to their current status." />
        <div className={styles.grid}>
          {getPressBooks().map((book) => <CatalogCard key={book.slug} item={book} />)}
        </div>
      </section>
      <section className={editorial.section}>
        <SectionHeading label="From the Workbench" intro="Essays and notes from the making of the books." />
        {publishedEssays.map((post) => <PressCard key={post.slug} post={post} />)}
      </section>
    </>
  );
}

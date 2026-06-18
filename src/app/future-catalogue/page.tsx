import CatalogCard from "@/components/catalog/CatalogCard";
import PageHeader from "@/components/editorial/PageHeader";
import { getFutureCatalogueItems } from "@/catalog/queries";
import editorial from "@/components/editorial/editorial.module.css";
import styles from "./page.module.css";

export default async function FutureCataloguePage() {
  const futureCatalogueItems = await getFutureCatalogueItems();
  return (
    <>
      <PageHeader title="Future Catalogue" intro="A study for editions, prints, books, and objects made with care and intention." note="This is a preview study, not a live catalogue. Availability, details, and prices are placeholders." />
      <section className={editorial.section}>
        <div className={editorial.tabs}>{["Books", "Prints"].map((item) => <span key={item}>{item}</span>)}</div>
        <div className={styles.grid}>
          {futureCatalogueItems.map((item) => <CatalogCard key={`${item.type}-${item.slug}`} item={item} />)}
        </div>
      </section>
    </>
  );
}

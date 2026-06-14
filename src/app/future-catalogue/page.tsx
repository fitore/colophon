import Image from "next/image";
import PageHeader from "@/components/editorial/PageHeader";
import { visionProducts } from "@/lib/visionProducts";
import editorial from "@/components/editorial/editorial.module.css";
import styles from "./page.module.css";

export default function FutureCataloguePage() {
  return (
    <>
      <PageHeader title="Future Catalogue" intro="A study for editions, prints, books, and objects made with care and intention." note="This is a preview study, not a live catalogue. Availability, details, and prices are placeholders." />
      <section className={editorial.section}>
        <div className={editorial.tabs}>{["Editions", "Prints", "Books", "Objects"].map((item) => <span key={item}>{item}</span>)}</div>
        <div className={styles.grid}>
          {visionProducts.slice(0, 6).map((product) => (
            <article className={styles.item} key={product.slug}>
              <div className={styles.image}>
                {product.image ? <Image src={product.image} alt={product.imageAlt ?? ""} fill sizes="24rem" className={styles.imageAsset} /> : <span />}
              </div>
              <p className="eyebrow">{product.kind}</p>
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              {product.scarcityLabel ? <span className={styles.status}>Preview · {product.scarcityLabel}</span> : null}
              <a href={`mailto:hello@expressed.press?subject=${encodeURIComponent(`Inquire: ${product.title}`)}`}>Inquire →</a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

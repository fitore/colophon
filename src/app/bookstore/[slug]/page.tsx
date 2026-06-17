import { notFound } from "next/navigation";
import PageHeader from "@/components/editorial/PageHeader";
import CtaLink from "@/components/ui/CtaLink";
import {
  formatMoney,
  getAcquirable,
  getAcquisitionCta,
  getContributorLabel,
  getOriginLabel,
  getStatusLabel,
} from "@/data";
import editorial from "@/components/editorial/editorial.module.css";

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getAcquirable(slug);
  if (!item) notFound();
  const cta = getAcquisitionCta(item);
  const image = item.image ?? (item.type === "book" ? "/images/books/placeholder-book.png" : undefined);
  const details =
    item.type === "book"
      ? [item.formats?.join(", "), item.isbn ? `ISBN ${item.isbn}` : undefined]
      : [item.medium, item.dimensions, item.edition];

  return (
    <>
      <PageHeader
        eyebrow={item.type === "book" ? "Book" : "Print"}
        title={item.title}
        intro={getContributorLabel(item)}
        note={item.description}
        image={image}
        imageAlt={item.image ? `${item.type === "book" ? "Cover" : "Artwork"} of ${item.title}` : `Placeholder cover for ${item.title}`}
      />
      <section className={editorial.section}>
        <p>{getOriginLabel(item.source)}</p>
        <p>{item.condition === "new" ? "New" : "Used"} · {getStatusLabel(item)}{item.price ? ` · ${formatMoney(item.price)}` : ""}</p>
        {details.some(Boolean) ? <p>{details.filter(Boolean).join(" · ")}</p> : null}
        {cta.href ? <CtaLink href={cta.href} external>{cta.label}</CtaLink> : <p>{cta.label}</p>}
      </section>
    </>
  );
}

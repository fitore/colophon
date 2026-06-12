import { notFound } from "next/navigation";
import PageHeader from "@/components/editorial/PageHeader";
import NewsletterStrip from "@/components/editorial/NewsletterStrip";
import CtaLink from "@/components/ui/CtaLink";
import { getBook } from "@/lib/books";
import { acquireMailto } from "@/lib/types";
import editorial from "@/components/editorial/editorial.module.css";

export default async function BookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  return (
    <>
      <PageHeader eyebrow={book.category} title={book.title} intro={book.author} note={book.note} image={book.coverImage} imageAlt={book.coverAlt} />
      <section className={editorial.section}>
        <CtaLink href={book.acquireUrl ?? acquireMailto(book.title)} external>Inquire about this book</CtaLink>
      </section>
      <NewsletterStrip />
    </>
  );
}

import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/editorial/PageHeader";
import { getContributorLabel, getEssay, publishedEssays } from "@/data";
import editorial from "@/components/editorial/editorial.module.css";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getEssay(slug);
  if (!post) notFound();
  const index = publishedEssays.findIndex((item) => item.slug === slug);
  const previous = publishedEssays[index - 1];
  const next = publishedEssays[index + 1];

  return (
    <>
      <PageHeader eyebrow={post.publishedAt} title={post.title} intro={post.excerpt ?? getContributorLabel(post)} />
      <article className={`${editorial.section} ${editorial.prose}`}>
        {post.body?.split("\n\n").map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <nav className={editorial.detailNav}>
          <span>{previous ? <Link href={`/the-press/${previous.slug}`}>← Previous</Link> : null}</span>
          <span>{next ? <Link href={`/the-press/${next.slug}`}>Next →</Link> : null}</span>
        </nav>
      </article>
    </>
  );
}

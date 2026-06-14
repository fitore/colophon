import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/editorial/PageHeader";
import { getPressPost, pressPosts } from "@/lib/press";
import editorial from "@/components/editorial/editorial.module.css";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPressPost(slug);
  if (!post) notFound();
  const index = pressPosts.findIndex((item) => item.slug === slug);
  const previous = pressPosts[index - 1];
  const next = pressPosts[index + 1];

  return (
    <>
      <PageHeader eyebrow={`${post.date} · ${post.category}`} title={post.title} intro={post.dek} image={post.heroImage} imageAlt={post.heroAlt} />
      <article className={`${editorial.section} ${editorial.prose}`}>
        {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <nav className={editorial.detailNav}>
          <span>{previous ? <Link href={`/the-press/${previous.slug}`}>← Previous</Link> : null}</span>
          <span>{next ? <Link href={`/the-press/${next.slug}`}>Next →</Link> : null}</span>
        </nav>
      </article>
    </>
  );
}

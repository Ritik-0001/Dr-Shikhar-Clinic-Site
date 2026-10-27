import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Info } from "lucide-react";
import { PostBlocks } from "@/components/blog/post-blocks";
import { PostCover } from "@/components/blog/post-cover";
import { BookingCard } from "@/components/sections/booking-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CtaBanner } from "@/components/ui/cta-banner";
import { JsonLd } from "@/components/ui/json-ld";
import { posts as builtInPosts, formatPostDate } from "@/data/blog";
import { getAllPosts, getPostBySlug, getState } from "@/lib/cms/content";
import { site } from "@/data/site";
import { getTreatment, treatmentHref } from "@/data/treatments";
import { articleJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

// Articles written in the admin panel after the last build are rendered on first visit, then cached.
export const dynamicParams = true;

export async function generateStaticParams() {
  const stored = (await getState()).posts.filter((p) => p.status === "published").map((p) => p.slug);
  return [...new Set([...builtInPosts.map((p) => p.slug), ...stored])].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPostBySlug(slug);
  if (!p) return {};
  return pageMetadata({
    title: p.title,
    description: p.excerpt,
    path: `/blog/${p.slug}`,
    keywords: p.keywords,
    type: "article",
    publishedTime: p.date,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const treatment = post.treatment ? getTreatment(post.treatment) : undefined;
  const more = (await getAllPosts()).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <header className="relative isolate overflow-hidden">
        <div className="bg-hero-glow absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-page pb-10 pt-8 sm:pb-14 sm:pt-12">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.category }]} />
          <p>
            <span className="inline-block rounded-full bg-accent-100 px-3.5 py-1.5 text-sm font-bold text-accent-800">{post.category}</span>
          </p>
          <h1 className="font-display mt-5 max-w-4xl text-[clamp(2.1rem,1.4rem+3.2vw,3.7rem)] leading-[1.1] tracking-[-0.035em] text-primary-900">{post.title}</h1>
          <p className="mt-5 max-w-3xl text-[1.05rem] leading-relaxed text-muted sm:text-xl">{post.excerpt}</p>
          <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-ink-soft">
            <span>By {site.name}</span>
            <span aria-hidden="true" className="hidden text-line sm:inline">
              |
            </span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true" className="hidden text-line sm:inline">
              |
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" /> {post.readMinutes} min read
            </span>
          </p>
        </div>
      </header>

      <div className="container-page grid gap-12 pb-16 sm:pb-24 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-16">
        <article>
          <PostCover post={post} className="mb-10 aspect-[16/8] rounded-[1.75rem] sm:mb-12 sm:aspect-[16/7] sm:rounded-[2rem]" />
          <div className="prose-clinic">
            <PostBlocks blocks={post.blocks} />
          </div>

          <p className="mt-12 flex max-w-2xl items-start gap-3 rounded-2xl border border-line bg-surface p-5 text-[0.95rem] leading-relaxed text-muted">
            <Info className="mt-0.5 size-5 shrink-0 text-primary-600" aria-hidden="true" />
            <span>
              This article is for general education and isn&apos;t a substitute for a dental examination. Every mouth is different, so <Link href="/appointment" className="font-semibold text-primary-700 underline underline-offset-2 hover:text-accent-600">book a consultation</Link> for advice about your own teeth.
            </span>
          </p>

          {treatment && (
            <div className="mt-10 flex flex-wrap items-center justify-between gap-5 rounded-[1.75rem] bg-primary-950 p-6 text-white sm:p-8">
              <div>
                <p className="eyebrow text-accent-300">Related treatment</p>
                <p className="font-display mt-2 text-3xl">{treatment.title}</p>
                <p className="mt-1 max-w-md text-primary-200">{treatment.summary}</p>
              </div>
              <Link href={treatmentHref(treatment)} className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-6 font-bold text-primary-900 transition-colors hover:bg-primary-50">
                About {treatment.title.toLowerCase()} <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          )}
        </article>

        <aside className="grid content-start gap-6 lg:sticky lg:top-28 lg:self-start" aria-label="Sidebar">
          <BookingCard treatment={treatment?.slug} title="Questions about your teeth?" text="Book a consultation and get honest, personal advice from our dental team." />
          <nav aria-label="More articles" className="rounded-[1.75rem] border border-line bg-white p-6">
            <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted">More to read</h2>
            <ul className="mt-4 grid gap-4">
              {more.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group block">
                    <span className="block font-display text-xl leading-snug text-primary-900 group-hover:text-accent-700">{p.title}</span>
                    <span className="mt-1 block text-sm text-muted">{p.readMinutes} min read</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>

      <CtaBanner className="pt-0" />
      <JsonLd data={articleJsonLd({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, date: post.date, keywords: post.keywords })} />
    </>
  );
}

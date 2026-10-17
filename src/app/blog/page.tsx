import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/blog-card";
import { CtaBanner } from "@/components/ui/cta-banner";
import { PageHero } from "@/components/ui/page-hero";
import { posts, sortedPosts } from "@/data/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Dental Health Blog",
  description:
    "Plain-language oral health guides from Shree Hari Dental Care — root canals, dental implants, braces vs aligners, teeth whitening, gum disease, children's teeth and oral cancer screening.",
  path: "/blog",
  keywords: ["dental blog India", "oral health tips", "root canal treatment Ahmedabad", "dental implants Ahmedabad", "teeth whitening Ahmedabad"],
});

export default function BlogPage() {
  const categories = [...new Set(posts.map((p) => p.category))];
  return (
    <>
      <PageHero
        eyebrow="Blog & oral health education"
        title="Healthy teeth start with good information"
        description="Straightforward guides from our dental team — what treatments involve, how to look after your teeth and when to see a dentist."
        breadcrumbs={[{ label: "Blog" }]}
      />

      <section className="section-y pt-4">
        <h2 className="sr-only">Articles</h2>
        <div className="container-page">
          <ul className="mb-10 flex flex-wrap gap-2" aria-label="Topics covered">
            {categories.map((c) => (
              <li key={c} className="rounded-full bg-primary-50 px-4 py-2 text-sm font-semibold text-primary-800">
                {c}
              </li>
            ))}
          </ul>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedPosts.map((p, i) => (
              <BlogCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner className="pt-8" />
    </>
  );
}

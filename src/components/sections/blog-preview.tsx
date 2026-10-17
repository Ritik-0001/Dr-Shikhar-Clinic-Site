import { ArrowRight } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { sortedPosts } from "@/data/blog";

export function BlogPreview() {
  return (
    <section className="section-y" aria-labelledby="blog-heading">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Oral health education"
            title={<span id="blog-heading">Plain-language guides from our dental team</span>}
            description="Understand your teeth, your treatment options and how to care for your smile at home."
          />
          <ButtonLink href="/blog" variant="outline" className="self-start lg:self-auto">
            All articles <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {sortedPosts.slice(0, 3).map((p, i) => (
            <BlogCard key={p.slug} post={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

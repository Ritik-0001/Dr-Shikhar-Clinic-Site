import type { Metadata } from "next";
import { site } from "@/data/site";
import type { Branch } from "@/data/branches";
import type { Faq } from "@/data/treatments";
import { absoluteUrl } from "./contact";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
};

/** Per-page metadata: title, description, canonical URL, Open Graph and Twitter cards. */
const shareImage = { url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` };

export function pageMetadata({ title, description, path, keywords, type = "website", publishedTime }: PageMeta): Metadata {
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      locale: site.locale,
      type,
      // A page's own openGraph block replaces the root one, so the share image must be repeated here.
      images: [shareImage],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [shareImage.url] },
  };
}

const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#organization"),
  name: site.name,
  alternateName: [site.shortName, site.nameGujarati],
  url: site.url,
  logo: absoluteUrl("/brand/emblem.png"),
  slogan: site.tagline,
  sameAs: [site.instagram.url],
  parentOrganization: { "@type": "Organization", name: site.parentCompany },
});

export const websiteJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  url: site.url,
  name: site.name,
  inLanguage: "en-IN",
  publisher: { "@id": absoluteUrl("/#organization") },
});

/** One schema.org `Dentist` (a LocalBusiness) per branch: drives local-pack / knowledge-panel eligibility. */
export function dentistJsonLd(b: Branch) {
  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalBusiness"],
    "@id": absoluteUrl(`/branches/${b.slug}#dentist`),
    name: b.listingName,
    url: absoluteUrl(`/branches/${b.slug}`),
    image: absoluteUrl("/brand/logo-stacked-english.png"),
    logo: absoluteUrl("/brand/emblem.png"),
    description: site.description,
    telephone: b.phone.tel,
    medicalSpecialty: "Dentistry",
    address: {
      "@type": "PostalAddress",
      streetAddress: b.streetAddress,
      addressLocality: b.area === b.city ? b.city : `${b.area}, ${b.city}`,
      addressRegion: b.state,
      postalCode: b.postalCode,
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: b.coordinates.lat, longitude: b.coordinates.lng },
    hasMap: b.mapsUrl,
    openingHoursSpecification: site.hours.sessions.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: site.hours.openDays.map((d) => weekdayNames[d]),
      opens: s.from,
      closes: s.to,
    })),
    sameAs: [site.instagram.url, b.mapsUrl],
    parentOrganization: { "@id": absoluteUrl("/#organization") },
    areaServed: b.serves.map((name) => ({ "@type": "Place", name })),
  };
}

export const faqJsonLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

/** The last crumb (current page) may omit `path`: schema.org allows the final item to have no URL. */
export const breadcrumbJsonLd = (items: { name: string; path?: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    ...(it.path ? { item: absoluteUrl(it.path) } : {}),
  })),
});

export const articleJsonLd = (p: { title: string; description: string; path: string; date: string; keywords?: string[] }) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: p.title,
  description: p.description,
  datePublished: p.date,
  dateModified: p.date,
  mainEntityOfPage: absoluteUrl(p.path),
  keywords: p.keywords?.join(", "),
  author: { "@type": "Organization", name: site.name },
  publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: absoluteUrl("/brand/emblem.png") } },
  image: absoluteUrl("/opengraph-image"),
});

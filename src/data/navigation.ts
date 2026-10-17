import { treatments, treatmentHref } from "./treatments";

export type NavChild = { label: string; href: string; description?: string };
export type NavItem = { label: string; href: string; children?: NavChild[]; mega?: boolean };

/** Desktop primary navigation. Every item has an href so it works on touch devices too. */
export const primaryNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about", description: "Our story, vision, mission and values" },
      { label: "Our Doctors", href: "/doctors", description: "Meet the founder and dental team" },
      { label: "Special Programs", href: "/special-programs", description: "Camps, school and corporate programs" },
    ],
  },
  { label: "Treatments", href: "/treatments", mega: true },
  { label: "Dental Implants", href: "/dental-implants" },
  {
    label: "Results",
    href: "/smile-gallery",
    children: [
      { label: "Smile Gallery", href: "/smile-gallery", description: "Before & after transformations" },
      { label: "Patient Testimonials", href: "/testimonials", description: "What patients say about us" },
    ],
  },
  {
    label: "Resources",
    href: "/blog",
    children: [
      { label: "Blog", href: "/blog", description: "Oral-health guides in plain language" },
      { label: "FAQs", href: "/faqs", description: "Answers to common questions" },
    ],
  },
  { label: "Branches", href: "/branches" },
  { label: "Contact", href: "/contact" },
];

export const treatmentLinks = treatments.map((t) => ({ label: t.title, href: treatmentHref(t), tagline: t.tagline, summary: t.summary, icon: t.icon }));

export const footerNav = {
  clinic: [
    { label: "About Us", href: "/about" },
    { label: "Our Doctors", href: "/doctors" },
    { label: "Special Programs", href: "/special-programs" },
    { label: "Branch Locator", href: "/branches" },
    { label: "Contact Us", href: "/contact" },
  ],
  patients: [
    { label: "Book an Appointment", href: "/appointment" },
    { label: "Smile Gallery", href: "/smile-gallery" },
    { label: "Patient Testimonials", href: "/testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "FAQs", href: "/faqs" },
  ],
};

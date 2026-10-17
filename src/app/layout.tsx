import type { Metadata, Viewport } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import { FloatingContact } from "@/components/layout/floating-contact";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { RouteFeedback } from "@/components/layout/route-feedback";
import { TopBar } from "@/components/layout/top-bar";
import { JsonLd } from "@/components/ui/json-ld";
import { site } from "@/data/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
// Headings: a confident, friendly sans (variable weight, so one small file covers every heading weight).
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });

const defaultTitle = `${site.name} | Dentist in Nikol, Ahmedabad & Dhrangadhra`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: defaultTitle, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  keywords: [
    "Dentist in Ahmedabad",
    "Dentist in Nikol",
    "Dentist in Dhrangadhra",
    "Dental Clinic Ahmedabad",
    "Dental Implants Ahmedabad",
    "Root Canal Treatment Ahmedabad",
    "Teeth Whitening Ahmedabad",
    "Smile Design Ahmedabad",
    "Braces Treatment Ahmedabad",
    "Clear Aligners Ahmedabad",
    "Multispeciality Dental Clinic Gujarat",
    "Affordable Dental Clinic Ahmedabad",
    "Painless Dental Treatment",
    "Dental Implant Centre Gujarat",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: site.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = {
  themeColor: "#fffdf9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${manrope.variable} ${jakarta.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-full bg-primary-800 px-5 py-3 font-semibold text-white shadow-lift"
        >
          Skip to main content
        </a>
        <RouteFeedback />
        <TopBar />
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <FloatingContact />
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}

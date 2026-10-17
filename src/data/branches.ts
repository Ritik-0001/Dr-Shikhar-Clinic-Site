/**
 * Clinic branches.
 * Addresses, phone numbers, coordinates and ratings were read from each branch's public Google
 * Maps listing (the share links the client supplied) on 2026-10-17.
 * Addresses are kept word-for-word as on Google so the clinic's name/address/phone stay
 * consistent across the web (this matters for local SEO).
 *
 * TODO(client): confirm the phone numbers below (also used as WhatsApp numbers) and the ratings.
 */

export type Branch = {
  slug: "nikol-ahmedabad" | "dhrangadhra";
  /** Short label used in chips, tabs and buttons */
  shortName: string;
  /** Name shown on Google Maps */
  listingName: string;
  city: string;
  area: string;
  state: string;
  postalCode: string;
  streetAddress: string;
  /** Full single-line address */
  fullAddress: string;
  landmark?: string;
  /** Google Plus Code: a short, exact location code shown on the listing */
  plusCode: string;
  phone: { display: string; tel: string; whatsapp: string };
  coordinates: { lat: number; lng: number };
  /** Client-supplied Google Maps share link (opens the business listing) */
  mapsUrl: string;
  /** Google's internal feature id for the listing: drives the keyless embed below */
  featureId: string;
  google: { rating: number; reviews: number };
  /** Local-SEO copy for the branch page */
  tagline: string;
  intro: string;
  /** Who this branch serves: used in copy and structured data */
  serves: string[];
};

export const branches: Branch[] = [
  {
    slug: "nikol-ahmedabad",
    shortName: "Nikol",
    listingName: "Shree Hari Dental Care - SHDC Nikol",
    city: "Ahmedabad",
    area: "Nikol",
    state: "Gujarat",
    postalCode: "380049",
    streetAddress: "122, First Floor, Palm Arcade, Sukan bunglow cross road, Nikol - Naroda Rd",
    fullAddress:
      "122, First Floor, Palm Arcade, Sukan bunglow cross road, Nikol - Naroda Rd, Nikol, Ahmedabad, Gujarat 380049",
    landmark: "Palm Arcade, Sukan Bunglow Cross Road",
    plusCode: "3M27+2H Ahmedabad, Gujarat",
    phone: { display: "+91 92656 16569", tel: "+919265616569", whatsapp: "919265616569" },
    coordinates: { lat: 23.050067, lng: 72.6639456 },
    mapsUrl: "https://maps.app.goo.gl/TRC877E2GpLBi8V88",
    featureId: "0x395e87a367bbc343:0x8b2354c43b332f77",
    google: { rating: 5.0, reviews: 15 },
    tagline: "Our Ahmedabad clinic",
    intro:
      "Our Nikol clinic brings complete multispeciality dental care to east Ahmedabad: from routine check-ups and scaling to root canal treatment, dental implants, braces and clear aligners.",
    serves: ["Nikol", "Naroda", "Naroda Road", "Vastral", "Odhav", "Bapunagar", "Ahmedabad"],
  },
  {
    slug: "dhrangadhra",
    shortName: "Dhrangadhra",
    listingName: "Shree Hari Dental Care - SHDC DHRANGADHRA",
    city: "Dhrangadhra",
    area: "Dhrangadhra",
    state: "Gujarat",
    postalCode: "363310",
    streetAddress: "Navyug Road, Surendranagar",
    fullAddress: "Navyug Road, Surendranagar, Dhrangadhra, Gujarat 363310",
    landmark: "Navyug Road",
    plusCode: "XFV9+5R Dhrangadhra, Gujarat",
    phone: { display: "+91 94276 64500", tel: "+919427664500", whatsapp: "919427664500" },
    coordinates: { lat: 22.9929207, lng: 71.4695988 },
    mapsUrl: "https://maps.app.goo.gl/dEHREKd95KL6FyMH7",
    featureId: "0x3959635243da7709:0x9a1864fc3581c855",
    google: { rating: 5.0, reviews: 15 },
    tagline: "Our Dhrangadhra clinic",
    intro:
      "Our Dhrangadhra clinic offers the same ethical, painless and evidence-based dental care to patients in Dhrangadhra and across Surendranagar district.",
    serves: ["Dhrangadhra", "Halvad", "Surendranagar district"],
  },
];

export const getBranch = (slug: string) => branches.find((b) => b.slug === slug);

/** Keyless Google Maps embed that shows the actual business card, rating and pin. */
export const mapEmbedUrl = (b: Branch) =>
  `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2400!2d${b.coordinates.lng}!3d${b.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${encodeURIComponent(
    b.featureId,
  )}!2s${encodeURIComponent(b.listingName)}!5e0!3m2!1sen!2sin!4v1760000000000!5m2!1sen!2sin`;

/** Turn-by-turn directions to the clinic from the visitor's location. */
export const directionsUrl = (b: Branch) =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${b.listingName}, ${b.fullAddress}`)}`;

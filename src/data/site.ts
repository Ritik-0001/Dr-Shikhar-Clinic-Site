/**
 * Single source of truth for clinic-wide facts.
 * Everything here comes from the client's brief unless a comment says otherwise.
 */

const rawUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const site = {
  name: "Shree Hari Dental Care",
  shortName: "SHDC",
  nameGujarati: "શ્રી હરિ ડેન્ટલ કેર",
  parentCompany: "Shreenath Healthcare Pvt. Ltd.",
  tagline: "Healthy Teeth. Happy Life. Confident You.",
  taglineParts: ["Healthy Teeth.", "Happy Life.", "Confident You."] as const,
  description:
    "Shree Hari Dental Care is a modern multispeciality dental clinic in Nikol, Ahmedabad and Dhrangadhra, Gujarat: ethical, painless, evidence-based dentistry with advanced technology and strict sterilization.",
  url: rawUrl.replace(/\/$/, ""),
  locale: "en_IN",
  founder: { name: "Dr. Shikhar Selara", credential: "BDS, Dental Surgeon", role: "Founder, Shree Hari Dental Care" },

  instagram: {
    handle: "shree_hari_dental_care",
    url: "https://www.instagram.com/shree_hari_dental_care/",
  },

  /** TODO(client): no public e-mail address was supplied. Leave `null` to hide e-mail everywhere. */
  email: null as string | null,

  /** Timings from the brief: Mon to Sat, two sessions; Sunday closed. */
  hours: {
    label: "Monday to Saturday",
    sessions: [
      { name: "Morning", from: "09:00", to: "13:00", display: "9:00 AM to 1:00 PM" },
      { name: "Evening", from: "16:00", to: "20:00", display: "4:00 PM to 8:00 PM" },
    ],
    closedLabel: "Sunday",
    /** 0 = Sunday … 6 = Saturday */
    openDays: [1, 2, 3, 4, 5, 6],
    timeZone: "Asia/Kolkata",
  },

  /** Treatment categories + counts used in the trust strip (kept in sync from data files). */
  founded: null as number | null, // TODO(client): add the year the clinic was founded to show "Since …"
} as const;

export type Site = typeof site;

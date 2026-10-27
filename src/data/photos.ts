import { doctors } from "./doctors";
import { treatmentPages } from "./treatments";

/**
 * Every place on the site that can show a photo. The admin panel (/admin/photos) lists these slots so the
 * clinic can upload or replace each photo; until one is set, the page shows its designed fallback.
 * To add a new photo location, add a slot here and render it with `getPhoto(id)` (see src/lib/cms/content.ts).
 */
export type PhotoSlot = {
  id: string;
  group: "Home" | "Clinics" | "Team" | "About" | "Treatments";
  label: string;
  /** Where the photo appears, in plain words (shown in the admin) */
  where: string;
  /** CSS aspect-ratio of the preview, e.g. "4 / 5" */
  ratio: string;
  /** Short advice on what to upload */
  hint: string;
  /** Default alt text (the admin can override it per photo) */
  alt: string;
};

export const photoGroups: PhotoSlot["group"][] = ["Home", "Clinics", "Team", "About", "Treatments"];

export const photoSlots: PhotoSlot[] = [
  {
    id: "home-hero",
    group: "Home",
    label: "Home page main photo",
    where: "Big arch beside the headline on the home page",
    ratio: "4 / 5",
    hint: "A portrait photo: the doctor, the reception or a smiling patient. Keep the subject in the middle.",
    alt: "Shree Hari Dental Care",
  },
  {
    id: "clinic-nikol-ahmedabad",
    group: "Clinics",
    label: "Nikol clinic",
    where: "Clinic card on the home and contact pages, and the Nikol clinic page",
    ratio: "16 / 7",
    hint: "The clinic front or the waiting area, taken in landscape.",
    alt: "Shree Hari Dental Care clinic in Nikol, Ahmedabad",
  },
  {
    id: "clinic-dhrangadhra",
    group: "Clinics",
    label: "Dhrangadhra clinic",
    where: "Clinic card on the home and contact pages, and the Dhrangadhra clinic page",
    ratio: "16 / 7",
    hint: "The clinic front or the waiting area, taken in landscape.",
    alt: "Shree Hari Dental Care clinic in Dhrangadhra",
  },
  ...doctors.map(
    (d): PhotoSlot => ({
      id: `doctor-${d.slug}`,
      group: "Team",
      label: d.name,
      where: "Founder section on the home page and the Our Doctors page",
      ratio: "4 / 5",
      hint: "A friendly, well-lit portrait. Head and shoulders work best.",
      alt: `${d.name}, ${d.credential}`,
    }),
  ),
  {
    id: "about-clinic",
    group: "About",
    label: "About page clinic photo",
    where: "Beside our story on the About page",
    ratio: "4 / 3",
    hint: "The treatment room, the team or the clinic interior.",
    alt: "Inside Shree Hari Dental Care",
  },
  ...treatmentPages.map(
    (t): PhotoSlot => ({
      id: `treatment-${t.slug}`,
      group: "Treatments",
      label: t.title,
      where: `Top of the ${t.title} page`,
      ratio: "4 / 5",
      hint: "A photo that shows this treatment or its equipment. Optional.",
      alt: t.title,
    }),
  ),
];

export const getPhotoSlot = (id: string) => photoSlots.find((s) => s.id === id);

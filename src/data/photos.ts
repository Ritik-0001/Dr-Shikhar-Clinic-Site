/**
 * Photo slots. Until the client sends real photography the site shows designed fallbacks (brand emblem arch,
 * doctor monogram, clean clinic cards). To use a photo: copy the file into /public/images/ and set its path here,
 * e.g. hero: "/images/hero-clinic.jpg". Nothing else needs to change.
 *
 * Suggested shots: clinic front board, reception/interior, treatment chair, equipment, doctor portrait, team.
 */
export const photos = {
  /** Portrait photo shown inside the hero arch (roughly 4:5). */
  hero: null as string | null,
  /** One exterior or interior photo per clinic, shown on the clinic cards (roughly 3:2). */
  clinics: {
    "nikol-ahmedabad": null as string | null,
    dhrangadhra: null as string | null,
  },
};

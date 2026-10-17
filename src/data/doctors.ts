export type Doctor = {
  slug: string;
  name: string;
  credential: string;
  title: string;
  role: string;
  initials: string;
  /** Public path of a portrait in /public (e.g. "/images/team/dr-shikhar-selara.jpg"). `null` shows a designed monogram. */
  photo: string | null;
  bio: string[];
  principles: { title: string; text: string }[];
};

/**
 * TODO(client): send a portrait photo and any extra credentials / experience the doctor wants shown.
 * More doctors can be added to this array — the Our Doctors page renders one card per entry.
 */
export const doctors: Doctor[] = [
  {
    slug: "dr-shikhar-selara",
    name: "Dr. Shikhar Selara",
    credential: "BDS",
    title: "Dental Surgeon",
    role: "Founder, Shree Hari Dental Care",
    initials: "SS",
    photo: null,
    bio: [
      "Dr. Shikhar Selara is a BDS-qualified dental surgeon and the founder of Shree Hari Dental Care. He built the clinic around a simple idea: dental treatment should be ethical, painless and evidence-based — and within reach of every family in Gujarat.",
      "That idea shapes every appointment. Patients are listened to first, shown their diagnosis, and given honest options before any treatment begins. Prevention and patient education come before drills and fillings — because the best outcome is the one you never need a procedure for.",
    ],
    principles: [
      { title: "Ethical, honest treatment planning", text: "Only the treatment you need, explained clearly — never the other way round." },
      { title: "Painless, comfortable care", text: "Gentle technique and modern equipment, with your comfort checked throughout." },
      { title: "Prevention and education first", text: "Helping you understand your mouth so you can keep it healthy." },
      { title: "Strict sterilization, every time", text: "International-standard infection control behind every treatment." },
    ],
  },
];

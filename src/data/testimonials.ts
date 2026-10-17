export type Testimonial = {
  quote: string;
  name: string;
  branch: "Nikol" | "Dhrangadhra";
  treatment: string;
  rating: 5;
  /**
   * `true` = placeholder copy written for the design preview. The UI labels these "Sample" so they can
   * never be mistaken for real patient feedback. Replace them with real, consented reviews and remove
   * the flag (or leave it off) — the label disappears automatically.
   */
  sample?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote: "The doctor explained everything before starting, and I didn't feel any pain during my root canal. The clinic is spotless.",
    name: "R. P.",
    branch: "Nikol",
    treatment: "Root Canal Treatment",
    rating: 5,
    sample: true,
  },
  {
    quote: "I was nervous about braces for my daughter. The team was patient with her and explained each step to us.",
    name: "S. M.",
    branch: "Nikol",
    treatment: "Braces",
    rating: 5,
    sample: true,
  },
  {
    quote: "Honest advice — I was told what I actually needed instead of being sold extra treatment. I'll recommend them to my family.",
    name: "K. S.",
    branch: "Dhrangadhra",
    treatment: "Check-up & treatment plan",
    rating: 5,
    sample: true,
  },
  {
    quote: "A quick, gentle cleaning, and the staff made my son comfortable on his very first dental visit.",
    name: "H. G.",
    branch: "Dhrangadhra",
    treatment: "Pediatric Dentistry",
    rating: 5,
    sample: true,
  },
  {
    quote: "My chipped front tooth was repaired with bonding in one visit, and the colour matches perfectly.",
    name: "A. T.",
    branch: "Nikol",
    treatment: "Cosmetic Bonding",
    rating: 5,
    sample: true,
  },
  {
    quote: "They showed me my X-ray on the screen and explained the implant plan clearly — including the timeline and the cost.",
    name: "M. D.",
    branch: "Nikol",
    treatment: "Dental Implants",
    rating: 5,
    sample: true,
  },
];

/**
 * Themes patients mention most on the clinic's Google listing (as displayed by Google, 2026-10-17).
 * TODO(client): replace with a live Google Reviews feed when that feature is built.
 */
export const googleThemes = ["Gentle dentist", "Painless treatment", "Comfortable procedure", "Modern clinic"];

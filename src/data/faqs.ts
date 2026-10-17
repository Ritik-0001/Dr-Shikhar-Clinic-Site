import type { Faq } from "./treatments";

export type FaqGroup = { id: string; title: string; faqs: Faq[] };

/**
 * Answers use only facts from the client's brief (timings, services, sterilization, programs).
 * They deliberately avoid prices and unverifiable promises. Inline links use [label](/path).
 */
export const faqGroups: FaqGroup[] = [
  {
    id: "visiting",
    title: "Visiting us",
    faqs: [
      { q: "What are your clinic timings?", a: "Both clinics are open Monday to Saturday, 9:00 AM to 1:00 PM and 4:00 PM to 8:00 PM. We are closed on Sundays." },
      { q: "Where are your clinics located?", a: "We have two clinics: Nikol, Ahmedabad (Palm Arcade, Nikol-Naroda Road) and Dhrangadhra (Navyug Road). See the [branch locator](/branches) for maps, directions and phone numbers." },
      { q: "How do I book an appointment?", a: "Use the [online appointment form](/appointment), message the clinic on WhatsApp, or call. Booking ahead means dedicated time for you and less waiting." },
      { q: "What should I bring to my first visit?", a: "Any previous dental records or X-rays, a list of the medicines you take, and details of medical conditions or allergies. If you don't have any of these, that's fine. We'll start fresh." },
      { q: "Do you offer free consultations?", a: "We offer free dental consultation on selected days and during campaigns. See [special programs](/special-programs), follow us on Instagram or call your nearest clinic to ask what is currently available." },
    ],
  },
  {
    id: "comfort-safety",
    title: "Comfort & safety",
    faqs: [
      { q: "Is dental treatment painful?", a: "Our approach is ethical, painless and evidence-based. We use local anaesthesia and gentle technique wherever needed, explain each step beforehand, and pause whenever you ask." },
      { q: "How do you keep treatment safe and hygienic?", a: "Instruments are sterilised in an autoclave and tracked through the sterilization cycle; disposable materials are used wherever required; surfaces are disinfected after every patient; barrier protection is used; and our team follows strict infection-control guidelines. [Read more about our sterilization protocol](/technology#sterilization)." },
      { q: "I'm nervous about the dentist. Can you help?", a: "Many people feel that way. Please tell us when you book. We'll explain every step before we begin, go at your pace and take breaks whenever you need one. Often the biggest relief is simply knowing what to expect." },
    ],
  },
  {
    id: "treatments",
    title: "Treatments",
    faqs: [
      { q: "Is root canal treatment painful, and can it be done in one visit?", a: "Treatment is done under local anaesthesia, so you shouldn't feel pain: the infection is what hurts, and a root canal relieves it. Single-sitting RCT is possible in selected cases; infected or complex teeth are better treated over several visits. See [root canal treatment](/treatments/root-canal-treatment)." },
      { q: "Who can get dental implants, and how long does it take?", a: "Most healthy adults with healthy gums and enough jawbone can. After placement, the implant takes a few months to fuse with the bone before the final tooth is fitted; in selected cases, implants can be placed immediately after extraction. See [dental implants](/dental-implants)." },
      { q: "Braces or clear aligners: which should I choose?", a: "It depends on your teeth, your bite and your lifestyle. Aligners suit many mild-to-moderate cases; braces handle a wider range. A consultation tells us what's best. See our [guide to braces and clear aligners](/blog/braces-or-clear-aligners-how-to-choose)." },
      { q: "Is teeth whitening safe?", a: "For most healthy teeth, professional whitening under a dentist's supervision is safe. Some people feel temporary sensitivity, and whitening isn't suitable for everyone. We check first. See [teeth whitening: professional vs home remedies](/blog/teeth-whitening-professional-vs-home-remedies)." },
      { q: "When should my child first see a dentist?", a: "Around the first birthday, or when the first tooth appears, whichever comes first. Read [your child's first dental visit](/blog/your-childs-first-dental-visit)." },
      { q: "How often should I get a check-up and cleaning?", a: "Most people benefit from a check-up and cleaning every six months. If you have gum disease or a high risk of cavities, we may suggest shorter intervals." },
    ],
  },
  {
    id: "costs",
    title: "Costs & treatment plans",
    faqs: [
      { q: "How much will my treatment cost?", a: "It depends on your diagnosis and the treatment you choose. After your examination we explain the plan, the options and the costs clearly, before any treatment begins, so there are no surprises. We aim to keep quality dental care affordable for every family." },
      { q: "Will I get a say in my treatment plan?", a: "Always. After diagnosis we discuss the plan and your options together, and you decide. You're also welcome to take time or get a second opinion." },
    ],
  },
  {
    id: "community",
    title: "Community & camps",
    faqs: [
      { q: "Do you run dental camps for schools and workplaces?", a: "Yes. We organise school dental check-up programs, corporate dental camps, oral cancer screening camps and dental awareness programs. See [special programs](/special-programs) or contact us to arrange one." },
      { q: "How do I find a good dentist in Nikol?", a: "Look for a qualified, registered dentist; strict sterilization; clear, honest treatment plans; and a team that listens. Our guide, [how to choose a dentist in Nikol, Ahmedabad](/blog/how-to-choose-a-dentist-in-nikol-ahmedabad), lists seven things to check." },
    ],
  },
];

export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.faqs);

/** Plain-text version of an answer (inline-link markup removed) for schema.org FAQ markup. */
export const plainAnswer = (a: string) => a.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "");

const byQuestion = (start: string) => allFaqs.find((f) => f.q.startsWith(start));

/** The handful of questions shown on the home page. */
export const homeFaqs: Faq[] = [
  "What are your clinic timings?",
  "How do I book an appointment?",
  "Is dental treatment painful?",
  "How do you keep treatment safe",
]
  .map(byQuestion)
  .filter((f): f is Faq => Boolean(f));

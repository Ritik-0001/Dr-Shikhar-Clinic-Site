import type { DentalIconName } from "./treatments";

/**
 * Blog posts: general oral-health education written for patients (and for the client's SEO keywords).
 * Content is plain data so no CMS/MDX pipeline is needed. Inline markup: **bold**, [label](/path).
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  /** ISO date */
  date: string;
  readMinutes: number;
  keywords: string[];
  cover: { icon: DentalIconName; tone: "blue" | "red" | "navy" | "sky" };
  /** treatment page this post supports (internal linking) */
  treatment?: string;
  blocks: Block[];
};

export const posts: Post[] = [
  {
    slug: "how-to-choose-a-dentist-in-nikol-ahmedabad",
    title: "How to Choose a Dentist in Nikol, Ahmedabad: 7 Things to Look For",
    excerpt: "Star ratings and ads only tell you so much. Here are seven practical checks to make before you book a dentist in Nikol, or anywhere.",
    category: "Guides",
    date: "2026-10-14",
    readMinutes: 5,
    keywords: ["dentist in Nikol", "dentist in Ahmedabad", "dental clinic Ahmedabad", "how to choose a dentist"],
    cover: { icon: "general", tone: "red" },
    treatment: "general-dentistry",
    blocks: [
      { type: "p", text: "Searching for the \"best dentist in Nikol\" brings up dozens of results, from large clinic chains to small neighbourhood practices. Star ratings and advertisements can only tell you so much. Here are seven practical things to check before you book, whichever clinic you choose." },
      { type: "h2", text: "1. Qualifications and registration" },
      { type: "p", text: "A qualified dentist holds a recognised degree (BDS, or MDS for specialists) and is registered with the state dental council. Don't hesitate to ask: a good clinic will be happy to tell you." },
      { type: "h2", text: "2. Sterilization and hygiene" },
      { type: "p", text: "You should be able to see a clean, organised clinic. Ask how instruments are sterilised (look for an autoclave), whether single-use items such as gloves, masks and needles are used only once, and whether surfaces are disinfected between patients." },
      { type: "h2", text: "3. A dentist who listens, and explains" },
      { type: "p", text: "The best appointments start with questions, not drills. Your dentist should ask about your concerns and history, examine you carefully, show you what they've found (X-rays, photographs) and explain your options in plain language." },
      { type: "h2", text: "4. Honest treatment planning" },
      { type: "p", text: "Be cautious if you're pushed towards expensive treatment without a clear diagnosis, or if every problem seems to need the same solution. A trustworthy dentist explains what's urgent, what can wait and what you don't need at all, and won't mind if you want a second opinion." },
      { type: "h2", text: "5. Transparency about cost" },
      { type: "p", text: "Ask for the treatment plan and an estimate before you begin, including how many visits it needs. There should be no surprises on the bill." },
      { type: "h2", text: "6. Appropriate technology" },
      { type: "p", text: "Modern tools such as digital X-rays, intraoral cameras, rotary endodontic instruments and apex locators make diagnosis more accurate and treatment more comfortable. They don't replace skill, but they help." },
      { type: "h2", text: "7. Convenience and follow-up" },
      { type: "p", text: "Good dental care is a relationship, not a one-off. Choose a clinic that's easy to reach, offers timings that suit your schedule (evening appointments help if you work), and follows up after treatment." },
      { type: "h2", text: "A note on reviews" },
      { type: "p", text: "Read what people actually write in Google reviews, not just the star rating. Look for patterns (\"explained everything\", \"no pain\", \"clean clinic\") rather than a single glowing or angry comment." },
      { type: "h2", text: "Visit Shree Hari Dental Care in Nikol" },
      { type: "p", text: "Our Nikol clinic is at 122, First Floor, Palm Arcade, Nikol-Naroda Road, and is open Monday to Saturday, 9 AM to 1 PM and 4 PM to 8 PM. [See directions](/branches/nikol-ahmedabad) or [book an appointment](/appointment), and judge us by the seven points above." },
    ],
  },
  {
    slug: "root-canal-treatment-what-really-happens",
    title: "Root Canal Treatment: What Really Happens (and Why It Doesn't Have to Hurt)",
    excerpt: "Root canals have a scary reputation. Here's what actually happens in the chair, why the pain comes from the infection and not the treatment, and when one visit is enough.",
    category: "Treatments",
    date: "2026-09-18",
    readMinutes: 5,
    keywords: ["root canal treatment Ahmedabad", "painless root canal", "single sitting RCT", "RCT"],
    cover: { icon: "rootcanal", tone: "navy" },
    treatment: "root-canal-treatment",
    blocks: [
      { type: "p", text: "Few dental words cause as much worry as \"root canal\". Most of that fear comes from stories told decades ago, before modern anaesthesia and instruments. Today, a root canal is a routine procedure whose purpose is to **end your pain and save your natural tooth**." },
      { type: "h2", text: "Why a tooth needs a root canal" },
      { type: "p", text: "Inside every tooth is soft tissue called the pulp, containing nerves and blood vessels. When deep decay, a crack or an injury lets bacteria reach the pulp, it becomes inflamed and infected. That's the throbbing toothache that wakes you at night. Left untreated, the infection can spread to the bone and form an abscess, and the tooth may eventually be lost." },
      { type: "h2", text: "What happens during treatment" },
      {
        type: "ol",
        items: [
          "**Diagnosis.** A digital X-ray and a few simple tests confirm which tooth is affected and how far the infection has spread.",
          "**Anaesthesia.** The tooth and surrounding area are numbed, so you shouldn't feel pain during the procedure.",
          "**Cleaning.** A small opening is made and the infected pulp is removed. Rotary files shape the canals, and an apex locator helps measure their exact length.",
          "**Disinfecting and sealing.** The canals are rinsed with antibacterial solutions and sealed with a biocompatible material.",
          "**Restoration.** The tooth is rebuilt with a filling, or, for heavily damaged teeth, a post, core and crown.",
        ],
      },
      { type: "h2", text: "Can it be done in one visit?" },
      { type: "p", text: "Sometimes. Single-sitting root canal treatment is possible in selected cases: for example, when the infection is limited and the canals are straightforward. When a tooth is badly infected or has complex canals, it's safer to spread treatment over two or more visits so the tooth can be thoroughly disinfected between sessions. A good dentist will tell you honestly which approach suits your tooth." },
      { type: "h2", text: "What to expect afterwards" },
      {
        type: "ul",
        items: [
          "Mild tenderness for a day or two is common and usually settles with simple pain relief.",
          "Avoid chewing hard foods on the treated tooth until it has been permanently restored.",
          "Back teeth usually need a crown to protect them from fracture.",
          "Keep brushing and flossing as normal.",
        ],
      },
      { type: "h2", text: "When to see a dentist" },
      { type: "p", text: "Don't wait for the pain to become unbearable. See a dentist if you have a toothache that lingers, sensitivity that lasts after hot or cold has gone, swelling of the gum or face, or a pimple-like bump on the gum. Earlier treatment is simpler and gives the best chance of saving the tooth. Read more about [root canal treatment at Shree Hari Dental Care](/treatments/root-canal-treatment)." },
    ],
  },
  {
    slug: "dental-implants-in-ahmedabad-what-to-expect",
    title: "Dental Implants: Who Needs Them, How Long They Take and What to Expect",
    excerpt: "From a single missing tooth to a full arch, here's how dental implants work, who is a good candidate and what the journey looks like step by step.",
    category: "Dental Implants",
    date: "2026-09-25",
    readMinutes: 6,
    keywords: ["dental implants Ahmedabad", "All-on-4", "dental implant centre Gujarat", "tooth replacement"],
    cover: { icon: "implant", tone: "sky" },
    treatment: "dental-implants",
    blocks: [
      { type: "p", text: "Losing a tooth affects more than your smile. It changes how you chew and speak and, over time, even the shape of your jaw, because the bone that once held the tooth slowly shrinks. Dental implants are the closest thing we have to getting a natural tooth back." },
      { type: "h2", text: "What is a dental implant?" },
      { type: "p", text: "An implant is a small titanium post that replaces the root of a missing tooth. It's placed in the jawbone and, over a few months, fuses with it: a process called osseointegration. Once healed, the implant supports a crown, bridge or denture." },
      { type: "h2", text: "Who is a good candidate?" },
      {
        type: "ul",
        items: [
          "Adults with one or more missing teeth",
          "Healthy gums, free from active infection",
          "Enough jawbone to hold the implant, checked with X-rays",
          "Good general health. Conditions such as uncontrolled diabetes and habits like smoking can affect healing, so they're discussed first",
        ],
      },
      { type: "h2", text: "The implant journey, step by step" },
      {
        type: "ol",
        items: [
          "**Consultation and imaging.** We examine your mouth, take digital X-rays and talk through your options.",
          "**Planning.** The position of each implant is planned digitally; in some cases a surgical guide is used for extra precision.",
          "**Placement.** Under local anaesthesia, the implant is placed in the bone. Most patients are surprised at how comfortable it is.",
          "**Healing.** The implant integrates with the bone over a few months. In selected cases, an implant can be placed immediately after a tooth is removed, which can shorten the overall timeline.",
          "**Final teeth.** Your custom crown, bridge or denture is fitted and fine-tuned for comfort.",
        ],
      },
      { type: "h2", text: "Single implants, bridges, and All-on-4 / All-on-6" },
      { type: "p", text: "The number of implants depends on what you're replacing. A single missing tooth usually needs one implant and a crown. Several neighbouring teeth can often be replaced with an implant-supported bridge. For a full arch of teeth, All-on-4 and All-on-6 use four or six implants to support a fixed set of teeth: a popular alternative to removable dentures." },
      { type: "h2", text: "Implants vs bridges vs dentures" },
      { type: "p", text: "A conventional bridge relies on the neighbouring teeth, which must be reduced to hold it. Dentures are removable and can feel loose over time. Implants don't depend on neighbouring teeth, help preserve jawbone and feel closest to natural teeth, but they involve a surgical step and a longer timeline. The right choice depends on your teeth, health, budget and priorities, and a good dentist will explain all of them." },
      { type: "h2", text: "Looking after your implants" },
      { type: "p", text: "The crown on an implant can't get cavities, but the gums around it can still become infected. Brush twice a day, clean between the teeth daily, avoid smoking and keep your regular check-ups. With good care, implants can last for many years. Learn more about [dental implants at Shree Hari Dental Care](/dental-implants)." },
    ],
  },
  {
    slug: "braces-or-clear-aligners-how-to-choose",
    title: "Braces or Clear Aligners? How to Choose the Right Option for Your Smile",
    excerpt: "Both straighten teeth, but they suit different people and different problems. Here's how to decide, and the questions to ask at your consultation.",
    category: "Orthodontics",
    date: "2026-10-02",
    readMinutes: 5,
    keywords: ["braces treatment Ahmedabad", "clear aligners Ahmedabad", "braces vs aligners", "orthodontist Ahmedabad"],
    cover: { icon: "ortho", tone: "red" },
    treatment: "orthodontics",
    blocks: [
      { type: "p", text: "Straightening your teeth is a big decision, and the first question is almost always the same: braces or clear aligners? Both work. They simply suit different people, different problems and different lifestyles." },
      { type: "h2", text: "How braces work" },
      { type: "p", text: "Braces use small brackets bonded to your teeth, connected by a wire that applies gentle, continuous pressure to guide the teeth into position. Because they're fixed, they work around the clock and can correct everything from minor crowding to complex bite problems. Options include **metal braces** (the most economical and time-tested), **ceramic braces** (tooth-coloured and less noticeable) and **self-ligating braces** (built-in clips instead of elastic ties, which can mean easier cleaning and fewer adjustments)." },
      { type: "h2", text: "How clear aligners work" },
      { type: "p", text: "Clear aligners are a series of custom-made, removable plastic trays. You switch to a new set every week or two, and each one moves your teeth a small step. They're nearly invisible and can be taken out to eat and brush, but they only work if you wear them, usually 20 to 22 hours a day." },
      { type: "h2", text: "Which one is right for you?" },
      { type: "h3", text: "Braces may suit you if…" },
      {
        type: "ul",
        items: [
          "Your teeth are significantly crowded, rotated or spaced",
          "You have a complex bite problem, such as an overbite, underbite or crossbite",
          "You'd rather not depend on remembering to wear trays",
          "You want the most economical option",
        ],
      },
      { type: "h3", text: "Aligners may suit you if…" },
      {
        type: "ul",
        items: [
          "Your case is mild to moderate",
          "You want a discreet look at work or on social occasions",
          "You want to remove them to eat and to clean your teeth easily",
          "You're disciplined about wearing them nearly all day",
        ],
      },
      { type: "h2", text: "How long does treatment take?" },
      { type: "p", text: "Many cases take between one and two years; simpler cases can be shorter. Your dentist can give you a realistic estimate after examining your teeth and taking X-rays and photographs." },
      { type: "h2", text: "Don't forget the retainer" },
      { type: "p", text: "After treatment, teeth tend to drift back. Retainers hold them in their new positions, and wearing them as advised is what makes the result last." },
      { type: "h2", text: "Questions to ask at your consultation" },
      {
        type: "ol",
        items: [
          "Which option is best for my specific case, and why?",
          "How long will treatment take?",
          "What will it cost in total, including retainers and review visits?",
          "How often will I need to visit?",
          "What happens if I lose or break an aligner or bracket?",
        ],
      },
      { type: "p", text: "Ready to talk it through? Learn about [braces and clear aligners at Shree Hari Dental Care](/treatments/orthodontics) or [book a consultation](/appointment)." },
    ],
  },
  {
    slug: "teeth-whitening-professional-vs-home-remedies",
    title: "Professional Teeth Whitening vs Home Remedies: What Actually Works",
    excerpt: "Lemon, baking soda, charcoal, kits, or the dentist? A clear guide to what works, what damages enamel and who should wait.",
    category: "Cosmetic Dentistry",
    date: "2026-10-06",
    readMinutes: 5,
    keywords: ["teeth whitening Ahmedabad", "teeth whitening home remedies", "professional teeth whitening", "smile design"],
    cover: { icon: "cosmetic", tone: "sky" },
    treatment: "cosmetic-dentistry",
    blocks: [
      { type: "p", text: "A brighter smile is one of the most requested cosmetic treatments, and one of the most misunderstood. Between social-media hacks and over-the-counter kits, it's hard to know what is safe and what actually works." },
      { type: "h2", text: "Why teeth stain" },
      { type: "p", text: "Teeth darken over time because of what we eat and drink (tea, coffee, cola, red wine, curries), tobacco and paan, and ageing: as enamel thins, the yellower layer beneath shows through. Some medicines, and old fillings or injuries that darken a tooth from within, can also play a part." },
      { type: "h2", text: "Home remedies: what works and what doesn't" },
      {
        type: "ul",
        items: [
          "**Baking soda** is mildly abrasive and can lift surface stains, but using it often can wear away enamel.",
          "**Lemon juice, vinegar and other acids** may seem to whiten, but they soften and erode enamel, and damaged enamel is duller and more sensitive. Avoid them.",
          "**Charcoal powders** are abrasive, have no proven whitening benefit and can scratch enamel.",
          "**Oil pulling** is popular, but there is no good evidence that it whitens teeth.",
          "**Whitening toothpastes** can lift light surface stains but don't change the natural shade of your teeth.",
        ],
      },
      { type: "h2", text: "Professional teeth whitening" },
      { type: "p", text: "Professional whitening uses carefully controlled peroxide-based gels to lighten the shade of the tooth itself, not just surface stains. The dentist first checks that your teeth and gums are healthy, protects the gums, and monitors the process, which makes it safer and more predictable than unsupervised kits." },
      { type: "h2", text: "Who should wait?" },
      {
        type: "ul",
        items: [
          "Anyone with untreated cavities or gum disease. These need treatment first",
          "People with very sensitive teeth, who should discuss options with their dentist",
          "Pregnant or breastfeeding women, who are generally advised to postpone",
          "Anyone with crowns, veneers or fillings on the front teeth. They don't whiten, so shades may not match afterwards",
        ],
      },
      { type: "h2", text: "Keeping your results" },
      { type: "p", text: "Rinse with water after tea, coffee or cola; use a straw for dark drinks; avoid tobacco; brush twice a day; and keep up with professional cleanings. Results can last from several months to a couple of years, depending on your habits." },
      { type: "p", text: "Thinking about whitening? Start with a check-up. We'll tell you honestly whether it's right for you. See [cosmetic dentistry at Shree Hari Dental Care](/treatments/cosmetic-dentistry)." },
    ],
  },
  {
    slug: "your-childs-first-dental-visit",
    title: "Your Child's First Dental Visit: A Parent's Guide",
    excerpt: "When to go, what happens, how to brush at each age and how to keep the visit calm and positive.",
    category: "Children's Dentistry",
    date: "2026-10-09",
    readMinutes: 4,
    keywords: ["pediatric dentist Ahmedabad", "child dentist Nikol", "baby teeth", "first dental visit"],
    cover: { icon: "pediatric", tone: "red" },
    treatment: "pediatric-dentistry",
    blocks: [
      { type: "p", text: "Many parents wonder when to bring a child to the dentist, and how to make the first visit a good one. The short answer: earlier than you think." },
      { type: "h2", text: "When should the first visit be?" },
      { type: "p", text: "Around your child's first birthday, or when the first tooth appears, whichever comes first. At this age the visit is mostly a chat: the dentist checks the teeth and gums, looks at how your child is developing and gives you practical advice for home." },
      { type: "h2", text: "What happens at the first visit?" },
      {
        type: "ul",
        items: [
          "A gentle look at your child's teeth, gums and bite",
          "Advice on brushing, feeding habits and thumb-sucking or dummy use",
          "Fluoride and sealant guidance, where appropriate",
          "Time to ask all your questions",
        ],
      },
      { type: "h2", text: "Brushing basics by age" },
      {
        type: "ul",
        items: [
          "**Under 3:** brush twice a day with a smear of fluoride toothpaste, about the size of a grain of rice.",
          "**Ages 3 to 6:** use a pea-sized amount, and help your child brush and spit. They shouldn't swallow toothpaste.",
          "**From about 6:** children can start brushing themselves, but still need supervision until around 7 or 8.",
        ],
      },
      { type: "h2", text: "Habits that affect little teeth" },
      {
        type: "ul",
        items: [
          "**Night-time bottles and sugary drinks** can cause rapid decay in baby teeth.",
          "**Frequent sweets and sticky snacks**. It's how often, not only how much sugar, that matters.",
          "**Thumb-sucking or dummy use** beyond about age 4 can affect how the teeth and jaws develop.",
        ],
      },
      { type: "h2", text: "Making the visit easy" },
      {
        type: "ul",
        items: [
          "Keep it positive and matter-of-fact: avoid words like \"pain\" or \"needle\".",
          "Choose a time when your child is rested and not hungry.",
          "Stay calm yourself; children pick up on a parent's worry.",
        ],
      },
      { type: "p", text: "Baby teeth matter: they hold space for permanent teeth and help your child eat, speak and smile. Starting early builds good habits for life. Learn about [children's dentistry at Shree Hari Dental Care](/treatments/pediatric-dentistry)." },
    ],
  },
  {
    slug: "oral-cancer-screening-why-it-matters",
    title: "Oral Cancer Screening: Why It Matters (Especially If You Chew Tobacco)",
    excerpt: "Oral cancer is common in India and far more treatable when found early. Here are the risk factors, warning signs and what a screening involves.",
    category: "Preventive Care",
    date: "2026-10-12",
    readMinutes: 5,
    keywords: ["oral cancer screening Ahmedabad", "oral cancer symptoms", "gutka and paan masala", "preventive dentistry"],
    cover: { icon: "preventive", tone: "navy" },
    treatment: "preventive-dentistry",
    blocks: [
      { type: "p", text: "Oral cancer is one of the most common cancers in India, and one of the most treatable when it is found early. Yet many people only see a doctor when the problem has already advanced. A quick, painless screening can change that." },
      { type: "h2", text: "Who is at higher risk?" },
      {
        type: "ul",
        items: [
          "People who chew tobacco, gutka or paan masala, or use areca (supari) products",
          "Smokers: cigarettes, bidis and hookah",
          "People who drink alcohol regularly (the risk rises further when combined with tobacco)",
          "Anyone with a persistent white or red patch in the mouth",
        ],
      },
      { type: "h2", text: "Warning signs to watch for" },
      {
        type: "ul",
        items: [
          "A mouth ulcer or sore that hasn't healed in about three weeks",
          "White or red patches inside the mouth or on the tongue",
          "A lump, thickening or rough area in the cheek, tongue or neck",
          "Pain or difficulty when chewing, swallowing or speaking",
          "Difficulty opening the mouth fully: common with heavy gutka and paan masala use",
          "Persistent numbness, unexplained bleeding or teeth that loosen for no clear reason",
        ],
      },
      { type: "p", text: "Having one of these doesn't mean you have cancer (most are caused by something harmless), but they should always be checked." },
      { type: "h2", text: "What does an oral cancer screening involve?" },
      { type: "p", text: "A dentist looks carefully inside your mouth, tongue, cheeks, palate and throat, and gently feels the neck and jaw for lumps. It takes only a few minutes and doesn't hurt. If anything looks suspicious, you may be advised to have a small tissue sample taken (a biopsy) or be referred to a specialist for further tests." },
      { type: "h2", text: "What you can do" },
      {
        type: "ul",
        items: [
          "**Stop tobacco and areca-nut products**: the single most important step. Support is available; ask your dentist or doctor.",
          "Check your own mouth in the mirror once a month.",
          "Get any non-healing ulcer or patch examined promptly.",
          "Have regular dental check-ups that include an oral cancer screening.",
        ],
      },
      { type: "p", text: "At Shree Hari Dental Care, oral cancer screening is part of our preventive care, and we also hold oral cancer screening camps. If you or someone in your family uses tobacco in any form, [book a screening](/appointment). It takes a few minutes and could make all the difference." },
    ],
  },
  {
    slug: "gum-disease-warning-signs",
    title: "Gum Disease: 7 Early Warning Signs You Shouldn't Ignore",
    excerpt: "Gum disease is often painless at first, which is why it goes unnoticed. Know the signs, the risk factors and how it's treated.",
    category: "Gum Health",
    date: "2026-10-16",
    readMinutes: 4,
    keywords: ["gum disease treatment Ahmedabad", "bleeding gums", "periodontitis", "periodontist Ahmedabad"],
    cover: { icon: "perio", tone: "blue" },
    treatment: "periodontics",
    blocks: [
      { type: "p", text: "Gum disease is one of the most common oral health problems, and one of the easiest to miss, because it is usually painless in the early stages. Spotting the signs early makes treatment simpler and protects your teeth for life." },
      { type: "h2", text: "Seven early warning signs" },
      {
        type: "ol",
        items: [
          "Gums that bleed when you brush or floss",
          "Red, swollen or tender gums",
          "Persistent bad breath or a bad taste in the mouth",
          "Gums pulling away from the teeth, making them look longer",
          "Pus between the teeth and gums",
          "Teeth that feel loose or have shifted",
          "A change in the way your teeth fit together when you bite",
        ],
      },
      { type: "p", text: "Healthy gums are firm, pale pink and don't bleed. Bleeding is not normal. It's a sign of inflammation." },
      { type: "h2", text: "Gingivitis vs periodontitis" },
      { type: "p", text: "**Gingivitis** is the early stage: the gums are inflamed because of plaque build-up. It's completely reversible with professional cleaning and good brushing and flossing. **Periodontitis** is the advanced stage, where infection has spread below the gum line and begun to destroy the bone and tissue that support your teeth. It can't be completely cured, but it can be controlled with treatment and regular maintenance." },
      { type: "h2", text: "Who is at risk?" },
      {
        type: "ul",
        items: [
          "Smokers and tobacco users",
          "People with diabetes",
          "Those who don't brush and floss well or skip dental check-ups",
          "People with a family history of gum disease",
          "Hormonal changes, such as pregnancy, can increase gum inflammation",
        ],
      },
      { type: "h2", text: "How is gum disease treated?" },
      { type: "p", text: "Early cases usually need a professional scaling and polishing and better home care. More advanced disease is treated with deep cleaning (scaling and root planing) below the gum line and, in some cases, a small gum procedure called flap surgery to clean deep pockets. Regular maintenance visits help keep the disease under control." },
      { type: "h2", text: "How to protect your gums" },
      {
        type: "ul",
        items: [
          "Brush twice a day with a soft brush and fluoride toothpaste",
          "Clean between your teeth every day: floss or interdental brushes",
          "Avoid tobacco in all forms",
          "Visit your dentist every six months, or as often as advised",
        ],
      },
      { type: "p", text: "If your gums bleed, don't wait. Learn about [gum disease treatment at Shree Hari Dental Care](/treatments/periodontics) or [book a gum check](/appointment)." },
    ],
  },
];

export const sortedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date));
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const formatPostDateShort = (iso: string) =>
  new Date(`${iso}T00:00:00+05:30`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
export const formatPostDate = (iso: string) =>
  new Date(`${iso}T00:00:00+05:30`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });

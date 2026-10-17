/**
 * Treatments — every speciality and procedure is taken from the client's brief.
 * Descriptions are general patient education; they make no price, duration or success-rate claims
 * beyond what's widely accepted, and hedge wherever outcomes depend on the individual case.
 */

export type DentalIconName =
  | "general"
  | "preventive"
  | "restorative"
  | "rootcanal"
  | "prostho"
  | "implant"
  | "cosmetic"
  | "ortho"
  | "surgery"
  | "pediatric"
  | "perio"
  | "tooth";

export type Procedure = { name: string; description: string };
export type Faq = { q: string; a: string };

export type Treatment = {
  slug: string;
  title: string;
  /** very short label for menus and chips */
  tagline: string;
  icon: DentalIconName;
  /** one-liner for cards */
  summary: string;
  /** intro paragraph on the detail page */
  lead: string;
  procedures: Procedure[];
  goodFor: string[];
  steps: { title: string; text: string }[];
  faqs: Faq[];
  seo: { title: string; description: string; keywords: string[] };
  /** route override (dental implants has its own, richer page) */
  href?: string;
  relatedPosts?: string[];
};

export const treatments: Treatment[] = [
  {
    slug: "general-dentistry",
    title: "General Dentistry",
    tagline: "Check-ups & digital diagnosis",
    icon: "general",
    summary: "Thorough check-ups, consultations and digital diagnosis — the starting point for every healthy smile.",
    lead: "Great dental care begins with a proper examination. A general check-up at Shree Hari Dental Care is unhurried: we listen to your concerns, examine your teeth, gums and mouth, and use digital diagnosis to see what the naked eye can't. You leave knowing exactly where you stand and what, if anything, needs attention — with your options explained in plain language.",
    procedures: [
      { name: "Dental Check-up", description: "A thorough examination of your teeth, gums and mouth to catch problems early — before they become painful or costly." },
      { name: "Consultation", description: "Time to talk through your concerns, history and goals, so your treatment plan starts from what matters to you." },
      { name: "Digital Diagnosis", description: "Digital X-rays and intraoral photographs help us see — and show you — exactly what is happening, for an accurate diagnosis." },
      { name: "Oral Health Education", description: "Practical guidance on brushing, flossing, diet and habits that protect your teeth between visits." },
    ],
    goodFor: [
      "Anyone who hasn't seen a dentist in the last six months",
      "Toothache, sensitivity, bleeding gums or bad breath",
      "A second opinion before starting major treatment",
      "Families looking for a dentist they can trust for the long term",
    ],
    steps: [
      { title: "Tell us your story", text: "We note your medical and dental history and what's been bothering you." },
      { title: "Examination & digital diagnosis", text: "Teeth, gums, bite and soft tissues are examined, with digital X-rays and intraoral photos where needed." },
      { title: "Your plan, explained", text: "We show you the findings, discuss the options and give an honest recommendation — no pressure." },
      { title: "Care that fits you", text: "Treat now, monitor or prevent: you decide, with all the information in front of you." },
    ],
    faqs: [
      { q: "How often should I have a dental check-up?", a: "Most people benefit from a check-up and cleaning every six months. If you have gum disease, a high risk of cavities or certain medical conditions, we may suggest shorter intervals." },
      { q: "Does a dental check-up hurt?", a: "No. A routine examination is painless. If anything feels sensitive, tell us and we'll adjust — and any treatment that follows is planned around your comfort." },
      { q: "What should I bring to my first visit?", a: "Any previous dental records or X-rays, a list of medicines you take, and details of medical conditions or allergies. If you don't have them, that's fine — we'll start fresh." },
    ],
    seo: {
      title: "General Dentistry & Dental Check-ups in Ahmedabad",
      description: "Dental check-up, consultation and digital diagnosis at Shree Hari Dental Care — Nikol, Ahmedabad and Dhrangadhra. Ethical, painless, evidence-based care.",
      keywords: ["dentist in Ahmedabad", "dental clinic Ahmedabad", "dental check-up Ahmedabad", "dentist in Nikol"],
    },
    relatedPosts: ["how-to-choose-a-dentist-in-nikol-ahmedabad"],
  },
  {
    slug: "preventive-dentistry",
    title: "Preventive Dentistry",
    tagline: "Scaling, sealants & screening",
    icon: "preventive",
    summary: "Scaling, polishing, fluoride, sealants and oral cancer screening — stop problems before they start.",
    lead: "The best dental treatment is the one you never need. Preventive dentistry keeps teeth and gums healthy through professional cleaning, enamel-strengthening treatments and early screening. It's the most affordable way to protect your smile and avoid bigger procedures later — and it's the heart of how we practise.",
    procedures: [
      { name: "Scaling & Polishing", description: "Professional removal of plaque and tartar followed by polishing — for cleaner, smoother teeth and healthier gums." },
      { name: "Fluoride Application", description: "A topical fluoride treatment that strengthens enamel and helps protect against decay." },
      { name: "Dental Sealants", description: "A thin protective coating on the chewing surfaces of back teeth, sealing the deep grooves where cavities often begin." },
      { name: "Regular Dental Cleaning", description: "Scheduled cleanings that keep gum disease and cavities in check — the foundation of long-term oral health." },
      { name: "Oral Cancer Screening", description: "A quick, painless examination of the mouth, tongue, cheeks and throat to spot suspicious changes early." },
    ],
    goodFor: [
      "Everyone — children, adults and seniors",
      "Visible tartar, stains or bleeding gums",
      "People who use tobacco, paan masala or gutka, or who smoke (regular screening matters most here)",
      "Parents who want to prevent cavities in their children",
    ],
    steps: [
      { title: "Assessment", text: "We check your teeth, gums and soft tissues and identify your personal risk areas." },
      { title: "Professional cleaning", text: "Ultrasonic scaling removes plaque and tartar, followed by polishing." },
      { title: "Protection", text: "Fluoride or sealants are applied where they'll help most." },
      { title: "Home-care coaching & recall", text: "Simple, personalised tips — and a recall schedule that suits you." },
    ],
    faqs: [
      { q: "Does scaling damage the teeth?", a: "No. Scaling removes plaque and tartar from the tooth surface; it does not weaken enamel. Gaps that seem to appear afterwards were already there — they'd been filled by tartar and swollen gums." },
      { q: "How often should I get my teeth cleaned?", a: "Typically every six months. If you've had gum disease, we may recommend more frequent cleanings to keep it under control." },
      { q: "What is oral cancer screening and who needs it?", a: "It's a quick, painless examination of the mouth, tongue, cheeks, palate and throat for suspicious patches, ulcers or lumps. Adults — particularly anyone who uses tobacco, paan masala or alcohol — benefit from regular screening, because finding changes early greatly improves outcomes." },
    ],
    seo: {
      title: "Preventive Dentistry: Scaling & Oral Cancer Screening",
      description: "Teeth scaling and polishing, fluoride, sealants and oral cancer screening in Ahmedabad and Dhrangadhra. Prevention-first dentistry at Shree Hari Dental Care.",
      keywords: ["teeth cleaning Ahmedabad", "scaling and polishing", "oral cancer screening Ahmedabad", "painless dental treatment"],
    },
    relatedPosts: ["oral-cancer-screening-why-it-matters"],
  },
  {
    slug: "restorative-dentistry",
    title: "Restorative Dentistry",
    tagline: "Tooth-coloured fillings",
    icon: "restorative",
    summary: "Tooth-coloured fillings and restorations that repair decay, chips and wear — and look natural.",
    lead: "A cavity or a chipped tooth doesn't have to mean a visible metal filling or a lifetime of avoiding certain foods. We repair teeth with tooth-coloured materials that bond to the tooth, protect what's left and blend with your natural smile — conserving as much healthy tooth structure as possible.",
    procedures: [
      { name: "Tooth Coloured Fillings", description: "Cavities restored with natural-looking, tooth-coloured material that blends with your smile." },
      { name: "Composite Restorations", description: "Resin restorations shaped and bonded directly to the tooth — repairing decay, chips and worn edges, often in a single visit." },
      { name: "Glass Ionomer Restorations", description: "Fluoride-releasing restorations that suit certain cavities, notably near the gum line and in children's teeth." },
      { name: "Smile Restoration", description: "A planned combination of treatments to rebuild worn, broken or decayed teeth so you can chew and smile with confidence." },
    ],
    goodFor: [
      "Cavities and early decay",
      "Chipped, cracked or worn teeth",
      "Old fillings that have broken down or discoloured (where clinically appropriate to replace)",
      "Sensitivity from exposed root surfaces",
    ],
    steps: [
      { title: "Diagnosis", text: "We confirm the extent of decay with an examination and digital X-ray." },
      { title: "Gentle preparation", text: "Under local anaesthesia, only the decayed part of the tooth is removed." },
      { title: "Shade-matched filling", text: "The restoration is placed in layers and hardened with an LED curing light." },
      { title: "Polish & bite check", text: "We shape and polish the filling and make sure your bite feels natural." },
    ],
    faqs: [
      { q: "How long do tooth-coloured fillings last?", a: "With good care, many last for years. Longevity depends on the size and position of the filling, your bite and your oral hygiene — and we'll tell you honestly what to expect for your tooth." },
      { q: "Is getting a filling painful?", a: "We use local anaesthesia, so you won't feel pain. You may notice pressure or vibration; tell us if anything is uncomfortable." },
      { q: "Can I eat straight after a filling?", a: "Tooth-coloured fillings are hardened instantly under the curing light, but it's wise to wait until the numbness has worn off so you don't bite your cheek or tongue. We'll advise you on the day." },
    ],
    seo: {
      title: "Tooth-Coloured Fillings & Restorative Dentistry",
      description: "Tooth-coloured and composite fillings, glass ionomer restorations and smile restoration in Nikol, Ahmedabad and Dhrangadhra at Shree Hari Dental Care.",
      keywords: ["tooth coloured fillings Ahmedabad", "composite fillings", "dental clinic Ahmedabad", "painless dental treatment"],
    },
  },
  {
    slug: "root-canal-treatment",
    title: "Root Canal Treatment",
    tagline: "Save your natural tooth",
    icon: "rootcanal",
    summary: "Save your natural tooth — with rotary endodontics, apex locators and single-sitting RCT in selected cases.",
    lead: "A root canal isn't the ordeal it's reputed to be — it's the treatment that relieves the pain of an infected tooth and saves it from extraction. Using rotary endodontic instruments and an apex locator, we clean and seal the canals precisely, often more quickly and comfortably than patients expect. In suitable cases, treatment can be completed in a single sitting.",
    procedures: [
      { name: "Single Sitting RCT (Selected Cases)", description: "In suitable cases the canals can be cleaned, shaped and sealed in one visit — saving you time." },
      { name: "Multi Sitting RCT", description: "For complex or infected teeth, treatment is staged over two or more visits so the tooth can be disinfected thoroughly." },
      { name: "Re-Root Canal Treatment", description: "If a previously treated tooth becomes painful or infected again, the canals can often be re-cleaned and resealed to save the tooth." },
      { name: "Post & Core Build-up", description: "After a root canal, a post and core rebuild the tooth's structure so it can support a crown." },
    ],
    goodFor: [
      "Severe or throbbing toothache, especially at night",
      "Lingering pain or sensitivity to hot and cold",
      "Swelling, or a pimple-like bump on the gum",
      "A deep cavity or cracked tooth reaching the nerve",
      "A previously treated tooth that has become painful again",
    ],
    steps: [
      { title: "Diagnosis", text: "A digital X-ray and examination confirm whether the nerve is infected." },
      { title: "Comfortable access", text: "Local anaesthesia numbs the tooth before a small opening is made." },
      { title: "Clean, shape & disinfect", text: "Rotary files and an apex locator guide precise cleaning of each canal." },
      { title: "Seal & restore", text: "The canals are sealed and the tooth is rebuilt — with a post, core and crown where needed." },
    ],
    faqs: [
      { q: "Is root canal treatment painful?", a: "The treatment is done under local anaesthesia, so you shouldn't feel pain — it's the infection that hurts, and a root canal relieves it. Mild tenderness for a day or two afterwards is common and easily managed." },
      { q: "Can a root canal be completed in one visit?", a: "In selected cases — for example, teeth without significant infection and with straightforward canals — single-sitting RCT is possible. Infected or complex teeth are better treated over several visits so they can be disinfected thoroughly. We'll recommend what's best for your tooth." },
      { q: "Will I need a crown after a root canal?", a: "Often, yes — particularly for back teeth, which take heavy chewing forces. A crown protects the weakened tooth from fracturing. We'll advise after seeing how much healthy tooth structure remains." },
    ],
    seo: {
      title: "Root Canal Treatment in Ahmedabad & Dhrangadhra",
      description: "Painless root canal treatment (RCT) with rotary endodontics and apex locators — single-sitting RCT in selected cases. Shree Hari Dental Care, Nikol Ahmedabad & Dhrangadhra.",
      keywords: ["root canal treatment Ahmedabad", "RCT Ahmedabad", "single sitting root canal", "painless dental treatment", "dentist in Dhrangadhra"],
    },
    relatedPosts: ["root-canal-treatment-what-really-happens"],
  },
  {
    slug: "prosthodontics",
    title: "Prosthodontics",
    tagline: "Crowns, bridges & dentures",
    icon: "prostho",
    summary: "Crowns, bridges and dentures — zirconia, metal-ceramic and flexible options to restore function and looks.",
    lead: "Prosthodontics is the art of replacing and rebuilding teeth. Whether you need a single crown, a bridge across a gap, a comfortable set of dentures or a complete full-mouth rehabilitation, we plan around how you chew, speak and smile — and explain the pros and cons of each material so you can choose with confidence.",
    procedures: [
      { name: "Complete Dentures", description: "A removable replacement for all teeth in an arch, designed for comfort, chewing and a natural appearance." },
      { name: "Partial Dentures", description: "A removable replacement for a few missing teeth that clips onto the natural teeth that remain." },
      { name: "Flexible Dentures", description: "Made from a lightweight, flexible material that many patients find more comfortable than conventional acrylic." },
      { name: "Cast Partial Dentures", description: "A durable metal-framework partial denture — thin, strong and precisely fitted." },
      { name: "Crown & Bridge", description: "Crowns cap and protect damaged teeth; bridges close the gap of missing teeth by anchoring replacements to neighbouring teeth." },
      { name: "Zirconia Crowns", description: "Strong, tooth-coloured crowns known for durability and a natural look." },
      { name: "Metal Ceramic Crowns", description: "A time-tested crown with a metal core for strength and a ceramic layer for appearance." },
      { name: "Full Mouth Rehabilitation", description: "A comprehensive plan to restore function and aesthetics across all your teeth — combining crowns, bridges, implants or dentures as needed." },
    ],
    goodFor: [
      "Missing one, several or all teeth",
      "Broken, heavily filled or root-canal-treated teeth",
      "Worn teeth that affect chewing and appearance",
      "Old dentures that no longer fit well",
    ],
    steps: [
      { title: "Assessment & plan", text: "We examine your teeth and bite, discuss options and agree a plan." },
      { title: "Preparation & impressions", text: "Teeth are prepared where needed and precise impressions are taken." },
      { title: "Trial & shade selection", text: "You see the fit and shade before the final restoration is made." },
      { title: "Fitting & bite adjustment", text: "The final crown, bridge or denture is fitted and fine-tuned for comfort." },
    ],
    faqs: [
      { q: "What's the difference between a crown and a bridge?", a: "A crown covers a single damaged tooth. A bridge replaces one or more missing teeth by joining crowns on the neighbouring teeth to a replacement tooth in between." },
      { q: "Which is better — zirconia or metal-ceramic?", a: "Both work well. Zirconia is tooth-coloured throughout and very durable, which is why it's popular for its natural look; metal-ceramic is a long-established option with a metal core. The right choice depends on the tooth's position, your bite and your budget — we'll explain the trade-offs." },
      { q: "Are flexible dentures better than regular dentures?", a: "Flexible dentures are lighter and more comfortable for many patients, and most designs have no visible metal clasps — but they aren't suitable for every case. We'll advise on what suits your mouth." },
    ],
    seo: {
      title: "Crowns, Bridges & Dentures in Ahmedabad",
      description: "Zirconia and metal-ceramic crowns, bridges, complete, partial and flexible dentures, and full mouth rehabilitation at Shree Hari Dental Care, Ahmedabad & Dhrangadhra.",
      keywords: ["dental crown Ahmedabad", "zirconia crown", "dentures Ahmedabad", "dental bridge", "full mouth rehabilitation"],
    },
  },
  {
    slug: "dental-implants",
    title: "Dental Implants",
    tagline: "Permanent tooth replacement",
    icon: "implant",
    href: "/dental-implants",
    summary: "Permanent-feeling tooth replacement — single implants, All-on-4 / All-on-6 and guided implant surgery.",
    lead: "Dental implants replace missing teeth from the root up. A small titanium post is placed in the jawbone, where it fuses with the bone over a few months and supports a crown, bridge or denture that looks, feels and works like natural teeth. Planning is digital and guided, and options range from a single tooth to full-arch All-on-4 and All-on-6 solutions.",
    procedures: [
      { name: "Single Tooth Implant", description: "Replaces one missing tooth without grinding down the neighbouring teeth." },
      { name: "Multiple Implants", description: "Replace several teeth with individual implants, or with implants that support a bridge." },
      { name: "Implant Supported Crowns", description: "A custom crown fixed on the implant, shaped and shaded to match your natural teeth." },
      { name: "Implant Supported Bridges", description: "Replace a row of missing teeth with a fixed bridge anchored on implants — no need to alter healthy neighbouring teeth." },
      { name: "Implant Supported Dentures", description: "A denture that clips or screws onto implants so it stays firmly in place — far more stable than a conventional denture." },
      { name: "All-on-4", description: "A full arch of fixed teeth supported by just four strategically placed implants." },
      { name: "All-on-6", description: "A full fixed arch supported by six implants — extra support for the bite, where bone allows." },
      { name: "Immediate Implant Placement (Selected Cases)", description: "In suitable cases the implant can be placed on the day the tooth is removed, shortening the overall timeline." },
      { name: "Guided Implant Surgery", description: "A digitally planned surgical guide helps place each implant precisely where it was planned." },
    ],
    goodFor: [
      "One or more missing teeth",
      "Loose, uncomfortable dentures",
      "Teeth that can't be saved and need replacing",
      "Healthy gums and adequate jawbone — we'll check with X-rays before recommending anything",
    ],
    steps: [
      { title: "Consultation & digital X-ray", text: "We assess your gums, bone and bite, and discuss what you want from your new teeth." },
      { title: "Digital treatment planning", text: "The implant positions are planned in advance — with a surgical guide where it helps." },
      { title: "Implant placement", text: "The implant is placed under local anaesthesia with a surgical motor and precise instruments." },
      { title: "Healing", text: "The implant integrates with the bone — typically over a few months; sometimes sooner in immediate cases." },
      { title: "Crown, bridge or denture", text: "Your custom teeth are fitted and the bite fine-tuned." },
      { title: "Follow-up & maintenance", text: "Regular check-ups and cleaning keep your implants healthy for the long term." },
    ],
    faqs: [
      { q: "How long do dental implants last?", a: "With good oral hygiene and regular check-ups, implants can last many years — often decades. Longevity depends on bone and gum health, bite forces and habits such as smoking." },
      { q: "Is getting an implant painful?", a: "Implant placement is done under local anaesthesia, and most patients find it more comfortable than they expected. Some swelling or soreness for a few days afterwards is normal and managed with medication." },
      { q: "Am I a candidate for dental implants?", a: "Most healthy adults are, provided the gums are healthy and there's enough jawbone. Conditions such as uncontrolled diabetes, heavy smoking or certain medicines can affect healing. We assess your health history and X-rays before recommending anything." },
      { q: "What's the difference between All-on-4 and All-on-6?", a: "Both replace a full arch of teeth with a fixed bridge supported by implants — All-on-4 uses four implants, All-on-6 uses six. More implants spread the bite load further; the choice depends on your bone, bite and goals." },
      { q: "Can an implant be placed straight after a tooth is removed?", a: "In selected cases, yes — if the bone and gums are healthy and there's no active infection, an implant can be placed the same day the tooth is removed. Otherwise we let the area heal first." },
    ],
    seo: {
      title: "Dental Implants in Ahmedabad & Gujarat",
      description: "Single, multiple and full-arch dental implants — All-on-4, All-on-6, guided and immediate implant surgery — at Shree Hari Dental Care, Nikol Ahmedabad & Dhrangadhra.",
      keywords: ["dental implants Ahmedabad", "dental implant centre Gujarat", "All-on-4 implants", "All-on-6", "guided implant surgery", "tooth replacement"],
    },
    relatedPosts: ["dental-implants-in-ahmedabad-what-to-expect"],
  },
  {
    slug: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    tagline: "Whitening & smile design",
    icon: "cosmetic",
    summary: "Whitening, smile designing, veneers, bonding and gap closure — a brighter, more confident smile.",
    lead: "A confident smile changes how you feel in photos, at work and at family occasions. Cosmetic dentistry at Shree Hari Dental Care starts with your goals and your face — not a template — and uses conservative, tooth-friendly techniques to brighten, reshape and refine your smile. Healthy teeth first, beautiful teeth always.",
    procedures: [
      { name: "Teeth Whitening", description: "Professional whitening to lift stains and brighten your smile, supervised by your dentist." },
      { name: "Smile Designing", description: "A personalised plan — shape, shade, proportion and alignment — to create a smile that suits your face." },
      { name: "Composite Veneers", description: "Thin tooth-coloured layers bonded to the front of teeth to change colour or shape, or close small gaps." },
      { name: "Cosmetic Bonding", description: "Tooth-coloured resin used to repair chips, cracks and small imperfections quickly." },
      { name: "Diastema Closure", description: "Closing the gap between teeth — often with bonding — for a more even smile." },
    ],
    goodFor: [
      "Stained or yellowed teeth",
      "Chipped, uneven or slightly misshapen teeth",
      "A gap between the front teeth",
      "A wedding, interview or special occasion coming up",
    ],
    steps: [
      { title: "Smile consultation", text: "We discuss what you'd like to change, take photographs and check your oral health." },
      { title: "Design & plan", text: "You see the plan, the options and what each involves before anything is done." },
      { title: "Treatment", text: "Whitening, bonding or veneers are carried out with minimal removal of natural tooth." },
      { title: "Aftercare", text: "Simple habits and periodic check-ups help your new smile last." },
    ],
    faqs: [
      { q: "Is professional teeth whitening safe?", a: "For most healthy teeth, yes, when carried out under a dentist's supervision. Some people notice temporary sensitivity. We check suitability first — whitening isn't suitable for everyone, for example where there are certain restorations or untreated decay." },
      { q: "How long do whitening results last?", a: "It varies. Tea, coffee, tobacco and some foods can darken teeth again; results can last from several months to a couple of years depending on your habits and any top-ups." },
      { q: "What is smile designing?", a: "It's a planned approach to improving your smile — assessing tooth shape, size, colour, gum line and alignment, then combining treatments such as whitening, bonding, veneers or aligners to achieve a natural result." },
    ],
    seo: {
      title: "Teeth Whitening & Smile Design in Ahmedabad",
      description: "Teeth whitening, smile designing, composite veneers, cosmetic bonding and diastema closure in Nikol, Ahmedabad and Dhrangadhra — Shree Hari Dental Care.",
      keywords: ["teeth whitening Ahmedabad", "smile design Ahmedabad", "composite veneers", "cosmetic dentist Ahmedabad", "diastema closure"],
    },
    relatedPosts: ["teeth-whitening-professional-vs-home-remedies"],
  },
  {
    slug: "orthodontics",
    title: "Orthodontics",
    tagline: "Braces & clear aligners",
    icon: "ortho",
    summary: "Metal, ceramic and self-ligating braces, clear aligners and retainers — straighter teeth at any age.",
    lead: "Straight teeth don't just look better — they're easier to clean and can improve how your bite works. Whether you prefer the reliability of traditional braces or the discretion of clear aligners, we'll recommend the approach that fits your teeth, your lifestyle and your budget, then guide you carefully from first appointment to final retainer.",
    procedures: [
      { name: "Metal Braces", description: "Time-tested, effective and economical for a wide range of alignment problems." },
      { name: "Ceramic Braces", description: "Tooth-coloured brackets that are less noticeable than metal." },
      { name: "Self-Ligating Braces", description: "Braces with built-in clips instead of elastic ties, which can mean easier cleaning and fewer adjustments." },
      { name: "Clear Aligners", description: "Removable, virtually invisible trays that gradually move your teeth — popular with adults and teenagers." },
      { name: "Retainers", description: "Hold your teeth in their new positions after treatment so your results last." },
    ],
    goodFor: [
      "Crowded, crooked or overlapping teeth",
      "Gaps between teeth",
      "Bite problems — overbite, underbite or crossbite",
      "Teens and adults who want a straighter smile",
    ],
    steps: [
      { title: "Consultation & records", text: "Examination, photographs and X-rays show what's needed and what's possible." },
      { title: "Choose your approach", text: "We compare braces and aligners for your case, with timelines and costs explained." },
      { title: "Active treatment", text: "Regular visits for adjustments or new aligner sets, with progress checked each time." },
      { title: "Retention", text: "Retainers lock in your result so your teeth stay where they should." },
    ],
    faqs: [
      { q: "Braces or clear aligners — which is right for me?", a: "Aligners suit many mild-to-moderate cases and are discreet and removable. Braces handle a wider range of problems, including complex bite issues, and don't rely on you wearing trays for most of the day. A consultation with records tells us what's best for you." },
      { q: "How long does orthodontic treatment take?", a: "Many cases take between one and two years; simpler cases can be shorter. Your timeline depends on how complex the case is and how well instructions are followed." },
      { q: "Do I need a retainer after braces?", a: "Yes. Teeth have a natural tendency to drift back; retainers hold them in place, and wearing them as advised protects the result you've invested in." },
    ],
    seo: {
      title: "Braces & Clear Aligners in Ahmedabad",
      description: "Metal, ceramic and self-ligating braces, clear aligners and retainers at Shree Hari Dental Care — braces treatment in Nikol Ahmedabad and Dhrangadhra.",
      keywords: ["braces treatment Ahmedabad", "clear aligners Ahmedabad", "orthodontist Ahmedabad", "ceramic braces", "self-ligating braces"],
    },
    relatedPosts: ["braces-or-clear-aligners-how-to-choose"],
  },
  {
    slug: "oral-surgery",
    title: "Oral Surgery",
    tagline: "Extractions & wisdom teeth",
    icon: "surgery",
    summary: "Gentle extractions, wisdom tooth removal, minor oral surgery and biopsy — carefully planned and carried out.",
    lead: "Sometimes a tooth can't be saved, or a wisdom tooth is causing trouble. Oral surgery at Shree Hari Dental Care is about doing what's needed with as little discomfort as possible — careful planning, gentle technique and clear aftercare so you heal well and get back to normal quickly.",
    procedures: [
      { name: "Tooth Extraction", description: "Gentle removal of teeth that are badly damaged, infected or overcrowded, with attention to comfort and healing." },
      { name: "Surgical Extraction", description: "For broken, impacted or hard-to-reach teeth, a more precise surgical approach is used." },
      { name: "Wisdom Tooth Removal", description: "Removal of wisdom teeth that are impacted, infected or damaging neighbouring teeth." },
      { name: "Minor Oral Surgical Procedures", description: "Short in-clinic procedures under local anaesthesia for problems of the teeth, gums and surrounding tissues." },
      { name: "Biopsy", description: "A small sample of suspicious tissue is taken for laboratory examination so a diagnosis can be made early." },
    ],
    goodFor: [
      "A tooth that can't be saved by other treatment",
      "Wisdom tooth pain, swelling or repeated gum infection",
      "A mouth ulcer, patch or lump that hasn't healed in about three weeks",
      "Teeth that need removing before braces, dentures or implants",
    ],
    steps: [
      { title: "Assessment", text: "Examination and X-rays show the position of the tooth and nearby structures." },
      { title: "Comfortable anaesthesia", text: "The area is fully numbed before we begin." },
      { title: "Careful removal", text: "The tooth or tissue is removed with controlled, gentle technique." },
      { title: "Aftercare & review", text: "You receive clear aftercare instructions and a follow-up visit to check healing." },
    ],
    faqs: [
      { q: "Is wisdom tooth removal painful?", a: "The procedure is done under local anaesthesia, so you shouldn't feel pain. Afterwards some swelling and soreness for a few days is normal and managed with prescribed medicines and cold compresses." },
      { q: "Do all wisdom teeth need to be removed?", a: "No. Only those that are impacted, repeatedly infected, decayed or damaging neighbouring teeth. X-rays help us decide; healthy, fully erupted wisdom teeth that you can clean don't need to go." },
      { q: "What should I do after a tooth extraction?", a: "Bite on the gauze for as long as advised, avoid rinsing or spitting hard for the first 24 hours, eat cool, soft foods, avoid straws and smoking, and take medicines as prescribed. Call us if bleeding or pain worsens." },
    ],
    seo: {
      title: "Wisdom Tooth Removal & Oral Surgery in Ahmedabad",
      description: "Tooth extraction, surgical extraction, wisdom tooth removal, minor oral surgery and biopsy at Shree Hari Dental Care — Nikol Ahmedabad & Dhrangadhra.",
      keywords: ["wisdom tooth removal Ahmedabad", "tooth extraction Ahmedabad", "oral surgery", "painless dental treatment"],
    },
  },
  {
    slug: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    tagline: "Gentle care for children",
    icon: "pediatric",
    summary: "Gentle, child-friendly care — check-ups, fluoride, sealants, habit-breaking appliances and space maintainers.",
    lead: "Children's first experiences at the dentist shape how they feel about oral health for life. We keep visits calm, friendly and unhurried — explaining things in a way kids understand — and focus on prevention, so little teeth grow up strong and healthy.",
    procedures: [
      { name: "Child Dental Care", description: "Gentle, child-friendly check-ups and treatment in a comfortable setting." },
      { name: "Preventive Treatments", description: "Sealants, cleanings and guidance that protect growing teeth from decay." },
      { name: "Fluoride Therapy", description: "Topical fluoride to strengthen developing enamel." },
      { name: "Habit Breaking Appliances", description: "Small appliances that help children stop thumb-sucking and similar habits that can affect tooth alignment." },
      { name: "Space Maintainers", description: "Hold the space when a baby tooth is lost early, so the permanent tooth has room to come through." },
    ],
    goodFor: [
      "A child's first dental visit",
      "Cavities or toothache in baby teeth",
      "Thumb-sucking, nail-biting or mouth-breathing habits",
      "Early loss of a baby tooth",
    ],
    steps: [
      { title: "Meet & greet", text: "We let your child get comfortable before we begin anything." },
      { title: "Gentle examination", text: "A simple check of teeth, gums and bite — explained step by step." },
      { title: "Protect & treat", text: "Fluoride, sealants or fillings, as needed, with child-friendly technique." },
      { title: "Tips for parents", text: "Practical advice on brushing, diet and habits for your child's age." },
    ],
    faqs: [
      { q: "When should my child first see a dentist?", a: "Around their first birthday, or when the first tooth appears — whichever comes first. Early visits are mostly about prevention and getting your child used to the clinic." },
      { q: "Are baby teeth important if they fall out anyway?", a: "Yes. They hold space for permanent teeth, help with chewing and speech, and decay in baby teeth can cause pain and infection that affects the teeth underneath." },
      { q: "How can I help my child feel calm at the dentist?", a: "Keep it positive and matter-of-fact — avoid words like \"pain\" or \"needle\" and let us do the explaining. Visiting early, while nothing hurts, helps most." },
    ],
    seo: {
      title: "Children's Dentist in Ahmedabad & Dhrangadhra",
      description: "Child-friendly dental care — check-ups, fluoride therapy, sealants, space maintainers and habit-breaking appliances — at Shree Hari Dental Care.",
      keywords: ["pediatric dentist Ahmedabad", "child dentist Nikol", "kids dentist Dhrangadhra", "fluoride therapy", "space maintainers"],
    },
    relatedPosts: ["your-childs-first-dental-visit"],
  },
  {
    slug: "periodontics",
    title: "Periodontics",
    tagline: "Gum disease treatment",
    icon: "perio",
    summary: "Treat bleeding, swollen or receding gums — deep cleaning, flap surgery and gingival therapy.",
    lead: "Healthy gums are the foundation of healthy teeth — and gum disease is one of the main reasons adults lose teeth. The good news: when it's caught early it's very treatable. We treat gum problems from simple inflammation to advanced disease, and teach you how to keep them under control for good.",
    procedures: [
      { name: "Gum Disease Treatment", description: "Treatment to control gum infection and inflammation — from early gingivitis to advanced periodontitis." },
      { name: "Deep Cleaning", description: "Thorough cleaning below the gum line (scaling and root planing) to remove the deposits that cause gum disease." },
      { name: "Flap Surgery", description: "When deep pockets remain, a small gum flap is lifted so the roots can be cleaned thoroughly and pocket depth reduced." },
      { name: "Gingival Therapy", description: "Targeted treatment for unhealthy gum tissue — including inflammation and overgrowth — to restore gum health." },
    ],
    goodFor: [
      "Bleeding when you brush or floss",
      "Red, swollen or tender gums",
      "Persistent bad breath",
      "Gums pulling away from teeth, or teeth that feel loose",
    ],
    steps: [
      { title: "Gum assessment", text: "We measure the depth of the pockets around each tooth and check for bone loss on X-rays." },
      { title: "Deep cleaning", text: "Deposits are removed above and below the gum line, often over one or two visits." },
      { title: "Re-evaluation", text: "We check how your gums have responded and whether further treatment is needed." },
      { title: "Maintenance", text: "Regular periodontal maintenance visits keep the disease from coming back." },
    ],
    faqs: [
      { q: "What are the signs of gum disease?", a: "Bleeding when brushing, red or swollen gums, persistent bad breath, gums pulling away from the teeth and loose teeth. Gum disease is often painless in its early stages — so don't wait for pain." },
      { q: "Can gum disease be cured?", a: "Early gum inflammation (gingivitis) is reversible with professional cleaning and good home care. Advanced gum disease (periodontitis) can't be completely cured, but it can be controlled with treatment and regular maintenance." },
      { q: "Is gum disease linked to other health problems?", a: "Research suggests links between gum disease and conditions such as diabetes and heart disease. Treating gum disease supports your overall health, not just your mouth." },
    ],
    seo: {
      title: "Gum Disease Treatment in Ahmedabad",
      description: "Gum disease treatment, deep cleaning, flap surgery and gingival therapy at Shree Hari Dental Care — periodontics in Nikol Ahmedabad and Dhrangadhra.",
      keywords: ["gum disease treatment Ahmedabad", "periodontist Ahmedabad", "bleeding gums treatment", "deep cleaning teeth", "flap surgery"],
    },
    relatedPosts: ["gum-disease-warning-signs"],
  },
];

export const getTreatment = (slug: string) => treatments.find((t) => t.slug === slug);
export const treatmentHref = (t: Treatment) => t.href ?? `/treatments/${t.slug}`;
/** Everything except implants (which has its own bespoke page) is rendered by /treatments/[slug] */
export const treatmentPages = treatments.filter((t) => !t.href);
export const totalProcedures = treatments.reduce((n, t) => n + t.procedures.length, 0);

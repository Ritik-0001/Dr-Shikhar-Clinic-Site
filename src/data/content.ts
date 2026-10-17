import {
  Armchair,
  Award,
  BadgeCheck,
  Briefcase,
  CalendarCheck,
  CalendarClock,
  Camera,
  ClipboardCheck,
  ClipboardList,
  Cog,
  Cpu,
  Crosshair,
  Eye,
  FolderOpen,
  Flame,
  GraduationCap,
  Handshake,
  Heart,
  HeartHandshake,
  HeartPulse,
  Layers,
  type LucideIcon,
  Megaphone,
  MessagesSquare,
  Microscope,
  Monitor,
  Package,
  RefreshCw,
  ScanLine,
  School,
  ShieldCheck,
  ShieldPlus,
  Sparkles,
  SprayCan,
  Stethoscope,
  Sun,
  Users,
  Wallet,
  Waves,
  Wrench,
} from "lucide-react";
import { branches } from "./branches";
import { treatments } from "./treatments";

export type Feature = { title: string; text: string; icon: LucideIcon };

/* ------------------------------------------------------------------ About */

export const about = {
  headline: "Modern, ethical dentistry — close to home.",
  paragraphs: [
    "Shree Hari Dental Care is a modern multispeciality dental clinic committed to providing ethical, painless and evidence-based dental treatment using advanced technology.",
    "With clinics across Gujarat, our mission is to make high-quality dental care accessible, affordable and comfortable for every patient.",
    "Our team believes in preventive dentistry, patient education and long-term oral health — rather than temporary solutions. Every treatment is performed with strict sterilization protocols and personalised treatment planning.",
  ],
  vision:
    "To become Gujarat's most trusted chain of multispeciality dental clinics by providing world-class dental treatment with transparency, technology and compassion.",
  mission: [
    "Deliver ethical dental care",
    "Use the latest technology",
    "Maintain international sterilization standards",
    "Educate patients about oral health",
    "Expand quality dental care across Gujarat",
  ],
};

export const values: Feature[] = [
  { title: "Patient First", text: "Your comfort, questions and goals shape every decision we make.", icon: Heart },
  { title: "Honest Treatment Planning", text: "We recommend what you need — and tell you what you don't.", icon: BadgeCheck },
  { title: "Transparency", text: "Findings, options, timelines and costs are explained before treatment begins.", icon: Eye },
  { title: "Hygiene & Sterilization", text: "Strict infection-control protocols at every step, for every patient.", icon: ShieldCheck },
  { title: "Advanced Dentistry", text: "Digital diagnosis and modern equipment for precise, comfortable care.", icon: Cpu },
  { title: "Affordable Care", text: "Quality treatment that stays within reach of every family.", icon: Wallet },
  { title: "Continuous Learning", text: "We keep learning, so our care keeps improving.", icon: GraduationCap },
];

/* ------------------------------------------------------------ Why choose us */

export const whyChooseUs: Feature[] = [
  { title: "Experienced Dental Team", text: "A skilled team led by our founder, Dr. Shikhar Selara, who is a BDS dental surgeon.", icon: Users },
  { title: "Multispeciality Dental Care", text: "From check-ups and fillings to implants and aligners — eleven specialities, one trusted clinic.", icon: Layers },
  { title: "Digital Diagnosis", text: "Digital X-rays and intraoral photos for accurate diagnosis you can actually see.", icon: ScanLine },
  { title: "Advanced Equipment", text: "Rotary endodontics, apex locators, ultrasonic scalers and more.", icon: Microscope },
  { title: "International Sterilization Protocols", text: "Autoclaved instruments and surfaces disinfected after every patient.", icon: ShieldCheck },
  { title: "Personalized Treatment Plans", text: "No one-size-fits-all — your plan is built around your teeth and goals.", icon: ClipboardList },
  { title: "Affordable Pricing", text: "High-quality dentistry that doesn't stretch the family budget.", icon: Wallet },
  { title: "Comfortable Environment", text: "A calm, clean and welcoming clinic designed to put you at ease.", icon: Armchair },
  { title: "Patient-Centric Care", text: "We take time to listen, so you never feel rushed or unheard.", icon: HeartHandshake },
  { title: "Transparent Communication", text: "You'll know what we find, what we recommend and why — before we begin.", icon: MessagesSquare },
];

/* -------------------------------------------------------------- Technology */

export const technology: Feature[] = [
  { title: "Digital X-Ray", text: "Instant, detailed images of teeth, roots and bone — with less radiation than traditional film.", icon: ScanLine },
  { title: "Rotary Endodontics", text: "Motor-driven files shape root canals smoothly, which typically means a faster, more comfortable root canal.", icon: Cog },
  { title: "Apex Locator", text: "Electronically measures the exact length of a root canal, so cleaning is precise and fewer X-rays are needed.", icon: Crosshair },
  { title: "Ultrasonic Scaler", text: "High-frequency vibrations and a water spray remove plaque and tartar gently and thoroughly.", icon: Waves },
  { title: "Implant Surgery Kit", text: "Purpose-designed instruments for precise, predictable implant placement.", icon: Wrench },
  { title: "Surgical Motor", text: "Controlled speed and torque for implant and oral surgery procedures.", icon: Cog },
  { title: "LED Curing Units", text: "Quickly and reliably harden tooth-coloured fillings and bonding.", icon: Sun },
  { title: "Intraoral Photography", text: "A tiny camera lets you see what we see — so your treatment makes sense.", icon: Camera },
  { title: "Digital Patient Records", text: "Your history, images and treatment plans are organised digitally and always at hand.", icon: FolderOpen },
  { title: "Modern Sterilization Equipment", text: "Autoclave-based sterilization and disinfection protect every patient, every time.", icon: Flame },
];

/* ------------------------------------------------------------ Sterilization */

export const sterilization: Feature[] = [
  { title: "Autoclave Sterilization", text: "Instruments are sterilised in an autoclave using pressurised steam.", icon: Flame },
  { title: "Disposable Materials Wherever Required", text: "Single-use items such as gloves, masks and needles are used once and discarded.", icon: Package },
  { title: "Surface Disinfection After Every Patient", text: "Chair, tray and touch surfaces are disinfected between patients.", icon: SprayCan },
  { title: "Instrument Tracking", text: "Instruments are tracked through the sterilization cycle so every set used on you is accounted for.", icon: ClipboardCheck },
  { title: "Barrier Protection", text: "Protective barriers on surfaces and equipment, with gloves, masks and eyewear for our team.", icon: ShieldPlus },
  { title: "Strict Infection Control Guidelines", text: "Our team follows standardised infection-control guidelines at every step.", icon: BadgeCheck },
];

/* ----------------------------------------------------------- Patient journey */

export const journey: Feature[] = [
  { title: "Appointment Booking", text: "Book online, on WhatsApp or by phone — choose your branch and a time that suits you.", icon: CalendarCheck },
  { title: "Registration", text: "A quick registration creates your digital patient record.", icon: ClipboardList },
  { title: "Consultation", text: "We listen to your concerns, history and goals — no rushing.", icon: Stethoscope },
  { title: "Diagnosis", text: "Examination with digital X-rays and photos to find the real cause.", icon: ScanLine },
  { title: "Digital Treatment Planning", text: "A clear, step-by-step plan, with options where there are any.", icon: Monitor },
  { title: "Treatment Discussion", text: "We explain what's needed, how long it takes and what it costs — so you can decide.", icon: Handshake },
  { title: "Treatment Execution", text: "Gentle, precise treatment with strict sterilization protocols.", icon: Sparkles },
  { title: "Follow-up", text: "We check your healing and results, and answer any questions.", icon: CalendarClock },
  { title: "Preventive Maintenance Visits", text: "Regular check-ups keep your smile healthy for the long term.", icon: RefreshCw },
];

/* ---------------------------------------------------------- Special programs */

export const programs: (Feature & { cta?: string })[] = [
  { title: "Free Dental Consultation", text: "Free consultation on selected days and during campaigns. Follow us on Instagram or call your nearest clinic to find out what's running.", icon: Stethoscope },
  { title: "Oral Cancer Screening Camps", text: "Quick, painless community screening that helps catch suspicious changes in the mouth early.", icon: HeartPulse },
  { title: "School Dental Check-up Programs", text: "Dental check-ups and brushing education for school children, run together with schools.", icon: School },
  { title: "Dental Awareness Programs", text: "Talks and demonstrations on oral hygiene, tobacco's effects and preventive care for communities and groups.", icon: Megaphone },
  { title: "Corporate Dental Camps", text: "On-site dental check-ups for your team — convenient for employees and good for workplace wellbeing.", icon: Briefcase },
];

/* ----------------------------------------------------------------- Trust strip */

const totalReviews = branches.reduce((n, b) => n + b.google.reviews, 0);
const avgRating = branches.reduce((n, b) => n + b.google.rating * b.google.reviews, 0) / totalReviews;

export const trustStats = [
  { value: String(treatments.length), label: "Dental specialities" },
  { value: String(branches.length), label: "Clinics in Gujarat" },
  { value: "6", label: "Days a week, Mon–Sat" },
  { value: `${avgRating.toFixed(1)}★`, label: `On Google · ${totalReviews} reviews` },
] as const;

export const trustBadges: { label: string; icon: LucideIcon }[] = [
  { label: "Painless, ethical care", icon: Heart },
  { label: "Digital X-ray diagnosis", icon: ScanLine },
  { label: "Autoclave sterilised", icon: ShieldCheck },
  { label: "Personalised plans", icon: Award },
];

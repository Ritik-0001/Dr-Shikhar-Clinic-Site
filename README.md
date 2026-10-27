# Shree Hari Dental Care: website

Multi-page marketing site for **Shree Hari Dental Care (SHDC)**, a multispeciality dental clinic with branches in
**Nikol (Ahmedabad)** and **Dhrangadhra**, Gujarat. Built by LaunchCraft with Next.js (App Router), React 19, TypeScript and Tailwind CSS v4.

> Tagline: *Healthy Teeth. Happy Life. Confident You.* · Parent company: Shreenath Healthcare Pvt. Ltd.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (every page is statically generated)
npm start          # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run brand      # regenerate logos/icons from assets/brand/source (see "Brand assets")
```

Requires Node 20.9+. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the live domain
(used for canonical URLs, the sitemap, Open Graph tags and structured data). On Vercel it falls back to the
project's production URL automatically.

## Pages

| Route | What it is |
|---|---|
| `/` | A deliberately short home page: hero, treatments, why us, founder, reviews, clinics, FAQ teaser, call to action |
| `/about` | Story, vision and mission, values, ten reasons to choose us |
| `/technology` | Equipment (ten items) and the sterilization protocol (`#technology`, `#sterilization`) |
| `/doctors` | Founder profile (add more doctors in `src/data/doctors.ts`) |
| `/treatments`, `/treatments/[slug]` | Overview + one page per speciality (10), generated from `src/data/treatments.ts` |
| `/dental-implants` | Bespoke implants page: options, journey, implants vs bridges vs dentures, FAQs |
| `/smile-gallery` | Before/after sliders (illustrative artwork until real cases are supplied) |
| `/testimonials` | Google rating summary + patient comments (sample copy, clearly labelled) |
| `/blog`, `/blog/[slug]` | 8 oral-health articles (`src/data/blog.ts`) |
| `/faqs` | Grouped FAQs + FAQPage structured data |
| `/appointment` | Appointment request form (opens WhatsApp) and the nine-step patient journey |
| `/contact` | Branch cards, message form (opens WhatsApp), hours, Instagram |
| `/branches`, `/branches/[slug]` | Branch locator (live open/closed, "nearest to me") + a local-SEO page per branch |
| `/special-programs` | Camps and community programs + request form |

34 public pages in total, plus the admin panel. Also: `sitemap.xml`, `robots.txt`, web manifest, favicon/app icons, a social-share image (`opengraph-image`) and a custom 404.

## Design system

- **Art direction:** warm ivory canvas, warm-white cards, sand bands, deep navy bands with fine grain and soft colour glows, and the brand red as the single accent. Calm: few borders, almost no shadows, plenty of whitespace.
- **Type:** Fraunces (display serif with an optical-size axis) for headings and Manrope for body text, both self-hosted through `next/font`.
- **Tokens and utilities** are at the top of `src/app/globals.css` (`@theme static`, then `container-page`, `section-y`, `eyebrow`, `glow`, `.grain-layer`, `bg-hero-glow`, `.swipe-row`, `.reveal`).
- **Shared building blocks:** `SectionHeading`, `PageHero`, `CtaBanner`, `Button`/`ButtonLink`, `TreatmentCard`, `BranchCard`, `FaqList`, `PatientJourney`, `HoursLines`, the home sections in `src/components/home/`.
- **Header:** a solid, fully opaque, full-width bar at every size. The desktop menu (from 1280 px) is state driven (`desktop-nav.tsx`), so it closes on every route change, link click, Escape and outside click. Below 1280 px the native `<dialog>` drawer (`mobile-menu.tsx`) is used.
- **Page changes feel like page changes:** `route-feedback.tsx` shows a thin progress bar on navigation and eases the new page in; the page also jumps to the top (`data-scroll-behavior="smooth"` on `<html>` lets Next reset the scroll instantly). All of it is skipped on first load and with reduced motion.
- **Phones:** full-width stacked buttons, icon-beside-text cards, swipeable review row, compact two-column footer, sticky Call / Chat / Book bar.
- **Writing rule:** no em dashes in site copy. Use commas, colons, full stops or brackets, and write time ranges as "9:00 AM to 1:00 PM".

## Admin panel (`/admin`)

A simple, password-protected panel for the clinic team: **write blog posts** (draft or publish, with a live preview, formatting buttons, cover photo or brand artwork) and **change photos across the site** (home hero, both clinics, doctor, About page and each treatment page). Changes go live within seconds, no redeploy.

Set up on Vercel (one time, about two minutes):
1. Project, Settings, Environment Variables: add `ADMIN_PASSWORD` (a strong password). Optionally add `ADMIN_SECRET` (any long random text). Until you do, the built-in password `admin123` is used, which is fine for a demo with no storage connected but must be replaced before real use.
2. Project, Storage: create a **Blob** store (choose **Public**) and connect it to the project. This adds `BLOB_READ_WRITE_TOKEN` automatically.
3. Redeploy, then open `https://<your-domain>/admin`.

Locally, `npm run dev` works with no setup: the password is `admin123` unless you set `ADMIN_PASSWORD` in `.env.local` and everything is saved in the git-ignored `.data` folder.

How it works: posts and photo choices are saved as small JSON versions plus the image files in Blob (`src/lib/cms/`). Public pages read them (cached, refreshed the moment you save). Posts written in the panel are merged with the built-in articles in `src/data/blog.ts`. Photos are shrunk in the browser before upload. To add a new photo position, add a slot in `src/data/photos.ts` and render it with `getPhoto(id)`. Drafts are stored with the rest of the content on a public but unguessable Blob address; do not put secrets in drafts.

## Photos

The client has not supplied photography yet, so every photo slot has a designed fallback (brand arch, doctor monogram, clinic cover).
The easiest way to add photos is the admin panel above. Developers can also commit a file to `public/images/` and set `photo` in `src/data/doctors.ts`.

Photo positions (home hero, each clinic, doctor, About page, each treatment page) are listed in `src/data/photos.ts`.

## Where to change things

Almost everything lives in plain data files, so content updates need no code changes.

| To change | Edit |
|---|---|
| Name, tagline, opening hours, Instagram, **e-mail** | `src/data/site.ts` |
| Branch addresses, phone/WhatsApp numbers, coordinates, Google rating | `src/data/branches.ts` |
| Treatments & procedures, FAQs per treatment | `src/data/treatments.ts` |
| Global FAQs (and which four show on the home page) | `src/data/faqs.ts` |
| Blog posts | `src/data/blog.ts` |
| Patient testimonials | `src/data/testimonials.ts` (delete `sample: true` on real ones) |
| Doctors (bio, **photo**) | `src/data/doctors.ts` (put photos in `public/images/team/`, set `photo`) |
| Photo positions (what can be uploaded where) | `src/data/photos.ts` (uploads happen in `/admin`) |
| Why-us, technology, sterilization, journey, values, programs | `src/data/content.ts` |
| Navigation | `src/data/navigation.ts` |
| Colours & fonts | `src/app/globals.css` (tokens at the top) and `src/app/layout.tsx` |

## Still needed from the client

Everything below is wired up and hidden or flagged until supplied:

- **E-mail address:** `site.email` is `null`, so e-mail is hidden everywhere. Set it and it appears in the contact page and form fallbacks.
- **Confirm phone numbers:** branch numbers were read from each public Google Maps listing (Nikol +91 92656 16569, Dhrangadhra +91 94276 64500) and are also used as WhatsApp numbers. Confirm both are WhatsApp-enabled, or add dedicated numbers.
- **Live domain:** set `NEXT_PUBLIC_SITE_URL`.
- **Real patient reviews:** the six comments on `/testimonials` are placeholders labelled **Sample**. Replace with real, consented reviews. Only use patient content with written consent.
- **Real before/after cases:** the gallery uses illustrations (labelled as such). Add real photos only with patient consent.
- **Photography:** clinic exterior and interior, the treatment room, the team and a doctor portrait (see "Photos"). A short shoot at both clinics will lift trust and conversion more than anything else.
- **Doctor credentials:** add experience and registration details if the doctor wants them shown.
- **Founding year:** `site.founded` (optional "Since ...").
- **Privacy policy / terms:** not drafted (the forms hand off to WhatsApp and store nothing). Needed if you run ads or lead forms.
- **Gujarati version:** the identity is bilingual (logo); full Gujarati content would need a native translator/reviewer.

## Brand assets

The client sent two JPEG logos on black backgrounds. They are kept untouched in `assets/brand/source/`:

- `shree-hari-dental-care_logo_gujarati_source.jpeg`
- `shree-hari-dental-care_logo_english_source.jpeg`

`npm run brand` (`scripts/build-brand-assets.mjs`) turns them into web-ready, transparent, vector artwork in `public/brand/`
by measuring the exact brand colours (**red `#C3262F`, blue `#16478C`**), un-mixing each colour from the black background into
an alpha mask, and tracing it to SVG. It outputs the emblem, English/Gujarati wordmarks, stacked and horizontal lock-ups,
"reversed" versions for dark backgrounds, PNG fallbacks, the favicon, Apple touch icon and manifest icons. The artwork is
only re-arranged (for example the horizontal header lock-up), never redrawn.

## Quality

Measured on the production build (Lighthouse, mobile emulation with simulated slow 4G + 4x CPU throttle, Oct 2026):

- Mobile: Performance **94 to 98**, Accessibility **100**, Best Practices **100**, SEO **100**; CLS **0**; TBT 40 to 100 ms
- Desktop: **100 / 100 / 100 / 100** (LCP 0.7 s)
- axe-core (WCAG 2.2 A/AA + best practice): **0 violations** across the main pages (and the 404) at 390 px and 1440 px
- No horizontal scroll at 360 / 390 / 768 / 1440 px
- Home page length: about 7,800 px on desktop and 13.6 phone screens (the first design was 14,200 px and 33.9 screens)
- All pages are statically generated; JavaScript is limited to the menus, contact chooser, forms, branch locator, route feedback and the
  before/after slider. Fonts are self-hosted via `next/font` (no Gujarati web font: the Gujarati name is vector artwork).
- Tested and rejected: Next's experimental `inlineCss` (made Total Blocking Time and HTML size worse on this site).

SEO built in: per-page titles/descriptions/canonicals, Open Graph + Twitter cards (with share image), `Dentist` (local
business) schema per branch, `FAQPage`, `BreadcrumbList`, `BlogPosting` and `Service` schema, sitemap and robots, and
keyword-targeted pages for every service and both locations.

## Forms

There is no booking backend yet. The appointment, contact and camp-request forms validate input (including the
"closed on Sundays" rule) and open **WhatsApp with the details pre-filled** for the chosen branch, which is the quickest path to a
confirmed slot for most patients; nothing is stored. To collect leads server-side later, add a Route Handler and send
to e-mail, Google Sheets or a database (Supabase/Resend fit well).

## Deploying

1. Push to GitHub and import the repo in Vercel (framework: Next.js, no extra settings).
2. Add `NEXT_PUBLIC_SITE_URL` with the final domain; attach the domain.
3. Submit `https://<domain>/sitemap.xml` in Google Search Console, and make sure the Google Business Profile for each branch links to the matching `/branches/<slug>` page.

## Roadmap (from the client's brief)

Built now: blog & oral-health education, before/after gallery, WhatsApp appointment flow, branch locator, Google rating display.
Not built yet: online consultation, digital patient forms, treatment cost estimator, EMI calculator, membership plans, patient login,
online payments, live Google Reviews feed, live chat, careers, franchise enquiries.

## Compliance note

Advertising by dental professionals in India is regulated (Dental Council of India code of ethics, and consumer-protection
law on misleading claims). Superlatives such as "best dentist" are deliberately avoided in page copy, and testimonials and
before/after images should only go live with real, consented content. Have the clinic confirm the final copy.

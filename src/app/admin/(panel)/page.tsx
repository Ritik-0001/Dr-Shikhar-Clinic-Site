import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Images, Plus, TriangleAlert } from "lucide-react";
import { posts as builtIn } from "@/data/blog";
import { photoSlots } from "@/data/photos";
import { getStateFresh } from "@/lib/cms/content";
import { usingDefaultPassword } from "@/lib/cms/auth";
import { storageKind } from "@/lib/cms/store";
import { formatPostDateShort } from "@/data/blog";

export default async function DashboardPage() {
  const state = await getStateFresh();
  const storage = storageKind();
  const published = state.posts.filter((p) => p.status === "published").length;
  const drafts = state.posts.length - published;
  const photosSet = photoSlots.filter((s) => state.photos[s.id]?.src).length;
  const recent = [...state.posts].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 4);

  const stats = [
    { label: "Posts you wrote", value: state.posts.length, note: `${published} live, ${drafts} draft${drafts === 1 ? "" : "s"}`, icon: FileText },
    { label: "Built-in articles", value: builtIn.length, note: "Written for you, always live", icon: FileText },
    { label: "Photos added", value: `${photosSet}/${photoSlots.length}`, note: "Places on the site with your photo", icon: Images },
  ];

  return (
    <div>
      <p className="eyebrow">Admin panel</p>
      <h1 className="font-display mt-3 text-[clamp(2rem,1.5rem+2vw,2.8rem)] leading-tight text-primary-900">Hello! What would you like to update?</h1>
      <p className="mt-3 max-w-2xl text-muted">Write a new blog post or change the photos on your website. Changes go live within a few seconds.</p>

      {usingDefaultPassword() && (
        <p role="note" className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
          <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <span>
            You are signing in with the built-in password. Anyone who can read the website&apos;s code could guess it, so set <strong>ADMIN_PASSWORD</strong> in Vercel before you connect photo storage.
          </span>
        </p>
      )}

      {storage === "none" && (
        <div role="alert" className="mt-8 flex gap-4 rounded-3xl border border-amber-300 bg-amber-50 p-6 text-amber-950">
          <TriangleAlert className="mt-0.5 size-6 shrink-0" aria-hidden="true" />
          <div className="text-[0.95rem] leading-relaxed">
            <p className="font-bold">Storage is not connected yet, so changes cannot be saved.</p>
            <p className="mt-1.5">
              In your Vercel project open <strong>Storage</strong>, create a <strong>Blob</strong> store (choose <strong>Public</strong>) and connect it to this project, then redeploy. It takes about a minute and is free to start.
            </p>
          </div>
        </div>
      )}
      {storage === "local" && (
        <p className="mt-8 flex items-start gap-3 rounded-2xl bg-surface p-4 text-sm leading-relaxed text-muted">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent-600" aria-hidden="true" />
          Testing on your own computer: posts and photos are saved in the project&apos;s <strong className="text-ink-soft">.data</strong> folder. On the live website they are saved to Vercel Blob.
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map(({ label, value, note, icon: Icon }) => (
          <div key={label} className="rounded-3xl border border-line bg-white p-6">
            <span className="grid size-11 place-items-center rounded-2xl bg-accent-50 text-accent-600">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <p className="font-display mt-5 text-[2.6rem] leading-none text-primary-900">{value}</p>
            <p className="mt-2 font-bold text-ink-soft">{label}</p>
            <p className="mt-0.5 text-sm text-muted">{note}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Link href="/admin/posts/new" className="group relative isolate overflow-hidden rounded-3xl bg-primary-900 p-7 text-white transition-shadow hover:shadow-lift">
          <span className="glow absolute -right-16 -top-20 -z-10 size-64 [--glow:rgb(58_116_192/0.55)]" aria-hidden="true" />
          <span className="grid size-12 place-items-center rounded-2xl bg-white/10">
            <Plus className="size-6" aria-hidden="true" />
          </span>
          <p className="font-display mt-6 text-[1.6rem] leading-tight">Write a new blog post</p>
          <p className="mt-2 text-primary-200">Add a health tip or announcement. Save it as a draft or publish it.</p>
          <span className="mt-5 inline-flex items-center gap-1.5 font-bold text-accent-300">
            Start writing <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </Link>
        <Link href="/admin/photos" className="group rounded-3xl border border-line bg-white p-7 transition-shadow hover:shadow-card">
          <span className="grid size-12 place-items-center rounded-2xl bg-accent-50 text-accent-600">
            <Images className="size-6" aria-hidden="true" />
          </span>
          <p className="font-display mt-6 text-[1.6rem] leading-tight text-primary-900">Change website photos</p>
          <p className="mt-2 text-muted">Upload your clinic, doctor and treatment photos. Pick any photo to replace it.</p>
          <span className="mt-5 inline-flex items-center gap-1.5 font-bold text-accent-700">
            Open photos <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </Link>
      </div>

      <section className="mt-10" aria-labelledby="recent">
        <div className="flex items-center justify-between gap-4">
          <h2 id="recent" className="text-lg font-bold text-primary-900">
            Recent posts
          </h2>
          <Link href="/admin/posts" className="text-sm font-bold text-primary-700 hover:text-accent-700">
            See all
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="mt-4 rounded-3xl border border-dashed border-line bg-white/60 p-8 text-center text-muted">You have not written any posts yet. Your first one is a click away.</p>
        ) : (
          <ul className="mt-4 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
            {recent.map((p) => (
              <li key={p.slug}>
                <Link href={`/admin/posts/${p.slug}`} className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-canvas">
                  <span className="min-w-0">
                    <span className="block truncate font-bold text-primary-900">{p.title}</span>
                    <span className="block text-sm text-muted">{formatPostDateShort(p.date)}</span>
                  </span>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-extrabold ${p.status === "published" ? "bg-emerald-50 text-emerald-800" : "bg-surface-2 text-ink-soft"}`}>
                    {p.status === "published" ? "Live" : "Draft"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

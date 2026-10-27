"use client";

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bold, CheckCircle2, Heading2, Heading3, ImagePlus, Link2, List, ListOrdered, LoaderCircle, Save, Send, TriangleAlert, X } from "lucide-react";
import { savePost, type FormState } from "@/app/admin/actions";
import { PostBlocks } from "@/components/blog/post-blocks";
import { PostCover } from "@/components/blog/post-cover";
import { DentalIcon } from "@/components/icons/dental-icons";
import { treatments, type DentalIconName } from "@/data/treatments";
import { cn } from "@/lib/cn";
import { parseBody, readingMinutes, slugify } from "@/lib/cms/markdown";
import type { CoverTone, StoredPost } from "@/lib/cms/types";
import { uploadImage } from "./image-tools";

const TONES: { id: CoverTone; label: string; swatch: string }[] = [
  { id: "blue", label: "Blue", swatch: "bg-primary-700" },
  { id: "navy", label: "Navy", swatch: "bg-primary-950" },
  { id: "red", label: "Red", swatch: "bg-accent-600" },
  { id: "sky", label: "Light", swatch: "bg-primary-200" },
];
const ICONS: { id: DentalIconName; label: string }[] = [
  { id: "tooth", label: "Tooth" },
  { id: "general", label: "Check-up" },
  { id: "preventive", label: "Prevention" },
  { id: "restorative", label: "Fillings" },
  { id: "rootcanal", label: "Root canal" },
  { id: "prostho", label: "Crowns and dentures" },
  { id: "implant", label: "Implants" },
  { id: "cosmetic", label: "Smile design" },
  { id: "ortho", label: "Braces" },
  { id: "surgery", label: "Oral surgery" },
  { id: "pediatric", label: "Children" },
  { id: "perio", label: "Gums" },
];

const label = "mb-2 block text-[0.9rem] font-bold text-primary-900";
const hint = "mt-1.5 text-sm text-muted";
const card = "rounded-3xl border border-line bg-white p-5 sm:p-6";
const todayIST = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());

export function PostEditor({ post, categories, saved }: { post?: StoredPost; categories: string[]; saved?: string }) {
  const router = useRouter();
  const [state, action, pending] = useActionState<FormState | null, FormData>(savePost, null);

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(post));
  const [body, setBody] = useState(post?.body ?? "");
  const [tab, setTab] = useState<"write" | "preview">("write");
  const [tone, setTone] = useState<CoverTone>(post?.coverTone ?? "blue");
  const [icon, setIcon] = useState<DentalIconName>(post?.coverIcon ?? "tooth");
  const [cover, setCover] = useState(post?.coverImage ?? "");
  const [coverAlt, setCoverAlt] = useState(post?.coverAlt ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [excerptDraft, setExcerptDraft] = useState(post?.excerpt ?? "");

  const textarea = useRef<HTMLTextAreaElement>(null);
  const banner = useRef<HTMLDivElement>(null);
  const effectiveSlug = slugTouched ? slug : slugify(title);

  // After saving: show the message; a new post (or a renamed address) moves to its own edit page.
  useEffect(() => {
    if (!state) return;
    banner.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    if (state.ok && state.slug && state.slug !== post?.slug) {
      router.replace(`/admin/posts/${state.slug}?saved=${state.message.startsWith("Published") ? "published" : "draft"}`);
    }
  }, [state, post?.slug, router]);

  const message: FormState | null = state ?? (saved ? { ok: true, message: saved === "published" ? "Published. It is now live on the blog." : "Saved as a draft. It is not on the website yet." } : null);

  /* ---- writing helpers: they edit the text around the selection and keep the cursor sensible ---- */
  const edit = (fn: (before: string, selected: string, after: string) => { text: string; from: number; to: number }) => {
    const el = textarea.current;
    if (!el) return;
    const { selectionStart: a, selectionEnd: b } = el;
    const result = fn(body.slice(0, a), body.slice(a, b), body.slice(b));
    setBody(result.text);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(result.from, result.to);
    });
  };
  const wrap = (mark: string, placeholder: string) =>
    edit((before, sel, after) => {
      const inner = sel || placeholder;
      return { text: `${before}${mark}${inner}${mark}${after}`, from: before.length + mark.length, to: before.length + mark.length + inner.length };
    });
  const prefixLines = (prefix: (i: number) => string, placeholder: string) =>
    edit((before, sel, after) => {
      const lineStart = before.lastIndexOf("\n") + 1;
      const head = before.slice(0, lineStart);
      const first = before.slice(lineStart);
      const chunk = (first + (sel || placeholder)).split("\n").map((line, i) => prefix(i) + line).join("\n");
      return { text: head + chunk + after, from: head.length, to: head.length + chunk.length };
    });
  const insertLink = () =>
    edit((before, sel, after) => {
      const labelText = sel || "link text";
      const url = "/appointment";
      const start = before.length + labelText.length + 3;
      return { text: `${before}[${labelText}](${url})${after}`, from: start, to: start + url.length };
    });

  const tools = [
    { id: "h2", icon: Heading2, label: "Heading" },
    { id: "h3", icon: Heading3, label: "Smaller heading" },
    { id: "bold", icon: Bold, label: "Bold" },
    { id: "link", icon: Link2, label: "Link" },
    { id: "ul", icon: List, label: "Bullet list" },
    { id: "ol", icon: ListOrdered, label: "Numbered list" },
  ] as const;

  function runTool(id: (typeof tools)[number]["id"]) {
    if (id === "h2") prefixLines(() => "## ", "Heading");
    else if (id === "h3") prefixLines(() => "### ", "Smaller heading");
    else if (id === "bold") wrap("**", "bold text");
    else if (id === "link") insertLink();
    else if (id === "ul") prefixLines(() => "- ", "First point");
    else prefixLines((i) => `${i + 1}. `, "First step");
  }

  const preview = useMemo(() => parseBody(body), [body]);
  const minutes = readingMinutes(body);

  async function onCoverFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      setCover(await uploadImage(file));
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "The upload did not work.");
    } finally {
      setUploading(false);
    }
  }

  const previewPost = {
    slug: "preview",
    title: title || "Your title",
    excerpt: "",
    category: "",
    date: todayIST(),
    readMinutes: minutes,
    keywords: [],
    cover: { icon, tone, image: cover || undefined, imageAlt: coverAlt },
    blocks: [],
  };

  return (
    <form action={action} className="grid gap-6">
      <input type="hidden" name="originalSlug" value={post?.slug ?? ""} />
      <input type="hidden" name="coverImage" value={cover} />
      <input type="hidden" name="coverTone" value={tone} />
      <input type="hidden" name="coverIcon" value={icon} />

      <div ref={banner} aria-live="polite">
        {message && (
          <p role={message.ok ? "status" : "alert"} className={cn("flex items-start gap-3 rounded-2xl px-4 py-3.5 text-[0.95rem] font-bold", message.ok ? "bg-emerald-50 text-emerald-900" : "bg-accent-50 text-accent-800")}>
            {message.ok ? <CheckCircle2 className="mt-0.5 size-5 shrink-0" aria-hidden="true" /> : <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />}
            {message.message}
          </p>
        )}
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_21rem]">
        {/* ------------------------------------------------------------ writing */}
        <div className="grid gap-6">
          <div className={card}>
            <label htmlFor="title" className={label}>
              Title
            </label>
            <input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="field !text-xl font-bold" placeholder="e.g. 5 habits for healthier gums" maxLength={140} required />

            <label htmlFor="excerpt" className={cn(label, "mt-6")}>
              Short summary
            </label>
            <textarea id="excerpt" name="excerpt" rows={3} maxLength={320} value={excerptDraft} onChange={(e) => setExcerptDraft(e.target.value)} className="field" placeholder="One or two sentences. Shown on the blog list and in Google results." />
            <p className={hint}>{excerptDraft.length}/320</p>
          </div>

          <div className={cn(card, "!p-0 overflow-hidden")}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
              <div role="tablist" aria-label="Editor view" className="flex rounded-full bg-surface p-1">
                {(["write", "preview"] as const).map((t) => (
                  <button key={t} type="button" role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={cn("h-9 cursor-pointer rounded-full px-4 text-sm font-bold capitalize transition-colors", tab === t ? "bg-white text-primary-900" : "text-muted hover:text-primary-900")}>
                    {t}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted">{minutes} min read</p>
            </div>

            {tab === "write" ? (
              <>
                <div className="flex flex-wrap gap-1 border-b border-line bg-canvas/60 px-3 py-2" role="toolbar" aria-label="Formatting">
                  {tools.map(({ id, icon: Icon, label: name }) => (
                    <button key={id} type="button" onClick={() => runTool(id)} title={name} aria-label={name} className="grid size-10 cursor-pointer place-items-center rounded-xl text-primary-800 transition-colors hover:bg-white hover:text-accent-700">
                      <Icon className="size-[1.1rem]" aria-hidden="true" />
                    </button>
                  ))}
                </div>
                <textarea
                  ref={textarea}
                  id="body"
                  name="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={18}
                  aria-label="Article text"
                  placeholder={"Write your article here.\n\nUse a blank line to start a new paragraph. The buttons above add headings, bold text, links and lists."}
                  className="block min-h-[26rem] w-full resize-y border-0 bg-white p-5 text-base leading-relaxed text-ink outline-none sm:p-6"
                />
              </>
            ) : (
              <div className="min-h-[26rem] bg-white p-5 sm:p-8">
                {/* the textarea stays in the form (hidden) so the text is saved even while previewing */}
                <textarea name="body" value={body} readOnly hidden />
                {preview.length ? (
                  <div className="prose-clinic">
                    <PostBlocks blocks={preview} />
                  </div>
                ) : (
                  <p className="text-muted">Nothing to preview yet. Switch to Write and add some text.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------ sidebar */}
        <div className="grid gap-6 lg:sticky lg:top-6">
          <div className={card}>
            <h2 className="text-lg font-bold text-primary-900">Publish</h2>
            <p className="mt-1 text-sm text-muted">{post ? (post.status === "published" ? "This post is live." : "This post is a draft.") : "Not saved yet."}</p>
            <div className="mt-5 grid gap-2.5">
              <button type="submit" name="status" value="published" disabled={pending} className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-accent-600 px-6 font-bold text-white shadow-cta transition-colors hover:bg-accent-700 disabled:opacity-70">
                {pending ? <LoaderCircle className="size-5 animate-spin" aria-hidden="true" /> : <Send className="size-5" aria-hidden="true" />}
                {post?.status === "published" ? "Update post" : "Publish"}
              </button>
              <button type="submit" name="status" value="draft" disabled={pending} className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border-[1.5px] border-primary-900/25 px-6 font-bold text-primary-900 transition-colors hover:border-primary-900 disabled:opacity-70">
                <Save className="size-5" aria-hidden="true" /> {post?.status === "published" ? "Unpublish (save as draft)" : "Save draft"}
              </button>
            </div>
          </div>

          <div className={card}>
            <h2 className="text-lg font-bold text-primary-900">Details</h2>
            <div className="mt-4 grid gap-5">
              <div>
                <label htmlFor="category" className={label}>
                  Category
                </label>
                <input id="category" name="category" list="categories" defaultValue={post?.category ?? "Guides"} maxLength={40} className="field" />
                <datalist id="categories">
                  {categories.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>
              <div>
                <label htmlFor="date" className={label}>
                  Date shown
                </label>
                <input id="date" name="date" type="date" defaultValue={post?.date ?? todayIST()} className="field" />
              </div>
              <div>
                <label htmlFor="slug" className={label}>
                  Web address
                </label>
                <input
                  id="slug"
                  name="slug"
                  value={effectiveSlug}
                  onChange={(e) => {
                    setSlug(slugify(e.target.value));
                    setSlugTouched(true);
                  }}
                  className="field"
                  aria-describedby="slug-hint"
                />
                <p id="slug-hint" className={hint}>
                  /blog/{effectiveSlug || "your-title"}
                </p>
              </div>
              <div>
                <label htmlFor="treatment" className={label}>
                  Related treatment <span className="font-medium text-muted">(optional)</span>
                </label>
                <select id="treatment" name="treatment" defaultValue={post?.treatment ?? ""} className="field">
                  <option value="">None</option>
                  {treatments.map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.title}
                    </option>
                  ))}
                </select>
                <p className={hint}>Adds a link to that treatment under the article.</p>
              </div>
              <div>
                <label htmlFor="keywords" className={label}>
                  Search keywords <span className="font-medium text-muted">(optional)</span>
                </label>
                <input id="keywords" name="keywords" defaultValue={post?.keywords.join(", ") ?? ""} className="field" placeholder="gum disease, bleeding gums" />
                <p className={hint}>Separate with commas.</p>
              </div>
            </div>
          </div>

          <div className={card}>
            <h2 className="text-lg font-bold text-primary-900">Cover</h2>
            <PostCover post={previewPost} className="mt-4 aspect-[16/9] rounded-2xl" />

            {cover ? (
              <div className="mt-4 grid gap-4">
                <div>
                  <label htmlFor="coverAlt" className={label}>
                    Describe the photo
                  </label>
                  <input id="coverAlt" name="coverAlt" value={coverAlt} onChange={(e) => setCoverAlt(e.target.value)} className="field" placeholder="For screen readers and Google" maxLength={160} />
                </div>
                <button type="button" onClick={() => setCover("")} className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-full text-sm font-bold text-accent-700 hover:bg-accent-50">
                  <X className="size-4" aria-hidden="true" /> Remove photo, use artwork
                </button>
              </div>
            ) : (
              <div className="mt-4 grid gap-4">
                <fieldset>
                  <legend className={label}>Artwork colour</legend>
                  <div className="flex gap-2.5">
                    {TONES.map((t) => (
                      <button key={t.id} type="button" onClick={() => setTone(t.id)} aria-pressed={tone === t.id} aria-label={t.label} className={cn("size-10 cursor-pointer rounded-full ring-offset-2 ring-offset-white transition-shadow", t.swatch, tone === t.id ? "ring-2 ring-primary-900" : "ring-1 ring-line")} />
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className={label}>Artwork icon</legend>
                  <div className="grid grid-cols-6 gap-2">
                    {ICONS.map((i) => (
                      <button key={i.id} type="button" onClick={() => setIcon(i.id)} aria-pressed={icon === i.id} aria-label={i.label} title={i.label} className={cn("grid aspect-square cursor-pointer place-items-center rounded-xl border text-primary-800 transition-colors", icon === i.id ? "border-primary-900 bg-accent-50" : "border-line hover:bg-canvas")}>
                        <DentalIcon name={i.id} size={26} />
                      </button>
                    ))}
                  </div>
                </fieldset>
              </div>
            )}

            <label className="mt-4 flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border-[1.5px] border-dashed border-primary-900/30 text-sm font-bold text-primary-900 transition-colors hover:border-primary-900 hover:bg-canvas has-[:disabled]:opacity-60">
              {uploading ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <ImagePlus className="size-4" aria-hidden="true" />}
              {uploading ? "Uploading…" : cover ? "Replace photo" : "Upload a cover photo instead"}
              <input type="file" accept="image/jpeg,image/png,image/webp" disabled={uploading} className="sr-only" onChange={(e) => onCoverFile(e.target.files?.[0])} />
            </label>
            {uploadError && (
              <p role="alert" className="mt-2 text-sm font-semibold text-accent-700">
                {uploadError}
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

import { readFile } from "node:fs/promises";
import path from "node:path";
import { LOCAL_UPLOADS, mimeFor } from "@/lib/cms/store";

export const runtime = "nodejs";

/** Serves photos saved by the local (development) storage driver. In production the photos live on Vercel Blob. */
export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const parts = (await params).path;
  if (!parts.every((p) => /^[\w.-]+$/.test(p) && p !== "." && p !== "..")) return new Response("Not found", { status: 404 });
  const file = path.join(LOCAL_UPLOADS, ...parts);
  if (!file.startsWith(LOCAL_UPLOADS)) return new Response("Not found", { status: 404 });
  try {
    const data = await readFile(file);
    return new Response(new Uint8Array(data), {
      headers: { "Content-Type": mimeFor(path.extname(file).slice(1)), "Cache-Control": "public, max-age=31536000, immutable", "X-Content-Type-Options": "nosniff" },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

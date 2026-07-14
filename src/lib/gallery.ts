import fs from "fs";
import path from "path";
import {
  projects,
  type Project,
  type ProjectWithImages,
} from "@/data/projects";

/**
 * Server-only image resolver.
 *
 * Reads image files straight from the `public/` folder at build/dev time, so
 * you just drop photos into the right folder and they appear — no renaming, no
 * code edits. Files are sorted by name (natural/numeric order), so `01.jpg`
 * comes before `02.jpg` … and the FIRST file is used as the cover.
 *
 *   public/projects/<slug>/   → that project's gallery (cover = first file)
 *   public/about/             → the About section image (first file)
 *
 * Only imported by Server Components (pages), never by the browser.
 */

const IMAGE_RE = /\.(jpe?g|png|webp|avif|gif)$/i;

/** List image files inside public/<dir> as web paths (e.g. "/projects/x/01.jpg"). */
export function readImages(dir: string): string[] {
  const abs = path.join(process.cwd(), "public", dir);
  try {
    return fs
      .readdirSync(abs)
      .filter((f) => IMAGE_RE.test(f) && !f.startsWith("."))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => `/${dir}/${f}`);
  } catch {
    // Folder missing or empty → no images yet.
    return [];
  }
}

export function projectImages(slug: string): string[] {
  return readImages(`projects/${slug}`);
}

function attach(p: Project): ProjectWithImages {
  return { ...p, images: projectImages(p.slug) };
}

export function getProjectsWithImages(): ProjectWithImages[] {
  return projects.map(attach);
}

export function getProjectWithImages(
  slug: string
): ProjectWithImages | undefined {
  const p = projects.find((x) => x.slug === slug);
  return p ? attach(p) : undefined;
}

/** First image in public/about, or null if none dropped in yet. */
export function aboutImage(): string | null {
  return readImages("about")[0] ?? null;
}

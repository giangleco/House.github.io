"use client";

import type { ProjectWithImages } from "@/data/projects";
import ProjectGallery from "./ProjectGallery";

/**
 * ★ THE PHASE-1 / PHASE-2 SWAP POINT ★
 *
 * This component owns the single decision: "how do we present this project's
 * media?" The branch below is intentionally in place from Phase 1 even though
 * `model3d` is always null right now.
 *
 * Phase 2 checklist (no other file needs to change):
 *   1. Add `.glb` paths to the `model3d` field in src/data/projects.ts.
 *   2. Install react-three-fiber + drei (@react-three/fiber, @react-three/drei).
 *   3. Create <ModelViewer src={...} /> and render it in the `if (model3d)` branch.
 *
 * The surrounding detail-page layout, spacing, and animations stay identical —
 * only the inside of the media frame changes.
 */
export default function ProjectMedia({
  project,
}: {
  project: ProjectWithImages;
}) {
  const has3D = project.model3d != null;

  return (
    <section aria-label="Media công trình">
      {has3D ? (
        // ── Phase 2 branch ─────────────────────────────────────────────
        // Replace this placeholder with:
        //   <ModelViewer src={project.model3d!} poster={project.images[0]} />
        <Model3DPlaceholder src={project.model3d!} />
      ) : (
        // ── Phase 1 branch (active now) ────────────────────────────────
        <ProjectGallery images={project.images} title={project.title} />
      )}
    </section>
  );
}

/**
 * Temporary stand-in so the 3D branch is wired and visible in dev even before
 * react-three-fiber is installed. Delete when the real <ModelViewer /> lands.
 */
function Model3DPlaceholder({ src }: { src: string }) {
  return (
    <div className="flex aspect-[16/9] w-full items-center justify-center border border-dashed border-concrete-300 bg-paper">
      <div className="text-center">
        <p className="eyebrow mb-3">Mô hình 3D</p>
        <p className="font-serif text-xl text-concrete-500">
          Trình xem 3D sẽ được gắn ở đây
        </p>
        <p className="mt-2 text-xs text-concrete-300">{src}</p>
      </div>
    </div>
  );
}

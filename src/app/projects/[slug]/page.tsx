import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { getProjectWithImages } from "@/lib/gallery";
import ProjectMedia from "@/components/project/ProjectMedia";
import Reveal from "@/components/anim/Reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProjectWithImages(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} — ${project.location}`,
      description: project.summary,
      images: project.images[0] ? [{ url: project.images[0] }] : undefined,
    },
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectWithImages(params.slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="pt-28 md:pt-36">
      {/* Back + title block */}
      <header className="container-studio">
        <Reveal>
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-[12px] uppercase tracking-widest2 text-concrete-400 transition-colors hover:text-ink"
          >
            <span className="inline-block h-px w-8 bg-concrete-300 transition-all duration-500 ease-out-cubic group-hover:w-4" />
            Tất cả công trình
          </Link>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 border-b border-concrete-200 pb-14 md:grid-cols-12 md:pb-20">
          <Reveal className="md:col-span-8">
            <p className="eyebrow mb-4">{project.year}</p>
            <h1 className="text-5xl leading-[1.02] md:text-7xl">
              {project.title}
            </h1>
            <p className="mt-6 max-w-lg text-lg text-concrete-500">
              {project.summary}
            </p>
          </Reveal>

          {/* Meta */}
          <Reveal delay={120} className="md:col-span-4 md:pt-2">
            <dl className="grid grid-cols-2 gap-y-6 text-sm md:grid-cols-1">
              <MetaRow label="Địa điểm" value={project.location} />
              <MetaRow label="Diện tích" value={project.area} />
              <MetaRow label="Năm" value={project.year} />
              <div>
                <dt className="text-[11px] uppercase tracking-widest2 text-concrete-400">
                  Vật liệu
                </dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {project.materials.map((m) => (
                    <span
                      key={m}
                      className="border border-concrete-200 px-3 py-1 text-xs text-concrete-500"
                    >
                      {m}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </header>

      {/* Description */}
      <div className="container-studio py-16 md:py-24">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <p className="eyebrow">Câu chuyện</p>
          </Reveal>
          <div className="space-y-6 md:col-span-8 md:col-start-4">
            {project.description.map((para, i) => (
              <Reveal key={i} delay={i * 80}>
                <p className="text-xl leading-relaxed text-ink/80 md:text-2xl md:leading-relaxed">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Media area — image gallery now, 3D viewer later (see ProjectMedia) */}
      <div className="container-studio pb-24 md:pb-36">
        <ProjectMedia project={project} />
      </div>

      {/* Next project */}
      <Link
        href={`/projects/${next.slug}`}
        data-cursor="view"
        className="group block border-t border-concrete-200 bg-paper"
      >
        <div className="container-studio flex flex-col items-start justify-between gap-4 py-16 md:flex-row md:items-center md:py-24">
          <div>
            <p className="eyebrow mb-3">Công trình tiếp theo</p>
            <h2 className="text-4xl transition-colors duration-500 group-hover:text-accent md:text-6xl">
              {next.title}
            </h2>
          </div>
          <span className="inline-flex items-center gap-3 text-[12px] uppercase tracking-widest2 text-concrete-500">
            Xem
            <span className="inline-block h-px w-10 bg-accent transition-all duration-500 ease-out-cubic group-hover:w-20" />
          </span>
        </div>
      </Link>
    </article>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-widest2 text-concrete-400">
        {label}
      </dt>
      <dd className="mt-1 text-ink">{value}</dd>
    </div>
  );
}

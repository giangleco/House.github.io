"use client";

import Link from "next/link";
import Image from "next/image";
import { useParallax } from "@/components/anim/useParallax";
import Reveal from "@/components/anim/Reveal";
import RevealMask from "@/components/anim/RevealMask";
import { type ProjectWithImages } from "@/data/projects";

export default function FeaturedProjects({
  projects,
}: {
  projects: ProjectWithImages[];
}) {
  return (
    <section
      id="work"
      className="relative scroll-mt-20 bg-ivory py-24 md:scroll-mt-24 md:py-36"
    >
      <div className="container-studio">
        <div className="mb-16 flex items-end justify-between md:mb-24">
          <Reveal>
            <p className="eyebrow mb-4">Tuyển tập công trình</p>
            <h2 className="max-w-xl text-4xl leading-tight md:text-6xl">
              Những ngôi nhà chúng tôi đã dựng.
            </h2>
          </Reveal>
          <Reveal delay={120} className="hidden md:block">
            <span className="text-sm text-concrete-400">
              {String(projects.length).padStart(2, "0")} công trình
            </span>
          </Reveal>
        </div>
      </div>

      <div className="flex flex-col">
        {projects.map((project, i) => (
          <ProjectRow key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: ProjectWithImages;
  index: number;
}) {
  const imgRef = useParallax<HTMLDivElement>(90);
  const flip = index % 2 === 1;
  const cover = project.images[0];

  return (
    <Link
      href={`/projects/${project.slug}`}
      prefetch={false}
      data-cursor="view"
      className="group block"
    >
      <article className="container-studio grid grid-cols-1 items-center gap-8 py-14 md:grid-cols-12 md:gap-12 md:py-20">
        {/* Image */}
        <div
          className={`relative md:col-span-7 ${
            flip ? "md:order-2 md:col-start-6" : "md:order-1"
          }`}
        >
          <RevealMask className="relative aspect-[4/3] w-full overflow-hidden bg-concrete-100">
            {cover ? (
              <div ref={imgRef} className="absolute inset-0 -top-[8%] h-[116%]">
                <Image
                  src={cover}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.06]"
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs uppercase tracking-widest2 text-concrete-300">
                  Ảnh đang cập nhật
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/5" />
          </RevealMask>
        </div>

        {/* Text — offset from the image for the "slipped" editorial feel */}
        <div
          className={`md:col-span-4 ${
            flip
              ? "md:order-1 md:col-start-1 md:-mt-16"
              : "md:order-2 md:col-start-9 md:mt-16"
          }`}
        >
          <Reveal>
            <div className="flex items-center gap-4 text-concrete-400">
              <span className="font-serif text-sm italic">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-8 bg-concrete-300" />
              <span className="text-[11px] uppercase tracking-widest2">
                {project.year}
              </span>
            </div>

            <h3 className="mt-4 text-3xl transition-colors duration-500 group-hover:text-accent md:text-5xl">
              {project.title}
            </h3>

            <p className="mt-4 max-w-sm leading-relaxed text-concrete-500">
              {project.summary}
            </p>

            <div className="mt-6 flex items-center gap-3 text-sm text-concrete-400">
              <span>{project.location}</span>
              <span className="h-1 w-1 rounded-full bg-concrete-300" />
              <span>{project.area}</span>
            </div>

            <span className="mt-8 inline-flex items-center gap-2 text-[12px] uppercase tracking-widest2 text-ink">
              Xem công trình
              <span className="inline-block h-px w-8 bg-accent transition-all duration-500 ease-out-cubic group-hover:w-14" />
            </span>
          </Reveal>
        </div>
      </article>
    </Link>
  );
}

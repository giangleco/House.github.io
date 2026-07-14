"use client";

import Image from "next/image";
import RevealMask from "@/components/anim/RevealMask";

/**
 * Phase-1 media presentation: a large-format image gallery with a varied
 * editorial rhythm (full-bleed hero, then a two-up + full-bleed cadence).
 * Each image wipes open (clip-path) and settles from a slight zoom on scroll.
 */
export default function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [hero, ...rest] = images;

  if (!hero) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center border border-dashed border-concrete-300 bg-paper">
        <div className="text-center">
          <p className="eyebrow mb-2">Thư viện ảnh</p>
          <p className="font-serif text-xl text-concrete-500">
            Ảnh công trình đang được cập nhật
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Hero image */}
      <RevealMask className="relative aspect-[16/10] w-full overflow-hidden bg-concrete-100">
        <Image
          src={hero}
          alt={`${title} — ảnh 1`}
          fill
          sizes="(max-width: 1440px) 100vw, 1440px"
          className="object-cover"
        />
      </RevealMask>

      {/* Remaining images: pair the first two side by side, rest full-bleed */}
      {rest.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {rest.slice(0, 2).map((src, i) => (
            <RevealMask
              key={src}
              delay={i * 100}
              className="relative aspect-[4/5] w-full overflow-hidden bg-concrete-100"
            >
              <Image
                src={src}
                alt={`${title} — ảnh ${i + 2}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </RevealMask>
          ))}
        </div>
      )}

      {rest.slice(2).map((src, i) => (
        <RevealMask
          key={src}
          className="relative aspect-[16/9] w-full overflow-hidden bg-concrete-100"
        >
          <Image
            src={src}
            alt={`${title} — ảnh ${i + 4}`}
            fill
            sizes="(max-width: 1440px) 100vw, 1440px"
            className="object-cover"
            loading="lazy"
          />
        </RevealMask>
      ))}
    </div>
  );
}

"use client";

import Image from "next/image";
import Reveal from "@/components/anim/Reveal";
import RevealMask from "@/components/anim/RevealMask";
import { useParallax } from "@/components/anim/useParallax";

export default function About({ image }: { image: string | null }) {
  const imgRef = useParallax<HTMLDivElement>(70);

  return (
    <section
      id="about"
      className="scroll-mt-20 bg-paper py-24 md:scroll-mt-24 md:py-40"
    >
      <div className="container-studio grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <RevealMask className="relative aspect-[3/4] w-full overflow-hidden bg-concrete-100">
            {image ? (
              <div ref={imgRef} className="absolute inset-0 -top-[6%] h-[112%]">
                <Image
                  src={image}
                  alt="Nguyễn Sơn Hải — kiến trúc sư"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs uppercase tracking-widest2 text-concrete-300">
                  Ảnh đang cập nhật
                </span>
              </div>
            )}
          </RevealMask>
        </div>

        <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
          <Reveal>
            <p className="eyebrow mb-6">Giới thiệu</p>
            <h2 className="text-3xl leading-snug md:text-5xl">
              Tôi thiết kế những ngôi nhà biết{" "}
              <span className="italic text-accent">lắng nghe</span> ánh sáng và
              con người.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 space-y-5 text-concrete-500 md:text-lg md:leading-relaxed">
              <p>
                Hơn hai mươi năm hành nghề, tôi theo đuổi một thứ kiến trúc tiết
                chế: ít vật liệu, nhiều khoảng trống, và ánh sáng được xử lý như
                một vật liệu thực thụ.
              </p>
              <p>
                Mỗi ngôi nhà bắt đầu từ khu đất, từ khí hậu và từ nhịp sống của
                gia chủ — chứ không từ một phong cách định sẵn. Tôi tin rằng một
                không gian tốt là không gian khiến người ta thở chậm lại.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-concrete-200 pt-8">
              {[
                ["20+", "Năm kinh nghiệm"],
                ["40+", "Công trình hoàn thành"],
                ["06", "Giải thưởng thiết kế"],
              ].map(([n, label]) => (
                <div key={label}>
                  <dd className="font-serif text-3xl md:text-4xl">{n}</dd>
                  <dt className="mt-2 text-xs text-concrete-400">{label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

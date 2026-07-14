"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useParallax } from "@/components/anim/useParallax";
import { studio } from "@/data/projects";

const words = studio.tagline.split(" ");

export default function Hero({ cover }: { cover: string | null }) {
  // Parallax the background image gently as the hero scrolls away.
  const bgRef = useParallax<HTMLDivElement>(180);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-ink">
      {/* Parallax background */}
      <div ref={bgRef} className="absolute inset-0 -top-[12%] h-[124%]">
        {cover ? (
          <Image
            src={cover}
            alt={studio.name}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          // No cover image yet → tasteful dark field so text stays legible.
          <div className="h-full w-full bg-gradient-to-b from-concrete-500 to-ink" />
        )}
        {/* legibility scrims */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-ink/60" />
        <div className="absolute inset-0 bg-ink/10" />
      </div>

      {/* Content */}
      <div className="container-studio relative z-10 flex h-full flex-col justify-end pb-[12vh]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mb-6 text-[11px] uppercase tracking-widest2 text-ivory/70"
        >
          Kiến trúc nhà ở · Việt Nam
        </motion.p>

        <h1 className="max-w-5xl text-ivory">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="block text-[13vw] leading-[0.92] tracking-[0.02em] md:text-[9vw] lg:text-[7.5vw]"
            >
              {studio.name}
            </motion.span>
          </span>
        </h1>

        <p className="mt-8 flex max-w-2xl flex-wrap gap-x-2 text-lg text-ivory/85 md:text-2xl">
          {words.map((w, i) => (
            <span key={i} className="overflow-hidden">
              <motion.span
                initial={{ y: "120%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.7 + i * 0.05,
                }}
                className="inline-block font-serif italic"
              >
                {w}
              </motion.span>
            </span>
          ))}
        </p>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest2 text-ivory/60">
          Cuộn
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-ivory/25">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-ivory" />
        </span>
      </motion.div>

      <style jsx>{`
        @keyframes scrollcue {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(200%);
          }
        }
      `}</style>
    </section>
  );
}

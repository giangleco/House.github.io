"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { studio } from "@/data/projects";

/**
 * Opening curtain shown on the first load of a session: the studio name fades
 * in over a dark panel while a hairline progress bar fills 0→100, then the whole
 * panel lifts away to reveal the hero. Skips on subsequent in-session navigations
 * and honors prefers-reduced-motion.
 */
export default function Preloader() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen =
      typeof sessionStorage !== "undefined" &&
      sessionStorage.getItem("nsh_seen_intro");

    if (reduced || seen) return;

    setShow(true);
    // Lock scroll while the curtain is up.
    document.documentElement.style.overflow = "hidden";
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    lenis?.stop();

    const start = performance.now();
    const DURATION = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      // ease-out for a natural fill
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("nsh_seen_intro", "1");
        // small hold, then release
        setTimeout(() => {
          document.documentElement.style.overflow = "";
          lenis?.start();
          setShow(false);
        }, 450);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-ivory"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <span className="mb-5 text-[11px] uppercase tracking-widest2 text-ivory/50">
              {studio.role}
            </span>
            <span className="font-serif text-3xl tracking-[0.14em] md:text-5xl">
              {studio.name}
            </span>
          </motion.div>

          {/* progress */}
          <div className="absolute bottom-10 left-1/2 flex w-[min(80vw,420px)] -translate-x-1/2 items-center justify-between gap-6">
            <span className="relative h-px flex-1 overflow-hidden bg-ivory/15">
              <span
                className="absolute inset-y-0 left-0 bg-accent"
                style={{ width: `${count}%` }}
              />
            </span>
            <span className="font-serif text-sm tabular-nums text-ivory/70">
              {String(count).padStart(3, "0")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Two-part custom cursor (desktop, fine-pointer only):
 *   • a small solid dot that tracks the pointer 1:1
 *   • a larger ring that trails with easing
 * Over any element marked `data-cursor="view"` (project links) the ring grows
 * and shows a label. Disabled on touch / coarse pointers and reduced-motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("Xem");

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || !wide || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      const target = (e.target as HTMLElement)?.closest?.(
        "[data-cursor]"
      ) as HTMLElement | null;
      if (target) {
        setHovering(true);
        setLabel(target.dataset.cursor === "view" ? "Xem" : target.dataset.cursor || "");
      } else {
        setHovering(false);
      }
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.15;
      ring.y += (pos.y - ring.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[70]">
      {/* dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent transition-opacity duration-300"
        style={{ opacity: hovering ? 0 : 1 }}
      />
      {/* ring */}
      <div
        ref={ringRef}
        className={`absolute left-0 top-0 flex items-center justify-center rounded-full border border-ink/40 text-[10px] uppercase tracking-widest2 text-ink transition-[width,height,background-color,color,border-color] duration-300 ease-out-cubic ${
          hovering
            ? "-ml-9 -mt-9 h-[72px] w-[72px] border-accent bg-accent text-ivory"
            : "-ml-4 -mt-4 h-8 w-8"
        }`}
      >
        <span
          className="transition-opacity duration-200"
          style={{ opacity: hovering ? 1 : 0 }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps an image so it "wipes open" as it enters the viewport.
 *
 * ROBUST BY DEFAULT: the element renders fully VISIBLE. The hidden/animated
 * state (`.reveal-mask`) is added by JS only after mount — so if JavaScript
 * fails to run on the host (e.g. a bad deploy), the image still shows instead of
 * staying invisible. A fail-safe timer also reveals it even if the observer
 * never fires.
 */
export default function RevealMask({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Turn on the animation only now that JS is confirmed running.
    el.classList.add("reveal-mask");

    const reveal = () => el.classList.add("is-in");

    if (!("IntersectionObserver" in window)) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(el);

    // Fail-safe: never leave it hidden.
    const t = window.setTimeout(reveal, 2000);

    return () => {
      observer.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

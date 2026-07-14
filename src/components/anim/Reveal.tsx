"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger delay in ms */
  delay?: number;
  /** 0–1, how much of the element must be visible before revealing */
  threshold?: number;
}

/**
 * Fade + rise in when the element enters the viewport.
 *
 * ROBUST BY DEFAULT: renders fully VISIBLE; the hidden/animated state
 * (`.reveal`) is added by JS only after mount, so if JavaScript fails to run the
 * content still shows instead of staying invisible. A fail-safe timer reveals it
 * even if the observer never fires.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  threshold = 0.18,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add("reveal");
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
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);

    // Fail-safe: never leave it hidden.
    const t = window.setTimeout(reveal, 2200);

    return () => {
      observer.disconnect();
      window.clearTimeout(t);
    };
  }, [threshold]);

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

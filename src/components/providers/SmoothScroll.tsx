"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Global smooth-scroll provider.
 *
 * Drives Lenis from GSAP's ticker and syncs it with ScrollTrigger so that every
 * scroll-based animation (parallax, reveals) shares one authoritative RAF loop.
 * This is what gives the site its "award-winning" buttery feel.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.15,
      // natural ease-out curve
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      // GSAP ticker time is in seconds; Lenis expects ms.
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Expose for programmatic scrolling (e.g. nav anchor clicks).
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    // Smoothly scroll to in-page anchors (#work / #about / #contact). Links
    // that target a section NOT on the current page fall through to Next's
    // router (e.g. "/#work" clicked from a project detail page).
    const HEADER_OFFSET = -88;
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      const id = href.slice(hashIndex + 1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return; // section not on this page → let the router handle it
      e.preventDefault();
      lenis.scrollTo(target, { offset: HEADER_OFFSET });
      history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      (window as unknown as { lenis?: Lenis }).lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}

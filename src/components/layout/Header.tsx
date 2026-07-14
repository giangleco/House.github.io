"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { studio } from "@/data/projects";

const links = [
  { label: "Công trình", href: "/#work" },
  { label: "Giới thiệu", href: "/#about" },
  { label: "Liên hệ", href: "/#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-out-cubic ${
        scrolled
          ? "bg-ivory/80 backdrop-blur-md border-b border-concrete-100"
          : "bg-transparent"
      }`}
    >
      <div className="container-studio flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="font-serif text-lg tracking-[0.18em] md:text-xl"
        >
          {studio.name}
        </Link>

        <nav className="flex items-center gap-6 md:gap-10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative hidden text-[13px] tracking-wide text-concrete-500 transition-colors hover:text-ink sm:inline-block"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-500 ease-out-cubic group-hover:w-full" />
            </Link>
          ))}
          <a
            href={`mailto:${studio.email}`}
            className="text-[13px] tracking-wide text-accent hover:text-ink transition-colors sm:hidden"
          >
            Liên hệ
          </a>
        </nav>
      </div>
    </motion.header>
  );
}

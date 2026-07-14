"use client";

import { motion } from "framer-motion";

/**
 * App Router `template.tsx` re-mounts on every navigation, so Framer Motion's
 * mount animation doubles as a soft page transition — no hard reload flash when
 * moving between the home page and a project detail page.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

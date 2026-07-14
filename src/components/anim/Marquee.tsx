"use client";

/**
 * Seamless infinite marquee. The content is duplicated back-to-back and the
 * track translates -50%, so the loop is invisible. CSS animation (paused for
 * reduced-motion via globals.css).
 */
export default function Marquee({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  const sequence = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="marquee-track flex w-max whitespace-nowrap">
        {sequence.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-serif text-2xl italic md:text-4xl">
              {item}
            </span>
            <span className="mx-8 inline-block h-1.5 w-1.5 rounded-full bg-accent md:mx-12" />
          </span>
        ))}
      </div>
    </div>
  );
}

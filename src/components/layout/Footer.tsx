import Link from "next/link";
import { studio } from "@/data/projects";

export default function Footer() {
  return (
    <footer className="border-t border-concrete-100 bg-paper">
      <div className="container-studio flex flex-col gap-8 py-14 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-2xl tracking-[0.16em]">{studio.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-concrete-400">
            {studio.tagline}
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-concrete-500 md:items-end">
          <a
            href={`mailto:${studio.email}`}
            className="transition-colors hover:text-accent"
          >
            {studio.email}
          </a>
          <div className="flex gap-6">
            <Link
              href="/#work"
              prefetch={false}
              className="transition-colors hover:text-accent"
            >
              Công trình
            </Link>
            <Link
              href="/#about"
              prefetch={false}
              className="transition-colors hover:text-accent"
            >
              Giới thiệu
            </Link>
          </div>
          <p className="mt-4 text-xs text-concrete-300">
            © {studio.since}–{new Date().getFullYear()} {studio.owner}. Bản
            quyền được bảo lưu.
          </p>
          <p className="text-xs text-concrete-300">
            Thiết kế &amp; sở hữu bởi {studio.owner} · {studio.role}.
          </p>
        </div>
      </div>
    </footer>
  );
}

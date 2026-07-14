import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-ivory">
      <div className="container-studio">
        <p className="eyebrow mb-6">Lỗi 404</p>
        <h1 className="max-w-2xl text-5xl leading-tight md:text-7xl">
          Trang này chưa được{" "}
          <span className="italic text-accent">dựng nên</span>.
        </h1>
        <p className="mt-6 max-w-md text-concrete-500">
          Có lẽ công trình bạn tìm đã được dời đi, hoặc đường dẫn không còn đúng.
        </p>
        <Link
          href="/"
          className="group mt-10 inline-flex items-center gap-3 text-[12px] uppercase tracking-widest2 text-ink"
        >
          Về trang chủ
          <span className="inline-block h-px w-10 bg-accent transition-all duration-500 ease-out-cubic group-hover:w-16" />
        </Link>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Reveal from "@/components/anim/Reveal";
import { studio } from "@/data/projects";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-ink py-24 text-ivory md:scroll-mt-24 md:py-40"
    >
      <div className="container-studio grid grid-cols-1 gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <p className="eyebrow mb-6 text-concrete-300">Liên hệ</p>
            <h2 className="text-4xl leading-tight md:text-6xl">
              Hãy kể tôi nghe về khu đất của bạn.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <a
              href={`mailto:${studio.email}`}
              className="group mt-10 inline-flex items-center gap-3 text-lg text-ivory/80 transition-colors hover:text-accent"
            >
              {studio.email}
              <span className="h-px w-10 bg-accent transition-all duration-500 ease-out-cubic group-hover:w-16" />
            </a>
          </Reveal>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal delay={80}>
            {sent ? (
              <div className="flex h-full min-h-[280px] flex-col justify-center border-t border-concrete-500/40 pt-10">
                <p className="font-serif text-3xl italic text-accent">
                  Cảm ơn bạn.
                </p>
                <p className="mt-3 text-ivory/70">
                  Tôi sẽ phản hồi trong thời gian sớm nhất.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="space-y-8"
              >
                <Field label="Họ và tên" name="name" />
                <Field label="Email" name="email" type="email" />
                <Field label="Đôi lời về dự án" name="message" textarea />

                <button
                  type="submit"
                  className="group inline-flex items-center gap-3 text-[12px] uppercase tracking-widest2 text-ivory"
                >
                  Gửi lời nhắn
                  <span className="inline-block h-px w-10 bg-accent transition-all duration-500 ease-out-cubic group-hover:w-16" />
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) {
  const base =
    "peer w-full border-b border-concrete-500/40 bg-transparent py-3 text-ivory placeholder-transparent outline-none transition-colors focus:border-accent";
  return (
    <div className="relative">
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={3}
          required
          placeholder={label}
          className={base}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required
          placeholder={label}
          className={base}
        />
      )}
      <label
        htmlFor={name}
        className="pointer-events-none absolute left-0 top-3 text-concrete-300 transition-all duration-300 ease-out-cubic peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
    </div>
  );
}

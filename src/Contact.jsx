import { useState } from "react";
import { motion } from "framer-motion";

import PortfolioPageLayout, { Reveal } from "./components/PortfolioPageLayout";

const contactDetails = [
  {
    label: "Location",
    value: "Medan, Indonesia",
    note: "Based in North Sumatra",
    icon: "⌖",
  },
  {
    label: "Availability",
    value: "Open to work",
    note: "Open to collaboration",
    icon: "↗",
  },
];

export default function Contact() {
  const [notice, setNotice] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setNotice(
      "This form is a front-end preview. No message was sent because an email service has not been connected yet.",
    );
  };

  return (
    <PortfolioPageLayout
      number="04"
      label="Contact"
      title="Let's make"
      accent="something."
      description="Have an idea, a project, or an opportunity in mind? I’m open to connecting, collaborating, and exploring what we can build together."
    >
      <section className="grid items-start gap-8 lg:grid-cols-[0.82fr_1.18fr]">
        {/* LEFT COLUMN */}
        <div className="space-y-5">
          <Reveal>
            <div className="relative border border-yellow-400/60 bg-yellow-400 p-6 text-black sm:p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.22em] text-black/60">
                The next conversation
              </p>

              <h2 className="mt-5 text-4xl font-black uppercase leading-[0.88] tracking-[-0.06em] sm:text-5xl">
                Good ideas
                <span className="mt-2 block">start here.</span>
              </h2>

              <p className="mt-6 max-w-sm text-sm leading-7 text-black/70">
                Whether it&apos;s web development, an interface idea, or simply
                a chance to exchange thoughts, feel free to reach out.
              </p>

              <div className="mt-10 flex items-center justify-between border-t border-black/20 pt-4 text-[9px] font-black uppercase tracking-[0.18em] text-black/60">
                <span>Yazid / Contact</span>
                <span>04 — 04</span>
              </div>
            </div>
          </Reveal>

          {contactDetails.map((detail, index) => (
            <Reveal key={detail.label} delay={index * 0.08}>
              <article className="flex items-center gap-4 border border-white/15 bg-[#101010] p-5 transition-colors hover:border-yellow-400 sm:p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-yellow-400 text-xl font-black text-yellow-400">
                  {detail.icon}
                </span>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">
                    {detail.label}
                  </p>

                  <p className="mt-1 text-lg font-black uppercase tracking-tight text-white">
                    {detail.value}
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">{detail.note}</p>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal delay={0.16}>
            <a
              href="https://github.com/LilFloppa69"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between border border-white/20 bg-[#101010] p-5 transition-all hover:border-yellow-400 hover:bg-[#151515] sm:p-6"
            >
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">
                  Find me on
                </p>

                <p className="mt-1 text-lg font-black uppercase tracking-tight text-white transition-colors group-hover:text-yellow-400">
                  GitHub
                </p>

                <p className="mt-1 text-xs text-neutral-500">
                  github.com/LilFloppa69
                </p>
              </div>

              <span className="text-2xl text-yellow-400 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </Reveal>
        </div>

        {/* RIGHT COLUMN */}
        <Reveal delay={0.12}>
          <div className="relative">
            <div className="absolute -right-3 -top-3 h-full w-full border border-yellow-400/70" />

            <div className="relative border border-white/20 bg-[#101010] p-6 sm:p-9">
              <div className="mb-8 flex items-start justify-between gap-4 border-b border-white/15 pb-6">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.22em] text-yellow-400">
                    Start a conversation
                  </p>

                  <h2 className="mt-3 text-2xl font-black uppercase tracking-tight sm:text-3xl">
                    Send a note.
                  </h2>
                </div>

                <span className="border border-white/20 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-neutral-400">
                  Message / 01
                </span>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">
                      Your name
                    </span>

                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Name"
                      className="w-full border border-white/20 bg-black px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-yellow-400"
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">
                      Email address
                    </span>

                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="you@email.com"
                      className="w-full border border-white/20 bg-black px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-yellow-400"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">
                    Subject
                  </span>

                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="What would you like to discuss?"
                    className="w-full border border-white/20 bg-black px-4 py-3.5 text-sm text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-yellow-400"
                  />
                </label>

                <label className="flex flex-col gap-2">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400">
                    Your message
                  </span>

                  <textarea
                    name="message"
                    rows={6}
                    required
                    placeholder="Tell me a little about your idea..."
                    className="w-full resize-y border border-white/20 bg-black px-4 py-3.5 text-sm leading-7 text-white outline-none transition-colors placeholder:text-neutral-600 focus:border-yellow-400"
                  />
                </label>

                <button
                  type="submit"
                  className="group flex w-full items-center justify-between border border-yellow-400 bg-yellow-400 px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.18em] text-black transition-colors hover:border-white hover:bg-white"
                >
                  Preview submission
                  <span className="text-xl transition-transform group-hover:translate-x-1">
                    ↗
                  </span>
                </button>

                {notice && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="status"
                    className="border-l-2 border-yellow-400 bg-yellow-400/10 px-4 py-3 text-xs leading-6 text-neutral-300"
                  >
                    {notice}
                  </motion.p>
                )}

                <p className="text-[10px] leading-5 text-neutral-600">
                  Form preview only. Connect an email service or backend
                  endpoint before using this form to receive real messages.
                </p>
              </form>
            </div>
          </div>
        </Reveal>
      </section>
    </PortfolioPageLayout>
  );
}

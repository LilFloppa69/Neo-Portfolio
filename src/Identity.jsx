import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

import PortfolioPageLayout, {
  Reveal,
  SectionHeading,
} from "./components/PortfolioPageLayout";

const roles = ["Full Stack Developer", "Data Analyst", "UI/UX Designer"];

const focusAreas = [
  {
    number: "01",
    title: "Full Stack Development",
    description:
      "Building web experiences and exploring the MERN stack, from interface to application logic.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
  },
  {
    number: "02",
    title: "Data Analysis",
    description:
      "Exploring data, finding useful patterns, and turning information into clearer insights.",
    tags: ["Analysis", "Insights"],
  },
  {
    number: "03",
    title: "UI / UX Design",
    description:
      "Paying attention to how a digital product looks, feels, and works for the people using it.",
    tags: ["Interface", "Experience"],
  },
];

const skills = ["MongoDB", "Express", "React", "Node.js"];

export default function Identity() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <PortfolioPageLayout
      number="01"
      label="Identity"
      title="Beyond the"
      accent="code."
      description="A closer look at the person behind the pixels: my background, interests, technical focus, and the ideas I enjoy turning into digital experiences."
    >
      <section className="grid items-stretch gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <Reveal className="relative">
          <div className="absolute left-3 top-3 h-full w-full bg-yellow-400" />

          <article className="relative h-full border border-white/20 bg-[#101010] p-6 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-yellow-400">
                Personal file / 001
              </p>

              <span className="border border-yellow-400/70 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-yellow-400">
                Open to work
              </span>
            </div>

            <h2 className="mt-7 text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-5xl">
              Yazid Chairy
              <span className="mt-2 block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.75)]">
                Syahputra Nasution
              </span>
            </h2>

            <div className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold uppercase tracking-[0.12em] sm:text-sm">
              <span className="text-neutral-500">Currently exploring /</span>

              <span className="relative inline-flex h-6 min-w-[190px] items-center overflow-hidden text-yellow-400">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={roleIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="absolute whitespace-nowrap"
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </div>

            <p className="mt-7 max-w-2xl text-sm leading-8 text-neutral-300 sm:text-base">
              A Fresh Graduate from University of North Sumatra. A Full Stack
              Web Developer who&apos;s focusing on MERN Stack. Open to
              Collaborate with anyone.
            </p>

            <div className="mt-8 grid gap-5 border-y border-white/15 py-6 sm:grid-cols-3">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">
                  Education
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-white">
                  University of North Sumatra
                </p>
              </div>

              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">
                  Main focus
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-white">
                  MERN Stack
                </p>
              </div>

              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">
                  Based in
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-white">
                  Medan, Indonesia
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="border border-white/30 px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-neutral-200 transition-colors hover:border-yellow-400 hover:text-yellow-400"
                >
                  {skill}
                </span>
              ))}
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.12} className="relative">
          <div className="absolute -right-3 -top-3 h-full w-full border border-yellow-400/70 sm:-right-4 sm:-top-4" />

          <div className="relative h-full min-h-[430px] overflow-hidden border-[3px] border-white bg-neutral-900 sm:min-h-[560px]">
            <img
              src="/Images/profil.jpeg"
              alt="Portrait of Yazid Chairy Syahputra Nasution"
              className="absolute inset-0 h-full w-full object-cover object-center grayscale transition duration-700 hover:scale-[1.03] hover:grayscale-0"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-yellow-400">
                The person behind the pixels
              </p>

              <p className="mt-2 text-3xl font-black uppercase tracking-tight sm:text-4xl">
                Yazid C. S. N.
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-white/25 pt-4 text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-300">
                <span>Medan, Indonesia</span>
                <span>Fig. 01</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mt-24 sm:mt-32">
        <Reveal>
          <SectionHeading
            number="02"
            label="Areas of interest"
            title="What I"
            accent="explore."
            description="A few areas that shape my curiosity and the kind of digital work I enjoy exploring."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {focusAreas.map((area, index) => (
            <Reveal key={area.number} delay={index * 0.08}>
              <article className="group flex h-full min-h-[300px] flex-col border border-white/20 bg-[#101010] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:bg-[#141414] sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-yellow-400">
                    /{area.number}
                  </span>
                  <span className="text-xl text-neutral-600 transition-colors group-hover:text-yellow-400">
                    ↗
                  </span>
                </div>

                <h3 className="mt-14 text-2xl font-black uppercase leading-tight tracking-tight sm:text-3xl">
                  {area.title}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-7 text-neutral-400">
                  {area.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                  {area.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/20 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="mt-16">
        <Link
          to="/portfolio"
          className="group flex flex-col justify-between gap-5 border border-white/20 bg-yellow-400 p-6 text-black transition-colors hover:bg-white sm:flex-row sm:items-center sm:p-8"
        >
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/60">
              Continue exploring
            </p>
            <p className="mt-2 text-2xl font-black uppercase tracking-tight sm:text-3xl">
              See what I&apos;ve built.
            </p>
          </div>

          <span className="text-3xl transition-transform group-hover:translate-x-2">
            →
          </span>
        </Link>
      </Reveal>
    </PortfolioPageLayout>
  );
}

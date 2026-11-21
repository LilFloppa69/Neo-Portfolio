import { useEffect, useRef, useState } from "react";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import { Link } from "react-router-dom";
import SignatureReveal from "./components/SignatureReveal";

const ease = [0.22, 1, 0.36, 1];

const quickLinks = [
  { label: "Identity", path: "/identity", number: "01" },
  { label: "Portfolio", path: "/portfolio", number: "02" },
  { label: "Certificates", path: "/certificate", number: "03" },
  { label: "Contact", path: "/contact", number: "04" },
];

const focusAreas = [
  {
    number: "01",
    title: "Web development",
    description:
      "Most of my hands-on work is in React and the MERN stack — building interfaces, connecting application logic, and working with data.",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    number: "02",
    title: "Data & analysis",
    description:
      "I enjoy organising information, exploring datasets, and looking for patterns that make the numbers easier to understand.",
    tags: [
      "MySQL",
      "Python",
      "Analysis",
      "Google Colab",
      "Jupyter Notebook",
      "Excel",
    ],
  },
  {
    number: "03",
    title: "Interface design",
    description:
      "I pay attention to hierarchy, navigation, and the small interaction details that make an application easier to use.",
    tags: ["Interface", "UX", "Interaction", "Figma"],
  },
];

const featuredProjects = [
  {
    number: "01",
    title: "Gamified LMS",
    category: "Full-stack · Learning platform",
    description:
      "A learning management system that uses gamification to make lessons and student progress more engaging.",
    image: "/Images/ClassHub.png",
    alt: "ClassHub learning management system preview",
  },
  {
    number: "02",
    title: "Klinik Nakita",
    category: "Frontend · Laravel Livewire",
    description:
      "An ERM website for Klinik Nakita, built with Laravel Livewire and Tailwind CSS.",
    image: "/Images/Klinik Nakita.png",
    alt: "Klinik Nakita website preview",
  },
  {
    number: "03",
    title: "Expense Tracker",
    category: "Web application · React",
    description:
      "A React application for keeping budgets and day-to-day expenses organised.",
    image: "/Images/Expense Tracker.png",
    alt: "Expense Tracker application preview",
  },
];

/* -------------------------------------------------------
   ICON
------------------------------------------------------- */

function ArrowIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

/* -------------------------------------------------------
   SECTION LABEL
------------------------------------------------------- */

function SectionEyebrow({ number, children }) {
  return (
    <div className="mb-6 flex items-center gap-3 text-[10px] font-medium tracking-[0.14em] text-neutral-500 md:text-[11px]">
      <span className="font-mono text-yellow-400">{number}</span>

      <span className="h-px w-7 bg-white/20" />

      <span>{children}</span>
    </div>
  );
}

/* -------------------------------------------------------
   DIRECTIONAL SCROLL REVEAL

   DOWN:
   Enter from bottom -> visible -> exit upward.

   UP:
   Enter from top -> visible -> exit downward.

   Every component can repeat its animation.
------------------------------------------------------- */

function Reveal({
  children,
  className = "",
  delay = 0,
  distance = 28,
  ...props
}) {
  const ref = useRef(null);
  const wasInView = useRef(false);
  const direction = useRef("down");

  const { scrollY } = useScroll();

  const isInView = useInView(ref, {
    once: false,
    amount: 0.12,
    margin: "-8% 0px -8% 0px",
  });

  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState("hiddenBottom");

  // Detect current scroll direction without triggering
  // React renders on every scroll frame.
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    if (previous === undefined) return;

    const delta = latest - previous;

    if (Math.abs(delta) > 0.5) {
      direction.current = delta > 0 ? "down" : "up";
    }
  });

  // Enter and exit according to scroll direction.
  useEffect(() => {
    if (isInView && !wasInView.current) {
      setPhase("visible");
    } else if (!isInView && wasInView.current) {
      setPhase(direction.current === "down" ? "hiddenTop" : "hiddenBottom");
    }

    wasInView.current = isInView;
  }, [isInView]);

  const variants = {
    hiddenBottom: reduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: distance,
          filter: "blur(2px)",
        },

    hiddenTop: reduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: -distance,
          filter: "blur(2px)",
        },

    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hiddenBottom"
      animate={phase}
      variants={variants}
      transition={{
        duration: reduceMotion ? 0.15 : 0.62,
        delay: phase === "visible" ? delay : 0,
        ease,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------
   HOME
------------------------------------------------------- */

export default function Home() {
  const { scrollY, scrollYProgress } = useScroll();

  const heroSequenceRef = useRef(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSequenceRef,
    offset: ["start start", "end end"],
  });

  const [showQuickNav, setShowQuickNav] = useState(false);

  /* HERO SCROLL TRANSITIONS */

  const heroTopY = useTransform(heroProgress, [0, 0.34], [0, -18]);

  const heroTopScale = useTransform(heroProgress, [0, 0.34], [1, 0.78]);

  const heroTopOpacity = useTransform(heroProgress, [0, 0.34], [1, 0.76]);

  const heroBottomY = useTransform(heroProgress, [0, 0.34], [0, 18]);

  const heroBottomScale = useTransform(heroProgress, [0, 0.34], [1, 0.78]);

  const heroBottomOpacity = useTransform(heroProgress, [0, 0.34], [1, 0.62]);

  const heroMainY = useTransform(heroProgress, [0, 0.4], [0, -24]);

  const heroMainScale = useTransform(heroProgress, [0, 0.4], [1, 0.82]);

  const heroMainOpacity = useTransform(heroProgress, [0.08, 0.4], [1, 0.07]);

  const heroImageY = useTransform(heroProgress, [0, 0.42], [0, 55]);

  /* SIGNATURE */

  const signatureProgress = useTransform(heroProgress, [0.22, 0.56], [0, 1]);

  const signatureDotOpacity = useTransform(heroProgress, [0.58, 0.62], [0, 1]);

  const signatureOpacity = useTransform(
    heroProgress,
    [0.16, 0.25, 0.62, 1],
    [0, 1, 1, 1],
  );

  const signatureScale = useTransform(heroProgress, [0.18, 0.56], [0.92, 1]);

  /* FLOATING NAVIGATION */

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowQuickNav(latest > window.innerHeight * 2.05);
  });

  /* SCROLL BUTTON */

  const scrollToIntro = () => {
    if (!heroSequenceRef.current) return;

    const sequenceTop =
      heroSequenceRef.current.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: sequenceTop + window.innerHeight * 0.72,
      behavior: "smooth",
    });
  };

  return (
    <main className="relative w-full overflow-clip bg-[#080808] text-white">
      {/* SCROLL PROGRESS */}

      <motion.div
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-yellow-400"
        style={{ scaleX: scrollYProgress }}
      />

      {/* FLOATING NAVIGATION */}

      <AnimatePresence>
        {showQuickNav && (
          <motion.nav
            aria-label="Quick navigation"
            initial={{
              opacity: 0,
              y: 24,
              x: "-50%",
            }}
            animate={{
              opacity: 1,
              y: 0,
              x: "-50%",
            }}
            exit={{
              opacity: 0,
              y: 18,
              x: "-50%",
            }}
            transition={{
              duration: 0.35,
              ease,
            }}
            className="fixed bottom-5 left-1/2 z-[60] flex max-w-[calc(100vw-24px)] items-center gap-1 overflow-x-auto border border-white/15 bg-[#111]/90 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl md:bottom-7 md:gap-2 md:p-2"
          >
            {quickLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex shrink-0 items-center gap-2 px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] text-neutral-300 transition-colors hover:bg-yellow-400 hover:text-black md:px-4 md:text-[11px]"
              >
                <span className="text-yellow-400">{item.number}</span>

                {item.label}
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ================================================
          HERO
      ================================================ */}

      <section ref={heroSequenceRef} className="relative h-[220svh]">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden px-5 pb-5 pt-4 sm:px-8 sm:pb-10 sm:pt-6 md:px-12 lg:px-[7vw]">
          {/* BACKGROUND */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 top-10 h-[500px] w-[500px] rounded-full bg-yellow-400/[0.045] blur-[150px]" />

            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* HEADER */}

          <motion.header
            style={{
              y: heroTopY,
              scale: heroTopScale,
              opacity: heroTopOpacity,
            }}
            className="relative z-30 flex origin-top items-center justify-between border-b border-white/15 pb-5"
          >
            <Link
              to="/"
              className="group flex items-center gap-3"
              aria-label="Go to homepage"
            >
              <span className="flex h-9 w-9 items-center justify-center border-2 border-yellow-400 text-sm font-black text-yellow-400 transition-colors group-hover:bg-yellow-400 group-hover:text-black">
                Y.
              </span>

              <span className="text-xs font-black uppercase tracking-[0.2em] text-white">
                Yazid<span className="text-yellow-400">.</span>Nasution
              </span>
            </Link>

            <div className="hidden items-center gap-2 text-[11px] font-medium tracking-wide text-neutral-400 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
              Open to work · Medan, Indonesia
            </div>

            <Link
              to="/contact"
              className="border border-white/35 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] transition-all hover:border-yellow-400 hover:bg-yellow-400 hover:text-black sm:px-4 sm:text-[11px]"
            >
              Let&apos;s talk <span className="ml-1 text-yellow-400">↗</span>
            </Link>
          </motion.header>

          {/* MAIN HERO */}

          <motion.div
            style={{
              y: heroMainY,
              scale: heroMainScale,
              opacity: heroMainOpacity,
            }}
            className="relative z-10 grid flex-1 origin-center items-center gap-6 py-5 sm:gap-10 sm:py-10 md:grid-cols-[1.25fr_0.75fr] md:gap-8 lg:py-10"
          >
            <motion.div className="relative z-10">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease }}
                className="mb-6 text-[11px] font-medium tracking-wide text-neutral-400 sm:text-xs"
              >
                A place for what I've been learning and building.
              </motion.p>

              <motion.h1
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.09,
                      delayChildren: 0.14,
                    },
                  },
                }}
                className="max-w-[1050px] text-[clamp(3.15rem,8.4vw,8.3rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-[#F0EEE8]"
              >
                {["Yazid Chairy", "Syahputra", "Nasution."].map(
                  (line, index) => (
                    <motion.span
                      key={line}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 36,
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.7,
                            ease,
                          },
                        },
                      }}
                      className={`block ${
                        index === 1
                          ? "mt-1 font-editorial text-[1.04em] italic font-normal tracking-[-0.055em]"
                          : index === 2
                            ? "mt-1 text-yellow-400"
                            : ""
                      }`}
                    >
                      {line}
                    </motion.span>
                  ),
                )}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.75, ease }}
                className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
              >
                <div>
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-[#F0EEE8] sm:text-base">
                      Full-stack developer
                    </p>

                    <p className="mt-2 max-w-md text-sm leading-7 text-neutral-400">
                      I spend most of my time building web apps, working with
                      data, and figuring out how to make things easier to use.
                      (and do a little trolling)
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={scrollToIntro}
                  className="group inline-flex w-fit items-center gap-3 border-b-2 border-yellow-400 pb-2 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:text-yellow-400"
                >
                  Click to Explore
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-yellow-400 text-yellow-400 transition-transform group-hover:translate-y-1">
                    ↓
                  </span>
                </button>
              </motion.div>
            </motion.div>

            {/* PORTRAIT */}

            <motion.div
              style={{ y: heroImageY }}
              initial={{
                opacity: 0,
                scale: 0.92,
                rotate: 3,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{ duration: 1, delay: 0.35, ease }}
              className="group relative mx-auto w-full max-w-[220px] sm:max-w-[300px] md:ml-auto md:mr-0 md:mt-8 md:max-w-[390px]"
            >
              <div className="absolute -right-3 -top-3 h-full w-full border border-yellow-400/70 sm:-right-5 sm:-top-5" />

              <div className="relative aspect-[4/5] overflow-hidden border border-white/25 bg-neutral-900">
                {" "}
                <img
                  src="/Images/profil.jpeg"
                  alt="Portrait of Yazid Chairy Syahputra Nasution"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-5 pt-20">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-yellow-400">
                    Yep that's me
                  </p>

                  <p className="mt-1 text-xl font-black uppercase tracking-tight">
                    Yazid C. S. N.
                  </p>
                </div>
              </div>

              <div className="absolute -bottom-10 -left-5 hidden border border-white/20 bg-[#111] px-4 py-3 sm:block">
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                  Currently based
                </p>

                <p className="mt-1 text-xs font-black uppercase tracking-wider">
                  Medan, Indonesia
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* BOTTOM RAIL */}

          <motion.div
            style={{
              y: heroBottomY,
              scale: heroBottomScale,
              opacity: heroBottomOpacity,
            }}
            className="relative z-30 flex origin-bottom items-center justify-between border-t border-white/15 pt-4 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500 sm:text-[10px]"
          >
            <span>Developer · Analyst · Designer</span>

            <span className="flex items-center gap-2">
              Hit the road dude <span className="text-yellow-400">↓</span>
            </span>

            <span className="hidden sm:block">01 / 04</span>
          </motion.div>

          {/* SIGNATURE */}

          <SignatureReveal
            progress={signatureProgress}
            dotOpacity={signatureDotOpacity}
            opacity={signatureOpacity}
            scale={signatureScale}
          />
        </div>
      </section>

      {/* ================================================
          01 — IDENTITY
      ================================================ */}

      <section
        id="intro"
        className="relative scroll-mt-8 border-y border-white/10 bg-[#101010] px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-[7vw]"
      >
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          {/* INTRODUCTION */}

          <Reveal>
            <SectionEyebrow number="01">A little about me</SectionEyebrow>

            <h2 className="max-w-xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl md:text-7xl">
              So, who
              <span className="block font-editorial italic font-normal text-yellow-400">
                am I?
              </span>
            </h2>

            <p className="mt-7 max-w-sm text-sm leading-8 text-neutral-400">
              I'm a fresh graduate from the University of North Sumatra, focused
              on full-stack web development.
            </p>

            <Link
              to="/identity"
              className="group mt-8 inline-flex items-center gap-3 border-b border-white/40 pb-2 text-sm font-medium text-white transition-colors hover:border-yellow-400 hover:text-yellow-400"
            >
              A little more about me
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Reveal>

          {/* PERSONAL STATEMENT */}

          <Reveal delay={0.12} distance={30} className="relative lg:pl-10">
            <div className="border-l border-yellow-400/60 pl-6 sm:pl-8">
              <p className="max-w-2xl text-xl leading-[1.65] tracking-[-0.025em] text-neutral-200 sm:text-2xl md:text-3xl">
                I like understanding how the pieces of a product fit together —
                from the interface people use to the logic and data behind it.
              </p>

              <p className="mt-7 max-w-xl text-sm leading-8 text-neutral-400 sm:text-base">
                Most of my hands-on work has been with React, Node.js, MongoDB,
                and other web technologies. I'm still learning, building, and
                getting better with every project.
              </p>
            </div>

            <div className="mt-10 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-medium tracking-wide text-neutral-500">
                  Currently based
                </p>

                <p className="mt-2 text-sm font-medium text-neutral-200">
                  Medan, Indonesia
                </p>
              </div>

              <div>
                <p className="text-[10px] font-medium tracking-wide text-neutral-500">
                  Working with
                </p>

                <p className="mt-2 text-sm font-medium text-neutral-200">
                  React · Node.js · MongoDB
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================
          02 — AREAS OF INTEREST
      ================================================ */}

      <section className="relative px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-[7vw]">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-12 grid gap-7 md:mb-16 md:grid-cols-[1.1fr_0.9fr] md:items-end">
            <div>
              <SectionEyebrow number="02">What I keep exploring</SectionEyebrow>

              <h2 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] sm:text-6xl md:text-7xl">
                Things I like
                <span className="block font-editorial italic font-normal text-yellow-400">
                  working on.
                </span>
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-8 text-neutral-400">
              These are the parts of building digital products I keep finding
              myself drawn to.
            </p>
          </Reveal>

          <div className="border-t border-white/15">
            {focusAreas.map((area, index) => (
              <Reveal key={area.number} delay={index * 0.08} distance={24}>
                <article className="grid gap-4 border-b border-white/10 py-7 md:grid-cols-[72px_0.9fr_1.1fr] md:items-start md:gap-8 md:py-10">
                  <span className="font-mono text-xs text-yellow-400">
                    /{area.number}
                  </span>

                  <h3 className="text-2xl font-medium tracking-tight text-[#F0EEE8] sm:text-3xl">
                    {area.title}
                  </h3>

                  <div>
                    <p className="max-w-xl text-sm leading-8 text-neutral-400 sm:text-base">
                      {area.description}
                    </p>

                    <p className="mt-4 text-[10px] font-medium tracking-wide text-neutral-500">
                      {area.tags.join("  ·  ")}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          03 — SELECTED WORK
      ================================================ */}

      <section className="relative border-y border-white/10 bg-[#101010] px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-[7vw]">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <div>
              <SectionEyebrow number="03">Selected work</SectionEyebrow>

              <h2 className="text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl md:text-7xl">
                A few things
                <span className="block text-yellow-400">I&apos;ve built.</span>
              </h2>
            </div>

            <Link
              to="/portfolio"
              className="group inline-flex w-fit items-center gap-3 border-b border-white pb-3 text-xs font-black uppercase tracking-[0.18em] transition-colors hover:border-yellow-400 hover:text-yellow-400"
            >
              View all projects
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.number} delay={index * 0.1} distance={58}>
                <Link to="/portfolio" className="group block h-full">
                  <article className="h-full border border-white/20 bg-[#080808] transition-all duration-300 group-hover:-translate-y-2 group-hover:border-yellow-400">
                    <div className="relative aspect-[5/3] overflow-hidden border-b border-white/15 bg-neutral-900">
                      <img
                        src={project.image}
                        alt={project.alt}
                        loading="lazy"
                        className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                      />

                      <span className="absolute left-4 top-4 border border-white/40 bg-black/75 px-2.5 py-1.5 text-[9px] font-black tracking-[0.16em] text-white">
                        {project.number}
                      </span>

                      <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center border border-white/60 bg-black/70 text-white transition-colors group-hover:border-yellow-400 group-hover:bg-yellow-400 group-hover:text-black">
                        <ArrowIcon />
                      </span>
                    </div>

                    <div className="p-6">
                      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-400">
                        {project.category}
                      </p>

                      <h3 className="mt-3 text-2xl font-black uppercase tracking-tight">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-neutral-400">
                        {project.description}
                      </p>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          04 — KEEP EXPLORING
      ================================================ */}

      <section className="relative px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-[7vw]">
        <div className="mx-auto max-w-[1440px]">
          <Reveal>
            <SectionEyebrow number="04">Keep exploring</SectionEyebrow>

            <div className="flex flex-col justify-between gap-6 border-b border-white/20 pb-10 md:flex-row md:items-end">
              <h2 className="max-w-3xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl md:text-8xl">
                Where to
                <span className="text-yellow-400"> next?</span>
              </h2>

              <p className="max-w-xs text-sm leading-7 text-neutral-400">
                Choose a section and take a closer look around my work and
                background.
              </p>
            </div>
          </Reveal>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {quickLinks.map((item, index) => (
              <Reveal key={item.path} delay={index * 0.08} distance={40}>
                <Link
                  to={item.path}
                  className="group flex items-center justify-between border border-white/20 bg-[#101010] p-5 transition-all duration-300 hover:border-yellow-400 hover:bg-yellow-400 hover:text-black sm:p-7"
                >
                  <div className="flex items-center gap-5 sm:gap-7">
                    <span className="text-xs font-black text-yellow-400 transition-colors group-hover:text-black">
                      {item.number}
                    </span>

                    <span className="text-xl font-black uppercase tracking-tight sm:text-2xl">
                      {item.label}
                    </span>
                  </div>

                  <ArrowIcon className="h-5 w-5 text-neutral-500 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-black" />
                </Link>
              </Reveal>
            ))}
          </div>

          {/* FOOTER */}

          <Reveal
            delay={0.08}
            className="mt-20 flex flex-col justify-between gap-6 border-t border-white/15 pt-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500 sm:flex-row sm:items-center sm:text-[10px]"
          >
            <span>© 2026 Yazid Chairy Syahputra Nasution</span>

            <span>
              Designed with curiosity · Built with intention · And also we do a
              little trolling
            </span>

            <Link
              to="/contact"
              className="w-fit text-white transition-colors hover:text-yellow-400"
            >
              Get in touch ↗
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

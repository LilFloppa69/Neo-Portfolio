import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
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

const featuredProjects = [
  {
    number: "01",
    title: "Gamified LMS",
    category: "FULL-STACK DEVELOPMENT",
    description:
      "A Learning Management System with gamification to motivate and attract more students.",
    image: "/Images/ClassHub.png",
    alt: "ClassHub learning management system preview",
  },
  {
    number: "02",
    title: "Klinik Nakita",
    category: "FRONTEND DEVELOPMENT",
    description:
      "A modern ERM website built with Laravel Livewire and Tailwind CSS.",
    image: "/Images/Klinik Nakita.png",
    alt: "Klinik Nakita website preview",
  },
  {
    number: "03",
    title: "Expense Tracker",
    category: "WEB APPLICATION",
    description:
      "An application to track budgets and expenses, built with React.",
    image: "/Images/Expense Tracker.png",
    alt: "Expense Tracker application preview",
  },
];

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

function SectionEyebrow({ number, children }) {
  return (
    <div className="mb-7 flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.24em] text-neutral-400 md:text-xs">
      <span className="text-yellow-400">{number}</span>
      <span className="h-px w-9 bg-neutral-700" />
      <span>{children}</span>
    </div>
  );
}

function Reveal({ children, className = "", delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 42 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  const heroSequenceRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroSequenceRef,
    offset: ["start start", "end end"],
  });
  const [showQuickNav, setShowQuickNav] = useState(false);

  // The hero stays pinned while its top/bottom rails minimize and the signature
  // is progressively drawn by the user's scroll position.
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

  const signatureProgress = useTransform(heroProgress, [0.22, 0.56], [0, 1]);

  const signatureDotOpacity = useTransform(heroProgress, [0.58, 0.62], [0, 1]);

  const signatureOpacity = useTransform(
    heroProgress,
    [0.16, 0.25, 0.62, 1],
    [0, 1, 1, 1],
  );

  const signatureScale = useTransform(heroProgress, [0.18, 0.62], [0.92, 1]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowQuickNav(latest > window.innerHeight * 2.05);
  });

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
      {/* Scroll progress */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[70] h-[3px] origin-left bg-yellow-400"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Compact floating navigation appears after the hero */}
      <AnimatePresence>
        {showQuickNav && (
          <motion.nav
            aria-label="Quick navigation"
            initial={{ opacity: 0, y: 24, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 18, x: "-50%" }}
            transition={{ duration: 0.35, ease }}
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

      {/* HERO */}
      <section ref={heroSequenceRef} className="relative h-[220svh]">
        <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden px-5 pb-5 pt-4 sm:px-8 sm:pb-10 sm:pt-6 md:px-12 lg:px-[7vw]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-32 top-24 h-[420px] w-[420px] rounded-full bg-yellow-400/[0.07] blur-[120px]" />
            <div className="absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-white/[0.035] blur-[110px]" />
            <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:72px_72px]" />
          </div>

          <motion.header
            style={{
              y: heroTopY,
              scale: heroTopScale,
              opacity: heroTopOpacity,
            }}
            className="relative z-30 origin-top flex items-center justify-between border-b border-white/15 pb-5"
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
                Yazid<span className="text-yellow-400">.</span>Portfolio
              </span>
            </Link>
            <div className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 sm:flex">
              <span className="h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
              Open to work · Medan, ID
            </div>
            <Link
              to="/contact"
              className="border border-white/35 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] transition-all hover:border-yellow-400 hover:bg-yellow-400 hover:text-black sm:px-4 sm:text-[11px]"
            >
              Let&apos;s talk <span className="ml-1 text-yellow-400">↗</span>
            </Link>
          </motion.header>

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
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease }}
                className="mb-6 text-[10px] font-black uppercase tracking-[0.3em] text-yellow-400 sm:text-xs"
              >
                Personal portfolio · 2026
              </motion.p>

              <motion.h1
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.12, delayChildren: 0.18 },
                  },
                }}
                className="max-w-[1050px] text-[clamp(3.25rem,8.8vw,8.8rem)] font-black uppercase leading-[0.82] tracking-[-0.075em]"
              >
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 70, skewY: 5 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      skewY: 0,
                      transition: { duration: 0.8, ease },
                    },
                  }}
                  className="block"
                >
                  Yazid Chairy
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 70, skewY: 5 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      skewY: 0,
                      transition: { duration: 0.8, ease },
                    },
                  }}
                  className="mt-2 block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.78)] sm:[-webkit-text-stroke:2px_rgba(255,255,255,0.78)]"
                >
                  Syahputra
                </motion.span>
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: 70, skewY: 5 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      skewY: 0,
                      transition: { duration: 0.8, ease },
                    },
                  }}
                  className="mt-2 block text-yellow-400"
                >
                  Nasution.
                </motion.span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.75, ease }}
                className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
              >
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-white sm:text-base">
                    Full Stack Developer
                  </p>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-400">
                    I build digital experiences through code, thoughtful design,
                    and curiosity.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={scrollToIntro}
                  className="group inline-flex w-fit items-center gap-3 border-b-2 border-yellow-400 pb-2 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-colors hover:text-yellow-400"
                >
                  Explore the site
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-yellow-400 text-yellow-400 transition-transform group-hover:translate-y-1">
                    ↓
                  </span>
                </button>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ y: heroImageY }}
              initial={{ opacity: 0, scale: 0.92, rotate: 3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.35, ease }}
              className="relative mx-auto w-full max-w-[220px] sm:max-w-[300px] md:ml-auto md:mr-0 md:mt-8 md:max-w-[390px]"
            >
              <div className="absolute -right-3 -top-3 h-full w-full border border-yellow-400/70 sm:-right-5 sm:-top-5" />
              <div className="relative aspect-[4/5] overflow-hidden border-[3px] border-white bg-neutral-900 shadow-[10px_10px_0_0_#facc15] sm:shadow-[16px_16px_0_0_#facc15]">
                <img
                  src="/Images/profil.jpeg"
                  alt="Portrait of Yazid Chairy Syahputra Nasution"
                  className="h-full w-full object-cover object-center grayscale transition duration-700 hover:scale-105 hover:grayscale-0"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent p-5 pt-20">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-yellow-400">
                    The person behind the pixels
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
              <span className="absolute -right-5 top-10 hidden rotate-90 text-[9px] font-black uppercase tracking-[0.35em] text-neutral-500 lg:block">
                Scroll to explore —
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            style={{
              y: heroBottomY,
              scale: heroBottomScale,
              opacity: heroBottomOpacity,
            }}
            className="relative z-30 origin-bottom flex items-center justify-between border-t border-white/15 pt-4 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500 sm:text-[10px]"
          >
            <span>Developer · Analyst · Designer</span>
            <span className="flex items-center gap-2">
              Scroll to discover <span className="text-yellow-400">↓</span>
            </span>
            <span className="hidden sm:block">01 / 04</span>
          </motion.div>

          <SignatureReveal
            progress={signatureProgress}
            dotOpacity={signatureDotOpacity}
            opacity={signatureOpacity}
            scale={signatureScale}
          />
        </div>
      </section>

      {/* IDENTITY PREVIEW */}
      <section
        id="intro"
        className="relative scroll-mt-8 border-y border-white/10 bg-[#101010] px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-[7vw]"
      >
        <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <Reveal>
            <SectionEyebrow number="01">A little introduction</SectionEyebrow>
            <h2 className="max-w-xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl md:text-7xl">
              More than
              <span className="block text-yellow-400">just a title.</span>
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-7 text-neutral-400">
              A quick look at who I am, what I explore, and the way I approach
              building digital products.
            </p>
            <Link
              to="/identity"
              className="group mt-8 inline-flex items-center gap-4 border-b-2 border-white pb-3 text-xs font-black uppercase tracking-[0.18em] transition-colors hover:border-yellow-400 hover:text-yellow-400"
            >
              Read my full identity
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Reveal>

          <Reveal delay={0.12} className="relative">
            <div className="absolute -left-3 -top-3 h-full w-full border border-yellow-400/70 sm:-left-4 sm:-top-4" />
            <div className="relative border border-white/20 bg-[#080808] p-6 sm:p-9 md:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/15 pb-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-yellow-400">
                    Identity snapshot
                  </p>
                  <h3 className="mt-3 text-2xl font-black uppercase tracking-tight sm:text-3xl">
                    Yazid Chairy Syahputra Nasution
                  </h3>
                </div>
                <span className="border border-yellow-400 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-yellow-400">
                  Open to work
                </span>
              </div>

              <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-300 sm:text-lg">
                A fresh graduate from the University of North Sumatra and a Full
                Stack Web Developer focusing on the MERN stack. Open to
                collaborate and explore ideas with others.
              </p>

              <div className="mt-8 grid gap-5 border-t border-white/15 pt-6 sm:grid-cols-2">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">
                    Based in
                  </p>
                  <p className="mt-2 text-sm font-bold text-white">
                    Medan, Indonesia
                  </p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">
                    Primary focus
                  </p>
                  <p className="mt-2 text-sm font-bold text-white">
                    Full Stack Web Development
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-2">
                {["MongoDB", "Express", "React", "Node.js"].map((skill) => (
                  <span
                    key={skill}
                    className="border border-white/35 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-neutral-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* AREAS OF INTEREST */}
      <section className="relative px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-[7vw]">
        <div className="mx-auto max-w-[1440px]">
          <Reveal className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <div>
              <SectionEyebrow number="02">What I explore</SectionEyebrow>
              <h2 className="max-w-3xl text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-6xl md:text-7xl">
                Ideas into
                <span className="text-yellow-400"> experiences.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-7 text-neutral-400">
              A few areas that shape my curiosity and the kind of digital work I
              enjoy exploring.
            </p>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {focusAreas.map((area, index) => (
              <Reveal key={area.number} delay={index * 0.1}>
                <article className="group flex h-full min-h-[300px] flex-col border border-white/20 bg-[#101010] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400 hover:bg-[#151515] sm:p-8">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-yellow-400">
                      /{area.number}
                    </span>
                    <ArrowIcon className="h-5 w-5 text-neutral-600 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-yellow-400" />
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
        </div>
      </section>

      {/* SELECTED WORK */}
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
              View all projects{" "}
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.number} delay={index * 0.1}>
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

      {/* EXPLORE MORE / NAVIGATION */}
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
              <Reveal key={item.path} delay={index * 0.08}>
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

          <Reveal className="mt-20 flex flex-col justify-between gap-6 border-t border-white/15 pt-6 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500 sm:flex-row sm:items-center sm:text-[10px]">
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

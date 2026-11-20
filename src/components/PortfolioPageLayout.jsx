import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const pageLinks = [
  { number: "01", label: "Identity", path: "/identity" },
  { number: "02", label: "Portfolio", path: "/portfolio" },
  { number: "03", label: "Certificates", path: "/certificate" },
  { number: "04", label: "Contact", path: "/contact" },
];

const ease = [0.22, 1, 0.36, 1];

/* -------------------------------------------------------
   DYNAMIC ISLAND NAVIGATION

   IDLE:
   Small floating pill with a jumping yellow dot.

   HOVER:
   Activates within a wide invisible proximity area.

   EXPANDED:
   Four navigation links appear with spring animation.

   MOBILE:
   Tap the dot to toggle navigation.
------------------------------------------------------- */

function DynamicIslandNav({ activePath }) {
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();

  const closeIfFocusLeaves = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setExpanded(false);
    }
  };

  return (
    <div
      className="fixed left-1/2 top-0 z-[100] flex h-[105px] w-[520px] max-w-[calc(100vw-16px)] -translate-x-1/2 justify-center pt-3"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onFocusCapture={() => setExpanded(true)}
      onBlurCapture={closeIfFocusLeaves}
    >
      <motion.nav
        layout
        aria-label="Main navigation"
        transition={{
          layout: {
            type: "spring",
            stiffness: 420,
            damping: 34,
            mass: 0.8,
          },
        }}
        className={`relative flex h-[52px] max-w-full items-center justify-center overflow-hidden rounded-full border border-white/15 bg-[#101010]/95 shadow-[0_12px_45px_rgba(0,0,0,0.55)] backdrop-blur-2xl ${
          expanded ? "w-fit gap-1 px-2" : "w-[68px] px-1"
        }`}
      >
        {/* ANIMATED DOT / ISLAND TRIGGER */}

        <motion.button
          type="button"
          aria-label={expanded ? "Collapse navigation" : "Expand navigation"}
          aria-expanded={expanded}
          aria-controls="dynamic-island-links"
          onClick={() => setExpanded((previous) => !previous)}
          whileTap={reduceMotion ? undefined : { scale: 0.88 }}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
        >
          {/* Soft ambient glow */}

          <motion.span
            aria-hidden="true"
            animate={
              reduceMotion
                ? { opacity: 0.3, scale: 1 }
                : {
                    opacity: [0.15, 0.5, 0.15],
                    scale: [0.8, 1.5, 0.8],
                  }
            }
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute h-6 w-6 rounded-full bg-yellow-400/30 blur-md"
          />

          {/* Jumping yellow dot */}

          <motion.span
            aria-hidden="true"
            animate={
              reduceMotion
                ? { y: 0 }
                : {
                    y: [0, -8, 0],
                    scaleY: [1, 0.9, 1],
                  }
            }
            transition={{
              duration: 0.48,
              repeat: Infinity,
              repeatDelay: 1.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 h-[9px] w-[9px] rounded-full bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.85)]"
          />
        </motion.button>

        {/* EXPANDING NAVIGATION LINKS */}

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id="dynamic-island-links"
              initial={{
                opacity: 0,
                x: -12,
                filter: "blur(5px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                x: -8,
                filter: "blur(4px)",
              }}
              transition={{
                duration: 0.3,
                ease,
              }}
              className="flex min-w-0 items-center gap-0.5"
            >
              {pageLinks.map((item, index) => {
                const active = activePath === item.path;

                return (
                  <motion.div
                    key={item.path}
                    initial={
                      reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.045,
                      ease,
                    }}
                  >
                    <Link
                      to={item.path}
                      aria-current={active ? "page" : undefined}
                      className={`flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-2 text-[9px] font-black uppercase tracking-[0.1em] transition-colors sm:gap-2 sm:px-3 sm:text-[10px] ${
                        active
                          ? "bg-yellow-400 text-black"
                          : "text-neutral-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span
                        className={active ? "text-black/60" : "text-yellow-400"}
                      >
                        {item.number}
                      </span>

                      <span className="hidden sm:inline">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}

/* -------------------------------------------------------
   SCROLL REVEAL
------------------------------------------------------- */

export function Reveal({ children, className = "", delay = 0, amount = 0.16 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.68, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------
   SECTION HEADING
------------------------------------------------------- */

export function SectionHeading({ number, label, title, accent, description }) {
  return (
    <div className="mb-9 flex flex-col justify-between gap-5 border-b border-white/15 pb-7 md:mb-12 md:flex-row md:items-end">
      <div>
        <p className="mb-4 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-neutral-400 sm:text-xs">
          <span className="text-yellow-400">{number}</span>
          <span className="h-px w-8 bg-neutral-700" />
          {label}
        </p>

        <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.06em] sm:text-5xl md:text-6xl">
          {title} <span className="text-yellow-400">{accent}</span>
        </h2>
      </div>

      {description && (
        <p className="max-w-sm text-sm leading-7 text-neutral-400">
          {description}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------
   PORTFOLIO PAGE LAYOUT
------------------------------------------------------- */

export default function PortfolioPageLayout({
  number,
  label,
  title,
  accent,
  description,
  children,
}) {
  const location = useLocation();

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#080808] text-white">
      {/* BACKGROUND */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="absolute -right-36 top-20 h-[420px] w-[420px] rounded-full bg-yellow-400/[0.07] blur-[125px]" />

        <div className="absolute -left-40 top-[58%] h-[360px] w-[360px] rounded-full bg-white/[0.035] blur-[115px]" />
      </div>

      {/* FIXED DYNAMIC ISLAND */}

      <DynamicIslandNav activePath={location.pathname} />

      {/* HEADER */}

      <header className="relative z-10 mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-8 md:px-12 lg:px-[7vw]">
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-3"
          aria-label="Back to home"
        >
          <span className="flex h-9 w-9 items-center justify-center border-2 border-yellow-400 text-sm font-black text-yellow-400 transition-colors group-hover:bg-yellow-400 group-hover:text-black">
            Y.
          </span>

          <span className="hidden text-[11px] font-black uppercase tracking-[0.2em] text-white sm:block">
            Yazid<span className="text-yellow-400">.</span>Portfolio
          </span>
        </Link>

        {/* LET'S TALK */}

        {/* <Link
          to="/contact"
          className="shrink-0 border border-white/35 px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] transition-all hover:border-yellow-400 hover:bg-yellow-400 hover:text-black sm:px-4 sm:text-[10px]"
        >
          Let&apos;s talk <span className="ml-1 text-yellow-400">↗</span>
        </Link> */}
      </header>

      {/* PAGE HERO */}

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 pb-14 pt-14 sm:px-8 md:px-12 md:pb-20 md:pt-20 lg:px-[7vw]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="grid gap-10 lg:grid-cols-[1fr_230px] lg:items-end"
        >
          <div>
            <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.26em] text-neutral-400 sm:text-xs">
              <span className="text-yellow-400">{number}</span>
              <span className="h-px w-9 bg-neutral-700" />
              {label}
              <span className="text-neutral-600">/ YCSN</span>
            </p>

            <h1 className="mt-7 max-w-5xl text-[clamp(3.4rem,8vw,7.8rem)] font-black uppercase leading-[0.84] tracking-[-0.075em]">
              {title}
              <span className="mt-2 block text-yellow-400">{accent}</span>
            </h1>

            <p className="mt-7 max-w-xl text-sm leading-7 text-neutral-400 sm:text-base sm:leading-8">
              {description}
            </p>
          </div>

          <div className="hidden h-40 flex-col justify-between border-l border-white/20 py-1 pl-6 lg:flex">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">
                Personal portfolio · 2026
              </p>

              <p className="mt-2 text-xs font-bold uppercase tracking-wider text-white">
                Medan, Indonesia
              </p>
            </div>

            <div>
              <p className="text-4xl font-black tracking-tighter text-yellow-400">
                {number}
                <span className="text-neutral-600">/04</span>
              </p>

              <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                Scroll to explore ↓
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 h-px w-full bg-gradient-to-r from-yellow-400/70 via-white/15 to-transparent" />
      </section>

      {/* PAGE CONTENT */}

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 md:px-12 lg:px-[7vw]">
        {children}
      </div>

      {/* FOOTER */}

      <footer className="relative z-10 border-t border-white/10 px-5 py-7 sm:px-8 md:px-12 lg:px-[7vw]">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-4 text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-500 sm:flex-row sm:items-center sm:text-[10px]">
          <span>© 2026 Yazid Chairy Syahputra Nasution</span>

          <span>Designed with curiosity · Built with intention</span>

          <Link
            to="/"
            className="w-fit text-white transition-colors hover:text-yellow-400"
          >
            Back to home ↗
          </Link>
        </div>
      </footer>
    </main>
  );
}

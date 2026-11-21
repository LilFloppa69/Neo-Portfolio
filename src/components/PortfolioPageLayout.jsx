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
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setExpanded(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setExpanded(false);
      }}
      onFocusCapture={() => setExpanded(true)}
      onBlurCapture={closeIfFocusLeaves}
    >
      <motion.nav
        layout
        aria-label="Main navigation"
        transition={{
          layout: reduceMotion
            ? { duration: 0.01 }
            : {
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
          onClick={(event) => {
            const isTouchDevice = window.matchMedia(
              "(hover: none), (pointer: coarse)",
            ).matches;

            if (isTouchDevice || event.detail === 0) {
              setExpanded((previous) => !previous);
            } else {
              setExpanded(true);
            }
          }}
          whileTap={reduceMotion ? undefined : { scale: 0.88 }}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
        >
          {/* Jumping yellow dot */}

          <motion.span
            aria-hidden="true"
            animate={
              reduceMotion
                ? { y: 0 }
                : {
                    y: [0, -6, 0],
                    scaleY: [1, 0.88, 1],
                  }
            }
            transition={{
              duration: 0.42,
              repeat: Infinity,
              repeatDelay: 1.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 h-[8px] w-[8px] rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.4)]"
          />
        </motion.button>

        {/* EXPANDING NAVIGATION LINKS */}

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id="dynamic-island-links"
              initial={{
                opacity: 0,
                x: reduceMotion ? 0 : -12,
                filter: reduceMotion ? "none" : "blur(5px)",
              }}
              animate={{
                opacity: 1,
                x: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                x: reduceMotion ? 0 : -8,
                filter: reduceMotion ? "none" : "blur(4px)",
              }}
              transition={{
                duration: reduceMotion ? 0.01 : 0.3,
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
                      duration: reduceMotion ? 0.01 : 0.3,
                      delay: reduceMotion ? 0 : index * 0.045,
                      ease,
                    }}
                  >
                    <Link
                      to={item.path}
                      aria-current={active ? "page" : undefined}
                      aria-label={`${item.number} ${item.label}`}
                      title={item.label}
                      className={`relative flex shrink-0 items-center gap-1 rounded-full px-2 py-2 text-[8px] font-semibold uppercase tracking-[0.04em] transition-colors sm:gap-2 sm:px-3 sm:text-[10px] sm:tracking-[0.08em] ${
                        active
                          ? "bg-white/[0.08] text-white"
                          : "text-neutral-500 hover:bg-white/[0.06] hover:text-neutral-100"
                      }`}
                    >
                      <span className="hidden font-mono text-yellow-400 sm:inline">
                        {item.number}
                      </span>

                      <span className="whitespace-nowrap">{item.label}</span>
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
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: false,
        amount,
      }}
      transition={{
        duration: reduceMotion ? 0.2 : 0.8,
        delay: reduceMotion ? 0 : delay,
        ease,
      }}
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
    <div className="mb-12 flex flex-col justify-between gap-6 border-b border-white/10 pb-9 md:mb-16 md:flex-row md:items-end">
      <div>
        <p className="mb-5 flex items-center gap-3 text-[10px] font-medium tracking-[0.16em] text-neutral-500 sm:text-xs">
          <span className="font-mono text-yellow-400">{number}</span>

          <span className="h-px w-7 bg-white/20" />

          <span>{label}</span>
        </p>

        <h2 className="max-w-3xl text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-[#F0EEE8] sm:text-5xl md:text-6xl">
          {title}{" "}
          <span className="font-editorial normal-case italic font-normal tracking-[-0.04em] text-yellow-400">
            {accent}
          </span>
        </h2>
      </div>

      {description && (
        <p className="max-w-sm text-sm leading-7 text-neutral-400 sm:text-base sm:leading-8">
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
  const reduceMotion = useReducedMotion();

  return (
    <main className="relative isolate min-h-screen overflow-x-clip bg-[#080808] text-white">
      {" "}
      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Subtle warm atmosphere */}

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_0%,rgba(250,204,21,0.045),transparent_43%)]" />

        {/* Very subtle page texture */}

        <div className="absolute inset-x-0 top-0 h-px bg-white/[0.06]" />
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

          <span className="hidden text-[12px] font-semibold tracking-[-0.02em] text-[#F0EEE8] sm:block">
            Yazid<span className="text-yellow-400">.</span> Nasution
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
      <section className="relative z-10 mx-auto max-w-[1440px] px-5 pb-16 pt-16 sm:px-8 md:px-12 md:pb-20 md:pt-24 lg:px-[7vw]">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: reduceMotion ? 0.01 : 0.85,
            ease,
          }}
          className="max-w-5xl"
        >
          {/* PAGE LABEL */}

          <p className="flex items-center gap-3 text-[11px] font-medium tracking-[0.12em] text-neutral-500 sm:text-xs">
            <span className="font-mono text-yellow-400">{number}</span>

            <span className="h-px w-8 bg-white/20" />

            <span>{label}</span>

            <span className="text-neutral-700">/ YCSN</span>
          </p>

          {/* EDITORIAL TITLE */}

          <h1 className="mt-8 max-w-5xl text-[clamp(3.5rem,8.5vw,8rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-[#F0EEE8]">
            {title}

            <span className="mt-1 block font-editorial normal-case italic font-normal leading-[0.92] tracking-[-0.045em] text-yellow-400">
              {accent}
            </span>
          </h1>

          {/* DESCRIPTION */}

          <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg sm:leading-9">
            {description}
          </p>
        </motion.div>

        {/* SECTION DIVIDER */}

        <div className="mt-16 h-px w-full bg-white/10">
          <div className="h-full w-14 bg-yellow-400/80" />
        </div>
      </section>
      {/* PAGE CONTENT */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 pb-24 sm:px-8 md:px-12 lg:px-[7vw]">
        {children}
      </div>
      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 px-5 py-9 sm:px-8 md:px-12 lg:px-[7vw]">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="space-y-2">
            <p className="text-xs font-medium tracking-wide text-neutral-300">
              © 2026 Yazid Chairy Syahputra Nasution
            </p>

            <p className="text-[11px] font-normal normal-case tracking-normal text-neutral-600">
              Built in Medan. Still figuring things out.
            </p>
          </div>

          <Link
            to="/"
            className="group flex w-fit items-center gap-2 text-xs font-medium text-neutral-400 transition-colors hover:text-yellow-400"
          >
            Back to the beginning
            <span className="transition-transform group-hover:-translate-y-1">
              ↑
            </span>
          </Link>
        </div>
      </footer>
    </main>
  );
}

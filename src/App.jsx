import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Home from "./Home";
import Identity from "./Identity";
import Portfolio from "./Portfolio";
import Certificate from "./Certificate";
import Contact from "./Contact";

const ROWS = 12;
const COLUMNS = 11;
const COLORS = ["#FACC15", "#EAB308", "#FDE047", "#D6A500"];
const ease = [0.22, 1, 0.36, 1];

const bricks = Array.from({ length: ROWS * COLUMNS }, (_, index) => ({
  row: Math.floor(index / COLUMNS),
  col: index % COLUMNS,
}));

function BrickTransition({ phase, onComplete }) {
  if (phase === "idle") return null;

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#080808] pointer-events-none">
      {bricks.map(({ row, col }) => {
        const lastBuild = row === 0 && col === 1;
        const lastReveal = row === ROWS - 1 && col === 1;

        const buildDelay = (ROWS - 1 - row) * 0.045 + (col % 2) * 0.008;

        const revealDelay = row * 0.025 + (col % 2) * 0.006;

        return (
          <motion.div
            key={`${row}-${col}`}
            initial={{ y: "110vh", opacity: 1 }}
            animate={
              phase === "build"
                ? { y: 0, opacity: 1 }
                : { y: "-110vh", opacity: 0 }
            }
            transition={{
              duration: phase === "build" ? 0.34 : 0.27,
              delay: phase === "build" ? buildDelay : revealDelay,
              ease: phase === "build" ? ease : [0.72, 0, 0.28, 1],
            }}
            onAnimationComplete={() => {
              if (phase === "build" && lastBuild) {
                onComplete("reveal");
              }

              if (phase === "reveal" && lastReveal) {
                onComplete("idle");
              }
            }}
            style={{
              position: "absolute",
              left: `${col * 10 + (row % 2 ? -5 : 0)}%`,
              top: `${row * (100 / ROWS)}%`,
              width: "10.2%",
              height: `${100 / ROWS + 0.25}%`,
              backgroundColor: COLORS[(row * 3 + col * 5) % COLORS.length],
              border: "2px solid rgba(8,8,8,0.3)",
              boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.08)",
            }}
          />
        );
      })}

      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="border-2 border-[#080808] bg-[#080808]/90 px-5 py-3">
          <p className="text-[10px] font-black uppercase tracking-[0.28em] text-yellow-400 sm:text-xs">
            Next Chapter...
          </p>
        </div>
      </div>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const previousPath = useRef(location.pathname);

  const [brickPhase, setBrickPhase] = useState("idle");
  const [transitionKey, setTransitionKey] = useState(0);

  useLayoutEffect(() => {
    if (previousPath.current !== location.pathname) {
      previousPath.current = location.pathname;

      window.scrollTo(0, 0);

      setTransitionKey((current) => current + 1);
      setBrickPhase("build");
    }
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease }}
          className="min-h-screen w-full"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/identity" element={<Identity />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/certificate" element={<Certificate />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      <BrickTransition
        key={transitionKey}
        phase={brickPhase}
        onComplete={setBrickPhase}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

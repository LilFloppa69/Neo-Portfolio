import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Identity() {
  // 1. Array berisi role yang ingin ditampilkan bergantian
  const roles = ["Full Stack Developer", "Data Analyst", "UI/UX Designer"];

  // 2. State untuk melacak index role yang sedang aktif
  const [roleIndex, setRoleIndex] = useState(0);

  // 3. Effect untuk mengganti index setiap 3 detik (3000 ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval); // Cleanup interval saat berpindah halaman
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] flex flex-col items-center justify-center p-6 overflow-hidden">
      <div className="w-full max-w-[380px] mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_#facc15] transition-all text-sm"
        >
          <span>←</span> Back
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative w-full max-w-[380px]"
      >
        <div className="absolute top-3.5 left-3.5 w-full h-full bg-yellow-400" />

        <div className="relative bg-neutral-900 border-[3px] border-neutral-100 p-8 pb-7">
          <div className="w-14 h-14 rounded-full border-[3px] border-neutral-100 flex items-center justify-center mb-6">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 stroke-neutral-100"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>

          <h1 className="font-bold text-3xl tracking-tight text-neutral-100 mb-1">
            Identity
          </h1>

          {/* 4. Teks Dinamis dengan Animasi */}
          <div className="text-sm font-medium text-yellow-400 mb-4 flex flex-wrap gap-1 items-center">
            <span>Yazid Chairy Syahputra Nasution —</span>
            <div className="relative inline-block overflow-hidden h-5">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block whitespace-nowrap font-bold"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-neutral-400 mb-5 max-w-[32ch]">
            A Fresh Graduate from University of North Sumatra. A Full Stack Web
            Developer who's focusing on MERN Stack. Open to Collaborate with
            anyone.
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {["MongoDB", "Express", "React", "Node.js"].map((tag) => (
              <span
                key={tag}
                className="text-xs font-medium text-neutral-100 border-2 border-neutral-100 px-2.5 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <hr className="border-t-2 border-neutral-800 mb-4" />

          <div className="flex justify-between text-xs text-neutral-400">
            <span>Based in Medan, ID</span>
            <strong className="text-neutral-100 font-semibold">
              Open to work
            </strong>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

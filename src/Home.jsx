import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  const { scrollY } = useScroll();

  // Efek parallax pendek
  const yHero = useTransform(scrollY, [0, 500], [0, -100]);
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0]);

  const cards = [
    {
      title: "Identity",
      path: "/identity",
      desc: "Learn more about who I am and my background.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
    },
    {
      title: "Portfolio",
      path: "/portfolio",
      desc: "Check out my projects and work samples.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
        </svg>
      ),
    },
    {
      title: "Certificate",
      path: "/certificate",
      desc: "My professional achievements and certifications.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="6"></circle>
          <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
        </svg>
      ),
    },
    {
      title: "Contact",
      path: "/contact",
      desc: "Get in touch and let's talk about opportunities.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <motion.section
        style={{ y: yHero, opacity: opacityHero }}
        className="h-screen flex flex-col items-center justify-center relative px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-32 h-32 md:w-48 md:h-48 bg-neutral-900 border-4 border-white rounded-none mb-8 flex items-center justify-center shadow-brutal overflow-hidden"
        >
          <img
            src="/Images/profil.jpeg"
            alt="Yazid Chairy Syahputra Nasution"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
            Yazid Chairy Syahputra Nasution
          </h1>
          <p className="text-neutral-400 font-bold tracking-[0.2em] uppercase text-sm md:text-base">
            FullStack Developer
          </p>

          <motion.a
            href="/Files/CV-Yazid.pdf"
            download="CV-Yazid.pdf"
            whileHover={{ y: -4, x: -4 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-3 mt-8 px-8 py-4
  bg-white text-black border-4 border-white
  font-black uppercase tracking-widest text-sm
  shadow-brutal hover:bg-transparent hover:text-white
  transition-colors duration-300 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <path d="m7 10 5 5 5-5" />
              <path d="M12 15V3" />
            </svg>
            DOWNLOAD CV
          </motion.a>
        </motion.div>
      </motion.section>

      {/* 2. CARDS SECTION */}
      <section className="min-h-screen bg-[#0a0a0a] px-6 py-20 flex items-center justify-center relative z-10">
        {/* Grid diubah menjadi 4 kolom pada layar besar agar sejajar horizontal seperti referensi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1200px]">
          {cards.map((card, index) => (
            <Link to={card.path} key={card.title} className="block h-full">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                // Padding disesuaikan, ditambahkan flex-col untuk layout ikon -> judul -> deskripsi
                className="group flex flex-col h-full p-8 bg-[#0a0a0a] border-4 border-white transition-all duration-300 shadow-brutal hover:shadow-brutal-hover hover:-translate-y-2 hover:-translate-x-2 hover:bg-white hover:text-black cursor-pointer"
              >
                {/* Ikon di bagian atas */}
                <div className="mb-8 text-white group-hover:text-black transition-colors duration-300">
                  {card.icon}
                </div>

                {/* Judul dan Deskripsi */}
                <div className="flex-grow flex flex-col gap-3">
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                    {card.title}
                  </h2>
                  <p className="text-neutral-400 group-hover:text-neutral-700 font-bold text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

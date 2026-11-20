import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import PortfolioPageLayout, {
  Reveal,
  SectionHeading,
} from "./components/PortfolioPageLayout";

const projects = [
  {
    title: "Gamified LMS",
    category: "Full-stack development",
    desc: "Learning Management System with Gamification to motivate and attract more students.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    role: "Full-Stack Developer & System Designer",
    images: [
      "/Images/ClassHub.png",
      "/Images/Classhub (Class).png",
      "/Images/Classhub (Forum).png",
      "/Images/Classhub (Evaluation).png",
    ],
  },
  {
    title: "Klinik Nakita",
    category: "Frontend development",
    desc: "A Modern ERM Website built with Laravel Livewire and Tailwind CSS.",
    stack: ["Laravel", "Livewire", "Blade", "Tailwind CSS"],
    role: "Frontend Developer",
    images: ["/Images/Klinik Nakita.png"],
  },
  {
    title: "Crossy Road with Three.js",
    category: "Interactive experiment",
    desc: "My first time using Three.js and developing it into a game.",
    stack: ["Three.js", "JavaScript"],
    role: "Frontend Developer",
    images: ["/Images/Crossy Road.jpg"],
  },
  {
    title: "Expense Tracker",
    category: "Web application",
    desc: "An application to track budget and expenses, built with React.",
    stack: ["React.js"],
    role: "Frontend Developer",
    images: ["/Images/Expense Tracker.png"],
  },
];

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openGallery = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => setSelectedProject(null);

  const nextImage = () => {
    if (!selectedProject?.images?.length) return;

    setCurrentImageIndex(
      (current) => (current + 1) % selectedProject.images.length,
    );
  };

  const prevImage = () => {
    if (!selectedProject?.images?.length) return;

    setCurrentImageIndex((current) =>
      current === 0 ? selectedProject.images.length - 1 : current - 1,
    );
  };

  return (
    <PortfolioPageLayout
      number="02"
      label="Selected work"
      title="Ideas turned"
      accent="into work."
      description="A selection of projects, interfaces, and experiments I've worked on. Open a project to browse its available screens and details."
    >
      <Reveal className="mb-8 grid gap-3 sm:grid-cols-3">
        {[
          { value: "04", label: "Featured projects" },
          { value: "MERN", label: "Core stack" },
          { value: "BUILD", label: "Learn by making" },
        ].map((item) => (
          <div
            key={item.label}
            className="border border-white/15 bg-[#101010] px-5 py-4"
          >
            <p className="text-2xl font-black tracking-tight text-yellow-400">
              {item.value}
            </p>
            <p className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-neutral-500">
              {item.label}
            </p>
          </div>
        ))}
      </Reveal>

      <Reveal>
        <SectionHeading
          number="01"
          label="Project archive"
          title="Selected"
          accent="projects."
          description="A closer look at the ideas, tools, and interfaces behind each project."
        />
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal
            key={project.title}
            delay={index * 0.07}
            className={index === 0 ? "lg:col-span-2" : ""}
          >
            <article
              className={`group h-full overflow-hidden border border-white/20 bg-[#101010] transition-colors duration-300 hover:border-yellow-400 ${
                index === 0
                  ? "grid lg:grid-cols-[1.15fr_0.85fr]"
                  : "flex flex-col"
              }`}
            >
              <button
                type="button"
                onClick={() => openGallery(project)}
                aria-label={`Open ${project.title} project gallery`}
                className={`relative block w-full overflow-hidden bg-black text-left ${
                  index === 0
                    ? "aspect-[16/10] lg:aspect-auto lg:min-h-[390px]"
                    : "aspect-[16/10]"
                }`}
              >
                <img
                  src={project.images[0]}
                  alt={`${project.title} project preview`}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
                />

                <span className="absolute left-4 top-4 border border-white/40 bg-black/75 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-white">
                  Project / {String(index + 1).padStart(2, "0")}
                </span>

                <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center border border-white/60 bg-black/75 text-white transition-colors group-hover:border-yellow-400 group-hover:bg-yellow-400 group-hover:text-black">
                  <ArrowIcon />
                </span>
              </button>

              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-400">
                    {project.category}
                  </p>

                  <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-500">
                    {project.images.length}{" "}
                    {project.images.length === 1 ? "image" : "images"}
                  </span>
                </div>

                <h2 className="mt-5 text-2xl font-black uppercase leading-tight tracking-tight sm:text-3xl">
                  {project.title}
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-400">
                  {project.desc}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/20 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-neutral-500">
                    {project.role}
                  </span>

                  <button
                    type="button"
                    onClick={() => openGallery(project)}
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.16em] text-white transition-colors hover:text-yellow-400"
                  >
                    Detailed view <span>↗</span>
                  </button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 border border-yellow-400/50 bg-yellow-400/[0.06] p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-yellow-400">
              Have an idea?
            </p>

            <h3 className="mt-2 text-2xl font-black uppercase tracking-tight sm:text-3xl">
              Let&apos;s make it happen.
            </h3>
          </div>

          <a
            href="https://github.com/LilFloppa69"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center gap-3 border border-white/35 px-5 py-3 text-[10px] font-black uppercase tracking-[0.16em] transition-colors hover:border-yellow-400 hover:bg-yellow-400 hover:text-black"
          >
            Find me on GitHub <ArrowIcon />
          </a>
        </div>
      </Reveal>

      {/* PROJECT GALLERY */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md md:p-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-h-[92vh] w-full max-w-6xl overflow-y-auto border border-white/25 bg-[#101010] p-4 shadow-[10px_10px_0_0_#facc15] sm:p-6"
            >
              <div className="mb-5 flex items-start justify-between gap-4 border-b border-white/15 pb-4">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-400">
                    Project gallery
                  </p>
                  <h3 className="mt-2 text-xl font-black uppercase sm:text-2xl">
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={closeGallery}
                  aria-label="Close gallery"
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/50 text-xl font-black transition-colors hover:border-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  ×
                </button>
              </div>

              <div className="relative flex min-h-[42vh] items-center justify-center border border-white/10 bg-black p-3 sm:min-h-[60vh] sm:p-6">
                {selectedProject.images?.length ? (
                  <>
                    <img
                      src={selectedProject.images[currentImageIndex]}
                      alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                      className="max-h-[65vh] max-w-full object-contain"
                    />

                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={prevImage}
                          aria-label="Previous image"
                          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-black bg-yellow-400 text-xl font-black text-black transition-colors hover:bg-white sm:left-5 sm:h-12 sm:w-12"
                        >
                          ←
                        </button>

                        <button
                          type="button"
                          onClick={nextImage}
                          aria-label="Next image"
                          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-black bg-yellow-400 text-xl font-black text-black transition-colors hover:bg-white sm:right-5 sm:h-12 sm:w-12"
                        >
                          →
                        </button>

                        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 border border-yellow-400 bg-black/90 px-3 py-1 text-[10px] font-black tracking-wider text-yellow-400">
                          {currentImageIndex + 1} /{" "}
                          {selectedProject.images.length}
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-neutral-500">
                    No project images are available yet.
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PortfolioPageLayout>
  );
}

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import PortfolioPageLayout, { Reveal } from "./components/PortfolioPageLayout";

const projects = [
  {
    number: "01",
    title: "Gamified LMS",
    category: "Full-stack application",
    description:
      "A learning management system that uses gamification to make learning more engaging for students.",
    role: "Full-stack developer & system designer",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    images: [
      "/Images/ClassHub.png",
      "/Images/Classhub (Class).png",
      "/Images/Classhub (Forum).png",
      "/Images/Classhub (Evaluation).png",
    ],
    imageAlt: "Gamified LMS application interface",
  },
  {
    number: "02",
    title: "Klinik Nakita",
    category: "Frontend development",
    description: "An ERM website built with Laravel Livewire and Tailwind CSS.",
    role: "Frontend developer",
    stack: ["Laravel", "Livewire", "Blade", "Tailwind CSS"],
    images: ["/Images/Klinik Nakita.png"],
    imageAlt: "Klinik Nakita application dashboard",
  },
  {
    number: "03",
    title: "Crossy Road",
    category: "Interactive experiment",
    description:
      "A small game experiment and my first hands-on project with Three.js.",
    role: "Frontend developer",
    stack: ["Three.js", "JavaScript"],
    images: ["/Images/Crossy Road.jpg"],
    imageAlt: "Crossy Road game experiment",
  },
  {
    number: "04",
    title: "Expense Tracker",
    category: "Web application",
    description:
      "A React application for keeping track of budgets and everyday expenses.",
    role: "Frontend developer",
    stack: ["React.js"],
    images: ["/Images/Expense Tracker.png"],
    imageAlt: "Expense Tracker application interface",
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

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }

      if (event.key === "ArrowRight") {
        setCurrentImageIndex(
          (current) => (current + 1) % selectedProject.images.length,
        );
      }

      if (event.key === "ArrowLeft") {
        setCurrentImageIndex((current) =>
          current === 0 ? selectedProject.images.length - 1 : current - 1,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject]);
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
      title="A few"
      accent="things I've built."
      description="Projects I've worked on, experiments I've tried, and a few things I've learned along the way."
    >
      <Reveal className="mb-12 max-w-2xl">
        <p className="text-sm leading-8 text-neutral-400 sm:text-base">
          A few applications and experiments from my time learning and building.
          Select a preview to browse the screens available for each project.
        </p>
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

      <Reveal className="mt-16 border-t border-white/10 pt-9">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-[10px] font-medium text-neutral-500">
              MORE OF MY WORK
            </p>

            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-[#F0EEE8] sm:text-3xl">
              There's more on GitHub.
            </h3>

            <p className="mt-3 text-sm text-neutral-500">
              Code, experiments, and things I'm still working on.
            </p>
          </div>

          <a
            href="https://github.com/LilFloppa69"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-fit items-center gap-3 border-b border-white/30 pb-2 text-xs font-medium text-neutral-300 transition-colors hover:border-yellow-400 hover:text-yellow-400"
          >
            Find me on GitHub
            <ArrowIcon />
          </a>
        </div>
      </Reveal>

      {/* PROJECT SCREENSHOTS */}

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
            className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-black/90 p-3 backdrop-blur-sm sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-gallery-title"
              className="relative my-auto w-full max-w-5xl border border-white/15 bg-[#101010] p-4 sm:p-7"
            >
              {/* MODAL HEADER */}

              <div className="flex items-start justify-between gap-5 border-b border-white/10 pb-5">
                <div>
                  <p className="font-mono text-[10px] text-yellow-400">
                    {selectedProject.number} / PROJECT SCREENS
                  </p>

                  <h3
                    id="project-gallery-title"
                    className="mt-3 text-2xl font-semibold tracking-tight text-[#F0EEE8] sm:text-3xl"
                  >
                    {selectedProject.title}
                  </h3>

                  <p className="mt-2 max-w-xl text-xs leading-6 text-neutral-500">
                    {selectedProject.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeGallery}
                  aria-label="Close project screenshots"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-neutral-300 transition-colors hover:border-yellow-400 hover:text-yellow-400"
                >
                  ×
                </button>
              </div>

              {/* IMAGE DISPLAY */}

              <div className="relative mt-6 flex min-h-[35vh] items-center justify-center bg-[#EAE9E4] p-2 sm:min-h-[55vh] sm:p-5">
                {selectedProject.images?.length > 0 && (
                  <img
                    src={selectedProject.images[currentImageIndex]}
                    alt={`${selectedProject.imageAlt} — screenshot ${currentImageIndex + 1}`}
                    className="max-h-[65vh] max-w-full object-contain"
                  />
                )}

                {/* PREVIOUS */}

                {selectedProject.images.length > 1 && (
                  <button
                    type="button"
                    onClick={prevImage}
                    aria-label="Previous screenshot"
                    className="absolute left-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-white transition-colors hover:bg-yellow-400 hover:text-black sm:left-4 sm:h-11 sm:w-11"
                  >
                    ←
                  </button>
                )}

                {/* NEXT */}

                {selectedProject.images.length > 1 && (
                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next screenshot"
                    className="absolute right-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-white transition-colors hover:bg-yellow-400 hover:text-black sm:right-4 sm:h-11 sm:w-11"
                  >
                    →
                  </button>
                )}
              </div>

              {/* IMAGE COUNTER & STACK */}

              <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <p className="font-mono text-[10px] text-neutral-500">
                  SCREEN {String(currentImageIndex + 1).padStart(2, "0")}
                  {" / "}
                  {String(selectedProject.images.length).padStart(2, "0")}
                </p>

                <p className="text-[11px] text-neutral-500">
                  {selectedProject.stack.join(" · ")}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PortfolioPageLayout>
  );
}

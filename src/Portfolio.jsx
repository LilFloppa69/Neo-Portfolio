import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Portfolio() {
  const projects = [
    {
      title: "Gamified LMS",
      desc: "Learning Management System with Gamification to motivate and attract more students.",
      stack: ["MongoDB", "Express", "React", "Node.js"],
      role: "Full-Stack Developer & System Designer",
      // Tambahkan array images, isi dengan path gambar jika ada
      images: [
        "/Images/ClassHub.png",
        "/Images/Classhub (Class).png",
        "/Images/Classhub (Forum).png",
        "/Images/Classhub (Evaluation).png",
      ],
    },
    {
      title: "Klinik Nakita",
      desc: "A Modern ERM Website built with Laravel Livewire and Tailwind CSS",
      stack: ["Laravel", "Blade"],
      role: "Frontend Developer",
      // Kosongkan array untuk mengetes pesan "You don't have any image..."
      images: ["/Images/Klinik Nakita.png"],
    },
    {
      title: "Crossy Road with Three.js",
      desc: "My First Time of Using Three JS and Developed it into a game",
      stack: ["Three.js"],
      role: "Frontend Developer",
      // Kosongkan array untuk mengetes pesan "You don't have any image..."
      images: ["/Images/Crossy Road.jpg"],
    },
    {
      title: "Expense Tracker",
      desc: "An Application to Track Budget and Expense, built with React",
      stack: ["React.js"],
      role: "Frontend Developer",
      // Kosongkan array untuk mengetes pesan "You don't have any image..."
      images: ["/Images/Expense Tracker.png"],
    },
  ];

  // State untuk Modal Gallery
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fungsi navigasi Gallery
  const openGallery = (project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedProject(null);
  };

  const nextImage = () => {
    if (selectedProject && selectedProject.images.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedProject.images.length,
      );
    }
  };

  const prevImage = () => {
    if (selectedProject && selectedProject.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1,
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-10 relative">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="w-full max-w-[380px] mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_#facc15] transition-all text-sm"
          >
            <span>←</span> Back
          </Link>
        </div>

        <div className="relative w-fit mb-10">
          <div className="absolute top-3.5 left-3.5 w-full h-full bg-yellow-400" />
          <div className="relative bg-neutral-900 border-[3px] border-neutral-100 p-8 pr-16">
            <div className="w-14 h-14 rounded-full border-[3px] border-neutral-100 flex items-center justify-center mb-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 stroke-neutral-100"
              >
                <rect x="3" y="7" width="18" height="12" rx="1" />
                <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
              </svg>
            </div>
            <h1 className="font-bold text-3xl tracking-tight text-neutral-100 mb-1">
              Portfolio
            </h1>
            <p className="text-sm font-medium text-neutral-400">
              Projects that i've built before
            </p>
          </div>
        </div>

        {/* Project list */}
        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <div key={project.title} className="relative">
              <div className="absolute top-3.5 left-3.5 w-full h-full bg-yellow-400" />
              <div className="relative bg-neutral-900 border-[3px] border-neutral-100 p-8">
                <div className="flex items-start justify-between mb-4">
                  <span className="font-bold text-sm text-yellow-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-medium text-neutral-400 border-2 border-neutral-700 px-2.5 py-1">
                    {project.role}
                  </span>
                </div>

                <h2 className="font-bold text-2xl text-neutral-100 mb-3">
                  {project.title}
                </h2>

                <p className="text-sm leading-relaxed text-neutral-400 mb-5 max-w-[60ch]">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-neutral-100 border-2 border-neutral-100 px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <hr className="border-t-2 border-neutral-800 mb-4" />

                <button
                  onClick={() => openGallery(project)}
                  className="text-sm font-semibold text-neutral-100 hover:text-yellow-400 transition-colors"
                >
                  Detailed View →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery Modal / Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 md:p-10 backdrop-blur-sm"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-neutral-900 border-[3px] border-neutral-100 p-6 shadow-[12px_12px_0px_0px_#facc15]"
            >
              {/* Header Modal & Close Button */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-neutral-800">
                <h3 className="text-2xl font-bold text-white">
                  {selectedProject.title}
                </h3>
                <button
                  onClick={closeGallery}
                  className="w-10 h-10 flex items-center justify-center border-2 border-white bg-red-500 text-white font-black hover:bg-white hover:text-red-500 transition-colors"
                >
                  X
                </button>
              </div>

              {/* Gallery Content Area */}
              <div className="relative w-full min-h-[40vh] md:min-h-[60vh] flex items-center justify-center bg-black border-2 border-neutral-800 p-4">
                {/* Kondisi jika array image kosong */}
                {!selectedProject.images ||
                selectedProject.images.length === 0 ? (
                  <p className="text-neutral-500 font-medium text-center">
                    You don't have any image for this project yet.
                  </p>
                ) : (
                  /* Tampilan Gambar */
                  <div className="relative w-full h-full flex items-center justify-center group">
                    {/* Tombol Kiri (Muncul jika gambar > 1) */}
                    {selectedProject.images.length > 1 && (
                      <button
                        onClick={prevImage}
                        className="absolute left-4 z-10 w-12 h-12 flex items-center justify-center bg-yellow-400 border-[3px] border-black text-black font-black text-xl hover:bg-white transition-colors"
                      >
                        ←
                      </button>
                    )}

                    {/* Gambar Aktif */}
                    <img
                      src={selectedProject.images[currentImageIndex]}
                      alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                      className="max-w-full max-h-[60vh] object-contain border-2 border-neutral-800"
                    />

                    {/* Tombol Kanan (Muncul jika gambar > 1) */}
                    {selectedProject.images.length > 1 && (
                      <button
                        onClick={nextImage}
                        className="absolute right-4 z-10 w-12 h-12 flex items-center justify-center bg-yellow-400 border-[3px] border-black text-black font-black text-xl hover:bg-white transition-colors"
                      >
                        →
                      </button>
                    )}

                    {/* Image Counter */}
                    {selectedProject.images.length > 1 && (
                      <div className="absolute bottom-4 bg-black/80 text-yellow-400 px-4 py-1 border-2 border-yellow-400 font-bold text-sm">
                        {currentImageIndex + 1} /{" "}
                        {selectedProject.images.length}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

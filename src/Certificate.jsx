import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import PortfolioPageLayout, {
  Reveal,
  SectionHeading,
} from "./components/PortfolioPageLayout";

const soleCertificates = [
  {
    title: "Advanced React",
    issuer: "Meta, Coursera",
    date: "2026",
    image: "/Certificates/Meta x Coursera Advanced React.jpg",
  },
  {
    title: "Foundations of Cybersecurity",
    issuer: "Google, Coursera",
    date: "2026",
    image: "/Certificates/Google x Coursera Foundations of Cybersecurity.jpg",
  },
];

const completionCertificates = [
  {
    title: "MERN Stack Front to Back",
    issuer: "Packt, Coursera",
    desc: "Finished 3 Main Classes of Full Stack Development",
    image: "/Certificates/Packt x Coursera MERN Stack Front To Back.jpg",
    subCerts: [
      {
        title: "Backend Development and API Creation",
        image:
          "/Certificates/Packt x Coursera Backend Development and API Creation.jpg",
      },
      {
        title: "Frontend Development with React",
        image:
          "/Certificates/Packt x Coursera Frontend Development with React.jpg",
      },
      {
        title: "Advanced Frontend Development and Deployment",
        image:
          "/Certificates/Packt x Coursera Advanced Frontend Development and Deployment.jpg",
      },
    ],
  },
  {
    title: "Google AI",
    issuer: "Google, Coursera",
    desc: "Finished 8 Main Classes of Artificial Engineering",
    image: "/Certificates/Google x Coursera Google AI for Professional.jpg",
    subCerts: [
      {
        title: "AI Fundamentals",
        image: "/Certificates/Google x Coursera AI Fundamentals.jpg",
      },
      {
        title: "AI for App Building",
        image: "/Certificates/Google x Coursera AI for App Building.jpg",
      },
      {
        title: "AI for App Deployment",
        image: "/Certificates/Google x Coursera AI for App Deployment.jpg",
      },
      {
        title: "AI for Brainstorming and Planning",
        image:
          "/Certificates/Google x Coursera AI for Brainstorming and Planning.jpg",
      },
      {
        title: "AI for Content Creation",
        image: "/Certificates/Google x Coursera AI for Content Creation.jpg",
      },
      {
        title: "AI for Data Analysis",
        image: "/Certificates/Google x Coursera AI for Data Analysis.jpg",
      },
      {
        title: "AI for Research and Insights",
        image:
          "/Certificates/Google x Coursera AI for Research and Insights.jpg",
      },
      {
        title: "AI for Writing and Communicating",
        image:
          "/Certificates/Google x Coursera AI for Writing and Communicating.jpg",
      },
    ],
  },
];

export default function Certificate() {
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const credentialCount =
    soleCertificates.length +
    completionCertificates.reduce(
      (total, certificate) => total + 1 + certificate.subCerts.length,
      0,
    );

  const openImageModal = (imagePath) => setSelectedImage(imagePath);
  const closeImageModal = () => setSelectedImage(null);

  return (
    <PortfolioPageLayout
      number="03"
      label="Learning archive"
      title="Proof of"
      accent="progress."
      description="A collection of credentials and learning paths gathered along the way. Each one represents a new skill, a deeper exploration, or another step forward."
    >
      {/* SUMMARY */}
      <Reveal className="mb-16 grid gap-3 sm:grid-cols-3">
        <div className="border border-yellow-400/60 bg-yellow-400 p-5 text-black sm:p-6">
          <p className="text-4xl font-black tracking-tighter">
            {credentialCount}
          </p>
          <p className="mt-2 text-[9px] font-black uppercase tracking-[0.2em] text-black/65">
            Credentials & modules
          </p>
        </div>

        <div className="border border-white/15 bg-[#101010] p-5 sm:p-6">
          <p className="text-4xl font-black tracking-tighter text-white">02</p>
          <p className="mt-2 text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">
            Individual certificates
          </p>
        </div>

        <div className="border border-white/15 bg-[#101010] p-5 sm:p-6">
          <p className="text-4xl font-black tracking-tighter text-white">02</p>
          <p className="mt-2 text-[9px] font-black uppercase tracking-[0.2em] text-neutral-500">
            Learning paths
          </p>
        </div>
      </Reveal>

      {/* INDIVIDUAL CERTIFICATES */}
      <section>
        <Reveal>
          <SectionHeading
            number="01"
            label="Individual credentials"
            title="Single-step"
            accent="milestones."
            description="Standalone certificates from focused learning experiences."
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {soleCertificates.map((certificate, index) => (
            <Reveal key={certificate.title} delay={index * 0.08}>
              <article className="group h-full border border-white/20 bg-[#101010] transition-colors hover:border-yellow-400">
                <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden border-b border-white/15 bg-black p-4">
                  <img
                    src={certificate.image}
                    alt={`${certificate.title} certificate`}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  />

                  <span className="absolute left-4 top-4 bg-yellow-400 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-black">
                    Credential / 0{index + 1}
                  </span>
                </div>

                <div className="p-6 sm:p-7">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-400">
                    {certificate.issuer} · {certificate.date}
                  </p>

                  <h3 className="mt-3 text-2xl font-black uppercase leading-tight tracking-tight">
                    {certificate.title}
                  </h3>

                  <button
                    type="button"
                    onClick={() => openImageModal(certificate.image)}
                    className="mt-6 inline-flex items-center gap-3 border-b border-white/50 pb-2 text-[10px] font-black uppercase tracking-[0.16em] text-white transition-colors hover:border-yellow-400 hover:text-yellow-400"
                  >
                    View credential <span>↗</span>
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LEARNING PATHS */}
      <section className="mt-24 sm:mt-32">
        <Reveal>
          <SectionHeading
            number="02"
            label="Certificate of completion"
            title="Learning"
            accent="paths."
            description="Explore the main program certificates and expand each path to see its completed modules."
          />
        </Reveal>

        <div className="space-y-5">
          {completionCertificates.map((certificate, index) => {
            const isOpen = openAccordionIndex === index;

            return (
              <Reveal key={certificate.title} delay={index * 0.08}>
                <article className="relative">
                  <div className="absolute left-2 top-2 h-full w-full bg-yellow-400/90" />

                  <div className="relative border border-white/20 bg-[#101010]">
                    <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-7">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() =>
                          setOpenAccordionIndex(isOpen ? null : index)
                        }
                        className="group flex min-w-0 flex-1 items-center gap-4 text-left sm:gap-6"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-yellow-400 text-sm font-black text-yellow-400 transition-colors group-hover:bg-yellow-400 group-hover:text-black">
                          0{index + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-400">
                            {certificate.issuer}
                          </p>

                          <h3 className="mt-2 text-xl font-black uppercase leading-tight tracking-tight sm:text-2xl">
                            {certificate.title}
                          </h3>

                          <p className="mt-2 text-xs leading-6 text-neutral-400">
                            {certificate.desc}
                          </p>

                          <p className="mt-3 text-[9px] font-black uppercase tracking-[0.16em] text-neutral-500">
                            {certificate.subCerts.length} completed modules ·{" "}
                            {isOpen ? "Close details −" : "Explore modules +"}
                          </p>
                        </div>
                      </button>

                      <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
                        <img
                          src={certificate.image}
                          alt={`${certificate.title} main certificate`}
                          className="h-16 w-24 border border-white/15 bg-black object-contain p-1 sm:h-20 sm:w-32"
                        />

                        <button
                          type="button"
                          onClick={() => openImageModal(certificate.image)}
                          className="border border-white/35 px-3 py-2 text-[9px] font-black uppercase tracking-[0.14em] text-white transition-colors hover:border-yellow-400 hover:bg-yellow-400 hover:text-black"
                        >
                          Main certificate ↗
                        </button>
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.38,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden border-t border-white/15 bg-[#080808]"
                        >
                          <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-7">
                            {certificate.subCerts.map(
                              (subCertificate, subIndex) => (
                                <div
                                  key={subCertificate.title}
                                  className="flex items-center justify-between gap-4 border border-white/15 bg-[#101010] p-4"
                                >
                                  <div className="flex min-w-0 items-start gap-3">
                                    <span className="text-[10px] font-black text-yellow-400">
                                      {String(subIndex + 1).padStart(2, "0")}
                                    </span>

                                    <span className="text-xs font-bold leading-6 text-neutral-200">
                                      {subCertificate.title}
                                    </span>
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      openImageModal(subCertificate.image)
                                    }
                                    className="shrink-0 text-[9px] font-black uppercase tracking-[0.12em] text-neutral-400 transition-colors hover:text-yellow-400"
                                  >
                                    View ↗
                                  </button>
                                </div>
                              ),
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* CERTIFICATE MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageModal}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md md:p-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-5xl border border-white/25 bg-[#101010] p-4 shadow-[10px_10px_0_0_#facc15] sm:p-6"
            >
              <div className="mb-4 flex items-center justify-between gap-4 border-b border-white/15 pb-4">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-400">
                    Credential preview
                  </p>
                  <h3 className="mt-1 text-lg font-black uppercase">
                    Certificate view
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={closeImageModal}
                  aria-label="Close certificate preview"
                  className="flex h-10 w-10 items-center justify-center border border-white/40 text-xl font-black transition-colors hover:border-yellow-400 hover:bg-yellow-400 hover:text-black"
                >
                  ×
                </button>
              </div>

              <div className="flex min-h-[45vh] items-center justify-center bg-black p-3 sm:min-h-[65vh] sm:p-6">
                <img
                  src={selectedImage}
                  alt="Selected certificate"
                  className="max-h-[70vh] max-w-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PortfolioPageLayout>
  );
}

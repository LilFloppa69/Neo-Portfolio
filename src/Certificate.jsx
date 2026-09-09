import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Certificate() {
  // Data Sole Certificates (Sertifikat Tunggal)
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

  // Data Certificate of Completion (Sertifikat Berjenjang/Paket)
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

  // State untuk Akordion (Expand/Collapse)
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  // State untuk Modal Gambar Sertifikat
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  const openImageModal = (imagePath) => {
    setSelectedImage(imagePath);
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-10 relative">
      <div className="w-full max-w-3xl">
        {/* Header & Back Button */}
        <div className="w-full max-w-[380px] mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 border-2 border-white text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_#facc15] transition-all text-sm"
          >
            <span>←</span> Back
          </Link>
        </div>

        <div className="relative w-fit mb-12">
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
                <circle cx="12" cy="8" r="4" />
                <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
              </svg>
            </div>
            <h1 className="font-bold text-3xl tracking-tight text-neutral-100 mb-1">
              Certificates
            </h1>
            <p className="text-sm font-medium text-neutral-400">
              Accolades that i've gained so far
            </p>
          </div>
        </div>

        {/* Section 1: Sole Certificates */}
        <div className="mb-12">
          <h2 className="font-bold text-xl text-yellow-400 mb-6 uppercase tracking-widest border-b-2 border-neutral-800 pb-2 inline-block">
            Sole Certificates
          </h2>
          <div className="flex flex-col gap-6">
            {soleCertificates.map((cert, i) => (
              <div key={i} className="relative">
                <div className="absolute top-2 left-2 w-full h-full bg-yellow-400" />
                <div className="relative bg-neutral-900 border-[3px] border-neutral-100 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-lg text-neutral-100">
                      {cert.title}
                    </h3>
                    <p className="text-sm font-medium text-neutral-400">
                      Issued by{" "}
                      <span className="text-yellow-400">{cert.issuer}</span> —{" "}
                      {cert.date}
                    </p>
                  </div>
                  <button
                    onClick={() => openImageModal(cert.image)}
                    className="self-start sm:self-auto text-xs font-bold text-neutral-100 border-2 border-neutral-100 px-4 py-2 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-colors uppercase tracking-wider"
                  >
                    View Credential
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Certificate of Completion */}
        <div>
          <h2 className="font-bold text-xl text-yellow-400 mb-6 uppercase tracking-widest border-b-2 border-neutral-800 pb-2 inline-block">
            Certificate of Completion
          </h2>
          <div className="flex flex-col gap-8">
            {completionCertificates.map((cert, index) => (
              <div key={index} className="relative">
                <div className="absolute top-3 left-3 w-full h-full bg-yellow-400" />
                <div className="relative bg-neutral-900 border-[3px] border-neutral-100">
                  {/* Accordion Header (Diubah jadi div agar tidak ada nested button) */}
                  <div
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-neutral-800 transition-colors text-left"
                  >
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-neutral-100 mb-1">
                        {cert.title}
                      </h3>
                      <p className="text-sm font-medium text-yellow-400 mb-2">
                        {cert.issuer}
                      </p>
                      <p className="text-xs text-neutral-400">{cert.desc}</p>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Mencegah klik tembus ke accordion toggle
                          openImageModal(cert.image);
                        }}
                        className="text-xs font-bold text-neutral-100 border-2 border-neutral-100 px-4 py-2 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-colors uppercase tracking-wider"
                      >
                        View Credential
                      </button>
                      <span className="text-2xl font-black text-white ml-2 flex-shrink-0 w-4 text-center">
                        {openAccordionIndex === index ? "−" : "+"}
                      </span>
                    </div>
                  </div>

                  {/* Accordion Body (Sub-certificates) */}
                  <AnimatePresence>
                    {openAccordionIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-black border-t-[3px] border-neutral-100"
                      >
                        <div className="p-6 flex flex-col gap-4">
                          <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                            Completed Modules:
                          </p>
                          {cert.subCerts.map((subCert, idx) => (
                            <div
                              key={idx}
                              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-l-4 border-yellow-400 pl-4 py-1"
                            >
                              <span className="text-sm font-bold text-neutral-100">
                                {subCert.title}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  openImageModal(subCert.image);
                                }}
                                className="self-start sm:self-auto text-xs font-bold text-neutral-400 hover:text-yellow-400 transition-colors"
                              >
                                View Image →
                              </button>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal View Image */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 md:p-10 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-neutral-900 border-[3px] border-neutral-100 p-6 shadow-[12px_12px_0px_0px_#facc15]"
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-neutral-800">
                <h3 className="text-xl font-bold text-white">
                  Certificate View
                </h3>
                <button
                  onClick={closeImageModal}
                  className="w-10 h-10 flex items-center justify-center border-2 border-white bg-red-500 text-white font-black hover:bg-white hover:text-red-500 transition-colors"
                >
                  X
                </button>
              </div>

              <div className="relative w-full min-h-[40vh] md:min-h-[60vh] flex items-center justify-center bg-black border-2 border-neutral-800 p-4">
                {!selectedImage || selectedImage.trim() === "" ? (
                  <p className="text-neutral-500 font-medium text-center">
                    You don't have any image for this certificate yet.
                  </p>
                ) : (
                  <img
                    src={selectedImage}
                    alt="Certificate Credential"
                    className="max-w-full max-h-[60vh] object-contain border-2 border-neutral-800"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

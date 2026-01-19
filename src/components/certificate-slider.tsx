"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Award, Calendar, X } from "lucide-react";
type CertificateProps = {
  id: number;
  title: string;
  organization: string;
  date: string;
  image: string;
};

export default function CertificateSlider() {
  const [certificates] = useState<CertificateProps[]>([
    {
      id: 1,
      title: "Full Stack Web Development",
      organization: "SabaiCode Bootcamp",
      date: "June 2022",
      image: "./image/Certifacate_FullstackDeveloper.jpg?height=600&width=1000",
    },
    {
      id: 2,
      title: "Bachelor of Information Technology",
      organization: "National Technical Training Institute",
      date: "May 2024",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      id: 3,
      title: "Successfully Complete web development Internship",
      organization: "blue Technology Co. Ltd",
      date: "January 2023",
      image: "./image/blue_intern.jpg?height=600&width=800",
    },
    {
      id: 4,
      title: " Pre-employment and Scholarships Skill Workshop",
      organization: "Empowering Youth in Cambodia",
      date: "August 2023",
      image:
        "./image/Certificate_Pre-employment and scholarship skills Workshop Volunteer.jpg?height=600&width=800",
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [selectedCertificate, setSelectedCertificate] =
    useState<CertificateProps | null>(null);
  const constraintsRef = useRef(null);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certificates.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + certificates.length) % certificates.length,
    );
  };

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -100) {
      handleNext();
    } else if (info.offset.x > 100) {
      handlePrev();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
      },
    }),
  };

  // Auto-slide functionality
  // Auto-slide functionality
  useEffect(() => {
    if (selectedCertificate) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [selectedCertificate]);

  const closeModal = () => setSelectedCertificate(null);

  return (
    <div className="relative w-full max-w-5xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          My Certificates
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Professional certifications and academic achievements that showcase my
          qualifications and expertise.
        </p>
      </div>

      <div
        ref={constraintsRef}
        className="overflow-hidden relative h-[400px] rounded-2xl shadow-xl bg-white"
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={constraintsRef}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 w-full h-full"
          >
            <div className="flex flex-col items-center justify-center h-full p-8 md:p-12 text-center">
              <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 w-fit">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">Certificate</span>
              </div>

              <motion.h3
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {certificates[currentIndex].title}
              </motion.h3>

              <motion.div
                className="space-y-4 mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-8 text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Organization:</span>
                    <span>{certificates[currentIndex].organization}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Issued:</span>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {certificates[currentIndex].date}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={() =>
                    setSelectedCertificate(certificates[currentIndex])
                  }
                  className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all cursor-pointer z-50 pointer-events-auto"
                >
                  View Full Certificate
                </button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all"
          aria-label="Previous certificate"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-100 p-3 rounded-full shadow-lg transition-all"
          aria-label="Next certificate"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-8 gap-2">
        {certificates.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-blue-600 w-8" : "bg-gray-300"
            }`}
            aria-label={`Go to certificate ${index + 1}`}
          />
        ))}
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full bg-white rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white hover:text-gray-100 transition-colors bg-black/50"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="p-1">
                <img
                  src={selectedCertificate.image || "/placeholder.svg"}
                  alt={selectedCertificate.title}
                  className="w-full h-full object-contain max-h-[85vh]"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h3 className="text-xl font-bold">
                  {selectedCertificate.title}
                </h3>
                <p className="text-sm opacity-90">
                  {selectedCertificate.organization}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

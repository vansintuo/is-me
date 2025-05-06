"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Award, Calendar } from "lucide-react"
type CertificateProps = {
  id: number
  title: string
  organization: string
  date: string
  image: string
}

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
      image: "./image/Certificate_Pre-employment and scholarship skills Workshop Volunteer.jpg?height=600&width=800",
    },
  ])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const constraintsRef = useRef(null)

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certificates.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + certificates.length) % certificates.length)
  }

  const handleDragEnd = (_, info) => {
    if (info.offset.x < -100) {
      handleNext()
    } else if (info.offset.x > 100) {
      handlePrev()
    }
  }

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
  }

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full max-w-5xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">My Certificates</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Professional certifications and academic achievements that showcase my qualifications and expertise.
        </p>
      </div>

      <div ref={constraintsRef} className="overflow-hidden relative h-[500px] rounded-2xl shadow-xl">
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
            className="absolute inset-0 w-full h-full bg-white"
          >
            <div className="grid md:grid-cols-2 h-full">
              {/* Certificate Image */}
              <div className="relative h-full overflow-hidden bg-gray-100 border-r border-gray-200">
                <motion.div
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="relative w-full h-full max-h-[400px] shadow-lg rounded-lg overflow-hidden">
                      <img
                        src={certificates[currentIndex].image || "/placeholder.svg"}
                        alt={certificates[currentIndex].title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Certificate Details */}
              <div className="flex flex-col justify-center p-8 md:p-12">
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
                  className="space-y-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center text-gray-600">
                    <div className="w-24 font-medium">Organization:</div>
                    <div>{certificates[currentIndex].organization}</div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-24 font-medium">Issued:</div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {certificates[currentIndex].date}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all">
                    View Full Certificate
                  </button>
                </motion.div>
              </div>
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
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-blue-600 w-8" : "bg-gray-300"
            }`}
            aria-label={`Go to certificate ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

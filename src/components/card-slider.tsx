"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Award, Calendar, MapPin, Clock, GraduationCap, ImageIcon } from "lucide-react"

// Define the type for certificate data
type CertificateProps = {
  id: number
  title: string
  organization: string
  date: string
  image: string
  studyTour?: {
    location: string
    duration: string
    description: string
  } | null
}

export default function CardSlider() {
  const [certificates] = useState<CertificateProps[]>([
    {
      id: 1,
      title: "Full Stack Web Development",
      organization: "SabaiCode Bootcamp",
      date: "June 2022",
      image: "./image/Certifacate_FullstackDeveloper.jpg?height=600&width=1000",
      studyTour: {
        location: "Phnom Penh, Cambodia",
        duration: "1 year",
        description: "",
      },
    },
    {
      id: 2,
      title: "Bachelor of Information Technology",
      organization: "National Technical Training Institute",
      date: "May 2020 - 2025",
      image: "",
      studyTour: {
        location: "Berlin, Germany",
        duration: "5 years",
        description: "",
      },
    },
    {
      id: 3,
      title: "Successfully Complete web development Internship",
      organization: "Blue technology Co. Ltd",
      date: "January 2023",
      image: "./image/blue_intern.jpg?height=600&width=800",
    },
    {
      id: 4,
      title: " Pre-employment and Scholarships Skill Workshop",
      organization: "Empowering Youth in Cambodia",
      date: "August 2023",
      image: "./image/Certificate_Pre-employment and scholarship skills Workshop Volunteer.jpg?height=600&width=800",
      studyTour: {
        location: "Phnom Penh, Cambodia",
        duration: "3 weeks",
        description: "",
      },
    },
  ])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const constraintsRef = useRef(null)
  const [showFullText, setShowFullText] = useState(false)
  const [showStudyTourDetails, setShowStudyTourDetails] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certificates.length)
    setShowFullText(false)
    setShowStudyTourDetails(false)
    setImageError(false)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + certificates.length) % certificates.length)
    setShowFullText(false)
    setShowStudyTourDetails(false)
    setImageError(false)
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

  const currentCertificate = certificates[currentIndex]

  // Fix: Check if studyTour exists AND is not null
  const hasStudyTour = currentCertificate.studyTour !== undefined && currentCertificate.studyTour !== null

  // Function to check if image is valid
  const isValidImage = (image: string): boolean => {
    return image !== null && image !== undefined && image !== ""
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">My Certificates & Study Tours</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Professional certifications, academic achievements, and international study experiences that have shaped my
          career.
        </p>
      </div>

      <div ref={constraintsRef} className="overflow-hidden relative h-[550px] rounded-2xl shadow-xl">
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
                      {isValidImage(currentCertificate.image) && !imageError ? (
                        <img
                          src={currentCertificate.image || "/placeholder.svg"}
                          alt={currentCertificate.title}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            setImageError(true)
                            e.currentTarget.src = "/placeholder.svg?height=600&width=800"
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 text-gray-500">
                          <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
                          <div className="text-center px-6">
                            <p className="font-medium text-lg mb-1">{currentCertificate.title}</p>
                            <p className="text-sm text-gray-500">Certificate image not available</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Certificate Details */}
              <div className="flex flex-col justify-center p-8 md:p-12 overflow-y-auto">
                <div
                  className={`mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                    hasStudyTour ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                  } w-fit`}
                >
                  {hasStudyTour ? (
                    <>
                      <GraduationCap className="w-4 h-4" />
                      <span className="text-sm font-medium">Study Tour</span>
                    </>
                  ) : (
                    <>
                      <Award className="w-4 h-4" />
                      <span className="text-sm font-medium">Certificate</span>
                    </>
                  )}
                </div>

                <motion.h3
                  className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 line-clamp-2 hover:line-clamp-none cursor-pointer transition-all"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setShowFullText(!showFullText)}
                >
                  {currentCertificate.title}
                </motion.h3>

                <motion.div
                  className="space-y-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-start text-gray-600">
                    <div className="w-24 font-medium mt-0.5">Organization:</div>
                    <div
                      className={`${showFullText ? "" : "truncate max-w-[200px]"} cursor-pointer`}
                      onClick={() => setShowFullText(!showFullText)}
                      title={currentCertificate.organization}
                    >
                      {currentCertificate.organization}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-24 font-medium">Issued:</div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {currentCertificate.date}
                    </div>
                  </div>
                </motion.div>

                {/* Study Tour Section - Only show if hasStudyTour is true */}
                {hasStudyTour && (
                  <motion.div
                    className="mt-6 pt-6 border-t border-gray-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div
                      className="flex items-center gap-2 text-emerald-600 font-medium mb-3 cursor-pointer"
                      onClick={() => setShowStudyTourDetails(!showStudyTourDetails)}
                    >
                      <GraduationCap className="w-5 h-5" />
                      <span>Includes Study Tour</span>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${showStudyTourDetails ? "rotate-90" : ""}`}
                      />
                    </div>

                    {showStudyTourDetails && (
                      <motion.div
                        className="bg-emerald-50 rounded-lg p-4 space-y-3 text-sm"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center gap-2 text-emerald-700">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="font-medium">Location:</span>
                          <span>{currentCertificate.studyTour?.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-700">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span className="font-medium">Duration:</span>
                          <span>{currentCertificate.studyTour?.duration}</span>
                        </div>
                        <div className="text-emerald-700">
                          <p className="mt-2">{currentCertificate.studyTour?.description}</p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                <motion.div
                  className="mt-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
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
        {certificates.map((cert, index) => (
          <button 
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
              setShowFullText(false)
              setShowStudyTourDetails(false)
              setImageError(false)
            }}
            className={`flex items-center gap-1 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-blue-600 px-3" : cert.studyTour ? "bg-emerald-300 w-5" : "bg-gray-300 w-3"
            }`}
            aria-label={`Go to certificate ${index + 1}`}
          >
            {cert.studyTour && index === currentIndex && <GraduationCap className="w-2.5 h-2.5 text-white" />}
          </button>
        ))}
      </div>
    </div>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

type CardProps = {
  id: number
  title: string
  description: string
  image: string
  color: string
}

export default function CardSlider() {
  const [cards] = useState<CardProps[]>([
    {
      id: 1,
      title: "Laravel Development",
      description: "Building robust backend systems with Laravel PHP framework",
      image: "/placeholder.svg?height=400&width=600",
      color: "from-red-400 to-red-600",
    },
    {
      id: 2,
      title: "Next.js Projects",
      description: "Creating modern web applications with React and Next.js",
      image: "/placeholder.svg?height=400&width=600",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: 3,
      title: "Node.js Development",
      description: "Developing scalable server-side applications with Node.js",
      image: "/placeholder.svg?height=400&width=600",
      color: "from-green-400 to-green-600",
    },
    {
      id: 4,
      title: "MongoDB & MySQL",
      description: "Working with both SQL and NoSQL database technologies",
      image: "/placeholder.svg?height=400&width=600",
      color: "from-purple-400 to-purple-600",
    },
    {
      id: 5,
      title: "Tailwind CSS Design",
      description: "Creating beautiful UI components with Tailwind CSS",
      image: "/placeholder.svg?height=400&width=600",
      color: "from-teal-400 to-teal-600",
    },
  ])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const constraintsRef = useRef(null)
  const x = useMotionValue(0)
  const rotateY = useTransform(x, [-100, 100], [-5, 5])
  const opacity = useTransform(x, [-100, -50, 0, 50, 100], [0.6, 0.8, 1, 0.8, 0.6])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length)
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
      scale: 0.8,
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
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    }),
  }

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full max-w-4xl mx-auto perspective-1000 py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Project Showcase</h2>

      <div ref={constraintsRef} className="overflow-hidden relative h-[400px] rounded-2xl">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ rotateY, opacity }}
            drag="x"
            dragConstraints={constraintsRef}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 w-full h-full"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cards[currentIndex].color} opacity-80`}></div>

              {/* Card content */}
              <div className="relative z-10 flex flex-col h-full p-8 text-white">
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                  <motion.h3
                    className="text-3xl font-bold mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {cards[currentIndex].title}
                  </motion.h3>
                  <motion.p
                    className="text-lg max-w-md"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {cards[currentIndex].description}
                  </motion.p>
                </div>

                <motion.div
                  className="mt-6 flex justify-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <button className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium hover:bg-opacity-90 transition-all">
                    View Details
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-8 gap-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-gray-800 w-6" : "bg-gray-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

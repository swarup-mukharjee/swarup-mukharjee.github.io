"use client"

import { useEffect, useState, useRef } from "react"
import { Parallax } from "react-scroll-parallax"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown } from "lucide-react"
import Card3D from "@/components/3d-card"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  const [orangeX, setOrangeX] = useState(0)
  const [orangeY, setOrangeY] = useState(0)
  const [redX, setRedX] = useState(0)
  const [redY, setRedY] = useState(0)
  const [yellowX, setYellowX] = useState(0)
  const [yellowY, setYellowY] = useState(0)
  const [lavenderX, setLavenderX] = useState(0)
  const [lavenderY, setLavenderY] = useState(0)

  const [vectorTranslateX, setVectorTranslateX] = useState(0)
  const [vectorTranslateY, setVectorTranslateY] = useState(0)

  const [particlePositions, setParticlePositions] = useState(
    Array.from({ length: 30 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
    })),
  )

  const [particleOffsets, setParticleOffsets] = useState(
    Array.from({ length: 30 }, () => ({
      x: Math.random() * 40 - 20,
      y: Math.random() * 40 - 20,
    })),
  )

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newMousePosition = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      }
      setMousePosition(newMousePosition)

      setOrangeX(newMousePosition.x * -30)
      setOrangeY(newMousePosition.y * -30)
      setRedX(newMousePosition.x * 40)
      setRedY(newMousePosition.y * 40)
      setYellowX(newMousePosition.x * 20)
      setYellowY(newMousePosition.y * 20)
      setLavenderX(newMousePosition.x * -25)
      setLavenderY(newMousePosition.y * -25)

      setVectorTranslateX(newMousePosition.x * -10)
      setVectorTranslateY(newMousePosition.y * -10)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleScrollDown = () => {
    const aboutSection = document.querySelector("#about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Abstract shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-orange-500/20 blur-3xl"
        style={{
          x: orangeX,
          y: orangeY,
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-red-500/20 blur-3xl"
        style={{
          x: redX,
          y: redY,
        }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute top-1/2 right-1/3 w-72 h-72 rounded-full bg-yellow-400/20 blur-3xl"
        style={{
          x: yellowX,
          y: yellowY,
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/3 w-60 h-60 rounded-full bg-lavender/20 blur-3xl"
        style={{
          x: lavenderX,
          y: lavenderY,
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 9,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Vector lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        style={{
          transform: `translate(${vectorTranslateX}px, ${vectorTranslateY}px)`,
        }}
      >
        <motion.path
          d="M0,100 Q250,300 500,100 T1000,100"
          fill="none"
          stroke="#FF7A00"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, delay: 0.2 }}
        />
        <motion.path
          d="M0,200 Q250,0 500,200 T1000,200"
          fill="none"
          stroke="#FF3D00"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, delay: 0.4 }}
        />
        <motion.path
          d="M0,300 Q250,500 500,300 T1000,300"
          fill="none"
          stroke="#FFD600"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, delay: 0.6 }}
        />
        <motion.path
          d="M0,400 Q250,200 500,400 T1000,400"
          fill="none"
          stroke="#9D84B7"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
      </svg>

      <Parallax translateY={["-100px", "100px"]} className="z-10">
        <motion.div style={{ opacity, scale, y }} className="container mx-auto px-4 text-center">
          <Card3D className="inline-block mb-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="p-1 rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500"
            >
              <div className="bg-black/90 backdrop-blur-sm rounded-lg p-4">
                <motion.div
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-yellow-400"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  Swarup Mukharjee
                </motion.div>
              </div>
            </motion.div>
          </Card3D>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Crafting immersive digital experiences through code and design
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              className="animated-gradient text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              onClick={handleScrollDown}
            >
              View My Work
            </button>
          </motion.div>
        </motion.div>
      </Parallax>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <button
          onClick={handleScrollDown}
          className="text-white opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Scroll down"
        >
          <ArrowDown size={32} />
        </button>
      </motion.div>

      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            top: `${particlePositions[i].x}%`,
            left: `${particlePositions[i].y}%`,
            backgroundColor: ["#FF7A00", "#FF3D00", "#FFD600", "#9D84B7", "#FF7A00", "#FF3D00", "#FFD600", "#9D84B7"][
              Math.floor(Math.random() * 8)
            ],
            x: useTransform(() => mousePosition.x * particleOffsets[i].x),
            y: useTransform(() => mousePosition.y * particleOffsets[i].y),
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </section>
  )
}

"use client"

import { Parallax } from "react-scroll-parallax"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-black to-gray-900 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <Parallax translateY={["-20px", "20px"]} className="z-10">
              <motion.div
                ref={ref}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-white"
                  animate={{
                    textShadow: [
                      "0 0 5px rgba(255,122,0,0.3)",
                      "0 0 15px rgba(255,122,0,0.3)",
                      "0 0 5px rgba(255,122,0,0.3)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  About{" "}
                  <motion.span
                    className="text-orange-500"
                    animate={{
                      color: ["#FF7A00", "#FF3D00", "#FFD600", "#9D84B7", "#FF7A00"],
                    }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
                  >
                    Me
                  </motion.span>
                </motion.h2>
                <motion.p
                  className="text-gray-300 text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  I'm a passionate full-stack developer with a keen eye for design and a love for creating seamless user
                  experiences. With over 5 years of experience in web development, I specialize in building modern,
                  responsive, and performant web applications.
                </motion.p>
                <motion.p
                  className="text-gray-300 text-lg leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  My journey in tech began when I built my first website at 15. Since then, I've worked with startups
                  and established companies, helping them bring their digital visions to life. I'm constantly learning
                  and exploring new technologies to stay at the forefront of web development.
                </motion.p>
                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <motion.a
                    href="#contact"
                    className="inline-block bg-transparent hover:bg-orange-500 text-orange-500 hover:text-white border border-orange-500 font-semibold py-3 px-8 rounded-full transition-all duration-300"
                    onClick={(e) => {
                      e.preventDefault()
                      document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get In Touch
                  </motion.a>
                </motion.div>
              </motion.div>
            </Parallax>
          </div>

          <div className="w-full md:w-1/2 order-1 md:order-2">
            <motion.div style={{ y: y1 }} className="z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8 }}
                className="relative"
                style={{ rotate, scale }}
              >
                <div className="relative w-full aspect-square max-w-md mx-auto overflow-hidden rounded-2xl">
                  <Image
                    src="image/my.jpg?height=600&width=600"
                    alt="Developer Portrait"
                    width={600}
                    height={600}
                    className="object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 bg-orange-500/20 rounded-2xl"
                    animate={{
                      background: [
                        "rgba(255, 122, 0, 0.2)",
                        "rgba(255, 61, 0, 0.2)",
                        "rgba(255, 214, 0, 0.2)",
                        "rgba(157, 132, 183, 0.2)",
                        "rgba(255, 122, 0, 0.2)",
                      ],
                    }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
                <motion.div
                  className="absolute -bottom-6 -right-6 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div
                  className="absolute -top-6 -left-6 w-48 h-48 bg-red-500/20 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 left-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-64 h-64 bg-lavender-500/5 rounded-full blur-3xl"
        style={{ y: y1 }}
      />

      {/* Abstract vector shapes */}
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,20 Q30,40 60,20 T100,20"
          fill="none"
          stroke="#FF7A00"
          strokeWidth="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isInView ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
        <motion.path
          d="M0,80 Q30,60 60,80 T100,80"
          fill="none"
          stroke="#FF3D00"
          strokeWidth="0.2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isInView ? 1 : 0 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        />
      </svg>
    </section>
  )
}

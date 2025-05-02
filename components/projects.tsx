"use client"

import { useState, useRef } from "react"
import { Parallax } from "react-scroll-parallax"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    color: "#FF7A00", // Orange
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team collaboration features.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "Socket.io", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
    color: "#FF3D00", // Red
  },
  {
    title: "Travel Blog",
    description: "A responsive travel blog with content management system and interactive maps for travel stories.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Gatsby", "GraphQL", "Mapbox", "Netlify CMS"],
    liveUrl: "#",
    githubUrl: "#",
    color: "#FFD600", // Yellow
  },
  {
    title: "Finance Dashboard",
    description: "An analytics dashboard for financial data visualization with interactive charts and reports.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Vue.js", "D3.js", "Express", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    color: "#9D84B7", // Lavender
  },
]

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-black to-gray-900 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <Parallax translateY={["-20px", "20px"]} className="z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              animate={{
                textShadow: [
                  "0 0 5px rgba(255,122,0,0.3)",
                  "0 0 15px rgba(255,122,0,0.3)",
                  "0 0 5px rgba(255,122,0,0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              My{" "}
              <motion.span
                className="text-orange-500"
                animate={{
                  color: ["#FF7A00", "#FF3D00", "#FFD600", "#9D84B7", "#FF7A00"],
                }}
                transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
              >
                Projects
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-gray-300 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Here are some of the projects I've worked on. Each one presented unique challenges and opportunities for
              growth.
            </motion.p>
          </motion.div>
        </Parallax>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <Parallax
              key={project.title}
              translateY={[`${index % 2 === 0 ? "40px" : "0px"}`, `${index % 2 === 0 ? "0px" : "40px"}`]}
              className="z-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.1 * index }}
                className="group relative bg-gray-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 h-full"
                onMouseEnter={() => setActiveProject(index)}
                onMouseLeave={() => setActiveProject(null)}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 0 25px ${project.color}40`,
                  borderColor: `${project.color}80`,
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={800}
                    height={600}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <motion.div
                    className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300"
                    style={{
                      background:
                        activeProject === index
                          ? `linear-gradient(to bottom, rgba(0,0,0,0.3), ${project.color}50)`
                          : "rgba(0,0,0,0.5)",
                    }}
                  />

                  {/* Abstract vector overlay */}
                  <svg
                    className="absolute inset-0 w-full h-full opacity-30"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <motion.path
                      d="M0,0 L100,0 L100,100 L0,100 Z"
                      fill="none"
                      stroke={project.color}
                      strokeWidth="0.2"
                      initial={{ pathLength: 0 }}
                      animate={activeProject === index ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 0.8 }}
                    />
                    <motion.path
                      d="M0,0 L100,100"
                      fill="none"
                      stroke={project.color}
                      strokeWidth="0.2"
                      initial={{ pathLength: 0 }}
                      animate={activeProject === index ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    />
                    <motion.path
                      d="M100,0 L0,100"
                      fill="none"
                      stroke={project.color}
                      strokeWidth="0.2"
                      initial={{ pathLength: 0 }}
                      animate={activeProject === index ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </svg>
                </div>
                <div className="p-6">
                  <motion.h3
                    className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors"
                    style={{ color: activeProject === index ? project.color : "white" }}
                  >
                    {project.title}
                  </motion.h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full"
                        style={{
                          backgroundColor: `${project.color}20`,
                          color: project.color,
                        }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-white hover:text-orange-500 transition-colors"
                      whileHover={{ scale: 1.05, color: project.color }}
                    >
                      <ExternalLink size={16} className="mr-1" />
                      <span>Live Demo</span>
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-white hover:text-orange-500 transition-colors"
                      whileHover={{ scale: 1.05, color: project.color }}
                    >
                      <Github size={16} className="mr-1" />
                      <span>Source Code</span>
                    </motion.a>
                  </div>
                </div>
                <motion.div
                  className="absolute inset-0 border-2 rounded-xl pointer-events-none"
                  style={{
                    borderColor: project.color,
                    opacity: activeProject === index ? 0.8 : 0,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeProject === index ? 0.8 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            </Parallax>
          ))}
        </div>
      </div>

      {/* 3D floating shapes */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`proj-shape-${i}`}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 80 + 40}px`,
              height: `${Math.random() * 80 + 40}px`,
            }}
            animate={{
              y: [0, Math.random() * 50 - 25, 0],
              rotate: [0, 360, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            {i % 4 === 0 ? (
              // Triangle
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon
                  points="50,15 100,100 0,100"
                  fill={["#FF7A00", "#FF3D00", "#FFD600", "#9D84B7"][i % 4]}
                  opacity="0.15"
                />
              </svg>
            ) : i % 4 === 1 ? (
              // Circle
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill={["#FF7A00", "#FF3D00", "#FFD600", "#9D84B7"][i % 4]}
                  opacity="0.15"
                />
              </svg>
            ) : i % 4 === 2 ? (
              // Square
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="20"
                  y="20"
                  width="60"
                  height="60"
                  fill={["#FF7A00", "#FF3D00", "#FFD600", "#9D84B7"][i % 4]}
                  opacity="0.15"
                />
              </svg>
            ) : (
              // Pentagon
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <polygon
                  points="50,10 90,40 75,90 25,90 10,40"
                  fill={["#FF7A00", "#FF3D00", "#FFD600", "#9D84B7"][i % 4]}
                  opacity="0.15"
                />
              </svg>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
      />
    </section>
  )
}

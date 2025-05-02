"use client"

import { Parallax } from "react-scroll-parallax"
import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Card3D from "@/components/3d-card"

const skills = [
  {
    category: "Frontend",
    color: "#FF7A00",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M12 16.5C14.4853 16.5 16.5 14.4853 16.5 12C16.5 9.51472 14.4853 7.5 12 7.5C9.51472 7.5 7.5 9.51472 7.5 12C7.5 14.4853 9.51472 16.5 12 16.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12H4M20 12H22M12 4V2M12 22V20M19.0708 19.0703L17.6568 17.6563M6.34315 6.34277L4.92908 4.9287M19.0708 4.9287L17.6568 6.34277M6.34315 17.6563L4.92908 19.0703" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    category: "Backend",
    color: "#FF3D00",
    items: ["Node.js", "Express", "Python", "Django", "PostgreSQL"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M20 19V9C20 7.89543 19.1046 7 18 7H6C4.89543 7 4 7.89543 4 9V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 3L12 7L8 3M8 15L12 11L16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    category: "Design",
    color: "#FFD600",
    items: ["Figma", "Adobe XD", "UI/UX", "Responsive Design", "Wireframing"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M2 7.5C2 5.29086 3.79086 3.5 6 3.5H18C20.2091 3.5 22 5.29086 22 7.5V16.5C22 18.7091 20.2091 20.5 18 20.5H6C3.79086 20.5 2 18.7091 2 16.5V7.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 8.5V15.5M10 8.5V15.5M14 8.5V15.5M18 8.5V15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    category: "Tools",
    color: "#9D84B7",
    items: ["Git", "Docker", "AWS", "Vercel", "CI/CD"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M10.5 8.5L7.5 11.5L10.5 14.5M13.5 8.5L16.5 11.5L13.5 14.5M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"])
  const y2 = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5])
  const rotateNeg = useTransform(rotate, (v) => -v) 

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
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
              transition={{ duration: 3, repeat: Infinity }}
            >
              My{" "}
              <motion.span
                className="text-orange-500"
                animate={{ color: ["#FF7A00", "#FF3D00", "#FFD600", "#9D84B7", "#FF7A00"] }}
                transition={{ duration: 10, repeat: Infinity }}
              >
                Skills
              </motion.span>
            </motion.h2>
            <motion.p
              className="text-gray-300 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              I've worked with a variety of technologies and tools throughout my career. Here are some of the key skills
              I bring to the table.
            </motion.p>
          </motion.div>
        </Parallax>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              style={{
                y: index % 2 === 0 ? y1 : y2,
                rotate: index % 2 === 0 ? rotate : rotateNeg, 
              }}
              className="z-10"
            >
              <Card3D>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 h-full"
                  whileHover={{
                    borderColor: skillGroup.color,
                    boxShadow: `0 0 20px ${skillGroup.color}40`,
                  }}
                >
                  <div className="flex items-center mb-4">
                    <motion.div
                      className="mr-3"
                      style={{ color: skillGroup.color }}
                      animate={{
                        rotate: [0, 10, 0, -10, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: index * 0.5,
                      }}
                    >
                      {skillGroup.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold" style={{ color: skillGroup.color }}>
                      {skillGroup.category}
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {skillGroup.items.map((skill, skillIndex) => (
                      <motion.li
                        key={skill}
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, delay: 0.2 * skillIndex + 0.5 }}
                      >
                        <motion.div
                          className="w-2 h-2 rounded-full mr-3"
                          style={{ backgroundColor: skillGroup.color }}
                          animate={{
                            scale: [1, 1.5, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: skillIndex * 0.2,
                          }}
                        ></motion.div>
                        <span className="text-gray-300">{skill}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Abstract vector shapes */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        {[
          { d: "M0,20 Q30,40 60,20 T100,20", color: "#FF7A00", delay: 0.2 },
          { d: "M0,40 Q30,60 60,40 T100,40", color: "#FF3D00", delay: 0.4 },
          { d: "M0,60 Q30,80 60,60 T100,60", color: "#FFD600", delay: 0.6 },
          { d: "M0,80 Q30,100 60,80 T100,80", color: "#9D84B7", delay: 0.8 },
        ].map((wave, i) => (
          <motion.path
            key={i}
            d={wave.d}
            fill="none"
            stroke={wave.color}
            strokeWidth="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? 1 : 0 }}
            transition={{ duration: 1.5, delay: wave.delay }}
          />
        ))}
      </svg>

      {/* Decorative blobs */}
      <motion.div className="absolute top-1/3 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" style={{ y: y2 }} />
      <motion.div className="absolute bottom-1/3 left-0 w-64 h-64 bg-lavender-500/5 rounded-full blur-3xl" style={{ y: y1 }} />
    </section>
  )
}

"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function AbstractShapes() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Orange blob */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-orange-500 to-orange-600 opacity-20 blur-[100px]"
        style={{
          top: "10%",
          left: "5%",
          transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Red blob */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-red-600 to-red-500 opacity-20 blur-[100px]"
        style={{
          bottom: "5%",
          right: "10%",
          transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Yellow blob */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-20 blur-[100px]"
        style={{
          top: "60%",
          left: "30%",
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
        }}
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Lavender blob */}
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-r from-purple-400 to-purple-300 opacity-20 blur-[100px]"
        style={{
          top: "20%",
          right: "20%",
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Abstract vector shapes */}
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-30"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
        }}
      >
        <motion.path
          d="M100,200 Q400,50 700,300 T900,400"
          fill="none"
          stroke="#FF7A00"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.path
          d="M300,100 Q500,300 700,100 T900,300"
          fill="none"
          stroke="#FF3D00"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.7 }}
        />
        <motion.path
          d="M100,500 Q300,700 500,500 T900,600"
          fill="none"
          stroke="#FFD600"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.9 }}
        />
        <motion.path
          d="M200,800 Q400,600 600,800 T800,700"
          fill="none"
          stroke="#9D84B7"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1.1 }}
        />
      </svg>

      {/* Floating triangles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`triangle-${i}`}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 50 + 20}px`,
            height: `${Math.random() * 50 + 20}px`,
            transform: `translate(${mousePosition.x * (Math.random() * 40 - 20)}px, ${
              mousePosition.y * (Math.random() * 40 - 20)
            }px)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1, rotate: 360 }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: Math.random() * 5,
          }}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="50,15 100,100 0,100"
              fill={
                [
                  "#FF7A00",
                  "#FF3D00",
                  "#FFD600",
                  "#9D84B7",
                  "#FF7A00",
                  "#FF3D00",
                  "#FFD600",
                  "#9D84B7",
                  "#FF7A00",
                  "#FF3D00",
                ][i]
              }
            />
          </svg>
        </motion.div>
      ))}

      {/* Floating circles */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 30 + 10}px`,
            height: `${Math.random() * 30 + 10}px`,
            backgroundColor: [
              "#FF7A00",
              "#FF3D00",
              "#FFD600",
              "#9D84B7",
              "#FF7A00",
              "#FF3D00",
              "#FFD600",
              "#9D84B7",
              "#FF7A00",
              "#FF3D00",
            ][i],
            transform: `translate(${mousePosition.x * (Math.random() * 40 - 20)}px, ${
              mousePosition.y * (Math.random() * 40 - 20)
            }px)`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}

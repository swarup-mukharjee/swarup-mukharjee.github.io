import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Navbar from "@/components/navbar"
import { ParallaxProvider } from "@/components/parallax-provider"
// import VectorBackground from "@/components/vector-background"

export default function Home() {
  return (
    <ParallaxProvider>
      <main className="relative">
        {/* <VectorBackground color="#FF7A00" density={40} speed={0.3} /> */}
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </ParallaxProvider>
  )
}

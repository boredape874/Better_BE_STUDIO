import { MotionConfig } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProjectGallery from '@/components/ProjectGallery'
import Contact from '@/components/Contact'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="font-sans antialiased">
        <Navbar />
        <main>
          <Hero />
          <ProjectGallery />
          <Contact />
        </main>
        <footer className="py-8 text-center text-xs text-[#111111]/30 border-t border-[#E5E5E5]">
          © 2025 Better BE Studio — Minecraft BE 전문 주문제작
        </footer>
      </div>
    </MotionConfig>
  )
}

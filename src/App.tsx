import { MotionConfig } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProjectGallery from '@/components/ProjectGallery'
import Contact from '@/components/Contact'
import ScrollToTop from '@/components/ScrollToTop'
import PageIntro from '@/components/PageIntro'

export default function App() {
  return (
    <MotionConfig reducedMotion="never">
      <div className="font-sans antialiased">
        <PageIntro />
        <Navbar />
        <main>
          <Hero />
          <ProjectGallery />
          <Contact />
        </main>
        <footer className="py-8 text-center text-xs text-[#111111]/25 border-t border-[#111111]/6">
          © 2025 Better BE Studio
        </footer>
        <ScrollToTop />
      </div>
    </MotionConfig>
  )
}

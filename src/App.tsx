import { MotionConfig } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProjectGallery from '@/components/ProjectGallery'
import Contact from '@/components/Contact'
import PageIntro from '@/components/PageIntro'
import Cursor from '@/components/Cursor'
import ScrollProgress from '@/components/ScrollProgress'

export default function App() {
  return (
    <MotionConfig reducedMotion="never">
      <div className="font-sans antialiased">
        <Cursor />
        <ScrollProgress />
        <PageIntro />
        <Navbar />
        <main>
          <Hero />
          <ProjectGallery />
          <Contact />
        </main>
      </div>
    </MotionConfig>
  )
}

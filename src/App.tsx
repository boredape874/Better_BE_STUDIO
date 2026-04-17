import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProjectGallery from '@/components/ProjectGallery'
import Contact from '@/components/Contact'

export default function App() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <ProjectGallery />
        <Contact />
      </main>
      <footer className="py-8 text-center text-xs text-[#111111]/30 border-t border-[#E5E5E5]">
        © 2024 Better BE Studio
      </footer>
    </div>
  )
}

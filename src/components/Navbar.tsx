import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md border-b border-[#E5E5E5]' : 'bg-transparent'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="font-bold text-[#111111] tracking-tight text-lg">
        Better BE Studio{' '}
        <span className="text-xs font-normal text-[#111111]/40 tracking-widest uppercase ml-1">MCBE</span>
      </span>

      {/* 밑줄 확장 링크 */}
      <motion.a
        href="#contact"
        className="relative text-sm font-medium text-[#111111] overflow-hidden group"
        whileHover="hover"
      >
        문의하기
        <motion.span
          className="absolute bottom-0 left-0 h-px bg-[#111111]"
          variants={{
            hover: { width: '100%', transition: { duration: 0.3, ease: 'easeOut' } },
          }}
          initial={{ width: '0%' }}
        />
      </motion.a>
    </motion.nav>
  )
}

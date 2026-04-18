import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function ScrollProgress() {
  const containerRef = useRef<HTMLElement | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const el = document.getElementById('snap-root')
    if (el) {
      containerRef.current = el as HTMLElement
      setReady(true)
    }
  }, [])

  const { scrollYProgress } = useScroll(
    ready ? { container: containerRef as React.RefObject<HTMLElement> } : {}
  )
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-px bg-[#111111] origin-left z-[150] pointer-events-none"
      style={{ scaleX }}
    />
  )
}

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(true)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // 도트 — 즉각 반응
  const dotX = useSpring(mouseX, { stiffness: 2000, damping: 60 })
  const dotY = useSpring(mouseY, { stiffness: 2000, damping: 60 })

  // 링 — 부드러운 지연
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 22 })
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 22 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setHidden(false)
    }
    const leave = () => setHidden(true)
    const enter = () => setHidden(false)

    const onHoverStart = () => setHovered(true)
    const onHoverEnd = () => setHovered(false)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)

    const targets = document.querySelectorAll('a, button, [data-cursor]')
    targets.forEach((el) => {
      el.addEventListener('mouseenter', onHoverStart)
      el.addEventListener('mouseleave', onHoverEnd)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverStart)
        el.removeEventListener('mouseleave', onHoverEnd)
      })
    }
  }, [mouseX, mouseY])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null

  return (
    <>
      {/* 링 */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[200] rounded-full border border-[#111111]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovered ? 56 : 36,
          height: hovered ? 56 : 36,
          opacity: hidden ? 0 : hovered ? 0.5 : 0.25,
          backgroundColor: hovered ? 'rgba(17,17,17,0.08)' : 'transparent',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />

      {/* 도트 */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[200] rounded-full bg-[#111111]"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 5,
          height: 5,
        }}
        animate={{
          opacity: hidden ? 0 : 1,
          scale: hovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  )
}

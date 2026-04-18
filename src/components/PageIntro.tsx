import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const BRAND = 'BETTER BE STUDIO'
const SUB = 'MINECRAFT BE · 주문제작'

export default function PageIntro() {
  const [phase, setPhase] = useState<'in' | 'out'>('in')

  useEffect(() => {
    const t = setTimeout(() => setPhase('out'), 2800)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {phase === 'in' && (
        <motion.div
          className="fixed inset-0 z-[200] bg-[#111111] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* 가로선 드로우 */}
          <motion.div
            className="absolute w-full h-px bg-white/10"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeInOut' }}
            style={{ originX: 0 }}
          />

          {/* 브랜드명 */}
          <div className="flex items-center overflow-hidden">
            {BRAND.split('').map((char, i) => (
              <motion.span
                key={i}
                className={`text-white font-black leading-none ${char === ' ' ? 'w-4' : ''}`}
                style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.5 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </div>

          {/* 서브타이틀 */}
          <motion.p
            className="text-white/30 text-xs tracking-[0.45em] uppercase mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.6, ease: 'easeOut' }}
          >
            {SUB}
          </motion.p>

          {/* 로딩 바 */}
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-white/30"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.4, delay: 0.2, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

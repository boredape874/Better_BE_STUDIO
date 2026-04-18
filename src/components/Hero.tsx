import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import MagneticButton from './MagneticButton'
import TextScramble from './TextScramble'

const titleLines = [
  { text: 'Better BE', delay: 0.3 },
  { text: 'Studio', delay: 0.52 },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white overflow-hidden">

      <motion.div
        className="relative z-10 flex flex-col items-center"
        style={{ y: contentY }}
      >
        {/* 태그라인 — 스크램블 */}
        <motion.p
          className="text-[11px] font-semibold tracking-[0.5em] uppercase text-[#111111]/30 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <TextScramble text="MINECRAFT BE · 주문제작 스튜디오" delay={0.3} />
        </motion.p>

        {/* 타이틀 */}
        <h1 className="text-[clamp(4.5rem,13vw,10rem)] font-black text-[#111111] leading-[0.88] tracking-tight mb-12">
          {titleLines.map(({ text, delay }) => (
            <div key={text} className="overflow-hidden py-1">
              <motion.div
                initial={{ y: 120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
              >
                {text}
              </motion.div>
            </div>
          ))}
        </h1>

        {/* 설명 */}
        <motion.p
          className="text-base text-[#111111]/40 max-w-[280px] leading-loose mb-14"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.75, ease: 'easeOut' }}
        >
          HUD, 애드온, 리소스팩<br />원하는 것을 만들어 드립니다
        </motion.p>

        {/* 버튼 */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease: 'easeOut' }}
        >
          <MagneticButton>
            <motion.a
              href="#contact"
              className="relative overflow-hidden px-8 py-3 text-sm font-semibold border border-[#111111] text-white bg-[#111111] inline-block"
              whileHover="hover"
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 bg-white origin-bottom"
                variants={{ hover: { scaleY: 1 }, initial: { scaleY: 0 } }}
                initial="initial"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'bottom' }}
              />
              <motion.span
                className="relative z-10"
                variants={{ hover: { color: '#111111' }, initial: { color: '#ffffff' } }}
                transition={{ duration: 0.2 }}
              >
                제작 문의
              </motion.span>
            </motion.a>
          </MagneticButton>

          <MagneticButton>
            <motion.a
              href="#projects"
              className="relative overflow-hidden px-8 py-3 text-sm font-semibold border border-[#111111]/20 text-[#111111]/45 inline-block"
              whileHover="hover"
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 bg-[#111111] origin-bottom"
                variants={{ hover: { scaleY: 1 }, initial: { scaleY: 0 } }}
                initial="initial"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'bottom' }}
              />
              <motion.span
                className="relative z-10"
                variants={{ hover: { color: '#ffffff' }, initial: { color: 'rgba(17,17,17,0.45)' } }}
                transition={{ duration: 0.2 }}
              >
                작업물
              </motion.span>
            </motion.a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <div className="w-px h-12 overflow-hidden bg-[#111111]/8">
          <motion.div
            className="w-full h-full bg-[#111111]/35"
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}

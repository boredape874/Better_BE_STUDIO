import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import MagneticButton from './MagneticButton'
import TextScramble from './TextScramble'

const SPRING = { type: 'spring' as const, stiffness: 260, damping: 26, mass: 1 }

// 줄 단위 클립 리빌 + 블러 포커스인
function LineReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '103%' }}
        animate={{ y: '0%' }}
        transition={{ ...SPRING, delay }}
      >
        <motion.div
          initial={{ opacity: 0, filter: 'blur(14px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.65, delay: delay + 0.08, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  return (
    <section
      ref={ref}
      className="snap-section relative flex flex-col justify-center items-center text-center px-6 bg-white overflow-hidden"
    >
      {/* 타이틀 그라데이션 흐름 */}
      <style>{`
        @keyframes titleFlow {
          0%   { background-position: 200% center; }
          100% { background-position: 0% center; }
        }
        .title-flow {
          display: block;
          background: linear-gradient(
            90deg,
            #111111 0%,
            #111111 20%,
            #666666 40%,
            #111111 60%,
            #111111 80%,
            #666666 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: titleFlow 6s linear 2s infinite;
        }
      `}</style>

      <motion.div
        className="relative z-10 flex flex-col items-center"
        style={{ y: contentY }}
      >
        {/* 태그라인 */}
        <div className="overflow-hidden mb-10">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.5em] uppercase text-[#111111]/30"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...SPRING, delay: 0.2 }}
          >
            <TextScramble text="MINECRAFT BE · 주문제작 스튜디오" delay={0.3} />
          </motion.p>
        </div>

        {/* 타이틀 — 리빌 후 그라데이션 흐름 */}
        <h1 className="text-[clamp(4.5rem,13vw,10rem)] font-black leading-[0.92] tracking-tight mb-12">
          <LineReveal delay={0.35}>
            <span className="title-flow">Better BE</span>
          </LineReveal>
          <LineReveal delay={0.52}>
            <span className="title-flow">Studio</span>
          </LineReveal>
        </h1>

        {/* 설명 */}
        <div className="overflow-hidden mb-14">
          <motion.p
            className="text-base text-[#111111]/40 max-w-[280px] leading-loose"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...SPRING, delay: 0.76 }}
          >
            HUD, 애드온, 리소스팩<br />원하는 것을 만들어 드립니다
          </motion.p>
        </div>

        {/* 버튼 */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...SPRING, delay: 0.92 }}
        >
          <MagneticButton>
            <motion.a
              href="#contact"
              className="relative overflow-hidden px-8 py-3 text-sm font-semibold border border-[#111111] text-white bg-[#111111] inline-block"
              whileHover="hover"
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0 bg-white"
                variants={{ hover: { scaleY: 1 }, initial: { scaleY: 0 } }}
                initial="initial"
                style={{ transformOrigin: 'bottom' }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="relative z-10"
                variants={{ hover: { color: '#111111' }, initial: { color: '#ffffff' } }}
                transition={{ duration: 0.18 }}
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
                className="absolute inset-0 bg-[#111111]"
                variants={{ hover: { scaleY: 1 }, initial: { scaleY: 0 } }}
                initial="initial"
                style={{ transformOrigin: 'bottom' }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="relative z-10"
                variants={{ hover: { color: '#ffffff' }, initial: { color: 'rgba(17,17,17,0.45)' } }}
                transition={{ duration: 0.18 }}
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
        transition={{ delay: 1.3, duration: 0.8 }}
      >
        <div className="w-px h-12 overflow-hidden bg-[#111111]/8">
          <motion.div
            className="w-full h-full bg-[#111111]/30"
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}

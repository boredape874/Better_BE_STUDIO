import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

const titleLines = [
  { text: 'Better BE', delay: 0.2 },
  { text: 'Studio', delay: 0.38 },
]

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1200
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame((t) => step(t, startTime))
    }
    requestAnimationFrame((t) => step(t, t))
    return () => setCount(0)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  const orbY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white overflow-hidden">

      {/* 패럴랙스 블러 원 */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          y: orbY,
          background: 'radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center w-full max-w-5xl"
        style={{ y: contentY }}
      >
        {/* 태그라인 */}
        <div className="overflow-hidden mb-10">
          <motion.p
            className="text-[11px] font-bold tracking-[0.45em] uppercase text-[#111111]/30"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.05, ease: 'easeOut' }}
          >
            Minecraft Bedrock Edition · 전문 주문제작 스튜디오
          </motion.p>
        </div>

        {/* 클립 마스크 타이틀 */}
        <h1 className="text-[clamp(4rem,12vw,9rem)] font-black text-[#111111] leading-[0.88] tracking-tight mb-10">
          {titleLines.map(({ text, delay }) => (
            <div key={text} className="overflow-hidden">
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
              >
                {text}
              </motion.div>
            </div>
          ))}
        </h1>

        {/* 설명 */}
        <div className="overflow-hidden mb-14">
          <motion.p
            className="text-base md:text-lg text-[#111111]/45 max-w-xs leading-relaxed"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          >
            나만의 RPG 체력바, HUD, 애드온 —<br />원하는 것을 만들어 드립니다.
          </motion.p>
        </div>

        {/* 버튼 */}
        <motion.div
          className="flex flex-wrap gap-3 justify-center mb-20"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.78, ease: 'easeOut' }}
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              asChild
              className="bg-[#111111] text-white px-9 py-3 text-sm font-bold rounded-none
                         border border-[#111111] hover:bg-white hover:text-[#111111] transition-colors duration-300"
            >
              <a href="#contact">제작 문의하기</a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              asChild
              variant="outline"
              className="px-9 py-3 text-sm font-bold rounded-none border-[#111111]/15
                         text-[#111111]/50 hover:border-[#111111] hover:text-[#111111] transition-colors duration-300"
            >
              <a href="#projects">작업물 보기</a>
            </Button>
          </motion.div>
        </motion.div>

        {/* 카운터 스탯 */}
        <motion.div
          className="flex gap-10 sm:gap-16 border-t border-[#111111]/8 pt-8 w-full justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          {[
            { label: '최소 가격', value: <><Counter target={5} />만원~</> },
            { label: '평균 납기', value: <><Counter target={3} />일~</> },
            { label: '커스텀 가능', value: '100%' },
          ].map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center gap-1.5">
              <span className="text-2xl font-black text-[#111111] tabular-nums">{value}</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#111111]/30">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* 스크롤 인디케이터 */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <span className="text-[9px] tracking-[0.35em] uppercase text-[#111111]/20">scroll</span>
        <div className="w-px h-10 overflow-hidden bg-[#111111]/8">
          <motion.div
            className="w-full h-full bg-[#111111]/40"
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}

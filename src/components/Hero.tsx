import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'

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
        {/* 태그라인 */}
        <div className="overflow-hidden mb-10">
          <motion.p
            className="text-[11px] font-semibold tracking-[0.5em] uppercase text-[#111111]/30"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.1, ease: 'easeOut' }}
          >
            Minecraft BE · 주문제작 스튜디오
          </motion.p>
        </div>

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
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button asChild className="bg-[#111111] text-white px-8 py-3 text-sm font-semibold rounded-none border border-[#111111] hover:bg-white hover:text-[#111111] transition-colors duration-300">
              <a href="#contact">제작 문의</a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button asChild variant="outline" className="px-8 py-3 text-sm font-semibold rounded-none border-[#111111]/15 text-[#111111]/45 hover:border-[#111111] hover:text-[#111111] transition-colors duration-300">
              <a href="#projects">작업물</a>
            </Button>
          </motion.div>
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

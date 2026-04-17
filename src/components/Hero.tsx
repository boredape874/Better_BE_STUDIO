import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'

const titleLines = [
  { text: 'Better BE', delay: 0.2 },
  { text: 'Studio', delay: 0.35 },
]

const stats = [
  { label: '커스텀 HUD', value: 'HUD' },
  { label: '애드온 제작', value: 'ADD-ON' },
  { label: '리소스팩', value: 'R-PACK' },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white overflow-hidden">

      {/* 패럴랙스 배경 그리드 */}
      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          y: gridY,
          backgroundImage:
            'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* 숨쉬는 블러 원 */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full bg-black/[0.04] blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center w-full max-w-4xl"
        style={{ y: contentY }}
      >
        {/* 태그라인 */}
        <div className="overflow-hidden mb-8">
          <motion.p
            className="text-xs font-semibold tracking-[0.4em] uppercase text-[#111111]/35"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.05, ease: 'easeOut' }}
          >
            Minecraft Bedrock Edition · 전문 주문제작 스튜디오
          </motion.p>
        </div>

        {/* 클립 마스크 타이틀 */}
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-black text-[#111111] leading-[0.9] tracking-tight mb-10">
          {titleLines.map(({ text, delay }) => (
            <div key={text} className="overflow-hidden">
              <motion.div
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
              >
                {text}
              </motion.div>
            </div>
          ))}
        </h1>

        {/* 설명 */}
        <div className="overflow-hidden mb-12">
          <motion.p
            className="text-base md:text-lg text-[#111111]/50 max-w-sm leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
          >
            나만의 RPG 체력바, HUD, 애드온 —<br />원하는 것을 만들어 드립니다.
          </motion.p>
        </div>

        {/* 버튼 */}
        <motion.div
          className="flex gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease: 'easeOut' }}
        >
          <Button
            asChild
            className="bg-[#111111] text-white px-8 py-3 text-sm font-semibold rounded-none
                       border border-[#111111] hover:bg-white hover:text-[#111111] transition-colors duration-300"
          >
            <a href="#contact">제작 문의하기</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="px-8 py-3 text-sm font-semibold rounded-none border-[#111111]/20
                       text-[#111111]/60 hover:border-[#111111] hover:text-[#111111] transition-colors duration-300"
          >
            <a href="#projects">작업물 보기</a>
          </Button>
        </motion.div>

        {/* 스탯 배지 */}
        <motion.div
          className="flex gap-6 sm:gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {stats.map(({ label, value }, i) => (
            <motion.div
              key={value}
              className="flex flex-col items-center gap-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }}
            >
              <span className="text-[10px] font-bold tracking-[0.25em] text-[#111111]/25 uppercase">{value}</span>
              <span className="text-xs text-[#111111]/40">{label}</span>
            </motion.div>
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
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#111111]/25">scroll</span>
        <div className="w-px h-10 overflow-hidden bg-[#111111]/10">
          <motion.div
            className="w-full h-full bg-[#111111]/40"
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}

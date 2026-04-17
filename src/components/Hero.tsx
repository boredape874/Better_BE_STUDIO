import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const titleWords = ['Better', 'BE', 'Studio']

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
}

const wordVariants = {
  hidden: { opacity: 0, y: 60, skewY: 8 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.7, ease: 'easeOut' as const },
  },
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
})

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white overflow-hidden">
      {/* 배경 그리드 */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* 배경 블러 원 */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-black/5 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <motion.p
          className="text-xs font-semibold tracking-[0.35em] uppercase text-[#111111]/40 mb-8"
          {...fadeUp(0.1)}
        >
          Minecraft BE · 전문 주문제작 스튜디오
        </motion.p>

        {/* 단어별 슬라이드업 타이틀 */}
        <motion.h1
          className="text-6xl md:text-8xl font-black text-[#111111] leading-none mb-8 tracking-tight"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {titleWords.map((word) => (
            <span key={word} className="inline-block overflow-hidden mr-4 last:mr-0">
              <motion.span className="inline-block" variants={wordVariants}>
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-[#111111]/55 max-w-sm mb-12 leading-relaxed"
          {...fadeUp(0.85)}
        >
          마인크래프트 BE 전용 HUD, 애드온, 리소스팩 —<br />원하는 것을 만들어 드립니다.
        </motion.p>

        <motion.div className="flex gap-4" {...fadeUp(1)}>
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
                       text-[#111111]/70 hover:border-[#111111] hover:text-[#111111] transition-colors duration-300"
          >
            <a href="#projects">작업물 보기</a>
          </Button>
        </motion.div>

        {/* 스크롤 인디케이터 */}
        <motion.div
          className="absolute bottom-[-120px] flex flex-col items-center gap-2"
          {...fadeUp(1.3)}
        >
          <span className="text-[10px] tracking-[0.25em] uppercase text-[#111111]/30">scroll</span>
          <motion.div
            className="w-px h-10 bg-[#111111]/20"
            animate={{ scaleY: [0, 1, 0] }}
            style={{ originY: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  )
}

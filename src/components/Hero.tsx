import { motion } from 'framer-motion'
import type { Easing } from 'framer-motion'
import { Button } from '@/components/ui/button'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' as Easing },
})

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white">
      <motion.p
        className="text-sm font-medium tracking-[0.2em] uppercase text-[#111111]/50 mb-4"
        {...fadeUp(0)}
      >
        Freelance · Custom Development
      </motion.p>
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-[#111111] leading-tight mb-6"
        {...fadeUp(0.15)}
      >
        Better BE<br />Studio
      </motion.h1>
      <motion.p
        className="text-lg text-[#111111]/60 max-w-md mb-10"
        {...fadeUp(0.3)}
      >
        웹사이트, 쇼핑몰, 대시보드 — 원하는 것을 만들어 드립니다.
      </motion.p>
      <motion.div {...fadeUp(0.45)}>
        <Button
          asChild
          className="relative overflow-hidden bg-[#111111] text-white px-8 py-3 text-sm font-medium rounded-none hover:bg-white hover:text-[#111111] border border-[#111111] transition-colors duration-300"
        >
          <a href="#contact">문의하기</a>
        </Button>
      </motion.div>
    </section>
  )
}

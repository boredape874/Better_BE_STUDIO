import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, MotionConfig, useAnimationControls } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProjectGallery from '@/components/ProjectGallery'
import Contact from '@/components/Contact'
import PageIntro from '@/components/PageIntro'
import Cursor from '@/components/Cursor'
import ScrollProgress from '@/components/ScrollProgress'

const SECTIONS = [
  { id: 'hero',     label: '',              title: '' },
  { id: 'projects', label: '01 · Projects', title: '작업물' },
  { id: 'contact',  label: '02 · Contact',  title: '제작 문의' },
]

export default function App() {
  const currentRef  = useRef(0)
  const isMoving    = useRef(false)
  const curtainCtrl = useAnimationControls()
  const [curtainLabel, setCurtainLabel] = useState('')
  const [curtainTitle, setCurtainTitle] = useState('')
  const [showTitle,    setShowTitle]    = useState(false)

  const goTo = useCallback(async (next: number) => {
    if (isMoving.current) return
    if (next < 0 || next >= SECTIONS.length) return
    if (next === currentRef.current) return

    isMoving.current = true
    const target = SECTIONS[next]

    // 1. 커튼을 즉시 뷰포트 위로 올려 덮음
    curtainCtrl.set({ y: '0%' })
    setShowTitle(false)

    if (target.title) {
      // 2. 섹션 제목 표시
      setCurtainLabel(target.label)
      setCurtainTitle(target.title)
      setShowTitle(true)
      await new Promise<void>(r => setTimeout(r, 1050))
    } else {
      // Hero로 돌아갈 때 — 제목 없이 짧은 대기
      await new Promise<void>(r => setTimeout(r, 80))
    }

    // 3. 해당 섹션으로 즉시 이동 (커튼 뒤에서)
    document.getElementById(target.id)?.scrollIntoView({ behavior: 'instant' })
    await new Promise<void>(r => setTimeout(r, 60))

    // 4. 커튼 위로 슬라이드 — PageIntro와 동일한 이징
    await curtainCtrl.start(
      { y: '-105%' },
      { duration: 1.0, ease: [0.76, 0, 0.24, 1] }
    )

    setShowTitle(false)
    currentRef.current = next
    isMoving.current = false
  }, [curtainCtrl])

  // 마우스 휠
  useEffect(() => {
    let last = 0
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const now = Date.now()
      if (now - last < 250) return
      last = now
      goTo(currentRef.current + (e.deltaY > 0 ? 1 : -1))
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [goTo])

  // 터치
  useEffect(() => {
    let sy = 0
    const onStart = (e: TouchEvent) => { sy = e.touches[0].clientY }
    const onEnd   = (e: TouchEvent) => {
      const dy = sy - e.changedTouches[0].clientY
      if (Math.abs(dy) < 40) return
      goTo(currentRef.current + (dy > 0 ? 1 : -1))
    }
    const onMove = (e: TouchEvent) => e.preventDefault()
    window.addEventListener('touchstart', onStart)
    window.addEventListener('touchend',   onEnd)
    window.addEventListener('touchmove',  onMove, { passive: false })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend',   onEnd)
      window.removeEventListener('touchmove',  onMove)
    }
  }, [goTo])

  // 키보드
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown'].includes(e.key)) goTo(currentRef.current + 1)
      if (['ArrowUp',   'PageUp'  ].includes(e.key)) goTo(currentRef.current - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goTo])

  return (
    <MotionConfig reducedMotion="never">
      <div className="font-sans antialiased">
        <Cursor />
        <ScrollProgress />
        <PageIntro />
        <Navbar />

        {/* ── 전역 커튼 (fixed, z-100) ── */}
        <motion.div
          animate={curtainCtrl}
          initial={{ y: '-105%' }}
          className="fixed inset-0 z-[100] bg-[#111111] flex flex-col items-center justify-center pointer-events-none"
        >
          <AnimatePresence>
            {showTitle && curtainTitle && (
              <motion.div
                key={curtainTitle}
                className="text-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-white/30 text-[11px] tracking-[0.5em] uppercase mb-6">
                  {curtainLabel}
                </p>
                <h2
                  className="text-white font-black tracking-tight leading-none"
                  style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}
                >
                  {curtainTitle}
                </h2>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 하단 진행 바 */}
          <AnimatePresence>
            {showTitle && (
              <motion.div
                key="bar"
                className="absolute bottom-0 left-0 h-px bg-white/25"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.95, delay: 0.1, ease: 'easeInOut' }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        <main>
          <Hero />
          <ProjectGallery />
          <Contact />
        </main>
      </div>
    </MotionConfig>
  )
}

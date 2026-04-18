import { useEffect, useState, useRef } from 'react'
import { useInView } from 'framer-motion'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·'

interface Props {
  text: string
  className?: string
  delay?: number
  speed?: number
}

export default function TextScramble({ text, className = '', delay = 0, speed = 40 }: Props) {
  const [display, setDisplay] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    let frame = 0
    let rafId: number
    const totalFrames = Math.floor(text.length * 2.5)

    const timeout = setTimeout(() => {
      const tick = () => {
        setDisplay(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' '
              if (frame > i * 2) return char
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
        )
        frame++
        if (frame <= totalFrames) {
          rafId = requestAnimationFrame(tick)
        } else {
          setDisplay(text)
        }
      }
      rafId = requestAnimationFrame(tick)
    }, delay * 1000)

    return () => {
      clearTimeout(timeout)
      cancelAnimationFrame(rafId)
    }
  }, [inView, text, delay, speed])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

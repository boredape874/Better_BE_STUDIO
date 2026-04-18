import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  href?: string
  strength?: number
}

export default function MagneticButton({ children, className = '', href, strength = 0.35 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    })
  }

  const onLeave = () => setPos({ x: 0, y: 0 })

  const Comp = href ? 'a' : 'div'

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      <motion.div
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <Comp href={href} className={className}>
          {children}
        </Comp>
      </motion.div>
    </div>
  )
}

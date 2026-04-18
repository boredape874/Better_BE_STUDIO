import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function PageIntro() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111111] pointer-events-none"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        >
          <motion.span
            className="text-white text-2xl font-black tracking-tight"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Better BE Studio
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

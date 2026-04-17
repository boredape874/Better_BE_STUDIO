import { motion } from 'framer-motion'

const items = [
  'CUSTOM HUD', '·', 'ADDON', '·', 'RESOURCE PACK', '·',
  'BEDROCK EDITION', '·', '주문제작', '·', '커스텀 HUD', '·',
  'MINECRAFT BE', '·', '리소스팩', '·', '애드온', '·',
]

const repeated = [...items, ...items, ...items]

export default function Marquee() {
  return (
    <div className="w-full overflow-hidden bg-[#111111] py-4 select-none">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className={`text-xs font-bold tracking-[0.2em] uppercase shrink-0 ${
              item === '·' ? 'text-white/20' : 'text-white/70'
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

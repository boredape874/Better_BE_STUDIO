import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { projects } from '@/data/projects'

export default function ProjectGallery() {
  return (
    <section id="projects" className="snap-section relative bg-[#F8F8F8] overflow-hidden flex items-center">

      {/* ── 커튼 타이틀카드 ── */}
      <motion.div
        className="absolute inset-0 bg-[#111111] z-20 pointer-events-none flex flex-col items-center justify-center gap-5"
        initial={{ y: '0%' }}
        whileInView={{ y: '-101%' }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ duration: 1.1, delay: 1.0, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* 커튼 안 타이틀 */}
        <motion.div
          className="text-center overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-white/30 text-[11px] tracking-[0.5em] uppercase mb-5">
            01 · Projects
          </p>
          <h2 className="text-white font-black tracking-tight leading-none"
            style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}>
            작업물
          </h2>
        </motion.div>

        {/* 하단 진행 바 */}
        <motion.div
          className="absolute bottom-0 left-0 h-px bg-white/20"
          initial={{ width: '0%' }}
          whileInView={{ width: '100%' }}
          viewport={{ once: false }}
          transition={{ duration: 0.95, delay: 0.15, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* ── 실제 콘텐츠 ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24">

        <div className="mb-14">
          <motion.p
            className="text-[10px] font-semibold tracking-[0.45em] uppercase text-[#111111]/25 mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Projects
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              className="text-4xl font-black text-[#111111] tracking-tight"
              initial={{ y: '105%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              작업물
            </motion.h2>
          </div>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
          }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: {
                  opacity: 1, y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

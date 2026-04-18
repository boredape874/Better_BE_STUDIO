import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { projects } from '@/data/projects'

export default function ProjectGallery() {
  return (
    <section id="projects" className="relative py-32 px-6 bg-[#F8F8F8] overflow-hidden">

      {/* 배경 섹션 번호 */}
      <motion.span
        className="absolute right-6 top-12 text-[clamp(8rem,22vw,18rem)] font-black leading-none select-none pointer-events-none"
        style={{ color: 'rgba(17,17,17,0.04)' }}
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        01
      </motion.span>

      <div className="max-w-5xl mx-auto">

        {/* 섹션 구분선 */}
        <motion.div
          className="w-full h-px bg-[#111111]/10 mb-16 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* 헤딩 */}
        <div className="mb-16">

          {/* 레이블 — 왼쪽에서 슬라이드인 */}
          <div className="overflow-hidden mb-4">
            <motion.p
              className="text-[10px] font-semibold tracking-[0.45em] uppercase text-[#111111]/25"
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              Projects
            </motion.p>
          </div>

          {/* 헤딩 — 블러 + 클립 리빌 */}
          <div className="overflow-hidden">
            <motion.div
              initial={{ y: '103%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.h2
                className="text-4xl font-black text-[#111111] tracking-tight"
                initial={{ opacity: 0, filter: 'blur(12px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.62, ease: 'easeOut' }}
              >
                작업물
              </motion.h2>
            </motion.div>
          </div>
        </div>

        {/* 카드 */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } } }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.96 },
                visible: {
                  opacity: 1, y: 0, scale: 1,
                  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
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

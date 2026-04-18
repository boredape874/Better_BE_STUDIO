import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { projects } from '@/data/projects'

export default function ProjectGallery() {
  return (
    <section id="projects" className="relative py-32 px-6 bg-[#F8F8F8] overflow-hidden">

      {/* 커튼 — 위로 슬라이드하며 섹션 오픈 */}
      <motion.div
        className="absolute inset-0 bg-[#111111] z-10 pointer-events-none"
        initial={{ y: '0%' }}
        whileInView={{ y: '-101%' }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      />

      <div className="max-w-5xl mx-auto">

        {/* 헤딩 */}
        <div className="mb-16">
          <motion.p
            className="text-[10px] font-semibold tracking-[0.45em] uppercase text-[#111111]/25 mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6, ease: 'easeOut' }}
          >
            Projects
          </motion.p>

          <div className="overflow-hidden">
            <motion.h2
              className="text-4xl font-black text-[#111111] tracking-tight"
              initial={{ y: '105%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              작업물
            </motion.h2>
          </div>
        </div>

        {/* 카드 */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.9 } },
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

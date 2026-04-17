import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { projects } from '@/data/projects'

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function ProjectGallery() {
  return (
    <section id="projects" className="py-28 px-6 bg-[#F8F8F8]">
      <div className="max-w-6xl mx-auto">

        {/* 섹션 헤딩 — 클립 마스크 reveal */}
        <div className="flex items-end justify-between mb-16 border-b border-[#111111]/8 pb-8">
          <div>
            <motion.p
              className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#111111]/30 mb-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Projects
            </motion.p>
            <div className="overflow-hidden">
              <motion.h2
                className="text-4xl md:text-5xl font-black text-[#111111] tracking-tight"
                initial={{ y: '100%' }}
                whileInView={{ y: '0%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                작업물
              </motion.h2>
            </div>
          </div>
          <motion.span
            className="text-[#111111]/15 text-6xl font-black tabular-nums"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {String(projects.length).padStart(2, '0')}
          </motion.span>
        </div>

        {/* 카드 그리드 */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

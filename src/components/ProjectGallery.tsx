import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { projects } from '@/data/projects'

export default function ProjectGallery() {
  return (
    <section id="projects" className="py-32 px-6 bg-[#F8F8F8]">
      <div className="max-w-5xl mx-auto">

        {/* 섹션 구분선 드로우 */}
        <motion.div
          className="w-full h-px bg-[#111111]/10 mb-16 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />

        {/* 헤딩 */}
        <div className="mb-16">
          <motion.p
            className="text-[10px] font-semibold tracking-[0.45em] uppercase text-[#111111]/25 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Projects
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2
              className="text-4xl font-black text-[#111111] tracking-tight"
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
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
          viewport={{ once: true, margin: '-60px' }}
          variants={{ visible: { transition: { staggerChildren: 0.18 } } }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, x: 80, scale: 0.97 },
                visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
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

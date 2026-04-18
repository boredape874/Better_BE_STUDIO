import { useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import type { Project } from '@/data/projects'

interface Props {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  const [playing, setPlaying] = useState(false)
  const thumbnailUrl = `https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`

  return (
    <motion.div
      className="relative bg-white border border-[#E5E5E5] overflow-hidden group cursor-pointer"
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={{ rest: { y: 0, boxShadow: '0 0px 0px 0px rgba(0,0,0,0)' }, hover: { y: -6, boxShadow: '0 20px 60px -10px rgba(0,0,0,0.12)', transition: { duration: 0.3, ease: 'easeOut' } } }}
    >
      {/* 호버 시 테두리 강조 */}
      <motion.div
        className="absolute inset-0 border border-[#111111] z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* 비디오 영역 */}
      <div
        className="relative aspect-video bg-[#F5F5F5] overflow-hidden"
        onClick={() => setPlaying(true)}
      >
        {playing ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1`}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <motion.img
              src={thumbnailUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              loading="lazy"
              decoding="async"
            />

            {/* 다크 오버레이 */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-400" />

            {/* 재생 버튼 — 아래서 올라오는 효과 */}
            <div className="absolute inset-0 flex items-end justify-center pb-5 pointer-events-none">
              <motion.div
                className="flex items-center gap-2 bg-white px-5 py-2.5"
                initial={{ y: 20, opacity: 0 }}
                variants={{
                  rest: { y: 20, opacity: 0 },
                  hover: { y: 0, opacity: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
                }}
              >
                <svg className="w-4 h-4 text-[#111111]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="text-xs font-bold text-[#111111] tracking-wider uppercase">Play</span>
              </motion.div>
            </div>
          </>
        )}
      </div>

      {/* 카드 정보 */}
      <div className="p-5">
        <h3 className="font-bold text-[#111111] text-base mb-1.5 group-hover:text-[#111111] transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-[#111111]/55 mb-4 leading-relaxed">{project.description}</p>
        {project.price && (
          <Badge
            variant="outline"
            className="text-xs font-semibold border-[#111111]/30 text-[#111111]/70 rounded-none
                       group-hover:border-[#111111] group-hover:text-[#111111] transition-colors duration-200"
          >
            {project.price}
          </Badge>
        )}
      </div>
    </motion.div>
  )
}

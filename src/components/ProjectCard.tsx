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
      whileHover={{ y: -6, boxShadow: '0 20px 60px -10px rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
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
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

            {/* 재생 버튼 */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-16 h-16 bg-white flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0 }}
                whileHover={{ scale: 1.05 }}
                animate={{ scale: 1 }}
              >
                <motion.div
                  className="w-16 h-16 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100"
                >
                  <svg className="w-6 h-6 text-[#111111] ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>

            {/* 샤인 스윕 효과 */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
                backgroundSize: '200% 100%',
              }}
              initial={{ backgroundPositionX: '200%' }}
              whileHover={{ backgroundPositionX: '-50%' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
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

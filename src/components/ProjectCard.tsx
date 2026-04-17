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
      className="bg-white border border-[#E5E5E5] overflow-hidden group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="relative aspect-video bg-[#F5F5F5] overflow-hidden cursor-pointer"
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
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3 }}
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="w-14 h-14 bg-white flex items-center justify-center">
                <svg className="w-6 h-6 text-[#111111] ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-[#111111] text-base mb-1">{project.title}</h3>
        <p className="text-sm text-[#111111]/60 mb-3">{project.description}</p>
        {project.price && (
          <Badge variant="outline" className="text-xs font-medium border-[#111111] text-[#111111] rounded-none">
            {project.price}
          </Badge>
        )}
      </div>
    </motion.div>
  )
}

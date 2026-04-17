export interface Project {
  id: string
  youtubeId: string
  title: string
  description: string
  price?: string | null
}

export const projects: Project[] = [
  {
    id: '1',
    youtubeId: 'tlETfmfPRtw',
    title: '커스텀 HUD 제작',
    description: '나만의 RPG 체력바 등 제작 가능',
    price: '50,000원~',
  },
]

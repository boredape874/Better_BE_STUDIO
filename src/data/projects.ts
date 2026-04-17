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
    youtubeId: 'dQw4w9WgXcQ',
    title: '쇼핑몰 웹사이트 제작',
    description: '반응형 쇼핑몰 풀스택 개발. React + Node.js 기반.',
    price: '300,000원~',
  },
  {
    id: '2',
    youtubeId: 'dQw4w9WgXcQ',
    title: '랜딩 페이지 제작',
    description: '브랜드 아이덴티티에 맞는 고퀄리티 랜딩 페이지.',
    price: null,
  },
  {
    id: '3',
    youtubeId: 'dQw4w9WgXcQ',
    title: '관리자 대시보드',
    description: '실시간 데이터 시각화 및 CRUD 관리자 페이지.',
    price: '500,000원~',
  },
]

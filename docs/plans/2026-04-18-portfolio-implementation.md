# Better BE Studio Portfolio — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a flat-design React portfolio site emphasizing freelance/custom development work, hosted on GitHub Pages via GitHub Actions.

**Architecture:** Single Page Application with Hero → Projects → Contact scroll layout. YouTube facade pattern for performance (thumbnail shown first, iframe loaded on click). Stagger animations via Framer Motion on scroll entry.

**Tech Stack:** Vite + React 18 + TypeScript, shadcn/ui + Tailwind CSS, Framer Motion, GitHub Actions + gh-pages

---

## Task 1: Vite + React + TypeScript 프로젝트 초기화

**Files:**
- Modify: `package.json` (생성됨)
- Modify: `vite.config.ts`
- Modify: `index.html`
- Delete: `src/App.css`, `src/assets/react.svg`, `public/vite.svg`

**Step 1: 기존 파일 확인 후 Vite 프로젝트 스캐폴드**

```bash
cd "C:\Users\champ\OneDrive\문서\개발\내 포트폴리오\Better_BE_STUDIO"
npm create vite@latest . -- --template react-ts
```
프롬프트에서 "Ignore files and continue" 선택.

**Step 2: 의존성 설치**

```bash
npm install
npm install framer-motion
npm install -D tailwindcss @tailwindcss/vite
```

**Step 3: `vite.config.ts` 수정 — base 경로 + Tailwind 플러그인 설정**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/Better_BE_STUDIO/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

**Step 4: `src/index.css` 교체 — Tailwind 임포트만 남기기**

```css
@import "tailwindcss";
```

**Step 5: `src/App.tsx` 최소화**

```tsx
export default function App() {
  return <div>Better BE Studio</div>
}
```

**Step 6: 로컬 서버 확인**

```bash
npm run dev
```
브라우저에서 "Better BE Studio" 텍스트 확인.

**Step 7: 불필요한 파일 삭제**

```bash
rm src/App.css src/assets/react.svg public/vite.svg
```

**Step 8: 커밋**

```bash
git add -A
git commit -m "chore: initialize Vite + React + TypeScript + Tailwind"
```

---

## Task 2: shadcn/ui 설치 및 설정

**Files:**
- Create: `components.json`
- Modify: `tsconfig.json`, `tsconfig.app.json`

**Step 1: `tsconfig.app.json`에 경로 alias 추가**

`compilerOptions` 안에 추가:
```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

**Step 2: shadcn/ui 초기화**

```bash
npx shadcn@latest init
```

프롬프트 답변:
- Style: `Default`
- Base color: `Neutral`
- CSS variables: `Yes`

**Step 3: 필요한 shadcn 컴포넌트 추가**

```bash
npx shadcn@latest add button badge card
```

**Step 4: 커밋**

```bash
git add -A
git commit -m "chore: add shadcn/ui with button, badge, card components"
```

---

## Task 3: 프로젝트 데이터 타입 & 샘플 데이터

**Files:**
- Create: `src/data/projects.ts`

**Step 1: `src/data/projects.ts` 작성**

```ts
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
```

**Step 2: 커밋**

```bash
git add src/data/projects.ts
git commit -m "feat: add project data types and sample data"
```

---

## Task 4: Navbar 컴포넌트

**Files:**
- Create: `src/components/Navbar.tsx`

**Step 1: `src/components/Navbar.tsx` 작성**

스크롤 감지 → 일정 높이 이상이면 배경 + blur 적용.

```tsx
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md border-b border-[#E5E5E5]' : 'bg-transparent'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="font-bold text-[#111111] tracking-tight text-lg">
        Better BE Studio
      </span>
      <a
        href="#contact"
        className="text-sm font-medium text-[#111111] hover:opacity-60 transition-opacity"
      >
        문의하기
      </a>
    </motion.nav>
  )
}
```

**Step 2: `App.tsx`에 임시로 Navbar 추가해서 동작 확인**

```tsx
import Navbar from '@/components/Navbar'

export default function App() {
  return (
    <>
      <Navbar />
      <div style={{ height: '200vh' }}>스크롤 테스트</div>
    </>
  )
}
```

**Step 3: `npm run dev` 로 스크롤 시 Navbar blur 동작 확인**

**Step 4: 커밋**

```bash
git add src/components/Navbar.tsx src/App.tsx
git commit -m "feat: add Navbar with scroll-aware backdrop blur"
```

---

## Task 5: Hero 섹션

**Files:**
- Create: `src/components/Hero.tsx`

**Step 1: `src/components/Hero.tsx` 작성**

```tsx
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-white">
      <motion.p
        className="text-sm font-medium tracking-[0.2em] uppercase text-[#111111]/50 mb-4"
        {...fadeUp(0)}
      >
        Freelance · Custom Development
      </motion.p>
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-[#111111] leading-tight mb-6"
        {...fadeUp(0.15)}
      >
        Better BE<br />Studio
      </motion.h1>
      <motion.p
        className="text-lg text-[#111111]/60 max-w-md mb-10"
        {...fadeUp(0.3)}
      >
        웹사이트, 쇼핑몰, 대시보드 — 원하는 것을 만들어 드립니다.
      </motion.p>
      <motion.div {...fadeUp(0.45)}>
        <Button
          asChild
          className="relative overflow-hidden bg-[#111111] text-white px-8 py-3 text-sm font-medium rounded-none
                     hover:bg-white hover:text-[#111111] border border-[#111111] transition-colors duration-300"
        >
          <a href="#contact">문의하기</a>
        </Button>
      </motion.div>
    </section>
  )
}
```

**Step 2: `App.tsx`에 Hero 추가 후 `npm run dev`로 확인**

fade-up 애니메이션 순서대로 등장하는지 확인.

**Step 3: 커밋**

```bash
git add src/components/Hero.tsx src/App.tsx
git commit -m "feat: add Hero section with staggered fade-up animation"
```

---

## Task 6: ProjectCard 컴포넌트 (YouTube 파사드 패턴)

**Files:**
- Create: `src/components/ProjectCard.tsx`

**Step 1: `src/components/ProjectCard.tsx` 작성**

썸네일 상태에서 클릭 시 iframe으로 교체. 가격은 price가 있을 때만 표시.

```tsx
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
      {/* 비디오 영역 */}
      <div className="relative aspect-video bg-[#F5F5F5] overflow-hidden cursor-pointer"
           onClick={() => setPlaying(true)}>
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
            {/* 재생 버튼 오버레이 */}
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

      {/* 카드 정보 */}
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
```

**Step 2: `npm run dev`에서 단독으로 카드 하나 임시 렌더링해서 확인**

`App.tsx`에 임시 추가:
```tsx
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/data/projects'
// ...
<ProjectCard project={projects[0]} />
```

썸네일 → 클릭 → iframe 재생, 호버 시 재생 버튼 오버레이 확인.

**Step 3: 커밋**

```bash
git add src/components/ProjectCard.tsx
git commit -m "feat: add ProjectCard with YouTube facade pattern"
```

---

## Task 7: ProjectGallery 컴포넌트 (stagger 애니메이션)

**Files:**
- Create: `src/components/ProjectGallery.tsx`

**Step 1: `src/components/ProjectGallery.tsx` 작성**

스크롤 진입 시 카드가 순서대로 fade-up.

```tsx
import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { projects } from '@/data/projects'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function ProjectGallery() {
  return (
    <section id="projects" className="py-24 px-6 bg-[#F5F5F5]">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl font-bold text-[#111111] mb-2"
          variants={itemVariants}
        >
          작업물
        </motion.h2>
        <motion.p
          className="text-sm text-[#111111]/50 mb-12 tracking-wide uppercase"
          variants={itemVariants}
        >
          Projects
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
```

**Step 2: `npm run dev`에서 스크롤 진입 시 stagger 확인**

**Step 3: 커밋**

```bash
git add src/components/ProjectGallery.tsx
git commit -m "feat: add ProjectGallery with scroll-triggered stagger animation"
```

---

## Task 8: Contact 섹션

**Files:**
- Create: `src/components/Contact.tsx`

**Step 1: `src/components/Contact.tsx` 작성**

실제 연락처 정보(카카오톡 오픈채팅 URL, 이메일 등)는 나중에 교체.

```tsx
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const KAKAO_URL = 'https://open.kakao.com/YOUR_LINK'
const EMAIL = 'your@email.com'

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-white">
      <motion.div
        className="max-w-xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-bold text-[#111111] mb-2">문의하기</h2>
        <p className="text-sm text-[#111111]/50 mb-12 tracking-wide uppercase">Contact</p>
        <p className="text-[#111111]/70 mb-10 leading-relaxed">
          웹사이트, 쇼핑몰, 대시보드 등 어떤 프로젝트든 편하게 연락 주세요.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-[#FEE500] text-[#111111] hover:bg-[#FEE500]/80 rounded-none font-medium px-8"
          >
            <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer">
              카카오톡 문의
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white rounded-none font-medium px-8 transition-colors duration-300"
          >
            <a href={`mailto:${EMAIL}`}>이메일 문의</a>
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
```

**Step 2: 커밋**

```bash
git add src/components/Contact.tsx
git commit -m "feat: add Contact section with Kakao and email buttons"
```

---

## Task 9: App.tsx 최종 조립

**Files:**
- Modify: `src/App.tsx`

**Step 1: 모든 컴포넌트를 App.tsx에 조립**

```tsx
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ProjectGallery from '@/components/ProjectGallery'
import Contact from '@/components/Contact'

export default function App() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <main>
        <Hero />
        <ProjectGallery />
        <Contact />
      </main>
      <footer className="py-8 text-center text-xs text-[#111111]/30 border-t border-[#E5E5E5]">
        © 2024 Better BE Studio
      </footer>
    </div>
  )
}
```

**Step 2: `npm run dev`로 전체 페이지 흐름 확인**

- Navbar 스크롤 blur ✓
- Hero fade-up 순서 ✓
- Projects stagger ✓
- 카드 YouTube 파사드 ✓
- Contact 등장 애니메이션 ✓

**Step 3: `npm run build`로 빌드 에러 없는지 확인**

```bash
npm run build
```
Expected: `dist/` 폴더 생성, 에러 없음.

**Step 4: 커밋**

```bash
git add src/App.tsx
git commit -m "feat: assemble full single-page layout"
```

---

## Task 10: GitHub Actions 자동 배포 설정

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: `.github/workflows/deploy.yml` 작성**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to gh-pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**Step 2: 커밋 & 푸시**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add GitHub Actions deploy workflow"
git push origin main
```

**Step 3: GitHub 레포 Pages 설정 (최초 1회)**

1. `https://github.com/boredape874/Better_BE_STUDIO` → Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / **/ (root)**
4. Save

Actions 탭에서 워크플로우 실행 확인 후 `https://boredape874.github.io/Better_BE_STUDIO/` 접속 확인.

**Step 4: 배포 확인**

사이트가 정상 로드되면 완료.

---

## Task 11: 실제 데이터 & 연락처 정보 입력 (콘텐츠 교체)

**Files:**
- Modify: `src/data/projects.ts`
- Modify: `src/components/Contact.tsx`

**Step 1: `src/data/projects.ts`에 실제 유튜브 영상 ID 입력**

YouTube URL `https://www.youtube.com/watch?v=XXXXXXX` 에서 `XXXXXXX` 부분이 `youtubeId`.

**Step 2: `src/components/Contact.tsx`의 `KAKAO_URL`, `EMAIL` 실제 값으로 교체**

**Step 3: 커밋 & 푸시**

```bash
git add src/data/projects.ts src/components/Contact.tsx
git commit -m "content: add real project data and contact info"
git push origin main
```

자동 배포 후 최종 확인.

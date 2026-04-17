# Better BE Studio — Portfolio Site Design

**Date:** 2026-04-18  
**Deploy URL:** https://boredape874.github.io/Better_BE_STUDIO/

---

## Overview

외주/주문제작 강조 개발자 포트폴리오 사이트.  
Single Page Application, 스크롤 방식.

---

## Tech Stack

- **Framework:** Vite + React 18 + TypeScript
- **UI:** shadcn/ui + Tailwind CSS
- **Animation:** Framer Motion
- **Deployment:** GitHub Actions → `gh-pages` 브랜치 자동 배포

---

## Architecture

```
Better_BE_STUDIO/
├── .github/workflows/deploy.yml   # main push 시 자동 빌드 & 배포
├── src/
│   ├── components/
│   │   ├── Hero.tsx               # 소개 + 슬로건 + 문의하기 버튼
│   │   ├── ProjectCard.tsx        # 유튜브 파사드 카드 (썸네일 → iframe)
│   │   ├── ProjectGallery.tsx     # 카드 그리드 + stagger 애니메이션
│   │   └── Contact.tsx            # 연락처 섹션
│   ├── data/
│   │   └── projects.ts            # 프로젝트 데이터 (youtubeId, title, description, price?)
│   └── App.tsx
└── vite.config.ts                 # base: '/Better_BE_STUDIO/'
```

---

## Page Layout

Single Page, 위에서 아래로 스크롤:

1. **Hero** — 브랜드명, 외주/주문제작 슬로건, 문의하기 버튼
2. **Projects** — 유튜브 카드 그리드
3. **Contact** — 카카오톡 / 이메일 / 오픈채팅 등

---

## Project Card Spec

```
┌──────────────────────────┐
│  YouTube 썸네일           │  ← 클릭 시 iframe으로 교체 (파사드 패턴)
│  (재생 버튼 오버레이)      │     호버 시 썸네일 살짝 확대
├──────────────────────────┤
│  제목                    │
│  설명                    │
│  ₩ 가격 (없으면 숨김)     │
└──────────────────────────┘
```

- `price` 필드가 없거나 null이면 가격 UI 비표시
- 최초 로드 시 썸네일 이미지만 로드 (iframe은 클릭 후 마운트) → 성능 최적화

---

## Color Palette

| 역할 | 값 |
|---|---|
| 배경 | `#FFFFFF` / `#F5F5F5` |
| 텍스트 | `#111111` |
| 포인트/버튼 | `#000000` |
| 카드 테두리 | `#E5E5E5` |

---

## Animations (Framer Motion)

| 위치 | 효과 |
|---|---|
| Hero 텍스트 | 로드 시 fade-up |
| 프로젝트 카드 | 스크롤 진입 시 stagger fade-up |
| 카드 호버 | 썸네일 scale-up + 그림자 |
| 문의하기 버튼 | 호버 시 색 반전 슬라이드 |
| 네비게이션 | 스크롤 시 상단 고정 + backdrop-blur |

---

## Optimization

- YouTube 파사드 패턴 (클릭 전 iframe 미로드)
- Vite 코드 스플리팅 (자동)
- 이미지 lazy loading
- Tailwind CSS purge (미사용 클래스 제거)

---

## Deployment

- `main` 브랜치 push → GitHub Actions 트리거
- `vite build` 실행 (`base: '/Better_BE_STUDIO/'` 적용)
- `dist/` 폴더를 `gh-pages` 브랜치로 자동 배포
- GitHub 레포 Settings → Pages → Source: `gh-pages` 브랜치 설정 필요 (최초 1회)

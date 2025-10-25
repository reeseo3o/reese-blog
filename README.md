# Reese-logs

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **CMS**: Notion API
- **Comments**: Giscus
- **Animation**: Framer Motion
- **3D**: OGL (WebGL library)

## 시작하기

### 환경 설정

```bash
# 의존성 설치
pnpm install

# 환경 변수 설정
cp .env.example .env.local
```

필수 환경 변수:
- `NOTION_TOKEN`: Notion API 토큰
- `NOTION_DATABASE_ID`: Notion 블로그 데이터베이스 ID
- `NEXT_PUBLIC_SITE_URL`: 사이트 URL
- `GISCUS_REPO`: Giscus 댓글 저장소 (선택)

### 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 스크립트

```bash
pnpm dev      # 개발 서버 실행
pnpm build    # 프로덕션 빌드
pnpm start    # 프로덕션 서버 실행
pnpm lint     # ESLint 실행
pnpm format   # Prettier 포맷팅
```

## 프로젝트 구조

```
src/
├── app/              # Next.js App Router 페이지
│   ├── blog/        # 블로그 페이지
│   ├── about/       # About 페이지
│   └── projects/    # 프로젝트 페이지
├── components/       # 재사용 가능한 컴포넌트
├── lib/             # 유틸리티 및 API 함수
└── data/            # 정적 데이터

```

## 라이센스

MIT

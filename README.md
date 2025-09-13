# 🚀 Tech Blog

개인 기술 블로그 프로젝트 - React + TypeScript + Vite + Shadcn/ui + Firebase

## 📋 프로젝트 개요

개발 지식과 경험을 공유하는 개인 기술 블로그입니다. JavaScript, TypeScript, React를 중심으로 한 실무 경험과 학습 내용을 체계적으로 정리하여 개발자 커뮤니티와 지식을 나누고 있습니다.

## 🎯 프로젝트 목표

- **지식 공유**: 실무에서 얻은 경험과 학습한 내용을 체계적으로 정리
- **커뮤니티 참여**: 개발자들과의 지식 교환과 네트워킹
- **기술 문서화**: 복잡한 개념을 이해하기 쉽게 설명하는 기술 문서 작성
- **지속적 성장**: 블로그 작성을 통한 학습과 성장

## 🛠 기술 스택

### 핵심 기술

- **프레임워크**: React 19 + TypeScript
- **빌드 도구**: Vite
- **스타일링**: Tailwind CSS + Shadcn/ui
- **애니메이션**: Framer Motion
- **마크다운**: MDX (React 컴포넌트 + 마크다운)
- **백엔드**: Firebase (Firestore, Functions, Hosting)
- **아이콘**: Lucide React

### 시스템 요구사항

- **Node.js**: 20.0.0 이상 (Firebase AI 패키지 요구사항)
- **Yarn**: 1.22.0 이상
- **Git**: 2.0.0 이상

### 추가 도구

- **코드 하이라이팅**: Prism.js
- **다이어그램**: Mermaid
- **수학 공식**: KaTeX
- **댓글 시스템**: Utterances
- **분석**: Google Analytics + Firebase Analytics

## 📄 페이지 구조

### 1. **홈페이지** (`/`) - [x] 완료

- **기능**: 최신 포스트 목록, 인기 포스트, 카테고리별 포스트
- **컴포넌트**: `HomePage`, `FeaturedPost`, `PostGrid`, `CategoryFilter`
- **특징**: 반응형 그리드 레이아웃, 무한 스크롤, 검색 기능

### 2. **블로그 목록** (`/blog`) - [x] 완료

- **기능**: 모든 포스트 목록, 필터링, 정렬, 페이지네이션
- **컴포넌트**: `BlogListPage`, `PostCard`, `FilterSidebar`, `Pagination`
- **특징**: 카테고리/태그 필터, 검색, 정렬 옵션

### 3. **포스트 상세** (`/blog/[slug]`) - [x] 완료

- **기능**: 포스트 내용 표시, 댓글, 조회수, 관련 포스트
- **컴포넌트**: `PostDetailPage`, `PostContent`, `CommentSection`, `RelatedPosts`
- **특징**: MDX 렌더링, 코드 하이라이팅, 목차, 공유 기능

### 4. **카테고리 페이지** (`/category/[category]`) - [x] 완료

- **기능**: 특정 카테고리 포스트 목록
- **컴포넌트**: `CategoryPage`, `CategoryHeader`, `PostList`
- **특징**: 카테고리별 필터링, 포스트 수 표시

### 5. **태그 페이지** (`/tag/[tag]`) - [ ] 미완료

- **기능**: 특정 태그 포스트 목록
- **컴포넌트**: `TagPage`, `TagHeader`, `PostList`
- **특징**: 태그별 필터링, 태그 클라우드

### 6. **검색 페이지** (`/search`) - [x] 완료

- **기능**: 포스트 검색, 실시간 검색 결과
- **컴포넌트**: `SearchPage`, `SearchBar`, `SearchResults`
- **특징**: 실시간 검색, 검색 히스토리, 검색 필터

### 7. **소개 페이지** (`/about`) - [x] 완료

- **기능**: 개발자 소개, 기술 스택, 경력
- **컴포넌트**: `AboutPage`, `ProfileCard`, `SkillList`, `Timeline`
- **특징**: 개인 정보, 기술 스택 시각화, 경력 타임라인

### 8. **연락처 페이지** (`/contact`) - [x] 완료

- **기능**: 연락처 정보, 문의 폼
- **컴포넌트**: `ContactPage`, `ContactForm`, `SocialLinks`
- **특징**: 문의 폼, 소셜 링크, 연락처 정보

### 9. **404 페이지** (`/404`) - [x] 완료

- **기능**: 페이지를 찾을 수 없음
- **컴포넌트**: `NotFoundPage`, `ErrorBoundary`
- **특징**: 사용자 친화적 에러 메시지, 홈으로 돌아가기

## 🎨 디자인 시스템

### 색상 팔레트

```css
/* 라이트 모드 */
--primary: #3B82F6 (Blue)
--secondary: #6B7280 (Gray)
--accent: #10B981 (Green)
--background: #FFFFFF
--foreground: #1F2937
--muted: #F3F4F6

/* 다크 모드 */
--primary: #60A5FA (Light Blue)
--secondary: #9CA3AF (Light Gray)
--accent: #34D399 (Light Green)
--background: #1F2937
--foreground: #F9FAFB
--muted: #374151
```

### 타이포그래피

- **제목**: Inter (Bold, Semibold)
- **본문**: Inter (Regular, Medium)
- **코드**: JetBrains Mono

### 컴포넌트 스타일

- **카드**: 호버 시 위로 이동, 그림자 증가
- **버튼**: 호버 시 색상 변화, 클릭 시 스케일 효과
- **링크**: 호버 시 밑줄 애니메이션
- **폼**: 포커스 시 테두리 색상 변화

## 📁 프로젝트 구조

### 컴포넌트 구조

#### Layout 컴포넌트 - [x] 완료

- [x] `Header.tsx` - 네비게이션 헤더
- [x] `Footer.tsx` - 하단 푸터
- [x] `Sidebar.tsx` - 사이드바
- [x] `Layout.tsx` - 전체 레이아웃

#### Blog 컴포넌트 - [x] 완료

- [x] `BlogCard.tsx` - 블로그 카드
- [x] `PostList.tsx` - 포스트 목록
- [x] `PageHeader.tsx` - 페이지 헤더
- [x] `CategoryFilter.tsx` - 카테고리 필터

#### Common 컴포넌트 - [x] 완료

- [x] `ThemeToggle.tsx` - 테마 토글
- [x] `LoadingSpinner.tsx` - 로딩 스피너
- [x] `CategoryModal.tsx` - 카테고리 선택 모달

### 페이지 컴포넌트 - [ ] 미완료

- [x] `HomePage.tsx` - 홈페이지
- [x] `BlogListPage.tsx` - 블로그 목록
- [x] `PostDetailPage.tsx` - 포스트 상세
- [ ] `CategoryPage.tsx` - 카테고리 페이지
- [ ] `TagPage.tsx` - 태그 페이지
- [x] `SearchPage.tsx` - 검색 페이지
- [x] `AboutPage.tsx` - 소개 페이지
- [x] `ContactPage.tsx` - 연락처 페이지
- [x] `NotFoundPage.tsx` - 404 페이지

### 커스텀 훅 - [ ] 미완료

- [ ] `useTheme.ts` - 테마 관리
- [x] `useSearch.ts` - 검색 기능
- [ ] `usePosts.ts` - 포스트 관리

### 유틸리티 함수 - [x] 완료

- [x] `utils.ts` - 공통 유틸리티 (완료)
- [x] `firebase.ts` - Firebase 설정 (완료)
- [x] `mdx.ts` - MDX 처리 (완료)

### 타입 정의 - [x] 완료

- [x] `index.ts` - TypeScript 타입 정의

### 스타일 파일 - [ ] 미완료

- [ ] `globals.css` - 전역 스타일

## 📊 개발 진행 상황

### ✅ 완료된 작업

- [x] 프로젝트 초기 설정 (React + TypeScript + Vite)
- [x] Tailwind CSS 설정
- [x] Shadcn/ui 설치 및 설정
- [x] Framer Motion 설치
- [x] Firebase 설정
- [x] TypeScript 타입 정의
- [x] 기본 App.tsx 컴포넌트 (데모)
- [x] HomePage 컴포넌트 구현
- [x] Layout 컴포넌트 구현 (Header, Footer, Sidebar)
- [x] ThemeToggle 컴포넌트 구현
- [x] React Router 설정 및 라우팅 구현
- [x] 기본 페이지들 구현 (BlogList, About, Contact, 404)
- [x] PostDetailPage 구현 (MDX 렌더링, 목차, 관련 포스트)
- [x] MDX 설정 및 파일 기반 콘텐츠 시스템
- [x] Firebase 에러 처리 및 하이브리드 시스템
- [x] 검색 기능 구현 (SearchPage, SearchBar, SearchResults, useSearch 훅)
- [x] 카테고리 페이지 구현 (CategoryPage, 카테고리별 포스트 필터링)
- [x] Blog 컴포넌트들 구현 (BlogCard, PostList, PageHeader, CategoryFilter)
- [x] 공통 컴포넌트 구현 (LoadingSpinner, CategoryModal)
- [x] 성능 최적화 구현 (이미지 최적화, 코드 스플리팅, 성능 모니터링)
- [x] 이미지 테스트 페이지 구현 (WebP, 지연 로딩, 반응형 이미지)

### 🚧 진행 중인 작업

- [ ] Firebase 연결 완성

### 📋 다음 작업 예정

- [ ] 태그 페이지 구현 (나중에)
- [ ] SEO 개선 (메타 태그, 구조화된 데이터)
- [ ] PWA 구현 (오프라인 지원)

### 🔥 Firebase 연결 완료 필요

- [ ] Firebase 환경변수 설정 확인
- [ ] Firestore 보안 규칙 설정
- [ ] 댓글 시스템 구현 (실제 Firebase 연결)
- [ ] 좋아요/조회수 기능 구현 (실제 Firebase 연결)
- [ ] 사용자 인증 시스템 구현
- [ ] Firebase 에러 처리 개선

### 📈 전체 진행률

**현재 진행률: 100%** (Firebase Hosting 배포 완료)

---

## 🌐 배포 정보

### 현재 배포 상태

- **✅ 배포 완료**: Firebase Hosting
- **🌐 사이트 URL**: https://tech-blog-moomookcow.web.app
- **📊 Firebase Console**: https://console.firebase.google.com/project/tech-blog-moomookcow/overview
- **🔄 자동 배포**: GitHub Actions (main 브랜치 푸시 시)

### 커스텀 도메인 설정 (예정)

- **🎯 목표 도메인**: tech-blog.moomookcow.dev
- **📋 설정 방법**:
  1. Firebase Console → Hosting → 도메인 추가
  2. DNS 설정 (A 레코드 또는 CNAME)
  3. SSL 인증서 자동 발급
  4. 도메인 연결 완료

---

## 🚀 시작하기

### 1. 의존성 설치

```bash
yarn install
```

### 2. 환경 변수 설정

```bash
# .env.local 파일 생성
cp .env.example .env.local

# Firebase 설정 값 입력
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=G-C2KY6N11FH
```

### 3. 개발 서버 실행

```bash
yarn dev
```

### 4. 빌드

```bash
yarn build
```

### 5. 배포

```bash
# 수동 배포
yarn deploy

# 또는 Hosting만 배포
yarn deploy:hosting
```

### 6. 미리보기

```bash
yarn preview
```

### 7. GitHub Actions 자동 배포

```bash
# main 브랜치에 푸시하면 자동으로 배포됩니다
git add .
git commit -m "feat: 새로운 기능 추가"
git push origin main
```

#### 자동 배포 설정 방법

1. **Firebase Service Account 키 생성**

   - Firebase Console → 프로젝트 설정 → 서비스 계정
   - "새 비공개 키 생성" → JSON 파일 다운로드

2. **GitHub Secrets 설정**

   - GitHub 저장소 → Settings → Secrets and variables → Actions
   - `FIREBASE_SERVICE_ACCOUNT` 이름으로 JSON 내용 추가

3. **자동 배포 활성화**

   ```bash
   firebase init hosting:github
   ```

4. **배포 확인**
   - GitHub Actions 탭에서 배포 진행 상황 확인
   - https://tech-blog-moomookcow.web.app 접속하여 변경사항 확인

#### 배포 채널

- **Live 채널**: `main` 브랜치 푸시 시 자동 배포
- **Preview 채널**: Pull Request 생성 시 미리보기 배포
- **수동 배포**: `yarn deploy` 명령어로 수동 배포

## 📊 성능 목표

- **Lighthouse Score**: 90+ (모든 카테고리)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🔧 개발 도구

### 코드 품질

- **ESLint**: 코드 스타일 및 오류 검사
- **Prettier**: 코드 포맷팅
- **TypeScript**: 타입 안전성

### 테스팅

- **Jest**: 단위 테스트
- **React Testing Library**: 컴포넌트 테스트

## 📈 배포 및 모니터링

### 배포

- **Firebase Hosting**: 자동 배포
- **커스텀 도메인**: tech-blog.moomookcow.dev
- **CDN**: Firebase CDN

### 모니터링

- **Google Analytics**: 방문자 분석
- **Firebase Analytics**: 성능 모니터링

## 📚 참고 자료

### 기술 문서

- [React 공식 문서](https://react.dev/)
- [Firebase 문서](https://firebase.google.com/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Shadcn/ui 문서](https://ui.shadcn.com/)
- [Framer Motion 문서](https://www.framer.com/motion/)

### 영감을 받은 블로그

- [Dan Abramov의 블로그](https://overreacted.io/)
- [Kent C. Dodds의 블로그](https://kentcdodds.com/blog)
- [Josh Comeau의 블로그](https://www.joshwcomeau.com/)

## 🤝 기여하기

이 프로젝트는 개인 기술 블로그이지만, 피드백이나 제안사항이 있다면 언제든 환영합니다! 기술적 개선사항이나 새로운 기능에 대한 아이디어가 있다면 이슈로 남겨주세요.

## 📄 라이선스

MIT License - 자유롭게 사용하실 수 있습니다.

---

**개발자**: moomookcow  
**시작일**: 2025년 9월 7일  
**목표 완료일**: 2025년 9월 중순  
**블로그 주소**: [tech-blog.moomookcow.dev](https://tech-blog.moomookcow.dev)

// 블로그 포스트 관련 타입
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  category: string;
  viewCount: number;
  readingTime: number;
  featured: boolean;
  author: Author;
}

// 포스트 메타데이터 (MDX frontmatter)
export interface PostMetadata {
  title: string;
  slug: string;
  date: string;
  tags: string[];
  category: string;
  excerpt: string;
  featured?: boolean;
  author?: Author;
}

// 작성자 정보
export interface Author {
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

// 카테고리
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
}

// 태그
export interface Tag {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

// 검색 관련
export interface SearchQuery {
  query: string;
  category?: string;
  tags?: string[];
  sortBy?: "date" | "title" | "viewCount";
  sortOrder?: "asc" | "desc";
}

export interface SearchResult {
  posts: BlogPost[];
  totalCount: number;
  hasMore: boolean;
}

// UI 상태
export interface Theme {
  mode: "light" | "dark";
  primaryColor: string;
  secondaryColor: string;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ErrorState {
  hasError: boolean;
  message?: string;
  code?: string;
}

// 라우팅
export interface RouteParams {
  slug?: string;
  category?: string;
  tag?: string;
}

// Firebase 관련 (선택사항)
export interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  approved: boolean;
}

export interface ViewCount {
  postId: string;
  count: number;
  lastUpdated: string;
}

// 유틸리티 타입
export type SortOption = "date" | "title" | "viewCount";
export type SortOrder = "asc" | "desc";
export type ThemeMode = "light" | "dark";

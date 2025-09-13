/**
 * 라우트 관련 유틸리티 함수들
 */

/**
 * 현재 경로가 블로그 포스트 페이지인지 확인
 * @param pathname - 현재 경로
 * @returns 블로그 포스트 페이지 여부
 */
export function isBlogPostPage(pathname: string): boolean {
  // /blog/로 시작하고 /blog가 아닌 경우 (즉, /blog/slug 형태)
  return pathname.startsWith("/blog/") && pathname !== "/blog";
}

/**
 * 현재 경로가 특정 카테고리 페이지인지 확인
 * @param pathname - 현재 경로
 * @param category - 확인할 카테고리
 * @returns 해당 카테고리 페이지 여부
 */
export function isCategoryPage(pathname: string, category?: string): boolean {
  if (category) {
    return pathname === `/category/${category}`;
  }
  return pathname.startsWith("/category/");
}

/**
 * 현재 경로가 검색 페이지인지 확인
 * @param pathname - 현재 경로
 * @returns 검색 페이지 여부
 */
export function isSearchPage(pathname: string): boolean {
  return pathname === "/search";
}

/**
 * 현재 경로가 태그 페이지인지 확인
 * @param pathname - 현재 경로
 * @returns 태그 페이지 여부
 */
export function isTagPage(pathname: string): boolean {
  return pathname.startsWith("/tag/");
}

/**
 * Reading Progress Bar가 표시되어야 하는 페이지인지 확인
 * @param pathname - 현재 경로
 * @returns Reading Progress Bar 표시 여부
 */
export function shouldShowReadingProgress(pathname: string): boolean {
  return isBlogPostPage(pathname);
}

/**
 * 페이지 타입을 반환
 * @param pathname - 현재 경로
 * @returns 페이지 타입
 */
export function getPageType(
  pathname: string
):
  | "home"
  | "blog-list"
  | "blog-post"
  | "category"
  | "tag"
  | "search"
  | "about"
  | "contact"
  | "other" {
  if (pathname === "/") return "home";
  if (pathname === "/blog") return "blog-list";
  if (isBlogPostPage(pathname)) return "blog-post";
  if (isCategoryPage(pathname)) return "category";
  if (isTagPage(pathname)) return "tag";
  if (isSearchPage(pathname)) return "search";
  if (pathname === "/about") return "about";
  if (pathname === "/contact" || pathname === "/guestbook") return "contact";
  return "other";
}

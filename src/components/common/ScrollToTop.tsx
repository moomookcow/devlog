import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * 페이지 이동 시 자동으로 스크롤을 맨 위로 이동시키는 컴포넌트
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 페이지가 변경될 때마다 스크롤을 맨 위로 이동
    const scrollToTop = () => {
      // 여러 방법으로 스크롤을 맨 위로 이동
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // 추가로 모든 스크롤 가능한 요소들도 리셋
      const scrollableElements = document.querySelectorAll("[data-scrollable]");
      scrollableElements.forEach((element) => {
        (element as HTMLElement).scrollTop = 0;
      });
    };

    // 즉시 실행
    scrollToTop();

    // 약간의 지연 후 다시 실행 (DOM이 완전히 로드된 후)
    const timeoutId = setTimeout(scrollToTop, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null; // 렌더링할 UI가 없음
};

export default ScrollToTop;

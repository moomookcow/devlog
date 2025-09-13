import { useState, useEffect, useCallback } from "react";

interface ReadingProgressOptions {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  thresholdArray?: number[];
}

export function useReadingProgress(options: ReadingProgressOptions = {}) {
  const [progress, setProgress] = useState(0);
  const [isReading, setIsReading] = useState(false);

  const {
    threshold = 0, // 0%부터 시작
    root = null,
    rootMargin = "0px",
    thresholdArray = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
  } = options;

  const calculateProgress = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    if (scrollHeight <= 0) {
      setProgress(0);
      return;
    }

    const currentProgress = Math.min(scrollTop / scrollHeight, 1);
    setProgress(currentProgress);

    // 읽기 시작/종료 상태 업데이트
    // 스크롤이 조금이라도 있으면 표시하고, 100% 도달해도 계속 표시
    const reading = currentProgress > 0.005;
    setIsReading(reading);
  }, [threshold]);

  useEffect(() => {
    // 스크롤 이벤트 리스너
    const handleScroll = () => {
      requestAnimationFrame(calculateProgress);
    };

    // Intersection Observer for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            calculateProgress();
          }
        });
      },
      {
        root,
        rootMargin,
        threshold: thresholdArray,
      }
    );

    // 스크롤 이벤트 등록
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // 초기 계산
    calculateProgress();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      observer.disconnect();
    };
  }, [calculateProgress, root, rootMargin, thresholdArray]);

  return {
    progress: Math.round(progress * 100), // 0-100 퍼센트
    isReading,
    progressDecimal: progress, // 0-1 소수점
  };
}

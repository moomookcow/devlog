// 테스트용 이미지 데이터
export const testImages = [
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&crop=center",
    alt: "코딩하는 개발자",
    caption: "개발자가 코드를 작성하고 있는 모습",
    width: 800,
    height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&crop=center",
    alt: "React 로고",
    caption: "React 프레임워크 로고",
    width: 800,
    height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop&crop=center",
    alt: "TypeScript 코드",
    caption: "TypeScript로 작성된 코드",
    width: 800,
    height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&crop=center",
    alt: "웹 개발 도구들",
    caption: "다양한 웹 개발 도구들",
    width: 800,
    height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&crop=center",
    alt: "코드 에디터",
    caption: "VS Code 에디터 화면",
    width: 800,
    height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
    alt: "데이터 분석",
    caption: "데이터 분석 및 시각화",
    width: 800,
    height: 600,
  },
];

// 성능 테스트용 다양한 크기의 이미지들
export const performanceTestImages = [
  // 작은 이미지들
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=320&h=240&fit=crop&crop=center",
    alt: "작은 이미지 1",
    width: 320,
    height: 240,
  },
  {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=320&h=240&fit=crop&crop=center",
    alt: "작은 이미지 2",
    width: 320,
    height: 240,
  },
  // 중간 크기 이미지들
  {
    src: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=640&h=480&fit=crop&crop=center",
    alt: "중간 이미지 1",
    width: 640,
    height: 480,
  },
  {
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=640&h=480&fit=crop&crop=center",
    alt: "중간 이미지 2",
    width: 640,
    height: 480,
  },
  // 큰 이미지들
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1280&h=960&fit=crop&crop=center",
    alt: "큰 이미지 1",
    width: 1280,
    height: 960,
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1280&h=960&fit=crop&crop=center",
    alt: "큰 이미지 2",
    width: 1280,
    height: 960,
  },
];

// WebP 테스트용 이미지들
export const webpTestImages = [
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&crop=center&fm=webp",
    alt: "WebP 이미지 1",
    width: 800,
    height: 600,
  },
  {
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&crop=center&fm=webp",
    alt: "WebP 이미지 2",
    width: 800,
    height: 600,
  },
];

// 지연 로딩 테스트용 많은 이미지들
export const lazyLoadingTestImages = Array.from({ length: 20 }, (_, index) => ({
  src: `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&crop=center&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=${
    400 + index * 50
  }&h=${300 + index * 30}`,
  alt: `지연 로딩 테스트 이미지 ${index + 1}`,
  width: 400 + index * 50,
  height: 300 + index * 30,
}));

// 반응형 이미지 테스트용
export const responsiveTestImages = [
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=320&h=240&fit=crop&crop=center",
    alt: "반응형 이미지 320px",
    width: 320,
    height: 240,
    sizes: "320px",
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=640&h=480&fit=crop&crop=center",
    alt: "반응형 이미지 640px",
    width: 640,
    height: 480,
    sizes: "640px",
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1280&h=960&fit=crop&crop=center",
    alt: "반응형 이미지 1280px",
    width: 1280,
    height: 960,
    sizes: "1280px",
  },
];

// 에러 테스트용 이미지들
export const errorTestImages = [
  {
    src: "https://invalid-url.com/image.jpg",
    alt: "에러 이미지 1",
    width: 400,
    height: 300,
  },
  {
    src: "https://httpstat.us/404",
    alt: "에러 이미지 2",
    width: 400,
    height: 300,
  },
];

// 블러 플레이스홀더 테스트용
export const blurPlaceholderImages = [
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&crop=center",
    alt: "블러 플레이스홀더 이미지",
    width: 800,
    height: 600,
    blurDataURL:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==",
  },
];
